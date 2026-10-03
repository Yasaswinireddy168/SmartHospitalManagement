import { Link } from "react-router-dom";
import {
  HeartPulse,
  UserRound,
  Stethoscope,
  ShieldCheck,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

import "./RoleSelection.css";

function RoleSelection() {
  return (
    <div className="role-page">

      {/* Navbar */}
      <nav className="role-navbar">
        <Link to="/" className="role-logo">
          <HeartPulse size={30} />
          <span>SmartCare</span>
        </Link>

        <Link to="/" className="back-home">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </nav>

      {/* Main Content */}
      <main className="role-content">

        <div className="role-heading">
          <span className="welcome-tag">
            WELCOME TO SMARTCARE
          </span>

          <h1>How would you like to continue?</h1>

          <p>
            Select your role to access your personalized
            healthcare dashboard.
          </p>
        </div>

        <div className="role-cards">

          {/* Patient */}
          <div className="role-card">
            <div className="role-icon patient-icon">
              <UserRound size={35} />
            </div>

            <h2>Patient</h2>

            <p>
              Book appointments, view appointment details,
              receive notifications and check your billing slip.
            </p>

            <button className="role-button">
              Continue as Patient
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Doctor */}
          <div className="role-card">
            <div className="role-icon doctor-role-icon">
              <Stethoscope size={35} />
            </div>

            <h2>Doctor</h2>

            <p>
              View today's appointments, manage your schedule,
              check patient details and update availability.
            </p>

            <button className="role-button">
              Continue as Doctor
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Admin */}
          <div className="role-card">
            <div className="role-icon admin-icon">
              <ShieldCheck size={35} />
            </div>

            <h2>Administrator</h2>

            <p>
              Monitor doctors, patients, appointments, billing
              and overall hospital activities.
            </p>

            <button className="role-button">
              Continue as Admin
              <ArrowRight size={18} />
            </button>
          </div>

        </div>

      </main>

    </div>
  );
}

export default RoleSelection;