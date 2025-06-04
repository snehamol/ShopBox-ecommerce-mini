const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static images from public/images
app.use("/images", express.static("public/images"));

// ✅ API routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// ✅ 404 handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ message: "API route not found" });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
