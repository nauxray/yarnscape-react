import "./Footer.css";

import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-left">
        <Link to="/">
          <img src="/logos/logo2.svg" alt="logo" />
        </Link>
        &#169; 2022
      </div>
      <div className="footer-right">
        <Link to="/">
          <span>Search</span>
        </Link>
        <Link to="/add-yarn">
          <span>Add yarn</span>
        </Link>
        <Link to="/account">
          <span>Account</span>
        </Link>
      </div>
    </footer>
  );
}
