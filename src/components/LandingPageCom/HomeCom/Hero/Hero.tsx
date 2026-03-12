import laptopMockup from "@/assets/landing-page/image.png";
import bgLight from "@/assets/landing-page/image copy 4.jpg";
import { Check, Play } from "lucide-react";
import howItWorksImage from "@/assets/landing-page/zenbook_duo_14.jpg";

interface HeroProps {
  onGetStarted: () => void;
  className?: string;
}

const Hero = ({ onGetStarted, className }: HeroProps) => {
  return (
    <main
      className={`relative ${className} inter px-4.5 md:px-0 pb-6 md:pb-20`}
      style={{ backgroundImage: `url(${bgLight})` }}
    >
      <div className="pt-12 md:pt-37 md:pl-37.5">
        <div className="mx-auto flex flex-col lg:flex-row items-center">
          {/* Hero Text content */}
          <div className="flex-1 md:text-left text-center bg-no-repeat bg-top-left bg-contain lg:pr-10">
            <div className="md:space-y-11 space-y-3 mb-5 md:mb-16">
              <h1 className="text-xl md:text-4xl lg:text-[56px] leading-6 md:leading-16 font-medium text-[#0F172A]">
                Automate Referral Commissions <br />
                With
                <span className="text-sky-500"> Complete Accuracy</span>
              </h1>

              <p className="text-xs md:text-lg md:text-xl text-[#504F4F] md:max-w-4xl mx-auto lg:mx-0">
                Eliminate manual tracking and commission disputes. Our platform
                connects brokers and referral partners with transparent,
                automated commission management.
              </p>
            </div>

            <div className="mb-3 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-center lg:justify-start">
              <button
                onClick={onGetStarted}
                className="w-full rounded-xl bg-[#1DA1E8] md:px-6 md:py-3 py-2 text-sm md:text-lg text-white transition hover:bg-sky-600 md:w-auto md:min-w-55"
              >
                Get Started
              </button>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white md:px-6 md:py-3 py-2 text-sm md:text-lg text-[#111827] transition hover:bg-slate-50 hover:text-sky-500 md:w-auto md:min-w-55">
                <Play className="h-4 w-4" />
                Watch Demo
              </button>
            </div>

            <div className="flex flex-col items-center gap-2 text-center lg:flex-row lg:items-center lg:justify-start lg:gap-4 lg:text-left">
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
            </div>
          </div>

          {/* Hero Visual contents */}
          <div className="flex-1 relative mt-3.5 md:mt-0">
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
