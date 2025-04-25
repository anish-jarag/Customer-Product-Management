// src/pages/products/ProductForm.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const ProductForm = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    productCode: "",
    description: "",
    isPublished: false,
    category: "",
  });
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    axios
      .get(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setForm(res.data))
      .catch(() => toast.error("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id, isEdit, user, toast]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const cfg = { headers: { Authorization: `Bearer ${user.token}` } };
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/products/${id}`, form, cfg);
        toast.success("Product updated");
      } else {
        await axios.post("http://localhost:5000/api/products", form, cfg);
        toast.success("Product created");
      }
      navigate(`/${user.role.toLowerCase()}/products`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="mt-5 text-center">Loading…</p>;

  return (
    <div className="container mt-4">
      <h3>{isEdit ? "Edit Product" : "Create Product"}</h3>
      <form className="w-50" onSubmit={handleSubmit}>
        {["name", "productCode", "category"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              name={field}
              className="form-control"
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="isPublished"
            className="form-check-input"
            checked={form.isPublished}
            onChange={handleChange}
          />
          <label className="form-check-label">Published</label>
        </div>

        <button className="btn btn-success" disabled={loading}>
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
