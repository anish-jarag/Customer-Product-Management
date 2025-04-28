// routes/forgotPassword.js
const express = require("express");
const { findUserByEmail, saveResetToken } = require("../models/userModel");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// @route   POST /api/forgot-password
// @desc    Handle forgot password
// @access  Public
router.post("/", async (req, res) => {
  const { email } = req.body;
  console.log("Forgot password request for:", email);

  // Check if the email is provided
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Find the user by email
  const user = await findUserByEmail(email);
  if (!user) {
    return res
      .status(404)
      .json({ message: "Email not found. Please register first." });
  }

  // Generate reset token and expiration time (1 hour)
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = Date.now() + 60 * 60 * 1000;

  // Save the reset token and its expiry to the database
  await saveResetToken(email, resetToken, resetTokenExpiry);

  // Create a reset link to be sent to the user's email
  const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

  // Setup nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "your-email@gmail.com", // <-- Change this
      pass: "your-email-password", // <-- Change this
    },
  });

  // Email content
  const mailOptions = {
    from: '"Your App Name" <your-email@gmail.com>',
    to: email,
    subject: "Password Reset Request",
    html: `
      <p>You requested a password reset.</p>
      <p>Click this link to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 1 hour.</p>
    `,
  };

  // Try sending the reset email
  try {
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ message: "Reset link sent to your email address!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Failed to send reset email. Try again later." });
  }
});

module.exports = router;
