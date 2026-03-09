import { Button } from "@/components/ui/button";
import laptopMockup from "@/assets/landingpage/image.png";
import CommonWrapper from "../CommonWrapper/CommonWrapper";
import bglight from "@/assets/landingpage/image copy 4.png";
interface HeroProps {
    onGetStarted: () => void;
    className?: string;
}


const Hero = ({ onGetStarted, className }: HeroProps) => {
    return (
        <main className={`relative clash ${className}`}>
            <CommonWrapper className={"pt-32 lg:pt-54 pb-16 md:pl-[150px]"}>
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-200 h-200 bg-sky-100/40 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-150 h-150 bg-blue-50/50 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4" />

                <div className=" mx-auto flex flex-col lg:flex-row items-center ">
                    {/* Hero Text content */}
                    <div
                        className="flex-1 text-center lg:text-left space-y-8 bg-no-repeat bg-left-top bg-contain lg:pr-10"
                        style={{ backgroundImage: `url(${bglight})` }}
                    >
                        <div className="space-y-6">
                            <h1 className="text-[32px] md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-[#0F172A]">
                                Automate Referral Commissions <br />
                                <span className="text-sky-500">
                                    With Complete Accuracy
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                                Eliminate manual tracking and commission disputes. Our platform
                                connects brokers and referral partners with transparent,
                                automated commission management.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Button
                                onClick={onGetStarted}
                                className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white font-medium h-14 md:h-16 px-12 rounded-2xl text-lg shadow-xl shadow-sky-500/25 transition-all duration-300 active:scale-95"
                            >
                                Get Started
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto bg-white hover:bg-slate-50 hover:text-sky-500 font-medium h-14 md:h-16 px-12 rounded-2xl text-lg border-slate-200 shadow-sm transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 6.707v10.586a1 1 0 001.529.852l7.712-5.293a1 1 0 000-1.704L8.53 5.855A1 1 0 007 6.707z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Watch Demo
                            </Button>
                        </div>

                        <div className="text-slate-500 text-sm md:text-base font-normal">
                            No credit card required · 14-day free trial
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
