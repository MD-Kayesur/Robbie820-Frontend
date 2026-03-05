import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import laptopMockup from "../assets/laptop_dashboard_mockup_1772505073423.png";
import DashboardMarquee from "@/components/DashboardMarquee/DashboardMarquee";
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import SecurityCompliance from "@/components/SecurityCompliance/SecurityCompliance";
import PricingSection from "@/components/PricingSection/PricingSection";




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
      <main className="relative pt-48 pb-16 px-4 md:px-8">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-200 h-200 bg-sky-100/40 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-150 h-150 bg-blue-50/50 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          {/* Hero Text content */}
          <div className="flex-1 text-center lg:text-left space-y-10">
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-none tracking-tight text-[#0F172A]"
              >
                Automate Referral <br className="hidden md:block" /> Commissions{" "}
                <br className="hidden lg:block" />
                <span className="text-sky-500 inline-block mt-2">
                  With Complete Accuracy
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
              >
                Eliminate Manual Tracking And Commission Disputes. Our Platform
                Connects Brokers, And Referral Partners With Transparent,
                Automated Commission Management.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5"
            >
              <Button
                onClick={handleGetStarted}
                className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white font-bold h-16 px-12 rounded-2xl text-xl shadow-2xl shadow-sky-500/30 hover:-translate-y-1 transition-all duration-300 active:scale-95"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-bold h-16 px-12 rounded-2xl text-xl border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 active:scale-95"
              >
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 text-slate-500 font-semibold"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center">
                  <Check size={14} className="text-sky-600 stroke-[3px]" />
                </div>
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center">
                  <Check size={14} className="text-sky-600 stroke-[3px]" />
                </div>
                <span>14-Day Free Trial</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual contents */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 relative"
          >
            <div className="relative z-10 w-full hover:scale-[1.02] transition-transform duration-700 ease-out">
              <img
                src={laptopMockup}
                alt="ReferNow Platform Mockup"
                className="w-full h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
              />
            </div>

            {/* Decorative background shape */}
            <div className="absolute -top-10 -right-10 w-full h-full bg-sky-400/10 rounded-[3rem] -z-10 rotate-3 animate-pulse" />
          </motion.div>
        </div>
      </main>

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



    </div>
  );
};

export default Home;
