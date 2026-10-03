import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, FileText } from "lucide-react";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const { doctor, specialization, time } = location.state || {};

  // If user directly opens booking page
  if (!doctor || !time) {
    return (
      <div className="booking-page">
        <div className="booking-card">
          <h2>No appointment selected</h2>

          <p>Please select a doctor and time slot first.</p>

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

  // Generate appointment number
  const appointmentNumber =
    "APT-" + Math.floor(1000 + Math.random() * 9000);

  const appointmentDate = "30 Aug 2026";

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


      <div className="booking-container">

        <div className="booking-card">

          {/* Success Icon */}
          <div className="booking-icon">
            <CheckCircle size={45} />
          </div>


          <h1>Confirm Your Appointment</h1>

          <p className="booking-subtitle">
            Please review your appointment details.
          </p>


          {/* Appointment Number */}
          <div className="appointment-number">

            <span>Appointment Number</span>

            <strong>{appointmentNumber}</strong>

          </div>


          {/* Appointment Details */}
          <div className="booking-details">

            <div className="booking-row">
              <span>Doctor</span>
              <strong>{doctor}</strong>
            </div>

            <div className="booking-row">
              <span>Specialization</span>
              <strong>{specialization}</strong>
            </div>

            <div className="booking-row">
              <span>Appointment Date</span>
              <strong>{appointmentDate}</strong>
            </div>

            <div className="booking-row">
              <span>Appointment Time</span>
              <strong>{time}</strong>
            </div>

            <div className="booking-row">
              <span>Payment</span>
              <strong className="pending">
                Pay at Hospital
              </strong>
            </div>

          </div>


          {/* Billing Notice */}
          <div className="billing-notice">

            <FileText size={22} />

            <div>
              <strong>Billing Slip</strong>

              <p>
                A billing slip will be generated after confirming
                your appointment. Please pay at the hospital before
                your consultation.
              </p>
            </div>

          </div>


          {/* Confirm Appointment */}
          <button
            className="confirm-booking-btn"
            onClick={() => {

              navigate("/billing-slip", {
                state: {
                  doctor,
                  specialization,
                  time,
                  appointmentDate,
                  appointmentNumber,
                  consultationFee: 500,
                },
              });

            }}
          >
            Confirm Appointment
          </button>

        </div>

      </div>

    </div>
  );
}

export default Booking;