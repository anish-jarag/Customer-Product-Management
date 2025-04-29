import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Navbar */}
      <Navbar expand="lg" style={{ backgroundColor: "#4B5563" }} variant="dark">
        <Container>
          <Navbar.Brand className="fw-bold fs-3" style={{ color: "#E5E7EB" }}>
            Admin Panel
          </Navbar.Brand>
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

      {/* Main Dashboard Content */}
      <Container className="flex-grow-1 py-5">
        <h2 className="text-center mb-4" style={{ color: "#4B5563" }}>
          Welcome to Admin Panel
        </h2>
        <Row className="g-4">
          <Col md={3}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <h5 style={{ color: "#4B5563" }}>Revenue</h5>
                <h3>$153,000</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <h5 style={{ color: "#4B5563" }}>Sales</h5>
                <h3>20</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <h5 style={{ color: "#4B5563" }}>Customers</h5>
                <h3>20</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <h5 style={{ color: "#4B5563" }}>Employees</h5>
                <h3>20</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer
        className="text-center py-3"
        style={{ backgroundColor: "#4B5563", color: "#E5E7EB" }}
      >
        © 2025 Shopitech
      </footer>
    </div>
  );
};

export default AdminDashboard;
