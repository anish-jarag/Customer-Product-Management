const { getCustomerCollection } = require("../models/customerModel");

exports.addCustomer = async (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const customers = getCustomerCollection();
  const existing = await customers.findOne({ email });

  if (existing) {
    return res.status(400).json({ message: "Customer already exists" });
  }

  const result = await customers.insertOne({ name, email, phone, address });
  const customer = await customers.findOne({ _id: result.insertedId });

  res.status(201).json(customer);
};

exports.getCustomers = async (req, res) => {
  const customers = getCustomerCollection();
  const all = await customers.find().toArray();
  res.json(all);
};
