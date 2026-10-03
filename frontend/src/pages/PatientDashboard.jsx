import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function PatientDashboard() {
  const navigate = useNavigate();

  const patientId = 1;

  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [appointmentsResponse, billingResponse] =
        await Promise.all([
          fetch(`/api/appointments`),
          fetch(`/api/billing`),
        ]);

      if (!appointmentsResponse.ok) {
        throw new Error("Failed to fetch appointments");
      }

      if (!billingResponse.ok) {
        throw new Error("Failed to fetch billing");
      }

      const appointmentData =
        await appointmentsResponse.json();

      const billingData =
        await billingResponse.json();

      const patientAppointments =
        appointmentData.filter(
          (appointment) =>
            appointment.patientId === patientId
        );

      const patientBills =
        billingData.filter(
          (bill) =>
            bill.patientId === patientId
        );

      setAppointments(patientAppointments);
      setBills(patientBills);

    } catch (error) {
      console.error(
        "Patient dashboard error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // CANCEL APPOINTMENT
  // ================================

  const cancelAppointment = async (appointmentId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      setCancelling(true);

      const response = await fetch(
        `/api/appointments/${appointmentId}/cancel`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel appointment");
      }

      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment.id === appointmentId
            ? {
                ...appointment,
                status: "CANCELLED",
              }
            : appointment
        )
      );

      alert("Appointment cancelled successfully.");

    } catch (error) {
      console.error(
        "Cancel appointment error:",
        error
      );

      alert(
        "Unable to cancel appointment. Please try again."
      );

    } finally {
      setCancelling(false);
    }
  };

  // ================================
  // APPOINTMENTS
  // ================================

  const upcomingAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "BOOKED" &&
        appointment.appointmentDate >= today
    );

  const completedAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "COMPLETED"
    );

  const pendingBills =
    bills.filter(
      (bill) =>
        bill.paymentStatus === "PENDING"
    );

  const upcomingAppointment =
    upcomingAppointments.length > 0
      ? [...upcomingAppointments].sort(
          (a, b) =>
            `${a.appointmentDate}T${a.appointmentTime}`.localeCompare(
              `${b.appointmentDate}T${b.appointmentTime}`
            )
        )[0]
      : null;

  // ================================
  // FORMAT DATE
  // ================================

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(
      `${dateString}T00:00:00`
    );

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ================================
  // FORMAT TIME
  // ================================

  const formatTime = (timeString) => {
    if (!timeString) return "";

    const [hours, minutes] =
      timeString.split(":");

    const date = new Date();

    date.setHours(
      Number(hours),
      Number(minutes),
      0,
      0
    );

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ================================
  // DOCTOR DETAILS
  // ================================

  const getDoctorName = (doctorId) => {
    if (doctorId === 1) {
      return "Dr. Priya Sharma";
    }

    if (doctorId === 2) {
      return "Dr. Rahul Verma";
    }

    if (doctorId === 3) {
      return "Yasaswini";
    }

    return `Doctor ${doctorId}`;
  };

  const getDoctorSpecialization = (doctorId) => {
    if (doctorId === 1) {
      return "Cardiologist";
    }

    if (doctorId === 2) {
      return "Neurologist";
    }

    if (doctorId === 3) {
      return "Dermatologist";
    }

    return "Specialist";
  };

  return (
    <div className="dashboard-page">

      {/* ================================
          NAVBAR
      ================================= */}

      <nav className="dashboard-navbar">

        <Link
          to="/home"
          className="logo"
        >
          ♡ SmartCare
        </Link>

        <div className="dashboard-user">

          <span>
            Welcome, Patient
          </span>

          <Link to="/home">
            Logout
          </Link>

        </div>

      </nav>


      {/* ================================
          MAIN CONTENT
      ================================= */}

      <main className="dashboard-container">

        {/* ================================
            HEADER
        ================================= */}

        <div className="dashboard-heading">

          <div>

            <p className="dashboard-label">
              PATIENT DASHBOARD
            </p>

            <h1>
              Good morning 👋
            </h1>

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


        {/* ================================
            DASHBOARD CARDS
        ================================= */}

        <div className="dashboard-cards">

          <div className="dashboard-card">

            <span>📅</span>

            <div>

              <strong>
                {loading
                  ? "..."
                  : upcomingAppointments.length}
              </strong>

              <p>
                Upcoming Appointment
              </p>

            </div>

          </div>


          <div className="dashboard-card">

            <span>✅</span>

            <div>

              <strong>
                {loading
                  ? "..."
                  : completedAppointments.length}
              </strong>

              <p>
                Completed Visits
              </p>

            </div>

          </div>


          <div className="dashboard-card">

            <span>💳</span>

            <div>

              <strong>
                {loading
                  ? "..."
                  : pendingBills.length}
              </strong>

              <p>
                Pending Bills
              </p>

            </div>

          </div>

        </div>


        {/* ================================
            UPCOMING APPOINTMENT
        ================================= */}

        <section className="dashboard-section">

          <div className="section-heading">

            <h2>
              Upcoming Appointment
            </h2>

            <Link to="/doctors">
              Book another
            </Link>

          </div>


          {loading ? (

            <div className="appointment-dashboard-card">

              <div className="appointment-main">

                <h3>
                  Loading appointment...
                </h3>

              </div>

            </div>

          ) : upcomingAppointment ? (

            <div className="appointment-dashboard-card">

              <div className="appointment-doctor-icon">
                🩺
              </div>


              <div className="appointment-main">

                <h3>
                  {getDoctorName(
                    upcomingAppointment.doctorId
                  )}
                </h3>

                <p>
                  {getDoctorSpecialization(
                    upcomingAppointment.doctorId
                  )}
                </p>


                <div className="appointment-meta">

                  <span>
                    📅{" "}
                    {formatDate(
                      upcomingAppointment.appointmentDate
                    )}
                  </span>

                  <span>
                    🕐{" "}
                    {formatTime(
                      upcomingAppointment.appointmentTime
                    )}
                  </span>

                </div>

              </div>


              <div className="appointment-actions">

                <div className="confirmed-badge">
                  ● Confirmed
                </div>

                <button
                  className="cancel-appointment-btn"
                  onClick={() =>
                    cancelAppointment(
                      upcomingAppointment.id
                    )
                  }
                  disabled={cancelling}
                >
                  {cancelling
                    ? "Cancelling..."
                    : "Cancel Appointment"}
                </button>

              </div>

            </div>

          ) : (

            <div className="appointment-dashboard-card">

              <div className="appointment-doctor-icon">
                📅
              </div>

              <div className="appointment-main">

                <h3>
                  No Upcoming Appointment
                </h3>

                <p>
                  You don't have any upcoming appointments.
                </p>

              </div>

              <Link to="/doctors">

                <button className="primary-btn">
                  Book Now
                </button>

              </Link>

            </div>

          )}

        </section>


        {/* ================================
            QUICK ACTIONS
        ================================= */}

        <section className="dashboard-section">

          <div className="section-heading">

            <h2>
              Quick Actions
            </h2>

          </div>


          <div className="quick-actions">

            <Link
              to="/doctors"
              className="action-card"
            >

              <span>👨‍⚕️</span>

              <h3>
                Find a Doctor
              </h3>

              <p>
                Explore doctors and specialties
              </p>

            </Link>


            <Link
              to="/billing"
              className="action-card"
            >

              <span>📄</span>

              <h3>
                Billing
              </h3>

              <p>
                {pendingBills.length > 0
                  ? `${pendingBills.length} pending bill${
                      pendingBills.length > 1
                        ? "s"
                        : ""
                    }`
                  : "No pending bills"}
              </p>

            </Link>


            <Link
              to="/notifications"
              className="action-card"
            >

              <span>🔔</span>

              <h3>
                Notifications
              </h3>

              <p>
                Check appointment updates
              </p>

            </Link>


            {/* CHANGE PASSWORD */}

            <button
              className="action-card"
              onClick={() =>
                navigate("/change-password")
              }
            >

              <span>🔐</span>

              <h3>
                Change Password
              </h3>

              <p>
                Update your account password
              </p>

            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default PatientDashboard;