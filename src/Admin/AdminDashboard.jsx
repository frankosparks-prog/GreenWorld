import React, { useState } from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import {
  Users,
  MailCheck,
  MessageCircle,
  MessageCircleDashed,
  Package,
  CreditCard,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
  };

  return (
    <div className="flex h-screen font-inter">
      {/* ───────────── Sidebar ───────────── */}
      <aside
        className={`fixed md:relative z-20 top-0 h-full w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-r border-gray-700 p-5 transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo + Close (mobile) */}
        <div className="flex items-center justify-between mb-10 mt-6 md:mt-0">
          <div className="flex items-center gap-3">
            <img
              src="../../greenworld1.jpg"
              alt="Green World logo"
              className="w-10 h-10 rounded-full border-2 border-green-500 object-cover shadow-md"
            />
            <h2 className="text-2xl font-extrabold text-green-400">
              Green World
            </h2>
          </div>

          {/* Close btn (mobile) */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden hover:text-green-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav links */}
        <nav>
          <ul className="space-y-3">
            {[
              { to: "visitors", label: "Visitor Details", icon: <Users /> },
              { to: "subscribed", label: "Subscribed", icon: <MailCheck /> },
              { to: "testimonials", label: "Testimonials", icon: <MessageCircle /> },
              { to: "faqs", label: "FAQs", icon: <MessageCircleDashed /> },
              { to: "medicines", label: "Manage Medicines", icon: <Package /> },
              { to: "fertilizers", label: "Manage Fertilizers", icon: <Package /> },
              { to: "payments", label: "Payments", icon: <CreditCard /> },
            ].map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-lg font-medium transition-colors duration-200 
                    ${isActive ? "text-green-400 bg-gray-700 border-l-4 border-green-400" : "text-gray-300 hover:text-green-400 hover:bg-gray-700/50"}`
                  }
                >
                  <span className="w-5 h-5">{icon}</span>
                  {label}
                </NavLink>
              </li>
            ))}

            {/* Logout */}
            <li className="pt-4 border-t border-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 text-lg font-medium text-red-400 hover:text-red-500 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5" />
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* ───────────── Main Content ───────────── */}
      <main
        className={`flex-1 bg-gray-100 text-gray-900 transition-all duration-300 overflow-y-auto`}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-md p-4 flex items-center justify-between md:hidden">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="hover:text-green-400"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

/* Redirect /admin to /admin/visitors by default */
export const AdminRoutes = () => <Navigate to="visitors" replace />;

export default AdminDashboard;
