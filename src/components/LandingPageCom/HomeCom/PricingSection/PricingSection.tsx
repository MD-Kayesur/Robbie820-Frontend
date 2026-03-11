import { useState } from "react";
import { Check } from "lucide-react";

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
    <section id="pricing" className="py-30 bg-white relative overflow-hidden">
      {/* Background Grid and Rectify decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Thin grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />

        {/* Decorative border squares */}
        <div className="absolute top-[20%] left-[5%] w-32 h-32 border border-sky-100 rounded-3xl" />
        <div className="absolute top-[60%] left-[2%] w-24 h-24 border border-blue-50 rounded-2xl" />
        <div className="absolute bottom-[10%] left-[8%] w-40 h-40 border border-purple-50 rounded-[2.5rem]" />
        <div className="absolute top-[15%] right-[5%] w-36 h-36 border border-sky-50 rounded-4xl" />
        <div className="absolute bottom-[20%] right-[3%] w-28 h-28 border border-blue-100 rounded-2xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-medium leading-none text-[#12A8F5] md:text-[34px] mb-8">
            How ReferNow Works
          </h2>
          <p className="mx-auto max-w-2xl md:text-lg text-black mb-6">
            Choose The Plan That Fits Your Business. No Hidden Fees.
          </p>

          {/* Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-[#F5F6F9] text-sm p-2 rounded-full gap-2.5 flex items-center border border-slate-200">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-8 py-4 rounded-full ${
                  billingCycle === "monthly"
                    ? "bg-[#00B4FE] text-white shadow-lg"
                    : "text-[#909090]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-8 py-4 rounded-full ${
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8.5">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-2xl py-8.5 px-6 flex flex-col ${
                plan.popular
                  ? "border-3 border-[#00B4FE]"
                  : "border border-[#D9D9D9]"
              }`}
            >
              {plan.popular && (
                <div className="absolute border-3 border-[#D9D9D9] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F97316] text-white uppercase py-1.5 px-3.5 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6 space-y-5.5">
                <h3 className={`text-lg text-[#8267EC]`}>{plan.name}</h3>
                <p className="text-black text-lg leading-8">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1 text-black">
                  <span className="text-[34px] font-bold tracking-tight">
                    {billingCycle === "monthly"
                      ? plan.monthlyPrice
                      : plan.yearlyPrice}
                  </span>

                  {(billingCycle === "monthly"
                    ? plan.monthlyPrice
                    : plan.yearlyPrice
                  ).includes("$") && (
                    <span className="font-lg">
                      /{billingCycle === "monthly" ? "Month" : "Year"}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-20 grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="text-emerald-500 shrink-0 mt-0.5 stroke-[3px]"
                    />
                    <span className="text-lg text-[#616161] leading-7.5">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-lg bg-[#00B4FE] text-white`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
