import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Phone, Sprout, ShieldCheck } from "lucide-react";

const Home = () => {
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsPAoMKtkw3fXYT7uEBu6q_vxpcToKi5Kvdg&s",
    "https://d2j6dbq0eux0bg.cloudfront.net/images/62563480/4220758823.jpg",
    "https://pbs.twimg.com/media/FMWZXxgXIAIwf0s?format=jpg&name=large",
    "https://plus.unsplash.com/premium_photo-1681488347845-6e310c3dd682?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JlZW5lJTIwd29ybGR8ZW58MHx8MHx8fDA%3D%3D",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ_ahMLVV17K1KTDk32qn9cdwJA0lQJNTb_Q&s",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]); // rerun effect if images array size changes

  return (
    <div className="mt-16">
      {/* ---------- HERO WITH SLIDER ---------- */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-white overflow-hidden rounded-b-3xl shadow-lg">
        {/* Background Images */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
            Welcome to <span className="text-green-300">Green World</span>
          </h1>
          <p className="text-lg md:text-xl text-green-100">
            Discover natural medicines and fertilizers crafted for a healthier
            life and greener farms 🌱
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white rounded-2xl shadow-lg transition">
              Explore Medicines
            </button>
            <button className="px-6 py-3 border border-green-400 hover:bg-green-600 rounded-2xl transition">
              Explore Fertilizers
            </button>
          </div>
        </div>
      </section>

      {/* ---------- ABOUT ---------- */}
      <section className="py-16 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-green-700">About Green World</h2>
        <p className="mt-4 max-w-3xl mx-auto text-gray-600">
          At <span className="font-semibold">Green World</span>, we believe in
          the power of nature. From herbal medicines that heal naturally to
          eco-friendly fertilizers that enrich your soil — we bring solutions
          rooted in sustainability 🌍.
        </p>
      </section>

      {/* ---------- FEATURED CATEGORIES ---------- */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
          Our Categories
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Medicines */}
          <div
            className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition bg-green-50 text-center cursor-pointer"
            onClick={() => navigate("/medicines")}
          >
            <Leaf className="w-12 h-12 mx-auto text-green-600" />
            <h3 className="mt-4 text-xl font-semibold">Natural Medicines</h3>
            <p className="mt-2 text-gray-600">
              Herbal remedies that support health and wellness, trusted for
              generations.
            </p>
          </div>
          {/* Fertilizers */}
          <div
            className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition bg-green-50 text-center cursor-pointer"
            onClick={() => navigate("/fertilizers")}
          >
            <Sprout className="w-12 h-12 mx-auto text-green-600" />
            <h3 className="mt-4 text-xl font-semibold">Organic Fertilizers</h3>
            <p className="mt-2 text-gray-600">
              Eco-friendly fertilizers designed to boost soil fertility and
              promote sustainable farming.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- WHY CHOOSE US ---------- */}
      <section className="py-16 px-6 bg-green-100">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
          Why Choose Green World?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <ShieldCheck className="w-10 h-10 mx-auto text-green-600" />
            <h3 className="mt-3 font-semibold">Quality Assured</h3>
            <p className="text-gray-600">
              Safe, tested, and reliable products.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <Leaf className="w-10 h-10 mx-auto text-green-600" />
            <h3 className="mt-3 font-semibold">100% Natural</h3>
            <p className="text-gray-600">
              Derived from herbs and eco-friendly sources.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <Sprout className="w-10 h-10 mx-auto text-green-600" />
            <h3 className="mt-3 font-semibold">Sustainable</h3>
            <p className="text-gray-600">
              Supporting health and environment together.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="py-20 px-6 text-center bg-green-700 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to order from Green World?
        </h2>
        <p className="mb-8 text-green-100">
          Connect with us directly on WhatsApp and place your order instantly.
        </p>
        <a
          href="https://wa.me/2547XXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-3 bg-green-500 hover:bg-green-400 text-lg font-semibold rounded-2xl shadow-lg transition"
        >
          <Phone className="mr-2" /> Order on WhatsApp
        </a>
      </section>
    </div>
  );
};

export default Home;
