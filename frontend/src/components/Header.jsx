import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-black text-white p-4 relative flex items-center">
      
      <div>
        <Link
          to="/"
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          Home
        </Link>
      </div>

      <h1 className="text-xl font-bold absolute left-1/2 transform -translate-x-1/2">
        <Link to="/">ShopBox</Link>
      </h1>
    </header>
  );
}
