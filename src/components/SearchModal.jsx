import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ isOpen, onClose, searchTerm, onSearchChange, results }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigate = (item) => {
    // Preferably, your backend should return a `type` field like: "faq", "medicine", "fertilizer", "testimonial"
    if (item.type === "faq" || (item.question && item.answer)) {
      navigate(`/faqs`);
    } else if (item.type === "medicines") {
      navigate(`/medicines`);
    } else if (item.type === "fertilizers") {
      navigate(`/fertilizers`);
    } else if (item.type === "testimonial") {
      navigate(`/testimonials`);
    } else {
      console.warn("Unknown item type", item);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-32 px-4 transition">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md transform transition-all scale-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-green-800">
            Search Green World 🌱
          </h2>
          <button onClick={onClose}>
            <X size={22} className="text-gray-700 hover:text-red-600" />
          </button>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Type to search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          autoFocus
        />

        {/* Results */}
        {results.length > 0 ? (
          <div className="mt-4 space-y-2 max-h-60 overflow-y-auto text-sm">
            {results.map((item, i) => (
              <div
                key={i}
                onClick={() => handleNavigate(item)}
                className="p-3 border border-gray-200 rounded-lg hover:bg-green-50 cursor-pointer transition"
              >
                <p className="font-medium text-green-800">
                  {item.title || item.name || "Untitled"}
                </p>
                {item.category && (
                  <p className="text-gray-500 text-xs">Category: {item.category}</p>
                )}
                {item.location && (
                  <p className="text-gray-500 text-xs">Location: {item.location}</p>
                )}
                {item.description && (
                  <p className="text-gray-600 text-xs truncate">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          searchTerm && (
            <p className="text-center text-sm text-gray-500 mt-4">
              No results found for "{searchTerm}".
            </p>
          )
        )}

        {/* Footer hint */}
        <p className="text-xs mt-3 text-gray-400">
          🔍 You can search FAQs, medicines, fertilizers, testimonials...
        </p>
      </div>
    </div>
  );
};

export default SearchModal;
