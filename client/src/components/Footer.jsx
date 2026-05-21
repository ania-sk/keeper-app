import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year} Ania-Sk</p>
      <div className="footer-links">
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        <span className="footer-separator">·</span>
        <a href="/terms" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </a>
      </div>
    </footer>
  );
}

export default Footer;
