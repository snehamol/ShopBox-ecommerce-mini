const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// GET /api/products - get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}).lean();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error fetching products" });
  }
});

// GET /api/products/:id - fetch product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error fetching product" });
  }
});

module.exports = router;
