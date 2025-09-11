import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 via-white to-green-100 text-center px-6">
      {/* 404 Number */}
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400 drop-shadow-lg animate-bounce">
        404
      </h1>

      {/* Message */}
      <h2 className="mt-6 text-2xl md:text-3xl font-semibold text-gray-800">
        Oops! Page not found 🚧
      </h2>
      <p className="mt-2 text-gray-600 max-w-lg">
        The page you’re looking for doesn’t exist or has been moved. 
        Don’t worry, you can head back to the homepage.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-full shadow-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
      >
        <Home className="w-5 h-5" />
        Go Back Home
      </Link>

      {/* Decorative element */}
      <div className="absolute bottom-10 text-sm text-gray-500">
        © {new Date().getFullYear()} Green World
      </div>
    </div>
  );
}

export default NotFound;
