import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);

    setFormData({
      name: "",
      specialization: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (role === "doctor" && !formData.specialization) {
      alert("Please enter specialization");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    let url;
    let requestBody;

    if (role === "patient") {
      url = "http://localhost:8084/patients";

      requestBody = {
        name: formData.name,
        age: 0,
        gender: "",
        phone: formData.phone,
        email: formData.email,
        address: "",
        password: formData.password,
      };
    } else {
      url = "http://localhost:8082/doctors";

      requestBody = {
        name: formData.name,
        specialization: formData.specialization,
        phone: formData.phone,
        email: formData.email,
        availability: "10:00 AM - 2:00 PM",
        available: true,
        password: formData.password,
      };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error("Phone number may already be registered");
        }

        throw new Error("Registration failed");
      }

      alert("Registration successful! Please login.");

      navigate("/login");

    } catch (error) {
      console.error("Registration error:", error);

      alert(
        error.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card register-card">

        <Link to="/home" className="login-logo">
          ♡ SmartCare
        </Link>

        <div className="login-icon">
          🏥
        </div>

        <h1>Create Account</h1>

        <p className="login-subtitle">
          Register to book and manage your hospital appointments.
        </p>

        <form onSubmit={handleRegister}>

          <div className="form-group">
            <label>Register As</label>

            <select
              value={role}
              onChange={handleRoleChange}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {role === "doctor" && (
            <div className="form-group">
              <label>Specialization</label>

              <input
                type="text"
                name="specialization"
                placeholder="e.g. Cardiologist"
                value={formData.specialization}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account →"}
          </button>

        </form>

        <p className="login-note">
          Already have an account?{" "}
          <Link to="/login" className="register-link">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;