import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
// import { Helmet } from "react-helmet-async";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/faq`);
        setFaqs(res.data.filter((t) => t.isVerified));
      } catch (err) {
        console.error("Failed to fetch FAQs:", err);
      }
    };
    fetchFAQs();
  }, []);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 px-6 py-20 sm:px-12 lg:px-24 font-sans text-gray-800">
      {/* <Helmet>
        <title>FAQs | Green World</title>
        <meta
          name="description"
          content="Find answers to the most frequently asked questions about Green World’s eco-friendly products, farming support, shipping, and more."
        />
        <meta
          name="keywords"
          content="Green World FAQs, eco-friendly farming, product support, shipping info, natural solutions"
        />
        <meta name="author" content="Green World" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="FAQs | Green World" />
        <meta
          property="og:description"
          content="Get answers to the most common questions about Green World’s products, farming practices, and eco-friendly solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greenworld.co.ke/faqs" />
        <meta
          property="og:image"
          content="https://greenworld.co.ke/greenworld-banner.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQs | Green World" />
        <meta
          name="twitter:description"
          content="Explore common questions about Green World’s eco-friendly farming and natural products."
        />
        <meta
          name="twitter:image"
          content="https://greenworld.co.ke/greenworld-banner.jpg"
        />
      </Helmet> */}

      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
          🌿 Frequently Asked Questions
        </h1>
        <p className="text-green-700 text-lg">
          Clear answers about our eco-friendly solutions, shipping, and support.
        </p>
        <div className="w-24 h-1 bg-green-600 mx-auto mt-4 rounded-full" />
      </div>

      {/* FAQs */}
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.length === 0 && (
          <p className="text-center text-green-600 italic">
            No FAQs available at the moment 🌱
          </p>
        )}

        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="border border-green-200 rounded-2xl shadow-md hover:shadow-lg transition bg-white overflow-hidden"
          >
            {/* Question */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center text-left p-6 bg-green-50 hover:bg-green-100 transition focus:outline-none"
            >
              <span className="text-lg font-semibold text-green-900">
                {faq.question}
              </span>
              {activeIndex === index ? (
                <ChevronUp className="text-green-700" />
              ) : (
                <ChevronDown className="text-green-700" />
              )}
            </button>

            {/* Answer */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                activeIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="p-6 border-t border-green-200 bg-white text-gray-700">
                <p className="leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;
