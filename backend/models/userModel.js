// userModel.js
const { getDB } = require("../config/db");

const getUserCollection = () => getDB().collection("users");

const findUserByEmail = async (email) => {
  const users = getUserCollection();
  return await users.findOne({ email });
};
// Function to create a new user
const createUser = async (userData) => {
  const users = getUserCollection();
  const result = await users.insertOne(userData);
  return result.ops[0]; // Return the created user object
};

module.exports = {
  findUserByEmail,
  createUser,
};
