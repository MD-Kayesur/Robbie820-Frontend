import howItWorksImage from "@/assets/landing-page/how_it_works.webp";
import simplification1 from "@/assets/landing-page/Simplification-1.svg";
import simplification2 from "@/assets/landing-page/Simplification-2.svg";
import simplification3 from "@/assets/landing-page/Simplification-3.svg";
import simplification4 from "@/assets/landing-page/Simplification-4.svg";

const steps = [
  {
    icon: simplification1,
    title: "Sign Up & Choose Plan",
    description:
      "Create your account and select the subscription plan that fits your business needs.",
  },
  {
    icon: simplification2,
    title: "Track & Manage Deals",
    description:
      "Referral partners submit deals; brokers track progress, update agreements, referrers.",
  },
  {
    icon: simplification3,
    title: "Auto-Calculate Commissions",
    description:
      "Our system automatically calculates accurate commissions based on deal parameters.",
  },
  {
    icon: simplification4,
    title: "Track & Get Paid",
    description:
      "Track referral earnings in real-time while brokers handle payments directly.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="md:mx-auto overflow-hidden bg-white py-11 md:py-33 md:px-20 lg:px-37.5"
    >
      <div className="flex md:flex-col items-start flex-col-reverse gap-6 md:gap-16 lg:flex-row lg:gap-45 px-4.5 md:px-0">
        {/* Left content: Steps */}
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-6 md:mb-16">
            <h2 className="text-xl leading-5 font-medium md:leading-none mb-3 md:mb-8 text-[#12A8F5] md:text-[34px]">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-2xl text-black text-sm md:text-lg md:leading-none">
              From Signup To Payout In Four Simple Steps
            </p>
            <div className="hidden md:block mt-8 h-px w-full bg-[#E5E7EB]" />
          </div>

          <div className="grid grid-cols-1 gap-5 md:gap-13.5 md:grid-cols-2">
            {steps.map((step, idx) => (
              <div key={idx} className="group flex flex-col items-start">
                <div className="mb-2.5 md:mb-6">
                  <img
                    src={step.icon}
                    alt={`Step ${idx + 1}`}
                    className="h-11 w-11 md:h-16 md:w-16 object-contain"
                  />
                </div>

                <h3 className="mb-1 md:mb-3.5 text-sm sm:text-lg font-semibold tracking-tight text-black">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm leading-relaxed text-black">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right content: Image */}
        <div className="flex-1 w-full">
          <div className="w-full h-50 md:h-200 flex justify-end">
            <img
              src={howItWorksImage}
              alt="Professional using ReferNow"
              className="h-full w-full rounded-sm md:rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;