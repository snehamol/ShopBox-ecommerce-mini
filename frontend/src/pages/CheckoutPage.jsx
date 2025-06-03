import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const Input = ({ name, placeholder, type = "text", value, onChange, error }) => (
  <div className="mb-4">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      autoComplete="off"
      className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProduct = location.state?.product;

  if (!selectedProduct) {
    return <p className="text-center text-red-600 mt-10">No product selected</p>;
  }

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "",
    cardNumber: "", expiryDate: "", cvv: ""
  });

  const [errors, setErrors] = useState({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First name is required";
    if (!formData.lastName.trim()) errs.lastName = "Last name is required";
    if (!formData.address.trim()) errs.address = "Address is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.state.trim()) errs.state = "State is required";
    if (!formData.zip.trim()) errs.zip = "Zip code is required";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Invalid email";
    if (!/^\d{10}$/.test(formData.phone)) errs.phone = "Phone must be 10 digits";
    if (!/^\d{16}$/.test(formData.cardNumber)) errs.cardNumber = "Card number must be 16 digits";
    if (!/^\d{3}$/.test(formData.cvv)) errs.cvv = "CVV must be 3 digits";

    if (!formData.expiryDate) {
      errs.expiryDate = "Expiry date is required";
    } else {
      const parts = formData.expiryDate.split("/");
      const mm = parseInt(parts[0], 10);
      const yy = parseInt(parts[1], 10);
      if (
        parts.length !== 2 || isNaN(mm) || isNaN(yy) ||
        mm < 1 || mm > 12 || parts[0].length !== 2 || parts[1].length !== 2
      ) {
        errs.expiryDate = "Expiry must be in MM/YY format";
      } else {
        const now = new Date();
        const expiry = new Date(2000 + yy, mm, 0, 23, 59, 59);
        if (expiry < now) errs.expiryDate = "Expiry date must be in the future";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isPlacingOrder) return;

    if (!validate()) return;

    setIsPlacingOrder(true); 

    const customer = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
    };

    const orderData = {
      customer,
      product: {
        ...selectedProduct,
        image: selectedProduct.image || selectedProduct.images?.[0] || "",
      },
      total: selectedProduct.price * selectedProduct.quantity,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Transaction failed: ${data.message || "Unknown error"}`);
        setIsPlacingOrder(false); 
        return;
      }

      navigate(`/thank-you?order=${data.orderNumber}`);
    } catch (error) {
      alert("Gateway error. Please try again.");
      console.error("Checkout error:", error);
      setIsPlacingOrder(false); 
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="space-y-6 p-4 border rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
          <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} error={errors.lastName} />
        </div>
        <Input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
        <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} error={errors.phone} />
        <Input name="address" placeholder="Address" value={formData.address} onChange={handleChange} error={errors.address} />
        <div className="grid grid-cols-3 gap-4">
          <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} error={errors.city} />
          <div>
            <select name="state" value={formData.state} onChange={handleChange} required className="w-full border border-gray-300 p-3 rounded">
              <option value="">Select State</option>
              {indianStates.map((st) => <option key={st} value={st}>{st}</option>)}
            </select>
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>
          <Input name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} error={errors.zip} />
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-4">Payment Details</h2>
        <Input name="cardNumber" placeholder="Card Number (16 digits)" value={formData.cardNumber} onChange={handleChange} error={errors.cardNumber} />
        <Input name="expiryDate" placeholder="Expiry Date (MM/YY)" value={formData.expiryDate} onChange={handleChange} error={errors.expiryDate} />
        <Input name="cvv" placeholder="CVV (3 digits)" value={formData.cvv} onChange={handleChange} error={errors.cvv} />

        <button
          type="submit"
          disabled={isPlacingOrder}
          className={`py-3 px-6 rounded w-full text-white ${
            isPlacingOrder ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"
          }`}
        >
          {isPlacingOrder ? "Placing Order..." : "Place Order"}
        </button>
      </form>

      <div className="p-4 border rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <img
          src={`/images/${selectedProduct.image || selectedProduct.images?.[0]}`}
          alt={selectedProduct.title}
          className="w-full max-h-52 object-cover rounded mb-4"
        />
        <h3 className="font-semibold text-lg">{selectedProduct.title}</h3>
        <p>Size: {selectedProduct.size}</p>
        <p>Color: {selectedProduct.color}</p>
        <p>Quantity: {selectedProduct.quantity}</p>
        <p className="font-semibold mt-4">Total: RS.{selectedProduct.price * selectedProduct.quantity}.00</p>
      </div>
    </div>
  );
}
