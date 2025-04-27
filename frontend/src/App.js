import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/DashboardPage";
import ProductDetails from "./pages/ProductDetailsPage";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCrud from "./pages/ProductCrud";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/DashboardPage" element={<AdminDashboard />} />
        <Route path="/products" element={<ProductCrud />} />
        <Route path="/ProductDetailsPage" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
