// server/routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
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

    // Generate JWT token (expire in 1 hour)
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

module.exports = router;
