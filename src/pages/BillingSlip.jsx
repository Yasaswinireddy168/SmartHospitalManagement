import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Hospital,
  CheckCircle,
  Printer,
} from "lucide-react";

import "./BillingSlip.css";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get appointment details from previous page
  const { doctor, specialization, time } = location.state || {};

  // Generate appointment number
  const appointmentNumber =
    "APT-" + Math.floor(1000 + Math.random() * 9000);

  // Fixed appointment details for now
  const appointmentDate = "30 Aug 2026";
  const consultationFee = 500;

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

        {/* Appointment Card */}
        <div className="booking-card">

          {/* Success Icon */}
          <div className="booking-icon">
            <CheckCircle size={45} />
          </div>

          {/* Heading */}
          <h1>Confirm Your Appointment</h1>

          <p className="booking-subtitle">
            Please review your appointment details.
          </p>

          {/* Appointment Number */}
          <div className="appointment-number">
            <span>Appointment Number</span>

            <strong>
              {appointmentNumber}
            </strong>
          </div>

          {/* Appointment Details */}
          <div className="booking-details">

            <div className="booking-row">
              <span>Doctor</span>

              <strong>
                {doctor}
              </strong>
            </div>

            <div className="booking-row">
              <span>Specialization</span>

              <strong>
                {specialization}
              </strong>
            </div>

            <div className="booking-row">
              <span>Appointment Date</span>

              <strong>
                {appointmentDate}
              </strong>
            </div>

            <div className="booking-row">
              <span>Appointment Time</span>

              <strong>
                {time}
              </strong>
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
                Your billing slip will be generated.
                Please pay at the hospital before your consultation.
              </p>
            </div>

          </div>

          {/* Confirm Appointment Button */}
          <button
            className="confirm-booking-btn"
            onClick={() => {
              navigate("/billing-slip", {
                state: {
                  doctor,
                  specialization,
                  time,

                  appointmentNumber,

                  date: appointmentDate,

                  consultationFee,
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