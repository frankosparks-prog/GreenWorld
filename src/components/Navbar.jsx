// src/components/Navbar.jsx
import { useState } from "react";
import {
  Menu,
  X,
  Leaf,
  Search,
  Home as HomeIcon,
  Pill,
  Sprout,
  Info,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  // Temporary sample catalogue (later fetch from backend)
  const products = [
    { id: 1, name: "Herbal Tea", category: "Medicines" },
    { id: 2, name: "Aloe Vera Juice", category: "Medicines" },
    { id: 3, name: "Neem Capsules", category: "Medicines" },
    { id: 4, name: "Organic Fertilizer", category: "Fertilizers" },
    { id: 5, name: "Compost Mix", category: "Fertilizers" },
    { id: 6, name: "Seaweed Extract", category: "Fertilizers" },
  ];

  const navLinks = [
    { to: "/", label: "Home", icon: <HomeIcon size={20} /> },
    { to: "/medicines", label: "Medicines", icon: <Pill size={20} /> },
    { to: "/fertilizers", label: "Fertilizers", icon: <Sprout size={20} /> },
    { to: "/about", label: "About Us", icon: <Info size={20} /> },
    { to: "/contact", label: "Contact", icon: <Phone size={20} /> },
  ];

  // Filter products by search query
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="./greenworld1.jpg" alt="Green World" className="w-8 h-8" />
          <span className="text-2xl font-extrabold text-green-700 tracking-wide">
            Green World
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center mx-auto">
          {navLinks.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-green-600 transition relative group"
            >
              {icon}
              <span>{label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-600 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Search Icon (Desktop) */}
        <button
          onClick={() => setShowSearch(true)}
          className="hidden md:flex text-green-700 hover:text-green-900 transition"
        >
          <Search size={26} />
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-700"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed inset-0 z-50 flex transition ${
          isSidebarOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        {/* Sidebar Panel */}
        <div
          className={`relative w-64 bg-white h-full shadow-lg p-6 flex flex-col transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <X size={26} />
          </button>

          <div className="flex items-center gap-2 mb-8">
            <Leaf className="text-green-600 w-8 h-8" />
            <span className="text-xl font-bold text-green-700">
              Green World
            </span>
          </div>

          <div className="flex flex-col gap-6">
            {navLinks.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-green-600 transition"
              >
                {icon}
                {label}
              </Link>
            ))}

            {/* Search in sidebar */}
            <button
              onClick={() => {
                setShowSearch(true);
                setIsSidebarOpen(false);
              }}
              className="flex items-center gap-3 text-lg font-medium text-green-700 hover:text-green-900 transition"
            >
              <Search size={20} /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-11/12 max-w-md p-6 relative">
            <button
              onClick={() => {
                setShowSearch(false);
                setQuery("");
              }}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold text-green-700 mb-4">
              Search Products
            </h2>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Suggestions */}
            {query && (
              <ul className="mt-4 max-h-40 overflow-y-auto border rounded-lg divide-y">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <li
                      key={p.id}
                      className="px-4 py-2 hover:bg-green-50 cursor-pointer"
                      onClick={() => {
                        alert(`You selected: ${p.name}`);
                        setShowSearch(false);
                        setQuery("");
                      }}
                    >
                      <span className="font-medium text-gray-800">{p.name}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({p.category})
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
