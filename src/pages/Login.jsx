import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Temporary frontend login
    // Later we will connect this to your backend
    navigate("/patient-dashboard");
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
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          >
            Login →
          </button>

        </form>

        <p className="login-note">
  New patient?{" "}
  <Link to="/register" className="register-link">
    Register here
  </Link>
</p>

      </div>

    </div>
  );
}

export default Login;