import { Link } from "react-router-dom";

function PatientDashboard() {
  return (
    <div className="dashboard-page">

      <nav className="dashboard-navbar">

        <Link to="/home" className="logo">
          ♡ SmartCare
        </Link>

        <div className="dashboard-user">
          <span>Welcome, Patient</span>

          <Link to="/home">
            Logout
          </Link>
        </div>

      </nav>

      <main className="dashboard-container">

        <div className="dashboard-heading">
          <div>
            <p className="dashboard-label">
              PATIENT DASHBOARD
            </p>

            <h1>Good morning 👋</h1>

            <p>
              Manage your appointments and healthcare easily.
            </p>
          </div>

          <Link to="/doctors">
            <button className="primary-btn">
              + Book Appointment
            </button>
          </Link>
        </div>


        <div className="dashboard-cards">

          <div className="dashboard-card">
            <span>📅</span>
            <div>
              <strong>1</strong>
              <p>Upcoming Appointment</p>
            </div>
          </div>

          <div className="dashboard-card">
            <span>✅</span>
            <div>
              <strong>3</strong>
              <p>Completed Visits</p>
            </div>
          </div>

          <div className="dashboard-card">
            <span>💳</span>
            <div>
              <strong>1</strong>
              <p>Pending Bills</p>
            </div>
          </div>

        </div>


        <section className="dashboard-section">

          <div className="section-heading">
            <h2>Upcoming Appointment</h2>

            <Link to="/doctors">
              Book another
            </Link>
          </div>

          <div className="appointment-dashboard-card">

            <div className="appointment-doctor-icon">
              🩺
            </div>

            <div className="appointment-main">

              <h3>Dr. Priya Sharma</h3>

              <p>Cardiologist</p>

              <div className="appointment-meta">
                <span>📅 30 Aug 2026</span>
                <span>🕐 10:30 AM</span>
              </div>

            </div>

            <div className="confirmed-badge">
              ● Confirmed
            </div>

          </div>

        </section>


        <section className="dashboard-section">

          <div className="section-heading">
            <h2>Quick Actions</h2>
          </div>

          <div className="quick-actions">

            <Link to="/doctors" className="action-card">
              <span>👨‍⚕️</span>
              <h3>Find a Doctor</h3>
              <p>Explore doctors and specialties</p>
            </Link>

            <div className="action-card">
              <span>📄</span>
              <h3>Billing</h3>
              <p>View your hospital bills</p>
            </div>

            <div className="action-card">
              <span>🔔</span>
              <h3>Notifications</h3>
              <p>Check appointment updates</p>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default PatientDashboard;