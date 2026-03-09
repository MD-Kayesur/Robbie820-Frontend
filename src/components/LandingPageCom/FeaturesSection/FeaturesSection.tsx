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
    color: "bg-purple-50 text-purple-500",
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
    color: "bg-blue-50 text-blue-500",
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
    <section id="features" className="py-32 bg-slate-50/50 clash">
      <CommonWrapper className="px-6 lg:px-[150px]">
        {/* Header content */}
        <div className="text-center mb-24   mx-auto">
          <h2 className="text-4xl md:text-5xl font-normal text-sky-500 tracking-tight mb-6">
            Everything You Need To Manage Referrals
          </h2>
          <p className="text-xl text-black font-normal leading-relaxed">
            Powerful Features Designed For Brokers, Referral Partners, And Team Members.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-500 group"
            >
              <div
                className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-normal text-black tracking-tight mb-4   transition-colors">
                {feature.title}
              </h3>
              <p className="text-black font-normal leading-relaxed text-[15px]">
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

