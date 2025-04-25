import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./DashboardLayout.css"; // We'll write this next

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.className = dark
      ? "bg-dark text-white"
      : "bg-light text-dark";
  }, [dark]);

  const menuItems = {
    Admin: [
      { label: "Dashboard", path: "/admin" },
      { label: "Register User", path: "/admin/register" },
      { label: "Customers", path: "/admin/customers" },
      { label: "Products", path: "/admin/products" },
      { label: "Site Settings", path: "/admin/settings" },
    ],
    Manager: [
      { label: "Dashboard", path: "/manager" },
      { label: "Customers", path: "/manager/customers" },
      { label: "Products", path: "/manager/products" },
    ],
    Viewer: [
      { label: "Dashboard", path: "/viewer" },
      { label: "Customers", path: "/viewer/customers" },
    ],
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar p-3 ${dark ? "bg-secondary" : "bg-light"}`}>
        <h4 className="mb-4">CPM Panel</h4>
        <ul className="nav flex-column">
          {menuItems[user.role]?.map((item, idx) => (
            <li className="nav-item mb-2" key={idx}>
              <Link className="nav-link" to={item.path}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <button
            className="btn btn-outline-secondary w-100 mb-2"
            onClick={() => setDark(!dark)}
          >
            Toggle {dark ? "Light" : "Dark"} Theme
          </button>
          <button
            className="btn btn-danger w-100"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;
