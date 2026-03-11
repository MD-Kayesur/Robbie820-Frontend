import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/LandingPageCom/Navbar/Navbar";
import DashboardMarquee from "@/components/LandingPageCom/HomeCom/DashboardMarquee/DashboardMarquee";
import Hero from "@/components/LandingPageCom/HomeCom/Hero/Hero";
import FeaturesSection from "@/components/LandingPageCom/HomeCom/FeaturesSection/FeaturesSection";
import HowItWorks from "@/components/LandingPageCom/HomeCom/HowItWorks/HowItWorks";
import SecurityCompliance from "@/components/LandingPageCom/HomeCom/SecurityCompliance/SecurityCompliance";
import PricingSection from "@/components/LandingPageCom/HomeCom/PricingSection/PricingSection";
import Footer from "@/components/LandingPageCom/Footer/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["features", "how-it-works", "reviews", "pricing"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const scrollToSection = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(hash);
      }
    };

    const timeout = setTimeout(scrollToSection, 100);

    return () => clearTimeout(timeout);
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-sky-100 overflow-x-hidden no-scrollbar">
      <Navbar activeSection={activeSection} onSectionClick={setActiveSection} />
      <Hero onGetStarted={handleGetStarted} className="pt-10 pb-20" />
      <DashboardMarquee />
      <FeaturesSection />
      <HowItWorks />
      <SecurityCompliance />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Home;
