// src/pages/products/ProductList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

// Build a nested tree from category-path strings
function buildCategoryTree(products) {
  const root = {};
  products.forEach((p) => {
    if (!p.category) return;
    const parts = p.category.split(">").map((s) => s.trim());
    let node = root;
    parts.forEach((part) => {
      node[part] = node[part] || { __products: [] };
      node = node[part];
    });
    node.__products.push(p);
  });
  return root;
}

// Render tree recursively
const CategoryNode = ({ name, node, level, onSelect, selected }) => {
  const [open, setOpen] = useState(true);
  const hasChildren = Object.keys(node).some((k) => k !== "__products");

  return (
    <div style={{ marginLeft: level * 10 }}>
      <div
        style={{
          cursor: "pointer",
          fontWeight: selected === name ? "bold" : "normal",
        }}
        onClick={() => onSelect(name)}
      >
        {hasChildren && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setOpen((o) => !o);
            }}
          >
            [{open ? "−" : "+"}]
          </span>
        )}{" "}
        {name} ({node.__products.length})
      </div>
      {open &&
        hasChildren &&
        Object.entries(node)
          .filter(([k]) => k !== "__products")
          .map(([childName, childNode]) => (
            <CategoryNode
              key={childName}
              name={childName}
              node={childNode}
              level={level + 1}
              onSelect={onSelect}
              selected={selected}
            />
          ))}
    </div>
  );
};

const ProductList = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filterCat, setFilterCat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const tree = buildCategoryTree(products);
  const displayed = filterCat
    ? products.filter((p) =>
        p.category
          .split(">")
          .map((s) => s.trim())
          .includes(filterCat)
      )
    : products;

  if (loading) return <p className="mt-5 text-center">Loading products…</p>;

  return (
    <div className="d-flex">
      {/* Sidebar Tree */}
      <div
        className="p-3"
        style={{ width: 250, borderRight: "1px solid #ddd" }}
      >
        <h5>Categories</h5>
        <div>
          <div
            style={{
              cursor: "pointer",
              fontWeight: filterCat === null ? "bold" : "normal",
            }}
            onClick={() => setFilterCat(null)}
          >
            All ({products.length})
          </div>
          {Object.entries(tree).map(([name, node]) => (
            <CategoryNode
              key={name}
              name={name}
              node={node}
              level={0}
              onSelect={setFilterCat}
              selected={filterCat}
            />
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-3 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Products {filterCat && `> ${filterCat}`}</h3>
          {(user.role === "Admin" || user.role === "Manager") && (
            <Link
              to={`/${user.role.toLowerCase()}/products/create`}
              className="btn btn-primary"
            >
              + New Product
            </Link>
          )}
        </div>

        {displayed.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="row">
            {displayed.map((p) => (
              <div className="col-md-4 mb-4" key={p._id}>
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text flex-grow-1">{p.description}</p>
                    <p>
                      <small className="text-muted">
                        Code: {p.productCode}
                        <br />
                        Published: {p.isPublished ? "Yes" : "No"}
                      </small>
                    </p>
                    <Link
                      to={`/products/${p._id}`}
                      className="btn btn-sm btn-outline-primary mt-auto"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
