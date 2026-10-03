import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSlot, setSelectedSlot] = useState("");

  const slots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
  ];

  useEffect(() => {
    fetch(`http://localhost:8082/doctors/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Doctor not found");
        }

        return response.json();
      })
      .then((data) => {
        setDoctor(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Doctor details error:", error);
        setError("Unable to load doctor details.");
        setLoading(false);
      });
  }, [id]);

  const handleBooking = () => {
    if (!selectedSlot || !doctor) {
      return;
    }

    navigate("/booking", {
      state: {
        doctorId: doctor.id,
        doctor: doctor.name,
        specialization: doctor.specialization,
        time: selectedSlot,
      },
    });
  };

  if (loading) {
    return (
      <div className="doctor-details-page">
        <p style={{ textAlign: "center", padding: "50px" }}>
          Loading doctor details...
        </p>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="doctor-details-page">
        <h1 style={{ textAlign: "center", padding: "50px" }}>
          Doctor not found
        </h1>
      </div>
    );
  }

  return (
    <div className="doctor-details-page">

      {/* Navbar */}
      <nav className="navbar">

        <Link to="/doctors" className="back-home">
          ← Back to Doctors
        </Link>

        <Link to="/" className="logo">
          ♡ SmartCare
        </Link>

      </nav>

      <div className="doctor-details-container">

        {/* Doctor Profile */}
        <div className="doctor-profile">

          <div className="large-doctor-avatar">
            🩺
          </div>

          <div className="doctor-info">

            <p className="section-label">
              DOCTOR PROFILE
            </p>

            <h1 className="doctor-name">
              {doctor.name}
            </h1>

            <p className="specialization">
              {doctor.specialization}
            </p>

            <p className="available-text">
              {doctor.available
                ? "● Available for appointments"
                : "● Currently unavailable"}
            </p>

          </div>

        </div>

        {/* Booking Section */}
        {doctor.available ? (
          <div className="booking-section">

            <h2>
              Choose an Available Time
            </h2>

            <p>
              Select a time slot for your appointment.
            </p>

            {/* Time Slots */}
            <div className="slot-grid">

              {slots.map((slot) => (

                <button
                  key={slot}
                  className={
                    selectedSlot === slot
                      ? "time-slot selected-slot"
                      : "time-slot"
                  }
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>

              ))}

            </div>

            {/* Selected Time */}
            {selectedSlot && (
              <div className="selected-info">
                Selected appointment time:{" "}
                <strong>
                  {selectedSlot}
                </strong>
              </div>
            )}

            {/* Confirm Button */}
            <button
              className="confirm-btn"
              disabled={!selectedSlot}
              onClick={handleBooking}
            >
              Confirm Appointment →
            </button>

          </div>
        ) : (
          <div className="booking-section">

            <h2>
              Doctor Currently Unavailable
            </h2>

            <p>
              This doctor is currently not accepting appointments.
              Please check again later.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default DoctorDetails;