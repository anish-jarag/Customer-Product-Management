import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #f5f5dc, #d2b48c)",
      }}
    >
      <div
        className="card p-4 shadow"
        style={{
          width: "350px",
          backgroundColor: "#fff8e1",
          borderRadius: "15px",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#6b4226" }}>
          Forgot Password
        </h2>
        <form>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#6b4226" }}>
              Enter your email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="example@example.com"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ backgroundColor: "#6b4226", border: "none" }}
          >
            Send Reset Link
          </button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/" style={{ color: "#6b4226", textDecoration: "none" }}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
