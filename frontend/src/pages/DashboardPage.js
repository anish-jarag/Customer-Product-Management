// AdminDashboard.js
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#f5f5dc" }}
    >
      <Navbar expand="lg" style={{ backgroundColor: "#a47551" }} variant="dark">
        <Container>
          <Navbar.Brand className="fw-bold fs-3">Admin Panel</Navbar.Brand>
          <Nav className="ms-auto">
            <Button
              variant="outline-light"
              className="me-3"
              onClick={() => navigate("/products")}
            >
              Products
            </Button>
            <Button
              variant="outline-light"
              className="me-3"
              onClick={() => navigate("/customers")}
            >
              Customers
            </Button>
            <Button
              variant="outline-light"
              onClick={() => navigate("/settings")}
            >
              Settings
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container
        className="flex-grow-1 d-flex justify-content-center align-items-center"
        style={{ color: "#5c4033" }}
      >
        <h1>Welcome to Admin Panel</h1>
      </Container>

      {/* Footer */}
      <footer
        className="bg-brown text-center py-3"
        style={{ backgroundColor: "#a47551", color: "white" }}
      >
        © 2025 Shopitech
      </footer>
    </div>
  );
};

export default AdminDashboard;
