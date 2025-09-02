import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* ---------- HERO SECTION ---------- */}
      <section className="relative bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white py-24 px-6 lg:px-16 rounded-b-[3rem] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')] bg-cover bg-center opacity-25"></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-green-800/40 to-green-700/70"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Get in Touch <span className="text-yellow-300">🌍</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Have questions or need help? Our team is ready to assist you anytime.
          </p>
        </div>
      </section>

      {/* ---------- CONTACT DETAILS ---------- */}
      <section className="max-w-6xl mx-auto px-6 lg:px-16 py-20 grid gap-8 md:grid-cols-3">
        {[
          { icon: <Phone className="w-6 h-6" />, title: "Call Us", info: "+254 700 123 456" },
          { icon: <Mail className="w-6 h-6" />, title: "Email Us", info: "info@agroshop.com" },
          { icon: <MapPin className="w-6 h-6" />, title: "Visit Us", info: "123 Agro Street, Nairobi, Kenya" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 text-center"
          >
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.info}</p>
          </div>
        ))}
      </section>

      {/* ---------- CONTACT FORM + MAP ---------- */}
      <section className="max-w-6xl mx-auto px-6 lg:px-16 pb-20 grid lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition">
          <h2 className="text-3xl font-bold mb-8 text-green-700">
            Send us a Message ✉️
          </h2>
          <form className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Your Name"
                className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <label className="absolute left-4 top-2.5 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all">
                Your Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="Your Email"
                className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <label className="absolute left-4 top-2.5 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all">
                Your Email
              </label>
            </div>

            <div className="relative">
              <textarea
                placeholder="Your Message"
                rows="5"
                className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
              ></textarea>
              <label className="absolute left-4 top-2.5 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all">
                Your Message
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition transform hover:scale-[1.02]"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div className="rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition transform hover:scale-[1.01]">
          <iframe
            title="Agro Shop Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.851088305691!2d36.82194631532497!3d-1.2920652990532629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10e7d5b4e8db%3A0x40b5d9f6fba2c05!2sNairobi!5e0!3m2!1sen!2ske!4v1615994706481!5m2!1sen!2ske"
            width="100%"
            height="100%"
            style={{ minHeight: "450px", border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default Contact;
