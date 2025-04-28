const { getDB } = require("../config/db");

const getUserCollection = () => getDB().collection("users");

const findUserByEmail = async (email) => {
  const users = getUserCollection();
  return await users.findOne({ email });
};

// Create new user
const createUser = async (userData) => {
  const users = getUserCollection();
  const result = await users.insertOne(userData);
  return result;
};

// Save reset token and expiry
const saveResetToken = async (email, token, expiry) => {
  const users = getUserCollection();
  await users.updateOne(
    { email },
    { $set: { resetToken: token, resetTokenExpiry: expiry } }
  );
};

// Save password reset token with 1 hour expiry
const savePasswordResetToken = async (email, resetToken) => {
  const users = getUserCollection();
  const expiryTime = new Date();
  expiryTime.setHours(expiryTime.getHours() + 1);

  await users.updateOne(
    { email },
    {
      $set: {
        resetToken,
        resetTokenExpiry: expiryTime,
      },
    }
  );
};

// Find user by reset token
const findUserByResetToken = async (token) => {
  const users = getUserCollection();
  return await users.findOne({ resetToken: token });
};

// Update password and clear reset token fields
const updatePassword = async (email, hashedPassword) => {
  const users = getUserCollection();
  await users.updateOne(
    { email },
    {
      $set: { password: hashedPassword },
      $unset: { resetToken: "", resetTokenExpiry: "" },
    }
  );
};

module.exports = {
  findUserByEmail,
  createUser,
  saveResetToken,
  findUserByResetToken,
  updatePassword,
  savePasswordResetToken,
};
