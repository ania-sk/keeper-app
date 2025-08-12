import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function AppRoutes() {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <App /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
