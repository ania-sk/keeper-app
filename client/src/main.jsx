import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import AppRoutes from "./rutes/AppRoutes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
