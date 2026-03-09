import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import laptopMockup from "@/assets/landingpage/image.png";
import CommonWrapper from "../CommonWrapper/CommonWrapper";
import bglight from "@/assets/landingpage/image copy 4.png";
interface HeroProps {
    onGetStarted: () => void;
    className?: string;
}


const Hero = ({ onGetStarted }: HeroProps) => {
    return (
        <main className="relative clash">
            <CommonWrapper className={"pt-54 pb-16 md:pl-[150px]"}>
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-200 h-200 bg-sky-100/40 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-150 h-150 bg-blue-50/50 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4" />

                <div className=" mx-auto flex flex-col lg:flex-row items-center ">
                    {/* Hero Text content */}
                    <div
                        className="flex-1  text-center lg:text-left space-y-10 bg-no-repeat bg-left-top bg-contain"
                        style={{ backgroundImage: `url(${bglight})` }}
                    >
                        <div className="space-y-6">
                            <h1 className="text-2xl md:text-3xl lg:text-5xl font-normal leading-none tracking-tight text-[#0F172A]">
                                Automate Referral  Commissions <br className="hidden lg:block" /> With{" "}

                                <span className="text-black inline-block mt-2">
                                    Complete Accuracy
                                </span>
                            </h1>

                            <p className="text-xl md:text-xl text-black max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                                Eliminate Manual Tracking And Commission Disputes. Our Platform
                                Connects Brokers, And Referral Partners With Transparent,
                                Automated Commission Management.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                            <Button
                                onClick={onGetStarted}
                                className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white font-normal h-16 px-12 rounded-2xl text-xl shadow-2xl shadow-sky-500/30 hover:-translate-y-1 transition-all duration-300 active:scale-95"
                            >
                                Get Started
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto bg-white hover:bg-slate-50  hover:text-sky-500 font-normal h-16 px-12 rounded-2xl text-xl border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 active:scale-95"
                            >
                                Watch Demo
                            </Button>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 text-slate-500 font-normal">
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
