import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const CustomerDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/customers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setCustomer(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching customer details");
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id, user]);

  if (loading) return <p>Loading customer details...</p>;

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h3 className="mb-4">Customer Details</h3>
      {customer && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{customer.name}</h5>
            <p>
              <strong>Email:</strong> {customer.email}
            </p>
            <p>
              <strong>Phone:</strong> {customer.phone}
            </p>
            <p>
              <strong>Address:</strong> {customer.address}
            </p>

            {/* Admin Role: Show edit button */}
            {user.role === "Admin" && (
              <Link
                to={`/admin/customers/${customer._id}/edit`}
                className="btn btn-warning"
              >
                Edit Customer
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDetail;
