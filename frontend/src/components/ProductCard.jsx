import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <div className="overflow-hidden h-24 md:h-48">
        <img
          src={`/images/${product.images[0]}`}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-2 md:p-3">
        
        <h2 className="text-xs md:text-base font-semibold break-words">
          {product.title}
        </h2>
        <p className="text-gray-700 text-xs md:text-sm mt-1">RS.{product.price}.00</p>
      </div>
    </div>
  );
}
