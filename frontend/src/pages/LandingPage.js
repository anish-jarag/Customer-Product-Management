import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaSearch, FaShoppingCart, FaCog } from "react-icons/fa"; // Added FaCog

const LandingPage = () => {
  return (
    <div style={{ background: "#f5f5dc", minHeight: "100vh" }}>
      {/* Header/Navbar */}
      <nav
        className="navbar navbar-expand-lg shadow"
        style={{ backgroundColor: "#fff8e1", padding: "1rem" }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <Link
            className="navbar-brand"
            to="/"
            style={{
              fontFamily: "cursive",
              color: "#6b4226",
              fontSize: "1.8rem",
            }}
          >
            ShopiTech
          </Link>

          <div className="d-flex gap-4">
            <Link className="nav-link" to="/shop" style={{ color: "#6b4226" }}>
              Shop All
            </Link>
            <Link
              className="nav-link"
              to="/mobiles"
              style={{ color: "#6b4226" }}
            >
              Mobiles
            </Link>
            <Link
              className="nav-link"
              to="/accessories"
              style={{ color: "#6b4226" }}
            >
              Accessories
            </Link>
            <Link className="nav-link" to="/about" style={{ color: "#6b4226" }}>
              About Us
            </Link>
          </div>

          <div className="d-flex gap-3">
            <Link
              to="/profile"
              style={{ color: "#6b4226", fontSize: "1.5rem" }}
            >
              <FaUserCircle />
            </Link>
            <Link to="/search" style={{ color: "#6b4226", fontSize: "1.5rem" }}>
              <FaSearch />
            </Link>
            <Link to="/cart" style={{ color: "#6b4226", fontSize: "1.5rem" }}>
              <FaShoppingCart />
            </Link>
            <Link
              to="/settings"
              style={{ color: "#6b4226", fontSize: "1.5rem" }}
            >
              <FaCog />
            </Link>{" "}
            {/* New Settings Icon */}
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
