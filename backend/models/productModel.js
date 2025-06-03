const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  images: [String],
  sizeOptions: [String],
  colorOptions: [String],
  inventory: Number,
});

module.exports = mongoose.model("Product", productSchema);
