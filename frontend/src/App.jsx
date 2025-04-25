import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import RegisterUser from "./pages/admin/RegisterUser";
import CustomerList from "./pages/customers/CustomerList";
import CustomerDetail from "./pages/customers/CustomerDetail";
import CustomerForm from "./pages/customers/CustomerForm";
import "./app.css";
import Settings from "./pages/admin/Settings";
import ProductList from "./pages/products/ProductList";
import ProductForm from "./pages/products/ProductForm";
import ProductDetail from "./pages/products/ProductDetail";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/landing" element={<h1>Landing Page</h1>} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <DashboardLayout>
                <h2>Welcome Admin</h2>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <DashboardLayout>
                <Settings /> {/* Add Settings page here */}
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/register"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <DashboardLayout>
                <RegisterUser />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/customers"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <DashboardLayout>
                <CustomerList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/customers/create"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <DashboardLayout>
                <CustomerForm />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Manager Routes */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute roles={["Admin", "Manager"]}>
              <DashboardLayout>
                <h2>Manager Dashboard</h2>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/customers"
          element={
            <ProtectedRoute roles={["Admin", "Manager"]}>
              <DashboardLayout>
                <CustomerList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/customers/create"
          element={
            <ProtectedRoute roles={["Manager"]}>
              <DashboardLayout>
                <CustomerForm />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Viewer Routes */}
        <Route
          path="/viewer"
          element={
            <ProtectedRoute roles={["Admin", "Manager", "Viewer"]}>
              <DashboardLayout>
                <h2>Viewer Dashboard</h2>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/viewer/customers"
          element={
            <ProtectedRoute roles={["Admin", "Manager", "Viewer"]}>
              <DashboardLayout>
                <CustomerList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Customer Details */}
        <Route
          path="/customers/:id"
          element={
            <ProtectedRoute roles={["Admin", "Manager", "Viewer"]}>
              <DashboardLayout>
                <CustomerDetail />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Product Management */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute roles={["Admin", "Manager"]}>
              <DashboardLayout>
                <ProductList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/products"
          element={
            <ProtectedRoute roles={["Manager"]}>
              <DashboardLayout>
                <ProductList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/create"
          element={
            <ProtectedRoute roles={["Admin", "Manager"]}>
              <DashboardLayout>
                <ProductForm />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/:id/edit"
          element={
            <ProtectedRoute roles={["Admin", "Manager"]}>
              <DashboardLayout>
                <ProductForm />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute roles={["Admin", "Manager", "Viewer"]}>
              <DashboardLayout>
                <ProductDetail />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Product Management */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute roles={["Admin", "Manager"]}>
              <DashboardLayout>
                <ProductList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/products"
          element={
            <ProtectedRoute roles={["Manager"]}>
              <DashboardLayout>
                <ProductList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/create"
          element={
            <ProtectedRoute roles={["Admin", "Manager"]}>
              <DashboardLayout>
                <ProductForm />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/:id/edit"
          element={
            <ProtectedRoute roles={["Admin", "Manager"]}>
              <DashboardLayout>
                <ProductForm />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute roles={["Admin", "Manager", "Viewer"]}>
              <DashboardLayout>
                <ProductDetail />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<h2>403 - Unauthorized</h2>} />
      </Routes>

      {/* Toast Notifications */}
      <ToastContainer />
    </Router>
  );
}

export default App;
