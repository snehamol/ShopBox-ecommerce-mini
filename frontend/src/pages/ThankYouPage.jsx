import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ThankYouPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderNumber = queryParams.get("order");

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderNumber) {
      setError("Order number missing.");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/api/orders/${orderNumber}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch order details.");
        return res.json();
      })
      .then((data) => {
        setOrderDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [orderNumber]);

  if (loading) {
    return <p className="text-center mt-10">Loading order details...</p>;
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-6 mt-10 text-center text-red-600">
        <p>{error}</p>
        <Link to="/" className="text-blue-600 underline mt-4 inline-block">
          Go back to home
        </Link>
      </div>
    );
  }

  const { customer, product, total } = orderDetails;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center">Thank you for your order!</h1>
      <p className="text-center text-gray-700 text-sm md:text-base">
        Your order number is <strong>{orderNumber}</strong>
      </p>

      <section className="bg-gray-100 p-4 sm:p-6 rounded shadow">
        <h2 className="text-center sm:text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <img
            src={`/images/${product.image}`}
            alt={product.title}
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded mx-auto"
          />
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-lg">{product.title}</p>
            <p className="text-gray-600 text-sm">
              Size: {product.size}, Color: {product.color}, Quantity: {product.quantity}
            </p>
            <p className="mt-2 text-base font-semibold">Price: RS.{product.price}.00</p>
            <p className="mt-1 text-lg font-bold">Total: RS.{total}.00</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 p-4 sm:p-6 rounded shadow">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Customer Details</h2>
        <ul className="space-y-1 text-sm sm:text-base text-gray-700">
          <li><strong>Name:</strong> {customer.name}</li>
          <li><strong>Email:</strong> {customer.email}</li>
          <li><strong>Phone:</strong> {customer.phone}</li>
          <li><strong>Address:</strong> {customer.address}</li>
          <li><strong>City:</strong> {customer.city}</li>
          <li><strong>State:</strong> {customer.state}</li>
          <li><strong>Zip Code:</strong> {customer.zip}</li>
        </ul>
      </section>

      <p className="text-center text-green-700 font-medium sm:font-semibold">
        We appreciate your business and will contact you if we have any questions about your order.
      </p>

      <div className="text-center">
        <Link
          to="/"
          className="inline-block bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
