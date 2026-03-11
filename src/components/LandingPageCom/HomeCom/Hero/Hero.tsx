import laptopMockup from "@/assets/landing-page/image.png";
import bgLight from "@/assets/landing-page/image copy 4.jpg";
import { Check } from "lucide-react";
interface HeroProps {
  onGetStarted: () => void;
  className?: string;
}

const Hero = ({ onGetStarted, className }: HeroProps) => {
  return (
    <main
      className={`relative ${className}`}
      style={{ backgroundImage: `url(${bgLight})` }}
    >
      <div className="pt-20 sm:pt-37 md:pl-37.5">
        <div className=" mx-auto flex flex-col lg:flex-row items-center ">
          {/* Hero Text content */}
          <div className="flex-1 text-center lg:text-left bg-no-repeat bg-top-left bg-contain lg:pr-10">
            <div className="space-y-11 mb-16">
              <h1 className="text-[32px] md:text-4xl lg:text-[56px] font-medium leading-16 tracking-tight text-[#0F172A]">
                Automate Referral Commissions <br />
                With
                <span className="text-sky-500"> Complete Accuracy</span>
              </h1>

              <p className="text-lg md:text-xl text-[#504F4F] max-w-4xl mx-auto lg:mx-0">
                Eliminate manual tracking and commission disputes. Our platform
                connects brokers and referral partners with transparent,
                automated commission management.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-10">
              <button
                onClick={onGetStarted}
                className="py-3 px-6 bg-[#00B4FE] hover:bg-sky-600 text-black rounded-lg text-lg"
              >
                Get Started
              </button>
              <button className="py-3 px-6 bg-white hover:bg-slate-50 hover:text-sky-500 rounded-lg text-lg border border-slate-200">
                Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-4 text-black md:text-base">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span className="text-[#00B4FE] text-lg">
                  No credit card required
                </span>
              </span>

              <span className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span className="text-[#00B4FE] text-lg">
                  14-day free trial
                </span>
              </span>
            </div>
          </div>

          {/* Hero Visual contents */}
          <div className="flex-1 relative">
            <div className="relative z-10 w-full hover:scale-[1.02] transition-transform duration-700 ease-out">
              <img
                src={laptopMockup}
                alt="ReferNow Platform Mockup"
                className="w-full h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
              />
            </div>

            {/* Decorative background shape */}
            <div className="absolute -top-10 -right-10 w-full h-full bg-sky-400/10 rounded-[3rem] -z-10 rotate-3" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
