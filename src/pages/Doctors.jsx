import { Link } from "react-router-dom";

function Doctors() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "Cardiologist",
      icon: "❤️",
    },
    {
      id: 2,
      name: "Dr. Rahul Verma",
      specialization: "Neurologist",
      icon: "🧠",
    },
    {
      id: 3,
      name: "Dr. Anjali Reddy",
      specialization: "Dermatologist",
      icon: "✨",
    },
  ];

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

      {/* Doctor Cards */}
      <div className="doctors-grid">
        {doctors.map((doctor) => (
          <div className="doctor-card" key={doctor.id}>

            <div className="doctor-icon">
              {doctor.icon}
            </div>

            <h3>{doctor.name}</h3>

            <p className="doctor-specialization">
              {doctor.specialization}
            </p>

            <div className="doctor-divider"></div>

            <p className="doctor-status">
              ● Available for appointments
            </p>

            <Link to={`/doctor/${doctor.id}`}>
              <button className="book-doctor-btn">
                Book Appointment →
              </button>
            </Link>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Doctors;