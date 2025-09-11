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

function App() {
  return (
    <div>
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
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/fertilizers" element={<Fertilizers />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </div>
  );
}

export default App;
