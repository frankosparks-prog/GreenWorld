import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_URL}/api/subscribe`, { email });
      toast.success("Thanks for subscribing!");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 relative">
      {/* -------- Top Section -------- */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        
        {/* Logo / Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">Green World 🌱</h2>
          <p className="mt-3 text-gray-400">
            Bringing health and agriculture together — quality medicines &
            fertilizers at your service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { name: "Home", link: "/" },
              { name: "Medicines", link: "/medicines" },
              { name: "Fertilizers", link: "/fertilizers" },
              { name: "About Us", link: "/about" },
              { name: "FAQs", link: "/faqs" },
              { name: "Testimonials", link: "/testimonials" },
              { name: "Business Opportunities", link: "/opportunities" },
              { name: "Contact", link: "/contact" },
            ].map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.link}
                  className="hover:text-green-400 transition duration-200"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Get in Touch</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-green-400" /> Nairobi, Kenya
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-green-400" /> +254 700 123 456
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-green-400" /> info@agrihealth.com
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Join Our Community</h3>
          <p className="text-gray-400 text-sm">
            Subscribe to get updates on new products, offers, and insights.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 mt-5"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 rounded focus:outline-none text-gray-900"
              required
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* -------- Socials -------- */}
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Green World. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-green-400 transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-green-400 transition"><Twitter size={20} /></a>
            <a href="#" className="hover:text-green-400 transition"><Instagram size={20} /></a>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/254700123456"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg text-white 
                   animate-bounce hover:bg-green-600 transition z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12.003 2C6.478 2 2 6.478 2 12.003c0 2.118.553 4.165 1.6 5.97L2 22l4.174-1.565c1.748.95 3.709 1.446 5.829 1.446h.003c5.525 0 10.003-4.478 10.003-10.003C22.009 6.478 17.528 2 12.003 2zm5.645 14.364c-.236.667-1.38 1.293-1.913 1.382-.489.08-1.11.114-1.79-.112-.412-.131-.94-.304-1.616-.591-2.848-1.232-4.692-4.155-4.836-4.352-.141-.197-1.157-1.54-1.157-2.936 0-1.397.732-2.082.992-2.364.259-.283.57-.354.76-.354.19 0 .38.002.547.01.178.007.416-.067.651.496.236.566.799 1.957.869 2.098.07.141.117.306.023.494-.094.189-.141.307-.283.472-.141.165-.297.37-.424.496-.141.141-.288.294-.124.578.165.283.732 1.207 1.57 1.95 1.08.963 1.993 1.268 2.276 1.409.283.141.447.118.613-.071.165-.188.707-.827.897-1.11.189-.283.378-.236.637-.141.259.094 1.637.772 1.916.913.283.141.472.212.543.33.07.118.07.685-.165 1.352z"></path>
        </svg>
      </a>
    </footer>
  );
}

export default Footer;
