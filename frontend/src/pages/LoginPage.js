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
      // Login user and get the token
      const { token } = await loginUser(email, password);

      if (token) {
        localStorage.setItem("token", token);

        const decoded = jwtDecode(token);
        const userRole = decoded.user.role;

        console.log(decoded);

        if (userRole === "admin") {
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
        background: "linear-gradient(to right, #f5f5dc, #d2b48c)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: "22rem",
          borderRadius: "1rem",
          backgroundColor: "#fff8dc",
        }}
      >
        <h3 className="text-center mb-4 text-brown">Login</h3>

        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

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
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <a href="/forgot-password" className="small text-brown">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="btn btn-brown w-100 mb-2">
            Login
          </button>
          <p className="text-center small mt-2">
            New user?{" "}
            <a href="/signup" className="text-brown">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
