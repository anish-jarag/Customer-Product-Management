// routes/forgotPassword.js
const express = require("express");
const router = express.Router();

// Dummy users database for example
const users = [
  { email: "testuser@example.com" },
  { email: "john.doe@example.com" },
];

// @route   POST /api/forgot-password
// @desc    Handle forgot password
// @access  Public
router.post("/", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res
      .status(404)
      .json({ message: "Email not found. Please register first." });
  }

  // Here you would usually generate a token and send an email.

  return res
    .status(200)
    .json({ message: "Reset link sent to your email address!" });
});

module.exports = router;
