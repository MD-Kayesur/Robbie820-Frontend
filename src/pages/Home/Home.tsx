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
import logo from "@/assets/refer_now_logo.png";
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
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 md:pt-8 px-4 md:px-8 clash">
        <div className="max-w-[1440px] mx-auto md:px-[80px] lg:px-[150px]">
          <nav className="w-full bg-white/90 backdrop-blur-xl border-2 border-gray-100 rounded-2xl px-4 md:px-8 py-3 flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex w-32 md:w-40 items-center gap-2.5 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <img src={logo} alt="ReferNow Logo" className="w-full h-auto" />
            </div>

            {/* Navigation Items */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-12">
              {["Features", "How It Works", "Pricing", "Reviews"].map((item) => {
                const sectionId = item.toLowerCase().replace(/\s+/g, "-");
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item}
                    href={`#${sectionId}`}
                    onClick={() => setActiveSection(sectionId)}
                    className={`text-[15px] font-normal transition-all duration-300 relative group ${isActive ? "text-sky-500" : "text-slate-500 hover:text-sky-500"
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
            <div className="flex items-center gap-4">
              <Button
                onClick={handleGetStarted}
                className="hidden sm:flex bg-sky-500 hover:bg-sky-600 text-white font-normal h-10 md:h-12 px-6 md:px-8 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-sky-500/25"
              >
                Get Started
              </Button>
            </div>
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
