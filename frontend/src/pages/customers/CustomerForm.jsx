import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const CustomerForm = () => {
  const { user } = useAuth();
  const { id } = useParams(); // If editing, id is defined
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(isEdit);

  // Fetch existing customer when editing
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/customers/${id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (err) {
        toast.error("Failed loading customer");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit, user, toast]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      if (isEdit) {
        await axios.put(
          `http://localhost:5000/api/customers/${id}`,
          formData,
          config
        );
        toast.success("Customer updated!");
      } else {
        await axios.post(
          "http://localhost:5000/api/customers",
          formData,
          config
        );
        toast.success("Customer created!");
      }
      navigate(`/${user.role.toLowerCase()}/customers`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h3 className="mb-4">{isEdit ? "Edit Customer" : "Create Customer"}</h3>
      <form onSubmit={handleSubmit} className="w-50">
        {["name", "email", "phone", "address"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              className="form-control"
              name={field}
              type={field === "email" ? "email" : "text"}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button className="btn btn-success" type="submit" disabled={loading}>
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
