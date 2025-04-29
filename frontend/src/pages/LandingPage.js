import React from "react";
import { FaUserCircle, FaSearch, FaShoppingCart, FaCog } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div style={{ background: "#f5f5dc", minHeight: "100vh" }}>
      {/* Header/Navbar */}
      <nav
        className="navbar navbar-expand-lg shadow"
        style={{ backgroundColor: "#fff8e1", padding: "1rem" }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <div
            className="navbar-brand"
            style={{
              fontFamily: "cursive",
              color: "#6b4226",
              fontSize: "1.8rem",
              cursor: "default",
            }}
          >
            ShopiTech
          </div>

          <div className="d-flex gap-4">
            <span
              className="nav-link"
              style={{ color: "#6b4226", cursor: "default" }}
            >
              Shop All
            </span>
            <span
              className="nav-link"
              style={{ color: "#6b4226", cursor: "default" }}
            >
              Mobiles
            </span>
            <span
              className="nav-link"
              style={{ color: "#6b4226", cursor: "default" }}
            >
              Accessories
            </span>
            <span
              className="nav-link"
              style={{ color: "#6b4226", cursor: "default" }}
            >
              About Us
            </span>
          </div>

          <div className="d-flex gap-3">
            <span
              style={{
                color: "#6b4226",
                fontSize: "1.5rem",
                cursor: "default",
              }}
            >
              <FaUserCircle />
            </span>
            <span
              style={{
                color: "#6b4226",
                fontSize: "1.5rem",
                cursor: "default",
              }}
            >
              <FaSearch />
            </span>
            <span
              style={{
                color: "#6b4226",
                fontSize: "1.5rem",
                cursor: "default",
              }}
            >
              <FaShoppingCart />
            </span>
            <span
              style={{
                color: "#6b4226",
                fontSize: "1.5rem",
                cursor: "default",
              }}
            >
              <FaCog />
            </span>
          </div>
        </div>
      </nav>

      {/* Body Section */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "70vh" }}
      >
        <h1 style={{ color: "#6b4226", fontSize: "3rem" }}>
          Welcome to ShopiTech
        </h1>
      </div>

      {/* Footer */}
      <footer
        className="text-center p-4"
        style={{ backgroundColor: "#fff8e1", color: "#6b4226" }}
      >
        <p>Contact us: +91 9876543210</p>
        <p>Email: support@shopitech.com</p>
        <p>Address: Kolhapur, Maharashtra, India</p>
      </footer>
    </div>
  );
};

export default LandingPage;
