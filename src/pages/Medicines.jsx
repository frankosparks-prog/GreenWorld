import React, { useState } from "react";
import { ShoppingCart, Leaf, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";

const medicines = [
  {
    id: 1,
    name: "Herbal Immune Booster",
    description: "Strengthens immunity naturally with organic herbs.",
    details:
      "This immune booster is made with turmeric, ginger, and echinacea to support your immune system naturally. Perfect for daily use.",
    price: "KSh 1,200",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ_ahMLVV17K1KTDk32qn9cdwJA0lQJNTb_Q&s",
    category: "Immunity",
  },
  {
    id: 2,
    name: "Aloe Vera Tonic",
    description: "Supports digestion & detoxification with aloe extracts.",
    details:
      "Aloe vera tonic helps with smooth digestion, reduces acidity, and detoxifies the liver naturally.",
    price: "KSh 950",
    image:
      "https://plus.unsplash.com/premium_photo-1681488347845-6e310c3dd682?fm=jpg&q=60&w=3000",
    category: "Digestive",
  },
  {
    id: 3,
    name: "Natural Pain Relief Oil",
    description: "Relieves joint & muscle pain using natural oils.",
    details:
      "Infused with eucalyptus and peppermint oils, this formula helps relieve pain and reduce inflammation.",
    price: "KSh 800",
    image: "https://pbs.twimg.com/media/FMWZXxgXIAIwf0s?format=jpg&name=large",
    category: "Pain Relief",
  },
  {
    id: 4,
    name: "Herbal Cough Syrup",
    description: "Soothes sore throat & clears congestion naturally.",
    details:
      "Prepared with honey, tulsi, and mulethi, this syrup provides fast relief from cough and sore throat.",
    price: "KSh 700",
    image:
      "https://pbs.twimg.com/media/FMWZXxgXIAIwf0s?format=jpg&name=large",
    category: "Respiratory",
  },
  {
    id: 5,
    name: "Detox Herbal Tea",
    description: "Flushes toxins and promotes liver health.",
    details:
      "A calming blend of green tea, dandelion root, and lemongrass to cleanse your body naturally.",
    price: "KSh 650",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsPAoMKtkw3fXYT7uEBu6q_vxpcToKi5Kvdg&s",
    category: "Detox",
  },
  {
    id: 6,
    name: "Energy Booster Capsules",
    description: "Revitalizes energy levels with natural extracts.",
    details:
      "Packed with ginseng and ashwagandha, these capsules boost stamina and fight fatigue.",
    price: "KSh 1,400",
    image:
      "https://d2j6dbq0eux0bg.cloudfront.net/images/62563480/4220758823.jpg",
    category: "Energy",
  },
];

function Medicines() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(null);

  const categories = ["All", ...new Set(medicines.map((m) => m.category))];

  const filteredMedicines =
    selectedCategory === "All"
      ? medicines
      : medicines.filter((m) => m.category === selectedCategory);

  const handleNext = () => {
    if (currentIndex !== null) {
      setCurrentIndex((prev) => (prev + 1) % filteredMedicines.length);
    }
  };

  const handlePrev = () => {
    if (currentIndex !== null) {
      setCurrentIndex((prev) =>
        (prev - 1 + filteredMedicines.length) % filteredMedicines.length
      );
    }
  };

  const closeModal = () => setCurrentIndex(null);

  return (
    <div className="pt-24 pb-12 px-6 bg-gradient-to-b from-green-50 to-white min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-green-800 mb-6">
        🌿 Our Natural Medicines
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Explore our range of carefully crafted herbal medicines that promote
        health and wellness naturally.  
        Order directly via WhatsApp for fast delivery 🚚.
      </p>

      {/* Filter Dropdown */}
      <div className="flex justify-center mb-12">
        <div className="relative inline-block w-60">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
      </div>

      {/* Grid of Medicines */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredMedicines.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300"
          >
            {/* Image Click for Modal */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition"
              onClick={() => setCurrentIndex(idx)}
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
                <Leaf className="text-green-600 w-5 h-5" />
                {item.name}
              </h2>
              <p className="text-gray-600 text-sm mt-2">{item.description}</p>
              <p className="text-lg font-bold text-green-800 mt-3">
                {item.price}
              </p>

              {/* WhatsApp Order Button */}
              <a
                href={`https://wa.me/254700000000?text=Hello! I’d like to order ${item.name}`}
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

      {/* Product Modal with Navigation */}
      {currentIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
              onClick={closeModal}
            >
              <X size={24} />
            </button>

            <img
              src={filteredMedicines[currentIndex].image}
              alt={filteredMedicines[currentIndex].name}
              className="w-full h-60 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2 mb-3">
              <Leaf className="text-green-600 w-6 h-6" />
              {filteredMedicines[currentIndex].name}
            </h2>
            <p className="text-gray-600 mb-3">
              {filteredMedicines[currentIndex].details}
            </p>
            <p className="text-xl font-bold text-green-800 mb-4">
              {filteredMedicines[currentIndex].price}
            </p>
            <a
              href={`https://wa.me/254700000000?text=Hello! I’d like to order ${filteredMedicines[currentIndex].name}`}
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
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
              >
                <ChevronLeft /> Previous
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
              >
                Next <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Medicines;
