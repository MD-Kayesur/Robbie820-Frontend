import { Lock, EyeOff, Shield, FileText } from "lucide-react";
import securityImage from "../../../../assets/landing-page/security_compliance.jpg";

const securityFeatures = [
  {
    title: "Role-Based Access Control",
    description:
      "Each User Sees Only What They're Authorized To Access. Sensitive Financial Data Stays Protected.",
    icon: Lock,
    color: "bg-[#60A5FA26] text-[#0E4181]",
  },
  {
    title: "Privacy-First Design",
    description:
      "Referral Partners See Their Earnings Without Accessing Confidential Loan Details Or Client Information.",
    icon: EyeOff,
    color: "bg-[#16A34A26] text-[#03722C]",
  },
  {
    title: "Encrypted Data Storage",
    description:
      "All Data Is Encrypted At Rest And In Transit Using Industry-Standard Protocols.",
    icon: Shield,
    color: "bg-[#903AFA26] text-[#9B4DFB]",
  },
  {
    title: "Compliance Ready",
    description:
      "Every Referral Logged With Audit Trails, Agreement Storage, And Document Uploads For Compliance.",
    icon: FileText,
    color: "bg-[#FB923C26] text-[#D26D1A]",
  },
];

const SecurityCompliance = () => {
  return (
    <section id="reviews" className="py-30 bg-[#F7F7F7] overflow-hidden">
      <div className="mx-auto md:px-20 lg:px-37.5">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-45">
          {/* Left content: Image */}
          <div className="flex-1 relative order-2 lg:order-1">
            <div className="relative z-10 w-full h-200">
              <img
                src={securityImage}
                alt="Security and Compliance"
                className="relative z-10 w-full h-full rounded-lg object-cover"
              />
            </div>
          </div>

          {/* Right content: Features */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="mb-16">
              <h2 className="text-3xl mb-8 leading-none font-medium tracking-tight text-[#12A8F5] md:text-4xl">
                Built For Security & Compliance
              </h2>
              <p className="text-black max-w-xl leading-none text-lg">
                Your Financial Data Deserves Enterprise-Grade Protection. We
                Take Security Seriously So You Can Focus On Growing Your
                Business.
              </p>
            </div>

            <div className="space-y-10">
              {securityFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-6.5 group">
                  <div
                    className={`${feature.color} rounded-2xl p-3 flex items-center justify-center shrink-0`}
                  >
                    <feature.icon size={40} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg leading-none font-semibold text-black">
                      {feature.title}
                    </h3>
                    <p className="text-black leading-7 max-w-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityCompliance;
