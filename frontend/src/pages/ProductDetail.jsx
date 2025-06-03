import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.images[0] || "");
        if (res.data.variants?.sizes?.length > 0) {
          setSelectedSize(res.data.variants.sizes[0]);
        }
        if (res.data.variants?.colors?.length > 0) {
          setSelectedColor(res.data.variants.colors[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "inc" ? prev + 1 : prev > 1 ? prev - 1 : 1));
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color before proceeding.");
      return;
    }

    const selectedProduct = {
      id: product._id || product.id,
      title: product.title,
      image: selectedImage,
      color: selectedColor,
      size: selectedSize,
      quantity,
      price: product.price,
    };

    navigate("/checkout", {
      state: {
        product: selectedProduct,
      },
    });
  };

  if (!product) return <div className="p-4">Loading...</div>;

  const totalPrice = (product.price * quantity).toFixed(2);

  // Get two small images excluding the selectedImage
  const smallImages = product.images.filter((img) => img !== selectedImage).slice(0, 2);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {/* Large Selected Image */}
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-auto rounded-xl object-cover max-h-[500px]"
          />

          {/* Small Images below */}
          <div className="flex gap-4 mt-4">
            {smallImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.title} small ${i + 1}`}
                className="w-28 h-28 object-cover rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          {product.variants?.sizes?.length > 0 && (
            <div>
              <label className="block font-medium mb-1">Size:</label>
              <select
                className="border p-2 rounded w-40 text-sm"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="">Select size</option>
                {product.variants.sizes.map((size, i) => (
                  <option key={i} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {product.variants?.colors?.length > 0 && (
            <div>
              <label className="block font-medium mb-1">Color:</label>
              <select
                className="border p-2 rounded w-40 text-sm"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="">Select color</option>
                {product.variants.colors.map((color, i) => (
                  <option key={i} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <button
              onClick={() => handleQuantityChange("dec")}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span className="px-3">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("inc")}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          <p className="text-xl font-semibold">Total: RS.{totalPrice}</p>

          <button
            onClick={handleBuyNow}
            className="bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition mt-8 w-32"
          >
            Buy Now
          </button>
        </div>
      </div>

      <div className="mt-10 border-t pt-6 text-gray-700">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
