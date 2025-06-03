import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Invalid email";
    if (!/^\d{10}$/.test(formData.phone)) errs.phone = "Phone must be 10 digits";
    if (!/^\d{16}$/.test(formData.cardNumber)) errs.cardNumber = "Card number must be 16 digits";
    if (!/^\d{3}$/.test(formData.cvv)) errs.cvv = "CVV must be 3 digits";

    const [mm, yy] = formData.expiryDate.split("/").map(Number);
    const now = new Date();
    const expDate = new Date(`20${yy}`, mm - 1);
    if (!mm || !yy || mm < 1 || mm > 12 || expDate < now) {
      errs.expiryDate = "Expiry must be a valid future date (MM/YY)";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

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
      product: selectedProduct,
      total: selectedProduct.price * selectedProduct.quantity,
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Transaction failed: ${data.message}`);
        return;
      }

      navigate(`/thank-you?order=${data.orderNumber}`);
    } catch (error) {
      alert("Gateway error. Please try again.");
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="space-y-6 p-4 border rounded shadow">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <Input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
          />
          <div className="grid grid-cols-3 gap-4">
            <Input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
            />
            <div>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
              )}
            </div>
            <Input
              name="zip"
              placeholder="Zip Code"
              value={formData.zip}
              onChange={handleChange}
              error={errors.zip}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <Input
            name="cardNumber"
            placeholder="Card Number (16 digits)"
            value={formData.cardNumber}
            onChange={handleChange}
            error={errors.cardNumber}
          />
          <Input
            name="expiryDate"
            placeholder="Expiry Date (MM/YY)"
            value={formData.expiryDate}
            onChange={handleChange}
            error={errors.expiryDate}
          />
          <Input
            name="cvv"
            placeholder="CVV (3 digits)"
            value={formData.cvv}
            onChange={handleChange}
            error={errors.cvv}
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white py-3 px-6 rounded hover:bg-gray-800 w-full"
        >
          Place Order
        </button>
      </form>

      <div className="bg-gray-100 p-6 rounded shadow-md space-y-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="font-medium">{selectedProduct.title}</p>
              <p className="text-sm text-gray-600">
                Size: {selectedProduct.size}, Color: {selectedProduct.color}
              </p>
            </div>
          </div>
          <p className="font-semibold text-right">
            RS.{selectedProduct.price}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-lg">
          <p>Total</p>
          <p>RS.{selectedProduct.price * selectedProduct.quantity}.00</p>
        </div>
      </div>
    </div>
  );
}
