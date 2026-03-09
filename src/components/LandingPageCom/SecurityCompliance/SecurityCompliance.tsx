import { motion } from "framer-motion";
import { Lock, EyeOff, Shield, FileText } from "lucide-react";
import securityImage from "../../../assets/security_compliance.png";

const securityFeatures = [
  {
    title: "Role-Based Access Control",
    description:
      "Each User Sees Only What They're Authorized To Access. Sensitive Financial Data Stays Protected.",
    icon: Lock,
    color: "bg-blue-50 text-blue-500",
  },
  {
    title: "Privacy-First Design",
    description:
      "Referral Partners See Their Earnings Without Accessing Confidential Loan Details Or Client Information.",
    icon: EyeOff,
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    title: "Encrypted Data Storage",
    description:
      "All Data Is Encrypted At Rest And In Transit Using Industry-Standard Protocols.",
    icon: Shield,
    color: "bg-purple-50 text-purple-500",
  },
  {
    title: "Compliance Ready",
    description:
      "Every Referral Logged With Audit Trails, Agreement Storage, And Document Uploads For Compliance.",
    icon: FileText,
    color: "bg-orange-50 text-orange-500",
  },
];

const SecurityCompliance = () => {
  return (
    <section id="reviews" className="py-24 bg-slate-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left content: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 relative order-2 lg:order-1"
          >
            <div className="relative z-10 w-full group">
              <div className="absolute inset-0 bg-slate-200/50 rounded-[2.5rem] rotate-2 transition-transform duration-500 group-hover:rotate-0" />
              <img
                src={securityImage}
                alt="Security and Compliance"
                className="relative z-10 w-full h-auto rounded-[2.5rem] shadow-2xl shadow-slate-200/20 object-cover aspect-square"
              />
            </div>

            {/* Decorative background shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full blur-[100px] -z-10 opacity-50" />
          </motion.div>

          {/* Right content: Features */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="mb-14">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-black text-sky-500 tracking-tight mb-4"
              >
                Built For Security & Compliance
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl"
              >
                Your Financial Data Deserves Enterprise-Grade Protection. We
                Take Security Seriously So You Can Focus On Growing Your
                Business.
              </motion.p>
            </div>

            <div className="space-y-8">
              {securityFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-start gap-6 group"
                >
                  <div
                    className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                  >
                    <feature.icon size={26} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-sky-500 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 font-bold leading-relaxed text-[15px] max-w-lg">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityCompliance;
