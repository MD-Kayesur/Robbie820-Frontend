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

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-sky-100 overflow-x-hidden no-scrollbar">
      {/* Navbar Section */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-6 md:px-8">
        <nav className="max-w-6xl mx-auto bg-white/90 backdrop-blur-xl border border-white/50 rounded-4xl px-8 py-5 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
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
            {["Features", "How It Works", "Pricing", "Reviews"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[15px] font-semibold text-slate-500 hover:text-sky-500 transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Header Button */}
          <Button
            onClick={handleGetStarted}
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold h-12 px-8 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-sky-500/25"
          >
            Get Started
          </Button>
        </nav>
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
