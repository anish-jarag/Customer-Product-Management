import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerCRUD = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [sortBy] = useState("createdAt");
  const [order, setOrder] = useState("descending");
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/customers`, {
          params: { page, limit, sortBy, order },
        });
        setCustomers(res.data);
      } catch (err) {
        console.error("Failed to fetch customers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [page, order, limit, sortBy]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/customers`, {
        params: { page, limit, sortBy, order },
      });
      setCustomers(res.data);
    } catch (err) {
      console.error("Failed to fetch customers", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/customers", formData);
      setFormData({ name: "", address: "", email: "", phone: "" });
      fetchCustomers();
    } catch (err) {
      console.error("Failed to add customer", err);
    }
  };

  const handleEditCustomer = (customer) => {
    setFormData({
      name: customer.name,
      address: customer.address,
      email: customer.email,
      phone: customer.phone,
    });
    setSelectedCustomer(customer);
    setIsEditing(true);
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/customers/${selectedCustomer._id}`, formData);
      setFormData({ name: "", address: "", email: "", phone: "" });
      setSelectedCustomer(null);
      setIsEditing(false);
      fetchCustomers();
    } catch (err) {
      console.error("Failed to update customer", err);
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;
    try {
      await axios.delete(`/api/customers/${id}`);
      fetchCustomers();
    } catch (err) {
      console.error("Failed to delete customer", err);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const res = await axios.get(`/api/customers/${id}`);
      setSelectedCustomer(res.data);
    } catch (err) {
      console.error("Failed to get customer details", err);
    }
  };

  const toggleSortOrder = () => {
    setOrder(order === "ascending" ? "descending" : "ascending");
  };

  if (loading) {
    return <div className="text-center mt-5">Loading customers...</div>;
  }

  return (
    <div>
      <h2 style={{ color: "#6b4226" }}>Manage Customers</h2>

      {/* Add / Edit Form */}
      <form
        onSubmit={isEditing ? handleUpdateCustomer : handleAddCustomer}
        className="mb-4"
      >
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="form-control mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="form-control mb-2"
        />
        <button className="btn btn-success">
          {isEditing ? "Update" : "Add"} Customer
        </button>
      </form>

      {/* Sorting Button */}
      <div className="mb-3">
        <button className="btn btn-secondary" onClick={toggleSortOrder}>
          Sort by Created At ({order})
        </button>
      </div>

      {/* Customers Table */}
      <div className="table-responsive">
        <table
          className="table table-bordered"
          style={{ backgroundColor: "#f5f5dc" }}
        >
          <thead
            className="thead-light"
            style={{ backgroundColor: "#ffffff", color: "#6b4226" }}
          >
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => handleViewDetails(customer._id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditCustomer(customer)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteCustomer(customer._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-primary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          className="btn btn-primary"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && !isEditing && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Customer Details</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setSelectedCustomer(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Name:</strong> {selectedCustomer.name}
                </p>
                <p>
                  <strong>Address:</strong> {selectedCustomer.address}
                </p>
                <p>
                  <strong>Email:</strong> {selectedCustomer.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedCustomer.phone}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedCustomer.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedCustomer(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerCRUD;
