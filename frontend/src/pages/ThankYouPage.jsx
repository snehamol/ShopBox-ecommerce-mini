import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

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

    // Fetch order details from backend using orderNumber
    fetch(`http://localhost:5000/api/orders/${orderNumber}`)
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
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Thank you for your order!</h1>
      <p className="text-center text-gray-700">Your order number is <strong>{orderNumber}</strong></p>

      <section className="bg-gray-100 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-32 h-32 object-cover rounded mx-auto md:mx-0"
          />
          <div>
            <p className="font-semibold text-lg">{product.title}</p>
            <p className="text-gray-600">
              Size: {product.size}, Color: {product.color}, Quantity: {product.quantity}
            </p>
            <p className="mt-2 font-semibold text-lg">Price: RS.{product.price}.00</p>
            <p className="mt-1 font-semibold text-xl">Total: RS.{total}.00</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Name:</strong> {customer.name}</li>
          <li><strong>Email:</strong> {customer.email}</li>
          <li><strong>Phone:</strong> {customer.phone}</li>
          <li><strong>Address:</strong> {customer.address}</li>
          <li><strong>City:</strong> {customer.city}</li>
          <li><strong>State:</strong> {customer.state}</li>
          <li><strong>Zip Code:</strong> {customer.zip}</li>
        </ul>
      </section>

      <p className="text-center text-green-700 font-semibold text-lg">
        We appreciate your business and will contact you if we have any questions about your order.
      </p>

      <div className="text-center">
        <Link
          to="/"
          className="inline-block bg-black text-white py-2 px-6 rounded hover:bg-gray-800"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
