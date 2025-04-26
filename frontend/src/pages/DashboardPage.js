import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaBoxOpen } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("customers");

  return (
    <div style={{ background: "#f5f5dc", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg shadow"
        style={{ backgroundColor: "#fff8e1", padding: "1rem" }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <Link
            className="navbar-brand"
            to="/admin"
            style={{
              fontFamily: "cursive",
              color: "#6b4226",
              fontSize: "1.8rem",
            }}
          >
            Admin Panel
          </Link>

          <div className="d-flex gap-4">
            <button
              className="btn"
              style={{
                backgroundColor:
                  activeTab === "customers" ? "#6b4226" : "#fff8e1",
                color: activeTab === "customers" ? "#fff8e1" : "#6b4226",
                border: "1px solid #6b4226",
              }}
              onClick={() => setActiveTab("customers")}
            >
              <FaUsers style={{ marginRight: "5px" }} />
              Customers
            </button>

            <button
              className="btn"
              style={{
                backgroundColor:
                  activeTab === "products" ? "#6b4226" : "#fff8e1",
                color: activeTab === "products" ? "#fff8e1" : "#6b4226",
                border: "1px solid #6b4226",
              }}
              onClick={() => setActiveTab("products")}
            >
              <FaBoxOpen style={{ marginRight: "5px" }} />
              Products
            </button>
          </div>
        </div>
      </nav>

      {/* Body */}
      <div className="container mt-5">
        {activeTab === "customers" && <CustomerCRUD />}
        {activeTab === "products" && <ProductCRUD />}
      </div>

      {/* Footer */}
      <footer
        className="text-center p-4 mt-5"
        style={{ backgroundColor: "#fff8e1", color: "#6b4226" }}
      >
        <p>Admin Panel | ShopiTech</p>
      </footer>
    </div>
  );
};

const CustomerCRUD = () => {
  return (
    <div>
      <h2 style={{ color: "#6b4226" }}>Manage Customers</h2>
      <div className="my-4">
        <button className="btn btn-success m-2">Add Customer</button>
        <button className="btn btn-primary m-2">Edit Customer</button>
        <button className="btn btn-warning m-2">Update Customer</button>
        <button className="btn btn-danger m-2">Delete Customer</button>
      </div>
      <div className="table-responsive">
        <table
          className="table table-bordered"
          style={{ backgroundColor: "#fff8e1" }}
        >
          <thead className="table-light">
            <tr style={{ color: "#6b4226" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy Row */}
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>9876543210</td>
              <td>
                <button className="btn btn-primary btn-sm m-1">Edit</button>
                <button className="btn btn-danger btn-sm m-1">Delete</button>
              </td>
            </tr>
            {/* More rows dynamically later */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProductCRUD = () => {
  return (
    <div>
      <h2 style={{ color: "#6b4226" }}>Manage Products</h2>
      <div className="my-4">
        <button className="btn btn-success m-2">Add Product</button>
        <button className="btn btn-primary m-2">Edit Product</button>
        <button className="btn btn-warning m-2">Update Product</button>
        <button className="btn btn-danger m-2">Delete Product</button>
      </div>
      <div className="table-responsive">
        <table
          className="table table-bordered"
          style={{ backgroundColor: "#fff8e1" }}
        >
          <thead className="table-light">
            <tr style={{ color: "#6b4226" }}>
              <th>ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy Row */}
            <tr>
              <td>101</td>
              <td>iPhone 14</td>
              <td>₹79,999</td>
              <td>15</td>
              <td>
                <button className="btn btn-primary btn-sm m-1">Edit</button>
                <button className="btn btn-danger btn-sm m-1">Delete</button>
              </td>
            </tr>
            {/* More rows dynamically later */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
