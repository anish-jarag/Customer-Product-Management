import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "user",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/auth/register",
        {
          name: formData.email,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: formData.role,
        }
      );

      if (response.status === 200 || response.status === 201) {
        if (formData.role === "user") {
          navigate("/landingPage");
        } else if (formData.role === "admin" || formData.role === "manager") {
          navigate("/dashboardPage");
        }
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to left, #f5f5dc, #d2b48c)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: "24rem",
          borderRadius: "1rem",
          backgroundColor: "#fff8dc",
        }}
      >
        <h3 className="text-center mb-4 text-brown">Sign Up</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-brown w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
