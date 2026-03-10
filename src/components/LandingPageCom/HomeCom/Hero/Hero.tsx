import { Button } from "@/components/ui/button";
import laptopMockup from "@/assets/landingpage/image.png";
import CommonWrapper from "../CommonWrapper/CommonWrapper";
import bglight from "@/assets/landingpage/image copy 4.png";
import { Check } from "lucide-react";
interface HeroProps {
  onGetStarted: () => void;
  className?: string;
}

const Hero = ({ onGetStarted, className }: HeroProps) => {
  return (
    <main className={`relative ${className}`}>
      <CommonWrapper className={"pt-32 lg:pt-54 md:pl-37.5"}>
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-200 h-200 bg-sky-100/40 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-150 h-150 bg-bl ue-50/50 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4" />

        <div className=" mx-auto flex flex-col lg:flex-row items-center ">
          {/* Hero Text content */}
          <div
            className="flex-1 text-center lg:text-left space-y-8 bg-no-repeat bg-top-left bg-contain lg:pr-10"
            style={{ backgroundImage: `url(${bglight})` }}
          >
            <div className="space-y-6">
              <h1 className="text-[32px] md:text-4xl lg:text-[56px] font-medium leading-16 tracking-tight text-[#0F172A]">
                Automate Referral Commissions <br />
                With
                <span className="text-sky-500"> Complete Accuracy</span>
              </h1>

              <p className="text-lg md:text-xl text-[#504F4F] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Eliminate manual tracking and commission disputes. Our platform
                connects brokers and referral partners with transparent,
                automated commission management.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                onClick={onGetStarted}
                className="w-full sm:w-auto bg-[#00B4FE] hover:bg-sky-600 text-black font-medium h-14 md:h-16 px-12 rounded-2xl text-lg shadow-xl shadow-sky-500/25 transition-all duration-300 active:scale-95"
              >
                Get Started
              </Button>
              <Button className="w-full sm:w-auto bg-white hover:bg-slate-50 hover:text-sky-500 font-medium h-14 md:h-16 px-12 rounded-2xl text-lg border-2 border-slate-200 transition-all duration-300">
                Watch Demo
              </Button>
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
      </CommonWrapper>
    </main>
  );
};

export default Hero;
