// routes/resetPassword.js
const express = require("express");
const bcrypt = require("bcryptjs");
const { findUserByResetToken, updatePassword } = require("../models/userModel");
const router = express.Router();

// @route   POST /api/reset-password/:token
// @desc    Reset user password using token
// @access  Public
router.post("/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  // Check if the reset token exists and is valid
  const user = await findUserByResetToken(token);
  if (!user) {
    return res.status(400).json({ message: "Invalid or expired reset token" });
  }

  // Check if the reset token has expired
  const currentTime = Date.now();
  if (currentTime > user.resetTokenExpiry) {
    return res.status(400).json({ message: "Reset token has expired" });
  }

  // Hash the new password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update the user's password and clear the reset token fields
  await updatePassword(user.email, hashedPassword);

  return res
    .status(200)
    .json({ message: "Password has been reset successfully" });
});

module.exports = router;
