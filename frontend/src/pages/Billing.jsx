import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Billing() {
  const patientId = 1;

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/billing")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bills");
        }

        return response.json();
      })
      .then((data) => {
        const patientBills = data.filter(
          (bill) => bill.patientId === patientId
        );

        setBills(patientBills);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Billing error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-page">

      <nav className="dashboard-navbar">

        <Link to="/home" className="logo">
          ♡ SmartCare
        </Link>

        <Link to="/patient-dashboard">
          Back to Dashboard
        </Link>

      </nav>

      <main className="dashboard-container">

        <div className="dashboard-heading">
          <div>
            <p className="dashboard-label">
              BILLING
            </p>

            <h1>Hospital Bills</h1>

            <p>
              View your consultation and payment details.
            </p>
          </div>
        </div>

        {loading ? (
          <p>Loading bills...</p>
        ) : bills.length === 0 ? (
          <div className="dashboard-section">
            <h2>No Bills Found</h2>
            <p>
              You currently have no billing records.
            </p>
          </div>
        ) : (
          <div className="dashboard-section">

            <div className="section-heading">
              <h2>Your Bills</h2>
            </div>

            {bills.map((bill) => (
              <div
                className="appointment-dashboard-card"
                key={bill.id}
              >

                <div className="appointment-doctor-icon">
                  💳
                </div>

                <div className="appointment-main">

                  <h3>
                    Appointment #{bill.appointmentId}
                  </h3>

                  <p>
                    Consultation Fee: ₹
                    {bill.consultationFee}
                  </p>

                  <p>
                    Total Amount: ₹
                    {bill.totalAmount}
                  </p>

                </div>

                <div className="confirmed-badge">
                  ● {bill.paymentStatus}
                </div>

              </div>
            ))}

          </div>
        )}

      </main>

    </div>
  );
}

export default Billing;