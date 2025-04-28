const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("../models/userModel"); // You will need these functions in the model
const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
      },
    };

    jwt.sign(payload, "secretOrKey", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({
        success: true,
        token: `Bearer ${token}`,
        user,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Register Route
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  // console.log(name, email, password, role);

  try {
    // Check if user already exists
    const user = await findUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
      role: role || "Viewer",
    });

    // Generate JWT token
    const payload = {
      user: {
        id: newUser._id,
        role: newUser.role,
        email: newUser.email,
      },
    };

    jwt.sign(payload, "secretOrKey", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.status(201).json({
        success: true,
        token: `Bearer ${token}`,
        user: newUser,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
