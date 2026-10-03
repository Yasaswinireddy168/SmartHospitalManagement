import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/DoctorDetails";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import BillingSlip from "./pages/BillingSlip";
import DoctorDashboard from "./pages/DoctorDashboard";
import Billing from "./pages/Billing";
import Notifications from "./pages/Notifications";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/home" />}
        />
        <Route
  path="/notifications"
  element={<Notifications />}
/>
<Route path="/change-password" element={<ChangePassword />} />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/doctors"
          element={<Doctors />}
        />

        <Route
          path="/doctor/:id"
          element={<DoctorDetails />}
        />

        <Route
          path="/booking"
          element={<Booking />}
        />

        <Route
          path="/billing-slip"
          element={<BillingSlip />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/patient-dashboard"
          element={<PatientDashboard />}
        />

        <Route
          path="/doctor-dashboard"
          element={<DoctorDashboard />}
        />

        <Route
          path="/billing"
          element={<Billing />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;