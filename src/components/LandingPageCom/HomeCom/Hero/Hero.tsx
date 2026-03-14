import laptopMockup from "@/assets/landing-page/image.png";
import bgLight from "@/assets/landing-page/image copy 4.jpg";
import { Check, Play, X } from "lucide-react";
import howItWorksImage from "@/assets/landing-page/zenbook_duo_14.jpg";
import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";

interface HeroProps {
  onGetStarted: () => void;
  className?: string;
}

// 🎬 Replace with your actual YouTube video ID (the part after ?v=)
// https://youtu.be/NHXVpQs1feA?si=zpZ7kYVG8Mzt-MV9
const DEMO_VIDEO_ID = "NHXVpQs1feA";

// Animation variants
const easeOut: [number, number, number, number] = [0.0, 0.0, 0.2, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

const imageVariant: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOut, delay: 0.3 } },
};

const Hero = ({ onGetStarted, className }: HeroProps) => {
  const [showDemo, setShowDemo] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowDemo(false);
    };
    if (showDemo) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showDemo]);

  return (
    <>
      <main
        className={`relative ${className} px-4.5 md:px-0 pb-6 md:pb-20`}
        style={{ backgroundImage: `url(${bgLight})` }}
      >
        <div className="pt-12 md:pt-37 md:pl-37.5">
          <div className="mx-auto flex flex-col lg:flex-row items-center">
            {/* Hero Text content — staggered entrance */}
            <motion.div
              className="flex-1 md:text-left bg-no-repeat bg-top-left bg-contain lg:pr-10"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <div className="md:space-y-11 space-y-3 mb-5 md:mb-16">
                <motion.h1
                  variants={item}
                  className="text-2xl md:text-4xl lg:text-[56px] leading-6 md:leading-16 font-medium text-[#0F172A]"
                >
                  Automate Referral Commissions <br />
                  With
                  <span className="text-sky-500"> Complete Accuracy</span>
                </motion.h1>

                <motion.p
                  variants={item}
                  className="text-sm md:text-lg text-[#504F4F] md:max-w-4xl mx-auto lg:mx-0"
                >
                  Eliminate manual tracking and commission disputes. Our platform
                  connects brokers and referral partners with transparent,
                  automated commission management.
                </motion.p>
              </div>

              <motion.div
                variants={item}
                className="mb-3 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-center lg:justify-start"
              >
                <button
                  onClick={onGetStarted}
                  className="w-full rounded-xl bg-[#1DA1E8] md:px-6 md:py-3 py-2 text-sm md:text-lg text-white transition hover:bg-sky-600 md:w-auto md:min-w-55"
                >
                  Get Started
                </button>

                <button
                  onClick={() => setShowDemo(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white md:px-6 md:py-3 py-2 text-sm md:text-lg text-[#111827] transition hover:bg-slate-50 hover:text-sky-500 md:w-auto md:min-w-55"
                >
                  <Play className="h-4 w-4" />
                  Watch Demo
                </button>
              </motion.div>

              <motion.div
                variants={item}
                className="flex flex-col items-center gap-2 text-center lg:flex-row lg:items-center lg:justify-start lg:gap-4 lg:text-left"
              >
                <span className="text-xs text-[#6B7280] lg:hidden">
                  No credit card required • 14-day free trial
                </span>

                <span className="hidden md:flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#00B4FE]" />
                  <span className="text-[#00B4FE] text-lg">
                    No credit card required
                  </span>
                </span>

                <span className="hidden md:flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#00B4FE]" />
                  <span className="text-[#00B4FE] text-lg">
                    14-day free trial
                  </span>
                </span>
              </motion.div>
            </motion.div>

            {/* Hero Visual — slides in from the right */}
            <motion.div
              className="flex-1 relative mt-3.5 md:mt-0"
              variants={imageVariant}
              initial="hidden"
              animate="show"
            >
              <div className="relative z-10 w-full hidden md:block">
                <img
                  src={laptopMockup}
                  alt="ReferNow Platform Mockup"
                  className="w-full h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                />
              </div>

              <div className="flex-1 w-full md:hidden">
                <div className="w-full h-50 md:h-200 flex justify-end">
                  <img
                    src={howItWorksImage}
                    alt="Professional using ReferNow"
                    className="h-full w-full rounded-sm md:rounded-lg object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>


      {/* Video Demo Modal */}
      {showDemo && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowDemo(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition"
              aria-label="Close demo video"
            >
              <X className="h-5 w-5" />
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}?autoplay=1&rel=0`}
              title="ReferNow Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
