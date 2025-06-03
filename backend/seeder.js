const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");

dotenv.config();

const products = [
  {
    title: "Red Nike Sports Sneakers",
    description: "Experience the perfect blend of flexibility and support with the Nike Free RN Flyknit in a bold Crimson Red colorway. Designed for natural movement and maximum comfort, this lightweight running shoe features a breathable Flyknit upper that hugs your foot like a second skin. The white Nike Swoosh adds a classic contrast, while the Nike Free sole offers adaptive cushioning for smooth, barefoot-like strides. Ideal for running or casual wear, this is a must-have for those who demand performance without compromising on style.",
    price: 1099,
    images: ["/images/image1.jpeg" ,
             "/images/image1-alt1.jpg",
             "/images/image1-alt2.jpg"
            ],
            
    variants: {
      sizes: ["6", "7", "8", "9", "10"],
      colors: ["Red","Black", "White"]
    },
    inventory: 20
  },
  {
    title: "UrbanStride Classic Suede Sneakers Stone Grey",
    description: "Step up your casual style with the UrbanStride Classic Suede Sneakers in Stone Grey. These versatile sneakers feature a soft suede upper with a minimalist stitch design, offering a sleek and timeless look perfect for everyday wear. The cushioned interior and durable rubber outsole provide all-day comfort and reliable traction. Finished with neutral tones and a subtle gum sole, these sneakers pair effortlessly with any outfit — from jeans to joggers.",
    price: 999,
    images: ["/images/image2.jpg", 
             "/images/image2-alt1.jpg",
             "/images/image2-alt2.jpg"
            ],
    variants: {
      sizes: ["6", "7", "8", "9"],
      colors: ["White"]
    },
    inventory: 15
  },
   {
    title: "RegalStep Classic Leather Derby Midnight Black",
    description: "Exude confidence and timeless elegance with the RegalStep Classic Leather Derby in Midnight Black. Crafted from premium polished leather with a subtle textured finish, these shoes are the perfect complement to any formal or business attire. The sleek Derby design features clean stitching, smooth contours, and durable lace-up construction for a secure and stylish fit. Whether you're at a wedding, in the boardroom, or out for a sophisticated evening, these shoes deliver unmatched class and comfort.",
    price: 1250,
    images: ["/images/image3.jpg",
             "/images/image3-alt1.jpg",
             "/images/image3-alt2.jpg"
            ],
    variants: {
      sizes: ["6", "7", "8", "9"],
      colors: ["White"]
    },
    inventory: 15
  }, {
    title: "NeoFlex Knit Runner Midnight Blue Multi",
    description: "Elevate your athletic edge with the NeoFlex Knit Runner in Midnight Blue Multi. Engineered for modern movement, this ultra-light sneaker features a breathable knit upper for maximum airflow and flexibility. The dynamic color palette — with accents of aqua blue, fuchsia pink, and yellow — delivers standout style with every step. The cushioned sole provides high-rebound comfort and traction, making these shoes ideal for workouts, running, or casual streetwear flair.",
    price: 1999,
    images: ["/images/image4.jpg",
             "/images/image4-alt1.jpg",
             "/images/image4-alt2.jpg"
            ],
    variants: {
      sizes: ["6", "7", "8", "9"],
      colors: ["White"]
    },
    inventory: 15
  }, {
    title: "OxfordPrime Cap-Toe Dress Shoes Jet Black",
    description: "Step into timeless elegance with the OxfordPrime Cap-Toe Dress Shoes in Jet Black. Meticulously crafted from premium leather, these sleek Oxford-style shoes feature a refined cap-toe design and smooth polished finish for a distinguished look. Perfect for formal occasions, business attire, or upscale events, they offer a secure lace-up fit and cushioned insole for all-day sophistication and comfort.",
    price: 1500,
    images: ["/images/image5.jpg",
             "/images/image5-alt1.jpg",
             "/images/image5-alt2.jpg"
            ],
    variants: {
      sizes: ["6", "7", "8", "9"],
      colors: ["White"]
    },
    inventory: 15
  }, {
    title: "UrbanForm Classic Cap-Toe Oxfords  Midnight Black",
    description: "Elevate your everyday formal look with the UrbanForm Classic Cap-Toe Oxfords in Midnight Black. Designed with a smooth synthetic leather upper and clean stitching detail, these shoes deliver a polished, professional appearance without compromising comfort. The lightweight sole and cushioned insole make them ideal for long office hours, presentations, or formal gatherings.",
    price: 1199,
    images: ["/images/image6.jpg",
             "/images/image6-alt1.jpg",
             "/images/image6-alt2.jpg"
            ],
    variants: {
      sizes: ["6", "7", "8", "9"],
      colors: ["White"]
    },
    inventory: 15
  }, {
    title: "AeroStride Lightweight Running Shoes  Sky Surge Blue",
    description: "Unlock your full running potential with the AeroStride Lightweight Running Shoes in Sky Surge Blue. Engineered for performance and comfort, these shoes feature a breathable mesh upper, responsive cushioning, and a streamlined silhouette to keep you moving efficiently mile after mile. Whether you're training, jogging, or on the move all day, AeroStride delivers support and speed in one dynamic package.",
    price: 899,
    images: ["/images/image7.jpg",
             "/images/image7-alt1.jpg",
             "/images/image7-alt2.jpg"
            ],
    variants: {
      sizes: ["6", "7", "8", "9"],
      colors: ["White"]
    },
    inventory: 15
  }, {
    title: "SkyRunner Mesh Sneakers - Ocean Blue",
    description: "Step into comfort and performance with the SkyRunner Mesh Sneakers in Ocean Blue. Designed for everyday athletes and casual wearers alike, these lightweight sneakers feature a breathable mesh upper, cushioned midsole for superior shock absorption, and a sleek, modern silhouette. Whether you're hitting the gym or the streets, these shoes offer the perfect blend of style and support.",
    price: 1000,
    images: ["/images/image8.jpg",
             "/images/image8-alt1.jpg",
             "/images/image8-alt2.jpg"
            ],
    variants: {
      sizes: ["6", "7", "8", "9"],
      colors: ["White"]
    },
    inventory: 15
  }, {
    title: "SkyRunner Mesh Sneakers - Lime Blaze",
    description: "Step into comfort and performance with the SkyRunner Mesh Sneakers in Lime Blaze. Designed for everyday athletes and casual wearers alike, these lightweight sneakers feature a breathable mesh upper, cushioned midsole for superior shock absorption, and a sleek, modern silhouette. Whether you're hitting the gym or the streets, these shoes offer the perfect blend of style and support.",
    price: 1200,
    images: ["/images/image9.jpg",
             "/images/image9-alt1.jpg",
             "/images/image9-alt2.jpg"
            ],
    variants: {
      sizes: ["6", "7", "8", "9"],
      colors: ["White"]
    },
    inventory: 15
  },
   {
    title: "AeroStride Lightweight Running Shoes  Dark Blue",
    description: "Unlock your full running potential with the AeroStride Lightweight Running Shoes in Sky Surge Blue. Engineered for performance and comfort, these shoes feature a breathable mesh upper, responsive cushioning, and a streamlined silhouette to keep you moving efficiently mile after mile. Whether you're training, jogging, or on the move all day, AeroStride delivers support and speed in one dynamic package.",
    price: 799,
    images: ["/images/image10.jpg",
             "/images/image10-alt1.jpg",
             "/images/image10-alt2.jpg"
            ],
    variants: {
      sizes: ["6", "7", "8", "9"],
      colors: ["White"]
    },
    inventory: 15
  },
   {
    title: "UrbanStride Classic Suede Sneakers Stone Grey",
    description: "Step up your casual style with the UrbanStride Classic Suede Sneakers in Stone Grey. These versatile sneakers feature a soft suede upper with a minimalist stitch design, offering a sleek and timeless look perfect for everyday wear. The cushioned interior and durable rubber outsole provide all-day comfort and reliable traction. Finished with neutral tones and a subtle gum sole, these sneakers pair effortlessly with any outfit — from jeans to joggers.",
    price: 1099,
    images: ["/images/image11.jpg",   
             "/images/image11-alt1.jpg",
             "/images/image11-alt2.jpg"
            ],
    variants: {
      sizes: ["6", "7", "8", "9"],
      colors: ["White"]
    },
    inventory: 15
  },
   {
   title: "NeoFlex Knit Runner White Multi",
    description: "Elevate your athletic edge with the NeoFlex Knit Runner in Midnight Blue Multi. Engineered for modern movement, this ultra-light sneaker features a breathable knit upper for maximum airflow and flexibility. The dynamic color palette — with accents of aqua blue, fuchsia pink, and yellow — delivers standout style with every step. The cushioned sole provides high-rebound comfort and traction, making these shoes ideal for workouts, running, or casual streetwear flair.",
    price: 999,
    images: ["/images/image12.jpg",
             "/images/image12-alt1.jpg",
             "/images/image12-alt2.jpg"
            ],
    variants: {
      sizes: ["6", "7", "8", "9"],
      colors: ["White"]
    },
    inventory: 15
  },
];
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Products seeded!");
    process.exit();
    })
  .catch(err => {
    console.error("Error seeding products:", err);
    process.exit(1);
  });
