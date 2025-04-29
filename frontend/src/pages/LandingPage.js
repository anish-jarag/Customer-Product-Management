import React from "react";
import { FaUserCircle, FaSearch, FaShoppingCart, FaCog } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div
      style={{
        background: "#FFFFFF",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg shadow-sm"
        style={{
          backgroundColor: "#4B5563",
          padding: "1rem 2rem",
        }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <div
            className="navbar-brand"
            style={{
              color: "#E5E7EB",
              fontSize: "2rem",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            ShopiTech
          </div>

          <div className="d-flex gap-4">
            {["Shop All", "Mobiles", "Accessories", "About Us"].map(
              (item, index) => (
                <span
                  key={index}
                  className="nav-link"
                  style={{
                    color: "#E5E7EB",
                    fontSize: "1rem",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </span>
              )
            )}
          </div>

          <div className="d-flex gap-3">
            {[FaUserCircle, FaSearch, FaShoppingCart, FaCog].map(
              (Icon, idx) => (
                <span
                  key={idx}
                  style={{
                    color: "#E5E7EB",
                    fontSize: "1.4rem",
                    cursor: "pointer",
                  }}
                >
                  <Icon />
                </span>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="d-flex align-items-center justify-content-center text-center"
        style={{ height: "68vh", padding: "2rem" }}
      >
        <div>
          <h1
            style={{ color: "#4B5563", fontSize: "3rem", fontWeight: "bold" }}
          >
            Welcome to ShopiTech
          </h1>
          <p
            style={{ color: "#6B7280", fontSize: "1.25rem", marginTop: "1rem" }}
          >
            Your one-stop tech store – Explore gadgets, accessories, and more.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="text-center"
        style={{
          backgroundColor: "#4B5563",
          color: "#E5E7EB",
          padding: "1.5rem 1rem",
        }}
      >
        <p className="mb-1">📞 +91 9876543210</p>
        <p className="mb-1">📧 support@shopitech.com</p>
        <p>📍 Kolhapur, Maharashtra, India</p>
      </footer>
    </div>
  );
};

export default LandingPage;
