const { getCustomerCollection } = require("../models/customerModel");

exports.createCustomer = async (req, res) => {
  const { name, address, email, phone } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email are required" });
  }

  const customers = getCustomerCollection();
  const newCustomer = {
    name,
    address,
    email,
    phone,
    createdAt: new Date(),
  };

  const result = await customers.insertOne(newCustomer);
  const customer = await customers.findOne({ _id: result.insertedId });
  res.status(201).json(customer);
};

exports.getCustomers = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;
  const customers = getCustomerCollection();
  const sortOrder = order === "asc" ? 1 : -1;

  const data = await customers
    .find({})
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .toArray();

  res.json(data);
};

exports.getCustomerById = async (req, res) => {
  const { id } = req.params;
  const customers = getCustomerCollection();
  const customer = await customers.findOne({ _id: new ObjectId(id) });
  if (!customer) return res.status(404).json({ message: "Customer not found" });
  res.json(customer);
};

exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const customers = getCustomerCollection();
  const updated = await customers.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: req.body },
    { returnDocument: "after" }
  );
  res.json(updated.value);
};

exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const customers = getCustomerCollection();
  await customers.deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Customer deleted successfully" });
};
