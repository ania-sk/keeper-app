import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import App from "../App";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/REGISTER" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
