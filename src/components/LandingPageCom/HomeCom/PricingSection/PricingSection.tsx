import { useState } from "react";
import { Check } from "lucide-react";
import gridLeft from "@/assets/landing-page/grid-left.png";
import gridRight from "@/assets/landing-page/grid-right.png";

const plans = [
  {
    name: "Starter",
    monthlyPrice: "$49",
    yearlyPrice: "$490",
    monthlyEquivalent: "$40",
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
    monthlyEquivalent: "$124",
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
    monthlyEquivalent: null,
    description: "For large organizations",
    features: [
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
      className="relative overflow-hidden bg-white md:py-33 px-13 md:px-0 py-6 pb-16"
    >
      {/* bottom left grid */}
      <div className="absolute bottom-0 left-0 z-0 w-1/3">
        <img src={gridLeft} alt="" className="w-full h-auto" />
      </div>

      {/* content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-6 md:mb-16">
          <h2 className="text-xl leading-5 font-medium md:leading-none mb-3 md:mb-8 text-[#12A8F5] md:text-[34px]">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto text-black text-sm md:text-lg leading-4.5 md:leading-none mb-6">
            Choose The Plan That Fits Your Business. No Hidden Fees.
          </p>

          {/* Toggle */}
          <div className="flex justify-center items-center gap-3">
            <div className="bg-[#F5F6F9] text-[10px] md:text-sm p-1 md:p-2 rounded-4xl md:rounded-full gap-1 md:gap-2.5 flex items-center border border-slate-200">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`md:px-8 px-4 py-2 md:py-4 rounded-full transition-all duration-200 ${billingCycle === "monthly"
                  ? "bg-[#00B4FE] text-white shadow-lg"
                  : "text-[#909090]"
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`md:px-8 px-4 py-2 md:py-4 rounded-full transition-all duration-200 ${billingCycle === "yearly"
                  ? "bg-[#00B4FE] text-white shadow-lg"
                  : "text-[#909090]"
                  }`}
              >
                Yearly
              </button>
            </div>
            {/* Save badge — shown next to the toggle */}
            <span className={`text-[10px] md:text-xs font-semibold px-2.5 py-1 rounded-full transition-all duration-300 ${
              billingCycle === "yearly"
                ? "bg-emerald-100 text-emerald-700 opacity-100 scale-100"
                : "opacity-0 scale-90 pointer-events-none"
            }`}>
              Save 16%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8.5">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-2xl py-5 md:py-8.5 px-3.5 md:px-6 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default ${plan.popular
                ? "border-3 border-[#00B4FE]"
                : "border border-[#D9D9D9]"
                }`}
            >
              {plan.popular && (
                <div className="absolute border-3 border-[#D9D9D9] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F97316] text-white text-xs md:text-base uppercase py-1.5 px-3.5 rounded-full text-nowrap">
                  Most Popular
                </div>
              )}

              <div className="mb-3.5 md:mb-6 space-y-1.5 md:space-y-5.5">
                <h3 className={`text-xs md:text-lg text-[#8267EC]`}>
                  {plan.name}
                </h3>
                <p className="text-black text-sm md:text-lg leading-8">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1 text-black">
                  <span className="text-xl md:text-[34px] font-bold tracking-tight">
                    {billingCycle === "monthly"
                      ? plan.monthlyPrice
                      : plan.yearlyPrice}
                  </span>

                  {(billingCycle === "monthly"
                    ? plan.monthlyPrice
                    : plan.yearlyPrice
                  ).includes("$") && (
                      <span className="text-sm md:text-lg">
                        /{billingCycle === "monthly" ? "Month" : "Year"}
                      </span>
                    )}
                </div>

                {/* Monthly equivalent shown in yearly mode */}
                {billingCycle === "yearly" && plan.monthlyEquivalent && (
                  <p className="text-xs md:text-sm text-emerald-600 font-medium">
                    {plan.monthlyEquivalent}/mo — billed annually
                  </p>
                )}
              </div>

              <ul className="space-y-1.5 md:space-y-4 mb-5 md:mb-20 grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="text-emerald-500 shrink-0 mt-0.5 stroke-[3px]"
                    />
                    <span className="text-xs md:text-lg text-[#616161] leading-6 md:leading-7.5">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-2 md:py-4 rounded-lg bg-[#00B4FE] text-white transition-all duration-200 hover:bg-sky-500 hover:shadow-md active:scale-[0.98]"
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
