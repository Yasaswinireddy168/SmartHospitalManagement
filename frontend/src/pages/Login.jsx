import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phone || !password) {
      alert("Please enter phone number and password");
      return;
    }

    setLoading(true);

    const url =
      role === "patient"
        ? "http://localhost:8084/patients/login"
        : "http://localhost:8082/doctors/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid phone number or password");
      }

      const user = await response.json();

      // Store logged-in user information
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", role);

      if (role === "patient") {
        navigate("/patient-dashboard");
      } else {
        navigate("/doctor-dashboard");
      }
    } catch (error) {
      alert("Invalid phone number or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <Link to="/home" className="login-logo">
          ♡ SmartCare
        </Link>

        <div className="login-icon">
          🩺
        </div>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to manage your appointments and healthcare.
        </p>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Login As</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>

        </form>

        <p className="login-note">
          New patient or doctor?{" "}
          <Link to="/register" className="register-link">
            Register here
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;