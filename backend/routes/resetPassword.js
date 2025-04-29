const express = require("express");
const bcrypt = require("bcryptjs");
const { findUserByResetToken, updatePassword } = require("../models/userModel");
const router = express.Router();

router.post("/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const user = await findUserByResetToken(token);
  if (!user || !user.resetTokenExpiry || new Date() > new Date(user.resetTokenExpiry)) {
    return res.status(400).json({ message: "Invalid or expired reset token" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await updatePassword(user.email, hashedPassword);

  res.status(200).json({ message: "Password has been reset successfully" });
});

module.exports = router;
