import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
    {
        name: "Starter",
        price: "$49",
        description: "Perfect for individual brokers",
        features: [
            "Up to 25 active deals",
            "5 referral partners",
            "$5 per additional referral partner",
            "Automated calculations",
            "Email notifications",
            "Basic reporting"
        ],
        buttonText: "Start Free Trial",
        popular: false
    },
    {
        name: "Professional",
        price: "$149",
        description: "For growing brokerages",
        features: [
            "Up to 100 active deals",
            "Unlimited referral partners",
            "Advanced automation",
            "Email & SMS notifications",
            "Advanced reporting & exports",
            "Priority support",
            "Start Free Trial"
        ],
        buttonText: "Start Free Trial",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large organizations",
        features: [
            "contact sales",
            "Unlimited deals",
            "Unlimited users",
            "Custom integrations",
            "White-label options",
            "Dedicated account manager",
            "24/7 premium support"
        ],
        buttonText: "Contact Sales",
        popular: false
    }
];

const PricingSection = () => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <section id="pricing" className="py-24 bg-white relative overflow-hidden">
            {/* Background Grid and Rectify decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Thin grid lines */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)`,
                        backgroundSize: '100px 100px'
                    }} />

                {/* Decorative border squares */}
                <div className="absolute top-[20%] left-[5%] w-32 h-32 border border-sky-100 rounded-3xl" />
                <div className="absolute top-[60%] left-[2%] w-24 h-24 border border-blue-50 rounded-2xl" />
                <div className="absolute bottom-[10%] left-[8%] w-40 h-40 border border-purple-50 rounded-[2.5rem]" />
                <div className="absolute top-[15%] right-[5%] w-36 h-36 border border-sky-50 rounded-[2rem]" />
                <div className="absolute bottom-[20%] right-[3%] w-28 h-28 border border-blue-100 rounded-2xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-black text-sky-500 tracking-tight mb-4"
                    >
                        How ReferNow Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg text-slate-500 font-bold mb-10"
                    >
                        Choose The Plan That Fits Your Business. No Hidden Fees.
                    </motion.p>

                    {/* Toggle */}
                    <div className="flex justify-center mb-16">
                        <div className="bg-slate-100 p-1 rounded-full flex items-center shadow-inner border border-slate-200">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${billingCycle === 'monthly'
                                    ? 'bg-sky-500 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${billingCycle === 'yearly'
                                    ? 'bg-sky-500 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                Yearly
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className={`relative bg-white rounded-[2.5rem] p-10 border-2 transition-all duration-500 hover:shadow-2xl flex flex-col ${plan.popular
                                ? 'border-sky-500 shadow-xl shadow-sky-500/10 scale-105 z-10'
                                : 'border-slate-100 shadow-lg hover:-translate-y-2'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-[11px] font-black uppercase tracking-widest py-1.5 px-6 rounded-full shadow-lg shadow-orange-500/30">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className={`text-xl font-bold mb-4 ${plan.popular ? 'text-sky-500' : 'text-slate-400'}`}>
                                    {plan.name}
                                </h3>
                                <p className="text-slate-700 font-bold mb-6">
                                    {plan.description}
                                </p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-slate-900 tracking-tight">
                                        {plan.price}
                                    </span>
                                    {plan.price.includes('$') && (
                                        <span className="text-slate-400 font-bold">/Month</span>
                                    )}
                                </div>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-3">
                                        <Check size={18} className="text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                                        <span className="text-[15px] font-bold text-slate-500 leading-tight">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full h-14 rounded-xl text-lg font-bold transition-all duration-300 ${plan.popular
                                    ? 'bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/25'
                                    : 'bg-sky-500 hover:bg-sky-600 text-white'
                                    }`}
                            >
                                {plan.buttonText}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
