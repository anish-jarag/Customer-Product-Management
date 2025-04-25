import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const RegisterUser = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Viewer",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register", // Adjust URL as needed
        formData,
        config
      );

      setMessage(`User ${data.email} created successfully!`);
      setError(null);
      setFormData({ name: "", email: "", password: "", role: "Viewer" });
    } catch (err) {
      setError(err.response?.data?.message || "Error creating user");
      setMessage(null);
    }
  };

  return (
    <div className="container">
      <h3 className="mb-4">Register New User</h3>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label>Name</label>
          <input
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            name="email"
            value={formData.email}
            type="email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            className="form-control"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Role</label>
          <select
            name="role"
            className="form-select"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          Register User
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
