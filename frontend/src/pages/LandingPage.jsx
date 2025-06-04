import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function LandingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("API_BASE_URL:", API_BASE_URL); // Check this logs correctly

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products`);
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
