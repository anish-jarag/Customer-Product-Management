const { getDB } = require("../config/db");

const getUserCollection = () => getDB().collection("users");

module.exports = {
  getUserCollection,
};
