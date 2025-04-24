const { getProductCollection } = require("../models/productModel");
const { ObjectId } = require("mongodb");

exports.createProduct = async (req, res) => {
  const { name, productCode, description, isPublished, category } = req.body;
  if (!name || !productCode) {
    return res
      .status(400)
      .json({ message: "Name and Product Code are required" });
  }

  const products = getProductCollection();
  const result = await products.insertOne({
    name,
    productCode,
    description,
    isPublished: isPublished || false,
    category,
    createdAt: new Date(),
  });

  const product = await products.findOne({ _id: result.insertedId });
  res.status(201).json(product);
};

exports.getProducts = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;
  const products = getProductCollection();
  const sortOrder = order === "asc" ? 1 : -1;

  const data = await products
    .find({})
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .toArray();

  res.json(data);
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const products = getProductCollection();
  const product = await products.findOne({ _id: new ObjectId(id) });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const products = getProductCollection();
  const updated = await products.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: req.body },
    { returnDocument: "after" }
  );
  res.json(updated.value);
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const products = getProductCollection();
  await products.deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Product deleted successfully" });
};
