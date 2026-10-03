import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorDashboard.css";

function DoctorDashboard() {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  // ================================
  // LOAD APPOINTMENTS
  // ================================

  const loadAppointments = async (
    doctorId,
    showRefresh = false
  ) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(
        `/api/appointments/doctor/${doctorId}/date/${today}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();

      setAppointments(data);

    } catch (error) {
      console.error(
        "Doctor dashboard error:",
        error
      );

      setError("Unable to load appointments.");

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ================================
  // LOAD LOGGED-IN DOCTOR
  // ================================

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    if (!storedUser || storedRole !== "doctor") {
      navigate("/login");
      return;
    }

    try {
      const loggedInDoctor =
        JSON.parse(storedUser);

      setDoctor(loggedInDoctor);

      loadAppointments(loggedInDoctor.id);

    } catch (error) {
      console.error(
        "User data error:",
        error
      );

      navigate("/login");
    }
  }, [navigate]);

  // ================================
  // COMPLETE APPOINTMENT
  // ================================

  const completeAppointment = async (
    appointmentId
  ) => {
    const appointment = appointments.find(
      (item) => item.id === appointmentId
    );

    if (!appointment) return;

    const confirmComplete = window.confirm(
      "Are you sure you want to mark this appointment as completed?"
    );

    if (!confirmComplete) {
      return;
    }

    try {
      const response = await fetch(
        `/api/appointments/${appointmentId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            patientId:
              appointment.patientId,

            doctorId:
              appointment.doctorId,

            appointmentDate:
              appointment.appointmentDate,

            appointmentTime:
              appointment.appointmentTime,

            status: "COMPLETED",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to complete appointment"
        );
      }

      setAppointments(
        (currentAppointments) =>
          currentAppointments.map(
            (item) =>
              item.id === appointmentId
                ? {
                    ...item,
                    status: "COMPLETED",
                  }
                : item
          )
      );

      alert(
        "Appointment completed successfully."
      );

    } catch (error) {
      console.error(
        "Complete appointment error:",
        error
      );

      alert(
        "Unable to complete appointment."
      );
    }
  };

  // ================================
  // CANCEL APPOINTMENT
  // ================================

  const cancelAppointment = async (
    appointmentId
  ) => {
    const confirmCancel =
      window.confirm(
        "Are you sure you want to cancel this appointment?\n\nThe patient will be notified."
      );

    if (!confirmCancel) {
      return;
    }

    try {
      const response = await fetch(
        `/api/appointments/${appointmentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to cancel appointment"
        );
      }

      setAppointments(
        (currentAppointments) =>
          currentAppointments.map(
            (appointment) =>
              appointment.id === appointmentId
                ? {
                    ...appointment,
                    status: "CANCELLED",
                  }
                : appointment
          )
      );

      alert(
        "Appointment cancelled successfully.\n\nThe patient has been notified."
      );

    } catch (error) {
      console.error(
        "Cancel appointment error:",
        error
      );

      alert(
        "Unable to cancel appointment. Please try again."
      );
    }
  };

  // ================================
  // LOGOUT
  // ================================

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  };

  // ================================
  // LOADING
  // ================================

  if (!doctor && loading) {
    return (
      <div className="doctor-loading">

        <div className="loading-spinner"></div>

        <p>
          Loading dashboard...
        </p>

      </div>
    );
  }

  if (!doctor) {
    return null;
  }

  // ================================
  // APPOINTMENT COUNTS
  // ================================

  const pendingAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "BOOKED"
    );

  const completedAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "COMPLETED"
    );

  const cancelledAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "CANCELLED"
    );

  return (
    <div className="doctor-dashboard-page">

      {/* ================================
          NAVBAR
      ================================= */}

      <nav className="doctor-navbar">

        <div
          className="doctor-logo"
          onClick={() =>
            navigate("/home")
          }
        >
          ♡ <span>SmartCare</span>
        </div>

        <div className="doctor-nav-actions">

          <button
            className="doctor-nav-btn"
            onClick={() =>
              navigate("/home")
            }
          >
            Home
          </button>

          <button
            className="doctor-nav-btn"
            onClick={() =>
              navigate("/notifications")
            }
          >
            Notifications
          </button>

          <button
            className="doctor-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>


      {/* ================================
          MAIN CONTENT
      ================================= */}

      <main className="doctor-dashboard-container">

        {/* ================================
            DOCTOR PROFILE
        ================================= */}

        <section className="doctor-welcome">

          <div className="doctor-profile">

            <div className="doctor-avatar">
              👨‍⚕️
            </div>

            <div className="doctor-welcome-text">

              <span className="doctor-section-tag">
                DOCTOR DASHBOARD
              </span>

              <h1>
                Welcome,{" "}
                <span>
                  {doctor.name}
                </span>
              </h1>

              <p>
                {doctor.specialization}
              </p>

              <div className="doctor-availability">

                <span className="availability-dot"></span>

                Available for appointments

              </div>

            </div>

          </div>

        </section>


        {/* ================================
            STATISTICS
        ================================= */}

        <section className="doctor-stats">

          <div className="doctor-stat-card">

            <div className="stat-icon calendar-icon">
              📅
            </div>

            <div>

              <span className="stat-label">
                Today's Appointments
              </span>

              <strong>
                {
                  appointments.filter(
                    (appointment) =>
                      appointment.status ===
                        "BOOKED" ||
                      appointment.status ===
                        "COMPLETED"
                  ).length
                }
              </strong>

              <small>
                Scheduled today
              </small>

            </div>

          </div>


          <div className="doctor-stat-card">

            <div className="stat-icon pending-icon">
              ⏳
            </div>

            <div>

              <span className="stat-label">
                Pending
              </span>

              <strong>
                {pendingAppointments.length}
              </strong>

              <small>
                Awaiting consultation
              </small>

            </div>

          </div>


          <div className="doctor-stat-card">

            <div className="stat-icon completed-icon">
              ✓
            </div>

            <div>

              <span className="stat-label">
                Completed
              </span>

              <strong>
                {completedAppointments.length}
              </strong>

              <small>
                Consultations completed
              </small>

            </div>

          </div>

        </section>


        {/* ================================
            QUICK ACTIONS
        ================================= */}

        <section className="quick-actions">

          {/* HOME */}

          <button
            onClick={() =>
              navigate("/home")
            }
            className="quick-action-card"
          >

            <span>🏠</span>

            <div>

              <strong>
                Home
              </strong>

              <small>
                Back to SmartCare
              </small>

            </div>

            <b>→</b>

          </button>


          {/* NOTIFICATIONS */}

          <button
            onClick={() =>
              navigate("/notifications")
            }
            className="quick-action-card"
          >

            <span>🔔</span>

            <div>

              <strong>
                Notifications
              </strong>

              <small>
                View latest updates
              </small>

            </div>

            <b>→</b>

          </button>


          {/* REFRESH */}

          <button
            onClick={() =>
              doctor &&
              loadAppointments(
                doctor.id,
                true
              )
            }
            className="quick-action-card"
          >

            <span>↻</span>

            <div>

              <strong>
                Refresh Schedule
              </strong>

              <small>
                Get latest appointments
              </small>

            </div>

            <b>→</b>

          </button>


          {/* CHANGE PASSWORD */}

          <button
            onClick={() =>
              navigate("/change-password")
            }
            className="quick-action-card"
          >

            <span>🔐</span>

            <div>

              <strong>
                Change Password
              </strong>

              <small>
                Update your account password
              </small>

            </div>

            <b>→</b>

          </button>

        </section>


        {/* ================================
            APPOINTMENTS
        ================================= */}

        <section className="appointments-section">

          <div className="appointments-header">

            <div>

              <span className="doctor-section-tag">
                TODAY'S SCHEDULE
              </span>

              <h2>
                Today's Appointments
              </h2>

              <p>
                Manage your scheduled patient consultations.
              </p>

            </div>

            <button
              className="refresh-btn"
              onClick={() =>
                doctor &&
                loadAppointments(
                  doctor.id,
                  true
                )
              }
              disabled={refreshing}
            >
              {refreshing
                ? "Refreshing..."
                : "↻ Refresh"}
            </button>

          </div>


          {/* LOADING */}

          {loading && (

            <div className="appointment-message">

              <div className="loading-spinner"></div>

              <p>
                Loading appointments...
              </p>

            </div>

          )}


          {/* ERROR */}

          {!loading && error && (

            <div className="appointment-error">

              <span>⚠️</span>

              <div>

                <strong>
                  Unable to load appointments
                </strong>

                <p>
                  {error}
                </p>

              </div>

            </div>

          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            appointments.length === 0 && (

              <div className="empty-appointments">

                <div className="empty-icon">
                  📅
                </div>

                <h3>
                  No appointments today
                </h3>

                <p>
                  Your schedule is clear.
                  New appointments will appear here.
                </p>

              </div>

            )}


          {/* APPOINTMENT LIST */}

          {!loading &&
            !error &&
            appointments.length > 0 && (

              <div className="appointments-list">

                {appointments.map(
                  (appointment) => (

                    <div
                      className="doctor-appointment-card"
                      key={appointment.id}
                    >

                      {/* TIME */}

                      <div className="appointment-time-box">

                        <span>
                          TIME
                        </span>

                        <strong>
                          {appointment.appointmentTime}
                        </strong>

                        <small>
                          Today
                        </small>

                      </div>


                      {/* PATIENT */}

                      <div className="appointment-patient">

                        <div className="patient-avatar">
                          👤
                        </div>

                        <div>

                          <span className="patient-label">
                            PATIENT
                          </span>

                          <h3>
                            Patient #
                            {appointment.patientId}
                          </h3>

                          <p>
                            Appointment ID #
                            {appointment.id}
                          </p>

                        </div>

                      </div>


                      {/* STATUS */}

                      <div className="appointment-status">

                        {appointment.status ===
                        "BOOKED" ? (

                          <span className="status-booked">
                            ● Booked
                          </span>

                        ) : appointment.status ===
                          "COMPLETED" ? (

                          <span className="status-completed">
                            ✓ Completed
                          </span>

                        ) : (

                          <span className="status-cancelled">
                            ✕ Cancelled
                          </span>

                        )}

                      </div>


                      {/* ACTIONS */}

                      <div className="appointment-action">

                        {appointment.status ===
                        "BOOKED" ? (

                          <div className="doctor-appointment-actions">

                            <button
                              className="complete-appointment-btn"
                              onClick={() =>
                                completeAppointment(
                                  appointment.id
                                )
                              }
                            >
                              ✓ Complete
                            </button>

                            <button
                              className="cancel-doctor-appointment-btn"
                              onClick={() =>
                                cancelAppointment(
                                  appointment.id
                                )
                              }
                            >
                              ✕ Cancel
                            </button>

                          </div>

                        ) : appointment.status ===
                          "CANCELLED" ? (

                          <span className="cancelled-text">
                            ✕ Cancelled
                          </span>

                        ) : (

                          <span className="completed-text">
                            ✓ Completed
                          </span>

                        )}

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

        </section>

      </main>

    </div>
  );
}

export default DoctorDashboard;