import { useState, useEffect, useCallback, useRef } from "react";
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
import SearchModal from "./SearchModal";

// ✅ Simple debounce hook (fixed with useRef)
function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);

  const debouncedFn = useCallback(
    (...args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return debouncedFn;
}

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navLinks = [
    { to: "/", label: "Home", icon: <HomeIcon size={20} /> },
    { to: "/medicines", label: "Medicines", icon: <Pill size={20} /> },
    { to: "/fertilizers", label: "Fertilizers", icon: <Sprout size={20} /> },
    { to: "/about", label: "About Us", icon: <Info size={20} /> },
    { to: "/contact", label: "Contact", icon: <Phone size={20} /> },
  ];

  // ✅ Actual search call
  const fetchSearchResults = async (value) => {
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/search?q=${value.toLowerCase()}`
      );
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  // ✅ Debounced version of search
  const debouncedSearch = useDebounce(fetchSearchResults, 400);

  // Handle typing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    setSearchTerm("");
    setSearchResults([]);
  };

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
          onClick={toggleSearch}
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
                toggleSearch();
                setIsSidebarOpen(false);
              }}
              className="flex items-center gap-3 text-lg font-medium text-green-700 hover:text-green-900 transition"
            >
              <Search size={20} /> Search
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Centralized Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={toggleSearch}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        results={searchResults}
      />
    </nav>
  );
};

export default Navbar;
