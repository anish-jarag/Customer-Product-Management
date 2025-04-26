// createTestUser.js
const bcrypt = require("bcryptjs");
const { connectDB, getDB } = require("./config/db"); // make sure the path is correct!

async function createTestUser() {
  await connectDB(); // First connect to database
  const db = getDB();
  const users = db.collection("users");

  const password = "test123"; // the plain text password
  const hashedPassword = await bcrypt.hash(password, 10); // hashing the password

  await users.insertOne({
    email: "test@example.com",
    password: hashedPassword,
    role: "user",
  });

  console.log("✅ Test user created!");
  process.exit(); // Exit the script after running
}

createTestUser().catch((err) => {
  console.error("❌ Failed to create user:", err);
  process.exit(1);
});
