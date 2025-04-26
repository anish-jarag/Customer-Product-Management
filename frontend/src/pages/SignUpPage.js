import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUp = () => {
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
        <form>
          <div className="form-group mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="form-group mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
            />
          </div>
          <div className="form-group mb-3">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group mb-4">
            <label>Role</label>
            <select className="form-control">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
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
