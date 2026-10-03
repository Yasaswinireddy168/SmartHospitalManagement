import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

function ChangePassword() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (!user || !user.id || !role) {
      setError("User session not found. Please login again.");
      return;
    }

    const endpoint =
      role === "doctor"
        ? `http://localhost:8082/doctors/${user.id}/change-password`
        : `http://localhost:8084/patients/${user.id}/change-password`;

    try {
      setLoading(true);

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password.");
      }

      setMessage("Password changed successfully!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (role === "doctor") {
      navigate("/doctor-dashboard");
    } else {
      navigate("/patient-dashboard");
    }
  };

  return (
    <div className="change-password-page">

      <div className="change-password-card">

        <button
          className="back-button"
          onClick={handleBack}
        >
          ← Back to Dashboard
        </button>

        <div className="change-password-icon">
          🔐
        </div>

        <h1>Change Password</h1>

        <p className="change-password-subtitle">
          Update your account password securely
        </p>

        <form onSubmit={handleChangePassword}>

          <div className="password-field">
            <label>Current Password</label>

            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
            />
          </div>

          <div className="password-field">
            <label>New Password</label>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
            />
          </div>

          <div className="password-field">
            <label>Confirm New Password</label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>

          {error && (
            <div className="password-error">
              ⚠️ {error}
            </div>
          )}

          {message && (
            <div className="password-success">
              ✓ {message}
            </div>
          )}

          <button
            type="submit"
            className="change-password-button"
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default ChangePassword;