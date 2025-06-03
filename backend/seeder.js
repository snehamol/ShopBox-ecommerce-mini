const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");

dotenv.config();

const products = [
  {
    title: "Red Nike Sports Sneakers",
    description:
      "Experience the perfect blend of flexibility and support with the Nike Free RN Flyknit in a bold Crimson Red colorway...",
    price: 1099,
    images: ["image1.jpeg", "image1-alt1.jpg", "image1-alt2.jpg"],
    sizeOptions: ["6", "7", "8", "9", "10"],
    colorOptions: ["Red", "Black", "White"],
    inventory: 20,
  },
  {
    title: "UrbanStride Classic Suede Sneakers Stone Grey",
    description:
      "Step up your casual style with the UrbanStride Classic Suede Sneakers in Stone Grey...",
    price: 999,
    images: ["image2.jpg", "image2-alt1.jpg", "image2-alt2.jpg"],
    sizeOptions: ["6", "7", "8", "9"],
    colorOptions: ["White"],
    inventory: 15,
  },
  {
    title: "RegalStep Classic Leather Derby Midnight Black",
    description:
      "Exude confidence and timeless elegance with the RegalStep Classic Leather Derby in Midnight Black...",
    price: 1250,
    images: ["image3.jpg", "image3-alt1.jpg", "image3-alt2.jpg"],
    sizeOptions: ["6", "7", "8", "9"],
    colorOptions: ["White"],
    inventory: 15,
  },
  {
    title: "NeoFlex Knit Runner Midnight Blue Multi",
    description:
      "Elevate your athletic edge with the NeoFlex Knit Runner in Midnight Blue Multi...",
    price: 1999,
    images: ["image4.jpg", "image4-alt1.jpg", "image4-alt2.jpg"],
    sizeOptions: ["6", "7", "8", "9"],
    colorOptions: ["White"],
    inventory: 15,
  },
  {
    title: "OxfordPrime Cap-Toe Dress Shoes Jet Black",
    description:
      "Step into timeless elegance with the OxfordPrime Cap-Toe Dress Shoes in Jet Black...",
    price: 1500,
    images: ["image5.jpg", "image5-alt1.jpg", "image5-alt2.jpg"],
    sizeOptions: ["6", "7", "8", "9"],
    colorOptions: ["White"],
    inventory: 15,
  },
  {
    title: "UrbanForm Classic Cap-Toe Oxfords Midnight Black",
    description:
      "Elevate your everyday formal look with the UrbanForm Classic Cap-Toe Oxfords...",
    price: 1199,
    images: ["image6.jpg", "image6-alt1.jpg", "image6-alt2.jpg"],
    sizeOptions: ["6", "7", "8", "9"],
    colorOptions: ["White"],
    inventory: 15,
  },
  {
    title: "AeroStride Lightweight Running Shoes Sky Surge Blue",
    description:
      "Unlock your full running potential with the AeroStride Lightweight Running Shoes in Sky Surge Blue...",
    price: 899,
    images: ["image7.jpg", "image7-alt1.jpg", "image7-alt2.jpg"],
    sizeOptions: ["6", "7", "8", "9"],
    colorOptions: ["White"],
    inventory: 15,
  },
  {
    title: "SkyRunner Mesh Sneakers - Ocean Blue",
    description:
      "Step into comfort and performance with the SkyRunner Mesh Sneakers in Ocean Blue...",
    price: 1000,
    images: ["image8.jpg", "image8-alt1.jpg", "image8-alt2.jpg"],
    sizeOptions: ["6", "7", "8", "9"],
    colorOptions: ["White"],
    inventory: 15,
  },
  {
    title: "SkyRunner Mesh Sneakers - Lime Blaze",
    description:
      "Step into comfort and performance with the SkyRunner Mesh Sneakers in Lime Blaze...",
    price: 1200,
    images: ["image9.jpg", "image9-alt1.jpg", "image9-alt2.jpg"],
    sizeOptions: ["6", "7", "8", "9"],
    colorOptions: ["White"],
    inventory: 15,
  },
  {
    title: "AeroStride Lightweight Running Shoes Dark Blue",
    description:
      "Unlock your full running potential with the AeroStride Lightweight Running Shoes in Dark Blue...",
    price: 799,
    images: ["image10.jpg", "image10-alt1.jpg", "image10-alt2.jpg"],
    sizeOptions: ["6", "7", "8", "9"],
    colorOptions: ["White"],
    inventory: 15,
  },
  {
    title: "NeoFlex Knit Runner White Multi",
    description:
      "Elevate your athletic edge with the NeoFlex Knit Runner in White Multi...",
    price: 999,
    images: ["image12.jpg", "image12-alt1.jpg", "image12-alt2.jpg"],
    sizeOptions: ["6", "7", "8", "9"],
    colorOptions: ["White"],
    inventory: 15,
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(" Products seeded successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error(" Error seeding products:", err);
    process.exit(1);
  });
