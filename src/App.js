import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import MentorDashboard from "./components/MentorDashboard";
import AuthContext, { AuthProvider } from "./context/AuthContext";

const App = () => {
  const { auth, restoreAuth } = useContext(AuthContext);

  useEffect(() => {
    restoreAuth(); // Restore authentication state from localStorage on app load
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={!auth ? <Login /> : <Navigate to="/dashboard" />}
        />

        {/* Mentor Dashboard */}
        <Route
          path="/dashboard"
          element={auth ? <MentorDashboard /> : <Navigate to="/login" />}
        />

        {/* Fallback Route */}
        <Route
          path="*"
          element={<Navigate to={auth ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
