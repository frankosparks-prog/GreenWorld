import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Quote } from "lucide-react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/testimonials`);
        setTestimonials(res.data.filter((t) => t.isVerified));
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      }
    };
    fetchTestimonials();
  }, []);

  const displayedTestimonials = showAll
    ? testimonials
    : testimonials.slice(0, 9);

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Green World",
    description: "Eco-friendly farming & natural health products trusted by thousands.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue:
        testimonials.length > 0
          ? (
              testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) /
              testimonials.length
            ).toFixed(1)
          : "5",
      reviewCount: testimonials.length,
    },
    review: testimonials.slice(0, 5).map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.name,
      },
      datePublished: new Date(t.date).toISOString(),
      reviewBody: t.message,
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating || 5,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 py-20 px-6 sm:px-12 lg:px-24 font-sans text-gray-800">
      {/* SEO Helmet */}
      {/* <Helmet>
        <title>Customer Testimonials | Green World</title>
        <meta
          name="description"
          content="Read verified testimonials from Green World customers. Real stories highlighting our eco-friendly products, service, and impact."
        />
        <meta name="keywords" content="Green World, testimonials, eco-friendly reviews, farming feedback, natural health" />
        <meta name="author" content="Green World" />
        <meta name="robots" content="index, follow" />

        
        <meta property="og:title" content="Customer Testimonials | Green World" />
        <meta property="og:description" content="See what people are saying about Green World’s natural farming & wellness products." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greenworld.co.ke/testimonials" />
        <meta property="og:image" content="https://greenworld.co.ke/greenworld-banner.jpg" />

        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Customer Testimonials | Green World" />
        <meta name="twitter:description" content="Eco-friendly, customer-trusted. Read real Green World stories here." />
        <meta name="twitter:image" content="https://greenworld.co.ke/greenworld-banner.jpg" />

        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet> */}

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
          🌿 What Our Customers Say
        </h1>
        <p className="text-lg text-green-700">
          Real voices. Real stories. Real impact with <span className="font-semibold">Green World</span>.
        </p>
        <div className="w-24 h-1 bg-green-600 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Testimonials */}
      {testimonials.length === 0 ? (
        <p className="text-center text-green-600 italic">No testimonials yet. Be the first to share your story 💬</p>
      ) : (
        <>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {displayedTestimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-green-200 rounded-2xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1 relative"
              >
                <Quote
                  className="text-green-600 absolute -top-5 -left-5 bg-green-100 p-2 rounded-full shadow-md"
                  size={36}
                />

                <p className="text-gray-700 text-base leading-relaxed mb-6 italic">
                  “{t.message}”
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-green-900">{t.name}</h4>
                    <p className="text-sm text-green-600">
                      {new Date(t.date).toLocaleDateString()}
                    </p>
                  </div>
                  {t.isVerified && (
                    <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                      ✅ Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Show More / Show Less */}
          {testimonials.length > 9 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition transform hover:scale-105"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Testimonials;
