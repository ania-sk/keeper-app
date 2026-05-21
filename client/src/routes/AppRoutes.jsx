import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import PrivacyPolicy from "../components/legal/PrivacyPolicy";
import TermsOfService from "../components/legal/TermsOfService";
import { useAuth } from "../context/AuthContext";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <App /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
