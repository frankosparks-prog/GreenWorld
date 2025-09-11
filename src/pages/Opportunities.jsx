import React from "react";

function Opportunities() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* ---------- HERO ---------- */}

      <section className="relative bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white py-24 px-6 lg:px-16 rounded-b-[3rem] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')] bg-cover bg-center opacity-25"></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-green-800/40 to-green-700/70"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            🌍 Green World Business Opportunity
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Join Green World International improve lives, achieve financial
            freedom, and build your dream lifestyle through health and wellness.
          </p>
        </div>
      </section>

      {/* ---------- ABOUT ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-6">
        <h2 className="text-2xl font-bold text-green-700">
          About Green World 🌱
        </h2>
        <p>
          Founded in 1994, Green World is a global company dedicated to
          healthcare products, combining traditional Chinese medicine with
          modern nutrition and science. Guided by the philosophy{" "}
          <strong>"From Nature, Beyond Nature, Back to Nature"</strong>, Green
          World has developed hundreds of safe and effective health and
          agricultural products trusted worldwide.
        </p>
      </section>

      {/* ---------- MARKETING MODEL ---------- */}
      <section className="bg-white shadow-md rounded-2xl max-w-6xl mx-auto px-6 py-12 mb-12">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Marketing Model 📈
        </h2>
        <p className="mb-4">
          Green World uses <strong>Network Marketing (MLM)</strong> — products
          are sold directly through independent representatives who earn via:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Direct sales profits</li>
          <li>Recruitment of downlines (team building)</li>
          <li>Bonuses & commissions from team sales</li>
          <li>Ranks & rewards for high performers</li>
        </ul>
      </section>

      {/* ---------- WHY JOIN ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Why Join Green World? 🌟
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-green-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">✅ Powerful Products</h3>
            <p>
              High-quality, research-backed, affordable products with proven
              health benefits.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">
              💰 Rewarding Compensation
            </h3>
            <p>
              Low entry cost, high payouts, multiple bonuses, and all-year
              incentive packages.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">🌍 Global Network</h3>
            <p>
              Wide distribution, global reach, and opportunities for travel and
              recognition.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">
              🚀 Personal Growth & Freedom
            </h3>
            <p>
              Financial independence, leadership development, and the chance to
              live your dream life.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- WAYS OF EARNING ---------- */}
      <section className="bg-white shadow-md rounded-2xl max-w-6xl mx-auto px-6 py-12 mb-12">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          7 Ways to Earn with Green World 💼
        </h2>
        <ul className="grid md:grid-cols-2 gap-4 list-disc list-inside">
          <li>Retail Profit (20%)</li>
          <li>Direct Bonus (5–45%)</li>
          <li>Indirect Bonus (5–40%)</li>
          <li>Outstanding Sponsoring Bonus (20–50%)</li>
          <li>Leadership Bonus (1–4.2%)</li>
          <li>Special Award (2.5%)</li>
          <li>Honorary Bonus (5.25%)</li>
        </ul>
      </section>

      {/* ---------- RANK SYSTEM ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Levels & Ranks 🌟
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-green-50 p-6 rounded-xl shadow">
            <h3 className="font-semibold">Consultants (1–8 Star)</h3>
            <p>
              Start with a Ksh 1,500 kit and grow through product purchases
              (80–250 BV). Higher stars require cumulative sales and team
              growth.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow">
            <h3 className="font-semibold">Managers & Directors</h3>
            <p>
              Advance through leadership performance and cumulative network BV
              to achieve Manager and Director ranks — with bigger bonuses and
              rewards.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- DREAM BENEFITS ---------- */}
      <section className="bg-gradient-to-r from-green-100 to-green-50 max-w-6xl mx-auto px-6 py-16 rounded-2xl shadow-inner">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Dreams You Can Achieve ✨
        </h2>
        <ul className="space-y-4">
          <li>
            💵 <strong>Financial Independence:</strong> Earn stable monthly
            income through bonuses and sales.
          </li>
          <li>
            ✈️ <strong>Travel:</strong> Free trips to China, Dubai, and
            international vacations.
          </li>
          <li>
            🚗 <strong>Luxury:</strong> Car awards (Ksh 1M+) and branded
            vehicles.
          </li>
          <li>
            🏡 <strong>Home Ownership:</strong> House funds, villa awards, and
            lifestyle upgrades.
          </li>
          <li>
            🏆 <strong>Recognition:</strong> Professional growth and respect as
            you climb the ranks.
          </li>
        </ul>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Ready to Start Your Green World Journey? 🚀
        </h2>
        <p className="mb-6 text-gray-600">
          Don’t wait — every moment counts. Join now and begin your path to
          health, wealth, and freedom.
        </p>
        <a
          href="/contact"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition"
        >
          Join Us Now
        </a>
      </section>
    </div>
  );
}

export default Opportunities;
