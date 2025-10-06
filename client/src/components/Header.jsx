import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { userName } = useAuth();

  const hideLogoutButton =
    location.pathname === "/login" || location.pathname === "/register";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header>
      <h1>
        <HighlightIcon />
        Keeper
      </h1>
      {!hideLogoutButton && (
        <div className="welcome-header-container">
          <div>
            <p>Welcome, {userName}!</p>
          </div>
          <button onClick={handleLogout} className="btn-loggout">
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
