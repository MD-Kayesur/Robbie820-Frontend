import {
  Calculator,
  Users,
  ShieldCheck,
  Bell,
  BarChart3,
  Link as LinkIcon,
} from "lucide-react";

const features = [
  {
    title: "Automated Commission Calculation",
    description:
      "Backend-Driven Calculations Ensure 100% Accuracy. No More Disputes Or Manual Errors.",
    icon: Calculator,
    color: "bg-sky-50 text-sky-500",
  },
  {
    title: "Role-Based Dashboards",
    description:
      "Customized, Role-Based Dashboards Designed For Brokers, Referrers, And Team Members.",
    icon: Users,
    color: "bg-violet-50 text-violet-500",
  },
  {
    title: "Secure Referral Management",
    description:
      "Enterprise-Grade Security With Role-Based Access Control And Encrypted Data Storage.",
    icon: ShieldCheck,
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    title: "Real-Time Notifications",
    description:
      "Stay Updated With Instant Email And SMS Alerts For Deal Progress And Commission Updates.",
    icon: Bell,
    color: "bg-orange-50 text-orange-500",
  },
  {
    title: "Reporting & Insights",
    description:
      "Track Referrals With Year-Over-Year Trends, Flexible Dates, And Exportable Analytics.",
    icon: BarChart3,
    color: "bg-indigo-50 text-indigo-500",
  },
  {
    title: "Lead Management",
    description:
      "Automatically Sync Referral Leads To Your CRM Via API And Zapier For Seamless Tracking And Follow-Ups.",
    icon: LinkIcon,
    color: "bg-pink-50 text-pink-500",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="bg-[#FAFAFA] py-6 sm:py-33 mx-4.5 sm:mx-0"
    >
      <div className="mx-auto md:px-20 lg:px-37.5">
        <div className="mx-auto mb-6 sm:mb-16 max-w-3xl text-center">
          <h2 className="text-lg leading-5 font-medium sm:leading-none mb-2 sm:mb-8 text-[#12A8F5] md:text-[34px]">
            Everything You Need To Manage Referrals
          </h2>

          <p className="mx-auto max-w-2xl text-black text-sm sm:text-lg sm:leading-none">
            Powerful Features Designed For Brokers, Referral Partners.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-[#D8E7FF] bg-white p-4.5 md:p-6"
            >
              <div
                className={`mb-4 sm:mb-6 inline-flex p-3 items-center justify-center rounded-xl ${feature.color}`}
              >
                <feature.icon size={40} />
              </div>

              <h3 className="text-sm sm:text-xl font-semibold text-[#111827] mb-4 leading-none sm:mb-6">
                {feature.title}
              </h3>

              <p className="text-xs sm:text-base sm:leading-7 text-[#6B7280]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
