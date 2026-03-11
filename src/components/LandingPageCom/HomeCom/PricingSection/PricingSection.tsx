import { useState } from "react";
import { Check } from "lucide-react";
import gridLeft from "@/assets/landing-page/grid-left.png";
import gridRight from "@/assets/landing-page/grid-right.png";

const plans = [
  {
    name: "Starter",
    monthlyPrice: "$49",
    yearlyPrice: "$490",
    description: "Perfect for individual brokers",
    features: [
      "Up to 25 active deals",
      "5 referral partners",
      "$5 per additional referral partner",
      "Automated calculations",
      "Email notifications",
      "Basic reporting",
    ],
    buttonText: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    monthlyPrice: "$149",
    yearlyPrice: "$1490",
    description: "For growing brokerages",
    features: [
      "Up to 100 active deals",
      "Unlimited referral partners",
      "Advanced automation",
      "Email & SMS notifications",
      "Advanced reporting & exports",
      "Priority support",
      "Start Free Trial",
    ],
    buttonText: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    description: "For large organizations",
    features: [
      "contact sales",
      "Unlimited deals",
      "Unlimited users",
      "Custom integrations",
      "White-label options",
      "Dedicated account manager",
      "24/7 premium support",
    ],
    buttonText: "Contact Sales",
    popular: false,
  },
];

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-white sm:py-33 px-13 sm:px-0 py-6 pb-16"
    >
      {/* bottom left grid */}
      <div className="absolute bottom-0 left-0 z-0 w-1/3">
        <img src={gridLeft} alt="" className="w-full h-auto" />
      </div>

      {/* content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-6 sm:mb-16">
          <h2 className="text-xl leading-5 font-medium sm:leading-none mb-3 sm:mb-8 text-[#12A8F5] md:text-[34px]">
            How ReferNow Works
          </h2>
          <p className="mx-auto text-black text-sm sm:text-lg leading-4.5 sm:leading-none mb-6">
            Choose The Plan That Fits Your Business. No Hidden Fees.
          </p>

          {/* Toggle */}
          <div className="flex justify-center">
            <div className="bg-[#F5F6F9] text-[10px] sm:text-sm p-1 sm:p-2 rounded-4xl sm:rounded-full gap-1 sm:gap-2.5 flex items-center border border-slate-200">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`sm:px-8 px-4 py-2 sm:py-4 rounded-full ${
                  billingCycle === "monthly"
                    ? "bg-[#00B4FE] text-white shadow-lg"
                    : "text-[#909090]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`sm:px-8 px-4 py-2 sm:py-4 rounded-full ${
                  billingCycle === "yearly"
                    ? "bg-[#00B4FE] text-white shadow-lg"
                    : "text-[#909090]"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8.5">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-2xl py-5 sm:py-8.5 px-3.5 sm:px-6 flex flex-col ${
                plan.popular
                  ? "border-3 border-[#00B4FE]"
                  : "border border-[#D9D9D9]"
              }`}
            >
              {plan.popular && (
                <div className="absolute border-3 border-[#D9D9D9] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F97316] text-white text-xs sm:text-base uppercase py-1.5 px-3.5 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-3.5 sm:mb-6 space-y-1.5 sm:space-y-5.5">
                <h3 className={`text-xs sm:text-lg text-[#8267EC]`}>
                  {plan.name}
                </h3>
                <p className="text-black text-sm sm:text-lg leading-8">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1 text-black">
                  <span className="text-xl sm:text-[34px] font-bold tracking-tight">
                    {billingCycle === "monthly"
                      ? plan.monthlyPrice
                      : plan.yearlyPrice}
                  </span>

                  {(billingCycle === "monthly"
                    ? plan.monthlyPrice
                    : plan.yearlyPrice
                  ).includes("$") && (
                    <span className="text-sm sm:text-lg">
                      /{billingCycle === "monthly" ? "Month" : "Year"}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-1.5 sm:space-y-4 mb-5 sm:mb-20 grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="text-emerald-500 shrink-0 mt-0.5 stroke-[3px]"
                    />
                    <span className="text-xs sm:text-lg text-[#616161] leading-6 sm:leading-7.5">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2 sm:py-4 rounded-lg bg-[#00B4FE] text-white`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* bottom right grid */}
      <div className="absolute bottom-0 right-0 z-0 w-1/3">
        <img src={gridRight} alt="" className="w-full h-auto" />
      </div>
    </section>
  );
};

export default PricingSection;
