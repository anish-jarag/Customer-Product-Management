import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Settings = ({ setTheme }) => {
  const { user } = useAuth();
  const [currentTheme, setCurrentTheme] = useState("light"); // Default theme
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/settings/theme",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setCurrentTheme(data.theme || "light"); // Set theme from backend
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching theme settings.");
        setLoading(false);
      }
    };

    fetchSettings();
  }, [user.token]);

  const handleThemeChange = async (newTheme) => {
    try {
      await axios.put(
        "http://localhost:5000/api/settings/theme",
        { theme: newTheme },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTheme(newTheme); // Update the theme in global state
      toast.success("Theme updated successfully!");
    } catch (error) {
      toast.error("Error updating theme.");
    }
  };

  if (loading) return <p>Loading settings...</p>;

  return (
    <div>
      <h3>Site Settings</h3>
      <div>
        <h5>Theme</h5>
        <button
          className={`btn ${
            currentTheme === "light" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleThemeChange("light")}
        >
          Light Theme
        </button>
        <button
          className={`btn ${
            currentTheme === "dark" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleThemeChange("dark")}
        >
          Dark Theme
        </button>
      </div>
    </div>
  );
};

export default Settings;
