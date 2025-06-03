const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: String,
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String
  },
  product: Object,
  variant: Object,
  quantity: Number,
  total: Number,
  status: String
});

module.exports = mongoose.model("Order", orderSchema);
