import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full max-w-[120px] sm:max-w-xs border rounded-xl shadow p-2 sm:p-4 bg-white flex flex-col items-center">
      <Link to={`/product/${product._id}`} className="w-full text-center">
        <img
          src={product.images?.[0] || "/placeholder.jpg"}
          alt={product.title}
          className="w-[100px] h-[100px] sm:w-full sm:h-40 object-cover rounded-md mb-1 sm:mb-2 transition-transform duration-300 transform hover:scale-105"
        />
        <h3 className="text-xs sm:text-lg font-semibold text-center leading-snug break-words sm:truncate">
          {product.title}
        </h3>
        <p className="text-gray-700 text-xs sm:text-base font-medium mt-1">RS.{product.price}.00</p>
      </Link>
    </div>
  );
};

export default ProductCard;
