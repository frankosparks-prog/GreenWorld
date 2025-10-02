import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Leaf,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  RefreshCcw,
  Search,
} from "lucide-react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Fertilizers() {
  const [fertilizers, setFertilizers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch fertilizers from backend
  const fetchFertilizers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${SERVER_URL}/api/fertilizers`);
      if (!res.ok) throw new Error("Failed to fetch fertilizers");
      const data = await res.json();
      setFertilizers(data);
    } catch (err) {
      console.error("Error fetching fertilizers:", err);
      setError("Failed to load fertilizers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFertilizers();
  }, []);

  // Categories
  const categories = ["All", ...new Set(fertilizers.map((m) => m.category))];

  // Filtering
  const filteredFertilizers = fertilizers.filter((m) => {
    const matchesCategory =
      selectedCategory === "All" || m.category === selectedCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Selected product for modal
  const selectedProduct =
    selectedIndex !== null ? filteredFertilizers[selectedIndex] : null;

  const handlePrev = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex < filteredFertilizers.length - 1)
      setSelectedIndex(selectedIndex + 1);
  };

  return (
    <div className="pt-24 pb-12 px-6 bg-gradient-to-b from-green-50 to-white min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-green-800 mb-6">
        🌱 Nutri Plant Organic Fertilizers
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Discover eco-friendly fertilizers crafted to enrich your soil and
        promote sustainable farming. Order directly via WhatsApp for fast
        delivery 🚚.
      </p>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin w-10 h-10 text-green-600" />
          <span className="ml-3 text-green-700 font-medium">
            Loading fertilizers...
          </span>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="text-center py-16">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button
            onClick={fetchFertilizers}
            className="px-6 py-3 flex items-center gap-2 mx-auto bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            <RefreshCcw className="w-5 h-5" /> Retry
          </button>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
          {/* Category Filter + Search */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            {/* Category Filter */}
            <div className="relative inline-block w-60">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedIndex(null);
                }}
                className="w-full px-4 py-3 border border-green-300 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <Filter className="absolute top-3 right-3 text-green-600 pointer-events-none" />
            </div>

            {/* 🔍 Search Bar */}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search fertilizers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-green-300 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
              <Search className="absolute top-3 right-3 text-green-600" />
            </div>
          </div>

          {/* Fertilizers Grid */}
          {filteredFertilizers.length === 0 ? (
            <div className="text-center py-20">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">
                No fertilizers found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filteredFertilizers.map((item, idx) => (
                <div
                  key={item._id || item.id}
                  className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition"
                    onClick={() => setSelectedIndex(idx)}
                  />
                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
                      <Leaf className="text-green-600 w-5 h-5" />
                      {item.name}
                    </h2>
                    <p className="text-gray-600 text-sm mt-2">
                      {item.description}
                    </p>
                    <p className="text-lg font-bold text-green-800 mt-3">
                      ksh {item.price}
                    </p>

                    {/* WhatsApp Order Button */}
                    <a
                      href={`https://wa.me/254701159155?text=Hello! I’d like to order ${item.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition w-full"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Order via WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Product Modal with Navigation */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={24} />
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-60 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2 mb-3">
              <Leaf className="text-green-600 w-6 h-6" />
              {selectedProduct.name}
            </h2>
            <p className="text-gray-600 mb-3">{selectedProduct.details}</p>
            <p className="text-xl font-bold text-green-800 mb-4">
              Ksh {selectedProduct.price}
            </p>

            <a
              href={`https://wa.me/254701159155?text=Hello! I’d like to order ${selectedProduct.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition w-full mb-4"
            >
              <ShoppingCart className="w-5 h-5" />
              Order via WhatsApp
            </a>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                disabled={selectedIndex === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  selectedIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-100"
                }`}
              >
                <ChevronLeft className="w-5 h-5" /> Previous
              </button>
              <button
                onClick={handleNext}
                disabled={selectedIndex === filteredFertilizers.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  selectedIndex === filteredFertilizers.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-100"
                }`}
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Fertilizers;
