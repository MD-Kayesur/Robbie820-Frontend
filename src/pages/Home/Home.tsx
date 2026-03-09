import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardMarquee from "@/components/LandingPageCom/DashboardMarquee/DashboardMarquee";
import Hero from "@/components/LandingPageCom/Hero/Hero";
import FeaturesSection from "@/components/LandingPageCom/FeaturesSection/FeaturesSection";
import HowItWorks from "@/components/LandingPageCom/HowItWorks/HowItWorks";
import SecurityCompliance from "@/components/LandingPageCom/SecurityCompliance/SecurityCompliance";
import PricingSection from "@/components/LandingPageCom/PricingSection/PricingSection";
import Footer from "@/components/LandingPageCom/Footer/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["features", "how-it-works", "pricing", "reviews"];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-sky-100 overflow-x-hidden no-scrollbar">
      {/* Navbar Section */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-8 px-4 md:px-8">
        <div className="mx-[150px]">
          <nav className="w-full bg-white/90 backdrop-blur-xl border border-white/50 rounded-4xl px-8 py-5 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
            {/* Logo */}
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="w-9 h-9 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-black text-xl">R</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#1E293B]">
                Refer<span className="text-sky-500">Now</span>
              </span>
            </div>

            {/* Navigation Items */}
            <div className="hidden lg:flex items-center gap-12">
              {["Features", "How It Works", "Pricing", "Reviews"].map((item) => {
                const sectionId = item.toLowerCase().replace(/\s+/g, "-");
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item}
                    href={`#${sectionId}`}
                    onClick={() => setActiveSection(sectionId)}
                    className={`text-[15px] font-semibold transition-all duration-300 relative group ${isActive ? "text-sky-500" : "text-slate-500 hover:text-sky-500"
                      }`}
                  >
                    {item}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-sky-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    ></span>
                  </a>
                );
              })}
            </div>

            {/* Header Button */}
            <Button
              onClick={handleGetStarted}
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold h-12 px-8 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-sky-500/25"
            >
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <Hero
        onGetStarted={handleGetStarted}
        className="pt-10 pb-20"
      />

      {/* Dashboard Marquee Section */}
      <DashboardMarquee />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Security & Compliance Section */}
      <SecurityCompliance />

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
