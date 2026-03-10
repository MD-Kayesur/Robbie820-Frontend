import {
  Calculator,
  Users,
  ShieldCheck,
  Bell,
  BarChart3,
  Link as LinkIcon,
} from "lucide-react";
import CommonWrapper from "../CommonWrapper/CommonWrapper";

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
    <section id="features" className="bg-[#FAFAFA] py-24 md:py-28">
      <CommonWrapper className="px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#12A8F5] md:text-4xl">
            Everything You Need To Manage Referrals
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#475569] md:text-base">
            Powerful Features Designed For Brokers, Referral Partners,
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-[#D8E7FF] bg-white px-5 py-5 md:px-6 md:py-6"
            >
              <div
                className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${feature.color}`}
              >
                <feature.icon className="h-5 w-5 stroke-[1.9]" />
              </div>

              <h3 className="mb-3 text-[18px] font-semibold leading-6 tracking-[-0.02em] text-[#111827]">
                {feature.title}
              </h3>

              <p className="text-sm leading-7 text-[#6B7280]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </CommonWrapper>
    </section>
  );
};

export default FeaturesSection;
