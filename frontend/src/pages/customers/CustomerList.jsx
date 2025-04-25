import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const CustomerList = () => {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/customers",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setCustomers(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [user]);

  useEffect(() => {
    const lower = search.toLowerCase();
    const filteredList = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.email?.toLowerCase().includes(lower)
    );
    setFiltered(filteredList);
    setPage(1); // reset to page 1 when search changes
  }, [search, customers]);

  const paginated = filtered.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filtered.length / limit);

  if (loading) return <p>Loading customers...</p>;

  return (
    <div className="container">
      <h3 className="mb-4">Customer List</h3>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          className="form-control w-50"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {(user.role === "Admin" || user.role === "Manager") && (
          <Link to={`/customers/create`} className="btn btn-primary">
            + Add New Customer
          </Link>
        )}
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th style={{ width: 100 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((cust) => (
            <tr key={cust._id}>
              <td>{cust.name}</td>
              <td>{cust.email}</td>
              <td>{cust.phone}</td>
              <td>{cust.address}</td>
              <td>
                <Link
                  to={`/customers/${cust._id}`}
                  className="btn btn-sm btn-info"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
          {paginated.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span>
          Showing {paginated.length} of {filtered.length} customers
        </span>
        <div>
          <button
            className="btn btn-secondary me-2"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <button
            className="btn btn-secondary"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
