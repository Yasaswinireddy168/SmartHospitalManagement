import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8082/doctors")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        return response.json();
      })
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setError("Unable to load doctors. Please try again.");
        setLoading(false);
      });
  }, []);

  // Choose an icon based on specialization
  const getDoctorIcon = (specialization) => {
    if (!specialization) return "👨‍⚕️";

    const specialty = specialization.toLowerCase();

    if (specialty.includes("cardio")) return "❤️";
    if (specialty.includes("neuro")) return "🧠";
    if (specialty.includes("derma")) return "✨";

    return "👨‍⚕️";
  };

  return (
    <div className="doctors-page">

      {/* Navbar */}
      <nav className="navbar">
        <Link to="/home" className="logo">
          ♡ SmartCare
        </Link>

        <div className="doctor-nav-buttons">
          <Link to="/home">
            <button className="nav-home-btn">
              Home
            </button>
          </Link>

          <Link to="/login">
            <button className="login-btn">
              Book Appointment
            </button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="doctors-header">
        <span className="section-tag">OUR SPECIALISTS</span>

        <h1>
          Meet Our <span>Doctors</span>
        </h1>

        <p>
          Choose the right specialist and book your appointment
          easily with SmartCare.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <p style={{ textAlign: "center" }}>
          Loading doctors...
        </p>
      )}

      {/* Error */}
      {error && (
        <p
          style={{
            textAlign: "center",
            color: "red",
          }}
        >
          {error}
        </p>
      )}

      {/* Doctor Cards */}
      {!loading && !error && (
        <div className="doctors-grid">

          {doctors.length === 0 ? (
            <p>No doctors available at the moment.</p>
          ) : (
            doctors.map((doctor) => (
              <div className="doctor-card" key={doctor.id}>

                <div className="doctor-icon">
                  {getDoctorIcon(doctor.specialization)}
                </div>

                <h3>{doctor.name}</h3>

                <p className="doctor-specialization">
                  {doctor.specialization}
                </p>

                <div className="doctor-divider"></div>

                <p className="doctor-status">
                  {doctor.available
                    ? "● Available for appointments"
                    : "● Currently unavailable"}
                </p>

                <Link to={`/doctor/${doctor.id}`}>
                  <button
                    className="book-doctor-btn"
                    disabled={!doctor.available}
                  >
                    {doctor.available
                      ? "Book Appointment →"
                      : "Currently Unavailable"}
                  </button>
                </Link>

              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
}

export default Doctors;