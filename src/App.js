// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import Fertilizers from "./pages/Fertilizers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import FAQs from "./pages/FAQs";
import Testimonials from "./pages/Testimonials";
import Opportunities from "./pages/Opportunities";
import { Toaster } from 'react-hot-toast';
import NotFound from "./pages/NotFound";
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import UserDetails from "./Admin/UserDetails";
import Subscribed from "./Admin/Subscribed";
import AdminTestimonials from "./Admin/AdminTestimonials";
import AdminFAQs from "./Admin/AdminFAQs";
import ViewPayment from "./Admin/ViewPayment";
import ProtectedRoute from "./Admin/ProtectedRoute";
import VisitorTracker from "./components/VisitorTracker";
import { Navigate, useLocation } from "react-router-dom";
import ManageMedicines from "./Admin/ManageMedicines";
import ManageFertilizers from "./Admin/ManageFertilizers";
import ScrollToTop from "./components/scrollTop";

// 👇 create a wrapper component to manage layout
function AppLayout() {
  const location = useLocation();

  // Check if current route starts with /admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
       <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: '#D1FAE5',
              color: '#065F46',
            },
          },
          error: {
            style: {
              background: '#FEE2E2',
              color: '#991B1B',
            },
          },
        }}
      />

      <VisitorTracker />

      {/* 👇 Only show Navbar & Footer if NOT on admin routes */}
      {!isAdminRoute && <Navbar />}
      <div className="min-h-screen">
        <AppRoutes />
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
}

// 👇 split routes into a separate component
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/medicines" element={<Medicines />} />
             <Route path="/fertilizers" element={<Fertilizers />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/contact" element={<Contact />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard/*"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="visitors" replace />} />
        <Route path="visitors" element={<UserDetails />} />
        <Route path="subscribed" element={<Subscribed />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="medicines" element={<ManageMedicines />} />
        <Route path="fertilizers" element={<ManageFertilizers />} />
        <Route path="faqs" element={<AdminFAQs />} />
        <Route path="payments" element={<ViewPayment />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// 👇 Main App
function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
