import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setError("");
        const res = await axios.get(`${API_BASE_URL}/products/${id}`);
        const productData = res.data;

        setProduct(productData);
        setSelectedImage(productData.images?.[0] || "");
        setSelectedSize(productData.sizeOptions?.[0] || "");
        setSelectedColor(productData.colorOptions?.[0] || "");
        setQuantity(1);
        setImageLoaded(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError("Failed to load product. Please try again later.");
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    setImageLoaded(false);
  }, [selectedImage]);

  const handleBuyNow = () => {
    const productToSend = {
      ...product,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: selectedImage,
    };
    navigate("/checkout", { state: { product: productToSend } });
  };

  if (error) {
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">{error}</p>
    );
  }

  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-700 font-medium">
        Loading product data...
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {selectedImage ? (
            <img
              src={`/images/${selectedImage}`}
              alt={product.title}
              className={`w-full rounded object-cover transition-opacity duration-700 ease-in-out ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } h-[300px] md:h-96`}
              onLoad={() => setImageLoaded(true)}
              style={{ maxHeight: "24rem" }}
            />
          ) : (
            <div className="w-full h-[300px] md:h-96 bg-gray-200 flex items-center justify-center rounded">
              <span className="text-gray-400">No Image Available</span>
            </div>
          )}

          {product.images?.length > 0 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={`/images/${img}`}
                  alt={`${product.title} - ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                    selectedImage === img ? "border-black" : "border-transparent"
                  } hover:opacity-80 transition-opacity duration-300`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.title}</h1>
          <p className="text-lg mb-4">Price: RS.{product.price}.00</p>

          {product.sizeOptions?.length > 0 && (
            <div className="mb-4">
              <label className="block font-medium mb-1">Size:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border p-2 rounded"
              >
                {product.sizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {product.colorOptions?.length > 0 && (
            <div className="mb-4">
              <label className="block font-medium mb-1">Color:</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full border p-2 rounded"
              >
                {product.colorOptions.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-6 flex items-center gap-4">
            <label className="font-medium">Quantity:</label>
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 border rounded disabled:opacity-50"
              aria-label="Decrease quantity"
              disabled={quantity === 1}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 border rounded"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            className="bg-black text-white py-3 px-6 rounded hover:bg-gray-800 w-full"
          >
            Buy Now
          </button>
        </div>
      </div>

      {product.description && (
        <div className="mt-10 max-w-3xl mx-auto text-gray-700 whitespace-pre-line">
          <h2 className="text-2xl font-semibold mb-3">Description</h2>
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
}
