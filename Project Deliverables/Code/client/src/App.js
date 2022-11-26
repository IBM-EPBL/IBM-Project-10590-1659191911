import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import OtpAuth from "./components/OtpAuth";
import ForgotPassword from "./components/ForgotPassword";
import UserProfile from "./components/UserProfile";
import AdminDashboard from "./components/AdminDashboard";
import UserProtected from "./components/UserProtected";
import AdminProtected from "./components/AdminProtected";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <UserProtected>
                <Dashboard />
              </UserProtected>
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/otp-auth" element={<OtpAuth />} />
          <Route
            exact
            path="/user-details"
            element={
              <UserProtected>
                <UserDetails />
              </UserProtected>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/user-profile"
            element={
              <UserProtected>
                <UserProfile />
              </UserProtected>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <AdminProtected>
                <AdminDashboard />
              </AdminProtected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
