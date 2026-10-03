import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Notifications() {
  const patientId = 1;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/notifications/patient/${patientId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        return response.json();
      })
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Notification error:", error);
        setLoading(false);
      });
  }, []);

  const markAsRead = async (id) => {
    try {
      const response = await fetch(
        `/api/notifications/${id}/read`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                status: "READ",
              }
            : notification
        )
      );
    } catch (error) {
      console.error("Mark as read error:", error);
    }
  };

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
              NOTIFICATIONS
            </p>

            <h1>Notifications</h1>

            <p>
              Check your appointment and healthcare updates.
            </p>
          </div>

        </div>

        {loading ? (
          <p>Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <div className="dashboard-section">
            <h2>No Notifications</h2>

            <p>
              You don't have any notifications yet.
            </p>
          </div>
        ) : (
          <div className="dashboard-section">

            <div className="section-heading">
              <h2>Your Notifications</h2>
            </div>

            {notifications.map((notification) => (
              <div
                className="appointment-dashboard-card"
                key={notification.id}
              >

                <div className="appointment-doctor-icon">
                  🔔
                </div>

                <div className="appointment-main">

                  <h3>
                    {notification.type}
                  </h3>

                  <p>
                    {notification.message}
                  </p>

                  <p>
                    {notification.createdAt}
                  </p>

                </div>

                <div>
                  {notification.status === "UNREAD" ? (
                    <button
                      className="primary-btn"
                      onClick={() =>
                        markAsRead(notification.id)
                      }
                    >
                      Mark as Read
                    </button>
                  ) : (
                    <span className="confirmed-badge">
                      ● READ
                    </span>
                  )}
                </div>

              </div>
            ))}

          </div>
        )}

      </main>

    </div>
  );
}

export default Notifications;