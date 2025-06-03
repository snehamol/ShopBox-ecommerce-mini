const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: {
    type: [String],
    required: true,
    default: []
  },
  variants: {
    sizes: [String],
    colors: [String]
  },
  inventory: { type: Number, required: true }
});

module.exports = mongoose.model("Product", productSchema);
