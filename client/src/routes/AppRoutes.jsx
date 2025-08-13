import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import App from "../App";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("accessToken"));
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

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
