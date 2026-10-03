import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Hospital,
  CheckCircle,
  Printer,
} from "lucide-react";
import { useEffect, useState } from "react";

import "./BillingSlip.css";

function BillingSlip() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data passed during navigation
  const navigationData = location.state || {};

  // Get saved booking data from sessionStorage
  let storedData = {};

  try {
    storedData =
      JSON.parse(
        sessionStorage.getItem("smartcareBilling")
      ) || {};
  } catch (error) {
    console.error("Session storage error:", error);
  }

  // Use navigation data first, sessionStorage as backup
  const billingData = {
    ...storedData,
    ...navigationData,
  };

  const {
    doctor,
    specialization,
    time,
    appointmentNumber,
    appointmentDate,
    date,
    appointmentId,
  } = billingData;

  const finalDate =
    appointmentDate || date || "30 Aug 2026";

  const [billing, setBilling] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(
      "Billing Slip appointmentId:",
      appointmentId
    );

    console.log(
      "Billing Slip data:",
      billingData
    );

    if (!appointmentId) {
      console.error(
        "No appointmentId received!"
      );

      setError(
        "No appointment ID found."
      );

      setLoading(false);
      return;
    }

    fetch(
      `/api/billing/appointment/${appointmentId}`
    )
      .then((response) => {

        console.log(
          "Billing API response status:",
          response.status
        );

        if (!response.ok) {
          throw new Error(
            `Billing API returned ${response.status}`
          );
        }

        return response.json();
      })
      .then((data) => {

        console.log(
          "Billing details received:",
          data
        );

        setBilling(data);
        setLoading(false);
      })
      .catch((error) => {

        console.error(
          "Billing details error:",
          error
        );

        setError(
          "Unable to load billing details."
        );

        setLoading(false);
      });

  }, [appointmentId]);

  // If billing page is opened directly
  if (!doctor || !time) {
    return (
      <div className="billing-page">

        <div className="billing-card">

          <h2>
            No appointment found
          </h2>

          <p>
            Please select a doctor and book an appointment first.
          </p>

          <button
            className="billing-home-btn"
            onClick={() => navigate("/doctors")}
          >
            Explore Doctors
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="billing-page">

      {/* Navigation */}
      <div className="billing-navbar">

        <button
          className="billing-back-button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="billing-logo">
          SmartCare
        </div>

      </div>

      {/* Main Container */}
      <div className="billing-container">

        <div className="billing-card">

          {/* Hospital Icon */}
          <div className="billing-icon">
            <Hospital size={42} />
          </div>

          {/* Heading */}
          <h1>
            SmartCare Hospital
          </h1>

          <p className="billing-subtitle">
            Appointment Billing Slip
          </p>

          {/* Appointment Number */}
          <div className="billing-appointment-number">

            <span>
              Appointment Number
            </span>

            <strong>
              {appointmentNumber ||
                `APT-${appointmentId || "0000"}`}
            </strong>

          </div>

          {/* Appointment Details */}
          <div className="billing-section">

            <h2>
              Appointment Details
            </h2>

            <div className="billing-row">

              <span>
                Doctor
              </span>

              <strong>
                {doctor}
              </strong>

            </div>

            <div className="billing-row">

              <span>
                Specialization
              </span>

              <strong>
                {specialization}
              </strong>

            </div>

            <div className="billing-row">

              <span>
                Date
              </span>

              <strong>
                {finalDate}
              </strong>

            </div>

            <div className="billing-row">

              <span>
                Time
              </span>

              <strong>
                {time}
              </strong>

            </div>

          </div>

          {/* Billing Details */}
          <div className="billing-section">

            <h2>
              Billing Details
            </h2>

            {loading && (
              <p>
                Loading billing details...
              </p>
            )}

            {error && (
              <p style={{ color: "red" }}>
                {error}
              </p>
            )}

            {!loading &&
              !error &&
              billing && (
                <>
                  <div className="billing-row">

                    <span>
                      Consultation Fee
                    </span>

                    <strong>
                      ₹{billing.consultationFee}
                    </strong>

                  </div>

                  <div className="billing-total">

                    <span>
                      Total Amount
                    </span>

                    <strong>
                      ₹{billing.totalAmount}
                    </strong>

                  </div>
                </>
              )}

          </div>

          {/* Payment Status */}
          <div className="payment-pending">

            <div className="payment-icon">
              <CheckCircle size={28} />
            </div>

            <div>

              <h3>
                {billing?.paymentStatus === "PAID"
                  ? "Payment Completed"
                  : "Payment Pending"}
              </h3>

              <p>
                {billing?.paymentStatus === "PAID"
                  ? "Your consultation payment has been completed."
                  : "Please pay the consultation fee at the hospital billing counter before your consultation."}
              </p>

            </div>

          </div>

          {/* Buttons */}
          <div className="billing-actions">

            <button
              className="print-billing-btn"
              onClick={() => window.print()}
            >
              <Printer size={19} />
              Print Billing Slip
            </button>

            <button
              className="billing-home-btn"
              onClick={() => navigate("/home")}
            >
              Back to Home
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BillingSlip;