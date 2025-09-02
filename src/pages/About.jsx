import React, { useEffect, useRef, useState } from "react";
import { Leaf, FlaskConical, Users, Truck } from "lucide-react";

function About() {
  const services = [
    {
      icon: <Leaf className="w-10 h-10 text-green-600" />,
      title: "Natural Medicines",
      desc: "Organic and herbal solutions that promote healthy farming and wellness.",
    },
    {
      icon: <FlaskConical className="w-10 h-10 text-green-600" />,
      title: "Fertilizers",
      desc: "Eco-friendly fertilizers that improve soil health and crop yields.",
    },
    {
      icon: <Users className="w-10 h-10 text-green-600" />,
      title: "Farmer Training",
      desc: "Workshops and guides to empower farmers with modern agricultural practices.",
    },
    {
      icon: <Truck className="w-10 h-10 text-green-600" />,
      title: "Fast Delivery",
      desc: "Quick and reliable delivery of products directly to your farm.",
    },
  ];

  const team = [
    {
      name: "John Mwangi",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Grace Njeri",
      role: "Head of Operations",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "David Otieno",
      role: "Lead Agronomist",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Mary Wambui",
      role: "Customer Relations",
      image: "https://randomuser.me/api/portraits/women/46.jpg",
    },
  ];

  const stats = [
    { number: 10, suffix: "+", label: "Years Experience" },
    { number: 500, suffix: "+", label: "Farmers Served" },
    { number: 50, suffix: "+", label: "Products Delivered" },
    { number: 100, suffix: "%", label: "Satisfaction Rate" },
  ];

  const [visible, setVisible] = useState(false);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const statsRef = useRef(null);

  // Animate counters when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      stats.forEach((stat, index) => {
        let start = 0;
        const end = stat.number;
        const duration = 2000; // 2s animation
        const stepTime = Math.abs(Math.floor(duration / end));

        const timer = setInterval(() => {
          start += 1;
          setCounters((prev) => {
            const updated = [...prev];
            updated[index] = start;
            return updated;
          });
          if (start === end) clearInterval(timer);
        }, stepTime);
      });
    }
  }, [visible]);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white py-28 rounded-b-[3rem] shadow-2xl overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
          }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-green-900/60 to-green-800/80"></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            About <span className="text-yellow-400">AgriCare</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-100">
            We are committed to providing high-quality agricultural products,
            medicines, and fertilizers to support farmers and communities worldwide.
          </p>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 text-gray-50"
            preserveAspectRatio="none"
            viewBox="0 0 1440 320"
          >
            <path
              fill="currentColor"
              d="M0,224L48,208C96,192,192,160,288,144C384,128,480,128,576,138.7C672,149,768,171,864,186.7C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96V320H0Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12">
        <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition border-t-4 border-green-600">
          <h2 className="text-3xl font-bold text-green-700 mb-4">🌱 Our Mission</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            To empower farmers with reliable, affordable, and innovative
            agricultural solutions that improve productivity, ensure food
            security, and promote sustainable farming practices.
          </p>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition border-t-4 border-yellow-500">
          <h2 className="text-3xl font-bold text-green-700 mb-4">🌍 Our Vision</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            To be the leading agricultural partner in the region by delivering
            excellence, promoting eco-friendly practices, and making a positive
            impact on farmers’ lives.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-green-50 py-20 px-6 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ_ahMLVV17K1KTDk32qn9cdwJA0lQJNTb_Q&s"
            alt="Farmers working"
            className="rounded-3xl shadow-xl hover:scale-[1.02] transition-transform"
          />
          <div>
            <h2 className="text-4xl font-extrabold text-green-800 mb-6">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-5 text-lg">
              Founded with a passion for agriculture, AgriCare started as a
              small initiative to bridge the gap between farmers and high-quality
              products. Over the years, we have grown into a trusted provider of
              agricultural medicines, fertilizers, and services that farmers can
              depend on.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Today, we continue to innovate and support sustainable farming
              practices, ensuring that the next generation of farmers can thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6">
              <h3 className="text-4xl font-extrabold text-green-700">
                {counters[index]}
                {stat.suffix}
              </h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-extrabold text-green-800 mb-4">What We Provide</h2>
          <p className="text-gray-600 text-lg">
            At AgriCare, we go beyond products — we deliver solutions to help
            farmers thrive sustainably.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-green-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 px-6 bg-green-50">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-extrabold text-green-800 mb-4">Meet Our Team</h2>
          <p className="text-gray-600 text-lg">
            The passionate individuals behind AgriCare who make everything possible.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-6 text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 shadow-md"
              />
              <h3 className="text-xl font-bold text-green-700">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
