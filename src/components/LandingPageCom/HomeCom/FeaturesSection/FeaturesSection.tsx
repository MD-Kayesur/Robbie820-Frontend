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
      "Backend-driven calculations ensure 100% accuracy. No more disputes or manual errors.",
    icon: Calculator,
    color: "bg-sky-50 text-sky-500",
  },
  {
    title: "Role-Based Dashboards",
    description:
      "Customized, role-based dashboards designed for brokers, referrers, and team members.",
    icon: Users,
    color: "bg-violet-50 text-violet-500",
  },
  {
    title: "Secure Referral Management",
    description:
      "Enterprise-grade security with role-based access control and encrypted data storage.",
    icon: ShieldCheck,
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    title: "Real-Time Notifications",
    description:
      "Stay updated with instant email and SMS alerts for deal progress and commission updates.",
    icon: Bell,
    color: "bg-orange-50 text-orange-500",
  },
  {
    title: "Reporting & Insights",
    description:
      "Track referrals with year-over-year trends, flexible dates, and exportable analytics.",
    icon: BarChart3,
    color: "bg-indigo-50 text-indigo-500",
  },
  {
    title: "Lead Management",
    description:
      "Automatically sync referral leads to your CRM via API and Zapier for seamless tracking and follow-ups.",
    icon: LinkIcon,
    color: "bg-pink-50 text-pink-500",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="bg-[#FAFAFA] py-6 md:py-33 mx-4.5 md:mx-0"
    >
      <div className="mx-auto md:px-20 lg:px-37.5">
        <div className="mx-auto mb-6 md:mb-16 max-w-3xl text-center">
          <h2 className="text-lg leading-5 font-medium md:leading-none mb-2 md:mb-8 text-[#12A8F5] md:text-[34px]">
            Everything You Need To Manage Referrals
          </h2>

          <p className="mx-auto max-w-2xl text-black text-sm md:text-lg md:leading-none">
            Powerful Features Designed For Brokers, Referral Partners.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-[#D8E7FF] bg-white p-4.5 md:p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-default"
            >
              <div
                className={`mb-4 md:mb-6 inline-flex p-3 items-center justify-center rounded-xl ${feature.color}`}
              >
                <feature.icon size={40} />
              </div>

              <h3 className="text-sm md:text-xl font-semibold text-[#111827] mb-4 leading-none md:mb-6">
                {feature.title}
              </h3>

              <p className="text-xs md:text-base md:leading-7 text-[#6B7280]">
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
