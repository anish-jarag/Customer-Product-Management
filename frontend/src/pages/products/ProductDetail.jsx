// src/pages/products/ProductDetail.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProductDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setProduct(res.data))
      .catch(() => setError("Unable to load product"))
      .finally(() => setLoading(false));
  }, [id, user]);

  if (loading) return <p className="mt-5 text-center">Loading…</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h3>Product Details</h3>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{product.name}</h4>
          <p>
            <strong>Code:</strong> {product.productCode}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Published:</strong> {product.isPublished ? "Yes" : "No"}
          </p>
          {(user.role === "Admin" || user.role === "Manager") && (
            <Link
              to={`/${user.role.toLowerCase()}/products/${product._id}/edit`}
              className="btn btn-warning"
            >
              Edit Product
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
