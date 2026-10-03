import { Link } from "react-router-dom";
import {
  Activity,
  CalendarDays,
  Stethoscope,
  Users,
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  Clock
} from "lucide-react";

function Home() {
  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">
          <HeartPulse size={30} />
          <span>SmartCare</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
        </div>

        <Link to="/doctors" className="secondary-btn">
          Explore Doctors
        </Link>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">

          <div className="tag">
            <Activity size={18} />
            Smart Healthcare Management
          </div>

          <h1>
            Healthcare Made
            <span> Smarter & Simpler.</span>
          </h1>

          <p>
            Book appointments, manage your healthcare, receive notifications,
            and connect with doctors through one smart hospital platform.
          </p>

          <div className="hero-buttons">

            <Link to="/login" className="primary-btn">
              Book Appointment
              <ArrowRight size={18} />
            </Link>

            <Link to="/doctors" className="secondary-btn">
              Explore Doctors
            </Link>

          </div>
        </div>

        <div className="hero-card">

          <div className="appointment-card">
            <div className="card-header">
              <div>
                <p>Upcoming Appointment</p>
                <h3>Dr. Priya Sharma</h3>
              </div>

              <div className="doctor-icon">
                <Stethoscope size={25} />
              </div>
            </div>

            <div className="appointment-info">
              <div>
                <CalendarDays size={18} />
                <span>30 Aug 2026</span>
              </div>

              <div>
                <Clock size={18} />
                <span>10:30 AM</span>
              </div>
            </div>

            <div className="status">
              ● Confirmed
            </div>
          </div>

          <div className="floating-card doctors">
            <Users size={22} />

            <div>
              <strong>48+</strong>
              <span>Doctors Available</span>
            </div>
          </div>

        </div>
      </section>

      <section className="features" id="services">

        <div className="section-title">
          <span>OUR FEATURES</span>

          <h2>Everything You Need in One Place</h2>

          <p>
            A smarter way to manage patients, doctors,
            appointments and billing.
          </p>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">
              <CalendarDays />
            </div>

            <h3>Easy Appointments</h3>

            <p>
              Find doctors, check availability and book
              appointments instantly.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <ShieldCheck />
            </div>

            <h3>Smart Management</h3>

            <p>
              Doctors, patients and administrators stay
              connected automatically.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <HeartPulse />
            </div>

            <h3>Billing Made Simple</h3>

            <p>
              Receive your billing slip after booking and
              conveniently pay at the hospital.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;