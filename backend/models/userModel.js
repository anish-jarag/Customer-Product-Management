// userModel.js
const { getDB } = require("../config/db");

const getUserCollection = () => getDB().collection("users");

const findUserByEmail = async (email) => {
  const users = getUserCollection();
  return await users.findOne({ email });
};

module.exports = {
  findUserByEmail,
};
