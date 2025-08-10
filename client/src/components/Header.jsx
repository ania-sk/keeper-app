import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }

  return (
    <header>
      <h1>
        <HighlightIcon />
        Keeper
      </h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}

export default Header;
