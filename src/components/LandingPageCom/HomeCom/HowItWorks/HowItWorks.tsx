import howItWorksImage from "../../../../assets/how_it_works_refernow.png";

const steps = [
  {
    number: "1",
    title: "Sign Up & Choose Plan",
    description:
      "Create your account and select the subscription plan that fits your business needs.",
  },
  {
    number: "2",
    title: "Track & Manage Deals",
    description:
      "Referral partners submit deals; brokers track progress, update agreements, referrers.",
  },
  {
    number: "3",
    title: "Auto-Calculate Commissions",
    description:
      "Our system automatically calculates accurate commissions based on deal parameters.",
  },
  {
    number: "4",
    title: "Track & Get Paid",
    description:
      "Track referral earnings in real-time while brokers handle payments directly.",
  },
];

const HexagonIcon = ({ number }: { number: string }) => (
  <div className="relative w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
    <svg
      viewBox="0 0 100 115"
      className="absolute inset-0 w-full h-full text-sky-500 drop-shadow-md"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
        fill="currentColor"
      />
      <path
        d="M50 5 L88.3 27 L88.3 73 L50 95 L11.7 73 L11.7 27 Z"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeOpacity="0.2"
      />
    </svg>
    <span className="relative z-10 text-2xl font-black text-white">
      {number}
    </span>
  </div>
);

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left content: Steps */}
          <div className="flex-1">
            <div className="mb-8 ">
              <h2 className="text-[28px] font-medium tracking-tight text-[#12A8F5] md:text-[36px]">
                How ReferNow Works
              </h2>

              <p className="mt-2 text-sm text-[#334155] md:text-base">
                From Signup To Payout In Four Simple Steps
              </p>

              <div className="mt-8 h-px w-full bg-[#E5E7EB]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-13">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-start group">
                  <div className="mb-6">
                    <HexagonIcon number={step.number} />
                  </div>
                  <h3 className="text-lg font-semibold text-black tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-black leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right content: Image */}
          <div className="flex-1 relative">
            <div className="relative z-10 w-full group">
              <div className="absolute inset-0 bg-sky-500/20 rounded-[2.5rem] -rotate-3 transition-transform duration-500 group-hover:rotate-0" />
              <img
                src={howItWorksImage}
                alt="Professional using ReferNow"
                className="relative z-10 w-full h-auto rounded-[2.5rem] shadow-2xl shadow-sky-500/10 object-cover aspect-4/5 lg:aspect-auto"
              />
            </div>

            {/* Decorative background shape */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-100 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-50 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
