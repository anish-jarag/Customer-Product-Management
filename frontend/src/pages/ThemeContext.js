import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setTheme(data.theme || "light");
      } catch (err) {
        console.error("Failed to fetch theme", err);
      }
    };
    fetchTheme();
  }, []);

  const toggleTheme = async (newTheme) => {
    try {
      setTheme(newTheme);
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: newTheme }),
      });
    } catch (err) {
      console.error("Failed to update theme", err);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
