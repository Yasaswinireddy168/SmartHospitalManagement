import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, FileText } from "lucide-react";
import { useState } from "react";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    doctor,
    specialization,
    time,
    doctorId,
  } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If user directly opens booking page
  if (!doctor || !time) {
    return (
      <div className="booking-page">
        <div className="booking-card">

          <h2>No appointment selected</h2>

          <p>
            Please select a doctor and time slot first.
          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/doctors")}
          >
            Explore Doctors
          </button>

        </div>
      </div>
    );
  }

  // Temporary frontend appointment display number
  const appointmentNumber =
    "APT-" + Math.floor(1000 + Math.random() * 9000);

  // Appointment date for testing
  const appointmentDate = new Date().toLocaleDateString("en-CA");

  // Convert "10:00 AM" → "10:00:00"
  const convertTimeToBackendFormat = (timeString) => {
    const [timePart, modifier] =
      timeString.split(" ");

    let [hours, minutes] =
      timePart.split(":");

    hours = parseInt(hours);

    if (
      modifier === "PM" &&
      hours !== 12
    ) {
      hours += 12;
    }

    if (
      modifier === "AM" &&
      hours === 12
    ) {
      hours = 0;
    }

    return `${String(hours).padStart(
      2,
      "0"
    )}:${minutes}:00`;
  };

  const handleConfirmAppointment = async () => {
    setLoading(true);
    setError("");

    try {

      // =====================================
      // STEP 1: BOOK APPOINTMENT
      // =====================================

      const appointmentTime =
        convertTimeToBackendFormat(time);

      const appointmentResponse =
        await fetch(
          "/api/appointments",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              patientId: 1,

              doctorId:
                doctorId || 1,

              appointmentDate:
                appointmentDate,

              appointmentTime:
                appointmentTime,

              status: "BOOKED",
            }),
          }
        );

      if (!appointmentResponse.ok) {

        let errorData = {};

        try {
          errorData =
            await appointmentResponse.json();
        } catch {
          errorData = {};
        }

        throw new Error(
          errorData.message ||
          "Failed to book appointment"
        );
      }

      const savedAppointment =
        await appointmentResponse.json();

      console.log(
        "Appointment saved:",
        savedAppointment
      );


      // =====================================
      // STEP 2: CREATE BILLING RECORD
      // =====================================

      const billingResponse =
        await fetch(
          "/api/billing",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              appointmentId:
                savedAppointment.id,

              patientId: 1,

              doctorId:
                doctorId || 1,

              consultationFee: 500,

              totalAmount: 500,

              paymentStatus: "PENDING",
            }),
          }
        );

      if (!billingResponse.ok) {

        const billingError =
          await billingResponse.text();

        console.error(
          "Billing error:",
          billingError
        );

        throw new Error(
          "Appointment was booked, but billing could not be created."
        );
      }

      const savedBilling =
        await billingResponse.json();

      console.log(
        "Billing saved:",
        savedBilling
      );


      // =====================================
      // STEP 3: PREPARE BILLING DATA
      // =====================================

      const billingData = {

        doctor:
          doctor,

        specialization:
          specialization,

        time:
          time,

        appointmentDate:
          appointmentDate,

        appointmentNumber:
          appointmentNumber,

        appointmentId:
          savedAppointment.id,

        billingId:
          savedBilling.id,

        consultationFee:
          savedBilling.consultationFee,

        totalAmount:
          savedBilling.totalAmount,

        paymentStatus:
          savedBilling.paymentStatus,
      };


      console.log(
        "FINAL BILLING DATA:",
        billingData
      );


      // =====================================
      // STEP 4: SAVE IN SESSION STORAGE
      // =====================================

      sessionStorage.setItem(
        "smartcareBilling",
        JSON.stringify(
          billingData
        )
      );


      // =====================================
      // STEP 5: OPEN BILLING SLIP
      // =====================================

      navigate(
        "/billing-slip",
        {
          state: billingData,
        }
      );

    } catch (err) {

      console.error(
        "Booking error:",
        err
      );

      setError(
        err.message ||
        "Unable to complete appointment booking."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="booking-page">

      {/* Top Navigation */}
      <div className="booking-navbar">

        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="booking-logo">
          SmartCare
        </div>

      </div>


      {/* Main Container */}
      <div className="booking-container">

        <div className="booking-card">

          {/* Success Icon */}
          <div className="booking-icon">
            <CheckCircle size={45} />
          </div>


          <h1>
            Confirm Your Appointment
          </h1>

          <p className="booking-subtitle">
            Please review your appointment details.
          </p>


          {/* Appointment Number */}
          <div className="appointment-number">

            <span>
              Appointment Number
            </span>

            <strong>
              {appointmentNumber}
            </strong>

          </div>


          {/* Appointment Details */}
          <div className="booking-details">

            <div className="booking-row">

              <span>
                Doctor
              </span>

              <strong>
                {doctor}
              </strong>

            </div>


            <div className="booking-row">

              <span>
                Specialization
              </span>

              <strong>
                {specialization}
              </strong>

            </div>


            <div className="booking-row">

              <span>
                Appointment Date
              </span>

              <strong>
                {appointmentDate}
              </strong>

            </div>


            <div className="booking-row">

              <span>
                Appointment Time
              </span>

              <strong>
                {time}
              </strong>

            </div>


            <div className="booking-row">

              <span>
                Payment
              </span>

              <strong className="pending">
                Pay at Hospital
              </strong>

            </div>

          </div>


          {/* Billing Notice */}
          <div className="billing-notice">

            <FileText size={22} />

            <div>

              <strong>
                Billing Slip
              </strong>

              <p>
                A billing slip will be generated
                after confirming your appointment.
                Please pay at the hospital before
                your consultation.
              </p>

            </div>

          </div>


          {/* Error Message */}
          {error && (
            <p
              style={{
                color: "red",
                marginBottom: "15px",
                fontWeight: "500",
              }}
            >
              {error}
            </p>
          )}


          {/* Confirm Button */}
          <button
            className="confirm-booking-btn"
            onClick={
              handleConfirmAppointment
            }
            disabled={loading}
          >
            {loading
              ? "Booking Appointment..."
              : "Confirm Appointment"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Booking;