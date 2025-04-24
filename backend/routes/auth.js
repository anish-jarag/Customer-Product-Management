const express = require("express");
const router = express.Router();

// Importing the controller functions correctly
const { registerUser, loginUser } = require("../controllers/authController");
console.log("Register user function:", registerUser);

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

module.exports = router;
