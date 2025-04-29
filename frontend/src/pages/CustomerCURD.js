import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const CustomerCRUD = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [sortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingCustomerId, setEditingCustomerId] = useState(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/customers`, {
        params: { page, limit, sortBy, order },
      });
      setCustomers(res.data);
    } catch (err) {
      console.error("Failed to fetch customers", err);
      setError("Failed to load customers. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, order, limit, sortBy]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    try {
      await axios.post("/api/customers", formData);
      setFormData({ name: "", address: "", email: "", phone: "" });
      fetchCustomers();
      setSuccessMessage("Customer added successfully!");
    } catch (err) {
      console.error(
        "Failed to add customer",
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || "Failed to add customer");
    }
  };

  const handleEditCustomer = (customer) => {
    setFormData({
      name: customer.name,
      address: customer.address,
      email: customer.email,
      phone: customer.phone,
    });
    setEditingCustomerId(customer._id);
    setIsEditing(true);
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    try {
      await axios.put(`/api/customers/${editingCustomerId}`, formData);
      setFormData({ name: "", address: "", email: "", phone: "" });
      setEditingCustomerId(null);
      setIsEditing(false);
      fetchCustomers();
      setSuccessMessage("Customer updated successfully!");
    } catch (err) {
      console.error(
        "Failed to update customer",
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || "Failed to update customer");
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    setError(null);
    try {
      await axios.delete(`/api/customers/${id}`);
      if (customers.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchCustomers();
      }
      setSuccessMessage("Customer deleted successfully!");
    } catch (err) {
      console.error(
        "Failed to delete customer",
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || "Failed to delete customer");
    }
  };

  const toggleSortOrder = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  if (loading) {
    return <div className="text-center mt-5">Loading customers...</div>;
  }

  return (
    <div
      className="container py-5"
      style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}
    >
      <h2 style={{ color: "#4B5563", fontWeight: "600", marginBottom: "24px" }}>
        Manage Customers
      </h2>

      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success text-dark" role="alert">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger text-dark" role="alert">
          {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={isEditing ? handleUpdateCustomer : handleAddCustomer}
        className="mb-4 p-4 border rounded"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#D1D5DB",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label
              htmlFor="name"
              className="form-label"
              style={{ color: "#4B5563" }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="form-control"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#4B5563",
                borderColor: "#D1D5DB",
              }}
            />
          </div>

          <div className="col-md-6">
            <label
              htmlFor="email"
              className="form-label"
              style={{ color: "#4B5563" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="form-control"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#4B5563",
                borderColor: "#D1D5DB",
              }}
            />
          </div>

          <div className="col-md-6">
            <label
              htmlFor="address"
              className="form-label"
              style={{ color: "#4B5563" }}
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="form-control"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#4B5563",
                borderColor: "#D1D5DB",
              }}
            />
          </div>

          <div className="col-md-6">
            <label
              htmlFor="phone"
              className="form-label"
              style={{ color: "#4B5563" }}
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="form-control"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#4B5563",
                borderColor: "#D1D5DB",
              }}
            />
          </div>

          <div className="col-12 d-flex gap-2">
            <button
              className="btn"
              style={{
                backgroundColor: "#4B5563",
                color: "#FFFFFF",
                borderColor: "#4B5563",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              {isEditing ? "Update Customer" : "Add Customer"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setIsEditing(false);
                  setEditingCustomerId(null);
                  setFormData({ name: "", address: "", email: "", phone: "" });
                }}
                style={{
                  borderColor: "#D1D5DB",
                  color: "#4B5563",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Sorting & Pagination */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-outline-dark"
          style={{
            borderColor: "#4B5563",
            color: "#4B5563",
          }}
          onClick={toggleSortOrder}
        >
          Sort by Date ({order === "asc" ? "↑ Oldest" : "↓ Newest"})
        </button>

        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-outline-dark"
            style={{
              borderColor: "#4B5563",
              color: "#4B5563",
            }}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span style={{ color: "#4B5563" }}>Page {page}</span>
          <button
            className="btn btn-outline-dark"
            style={{
              borderColor: "#4B5563",
              color: "#4B5563",
            }}
            onClick={() => setPage((p) => p + 1)}
            disabled={customers.length < limit}
          >
            Next
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover">
          <thead style={{ backgroundColor: "#4B5563", color: "#E5E7EB" }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone || "-"}</td>
                  <td>{customer.address || "-"}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm"
                        style={{
                          borderColor: "#FBBF24",
                          color: "#FBBF24",
                        }}
                        onClick={() => handleEditCustomer(customer)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{
                          borderColor: "#EF4444",
                          color: "#EF4444",
                        }}
                        onClick={() => handleDeleteCustomer(customer._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerCRUD;
