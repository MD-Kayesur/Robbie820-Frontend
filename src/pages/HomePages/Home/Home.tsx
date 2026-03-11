import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
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
    const sectionId = location.state?.scrollTo;

    if (!sectionId) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const timeout = setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(sectionId);
      }

      navigate(location.pathname, { replace: true, state: {} });
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.state, location.pathname, navigate]);

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-sky-100 overflow-x-hidden no-scrollbar">
      <Navbar activeSection={activeSection} onSectionClick={setActiveSection} />
      <Hero onGetStarted={handleGetStarted} className="pb-20" />
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
