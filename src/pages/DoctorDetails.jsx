import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctors = {
    1: {
      name: "Dr. Priya Sharma",
      specialization: "Cardiologist",
    },
    2: {
      name: "Dr. Rahul Verma",
      specialization: "Neurologist",
    },
    3: {
      name: "Dr. Anjali Reddy",
      specialization: "Dermatologist",
    },
  };

  const doctor = doctors[id];

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

  if (!doctor) {
    return <h1>Doctor not found</h1>;
  }

  const handleBooking = () => {
    if (!selectedSlot) return;

    navigate("/booking", {
      state: {
        doctor: doctor.name,
        specialization: doctor.specialization,
        time: selectedSlot,
      },
    });
  };

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
          <div className="large-doctor-avatar">🩺</div>

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
              ● Available for appointments
            </p>
          </div>
        </div>


        {/* Booking Section */}
        <div className="booking-section">

          <h2>Choose an Available Time</h2>

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
              <strong>{selectedSlot}</strong>
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

      </div>

    </div>
  );
}

export default DoctorDetails;