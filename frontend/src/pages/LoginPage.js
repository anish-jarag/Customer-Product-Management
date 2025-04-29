import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginUser(email, password);
      if (token) {
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        const userRole = decoded.user.role;
        if (userRole === "admin" || userRole === "manager") {
          navigate("/DashboardPage");
        } else {
          navigate("/LandingPage");
        }
      } else {
        setError("No token received. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #F3F4F6,rgba(194, 172, 172, 0.71) 60%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: "24rem",
          borderRadius: "1rem",
          backgroundColor: "#4B5563",
          color: "#E5E7EB",
        }}
      >
        <h3 className="text-center mb-4">Login</h3>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                backgroundColor: "#FFFFFF",
                color: "#4B5563",
              }}
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                backgroundColor: "#FFFFFF",
                color: "#4B5563",
              }}
            />
          </div>

          <div className="d-flex justify-content-end mb-3">
            <a
              href="/forgot-password"
              style={{ color: "#E5E7EB", fontSize: "0.9rem" }}
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="btn w-100 mb-2"
            style={{
              backgroundColor: "#E5E7EB",
              color: "#4B5563",
              fontWeight: "600",
              border: "none",
            }}
          >
            Login
          </button>

          <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
            New user?{" "}
            <a
              href="/signup"
              style={{ color: "#E5E7EB", textDecoration: "underline" }}
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
