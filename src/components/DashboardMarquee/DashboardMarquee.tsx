import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import superAdminImg from "@/assets/super_admin.png";
import referrerImg from "@/assets/referrer.png";
import brokerImg from "@/assets/broker.png";

const DashboardMarquee = () => {
    const screens = [
        superAdminImg,
        referrerImg,
        brokerImg,
        superAdminImg,
        referrerImg,
        brokerImg
    ];

    return (
        <section className="pb-24 pt-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0F172A] mb-6">
                        Stop Losing Money To <span className="text-sky-500">Manual Processes</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
                        Manual Tracking Leads To Missed Commissions, Delays, And Costly Disputes.
                        Automate Everything In One Transparent System.
                    </p>
                </motion.div>
            </div>

            <div className="relative">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white to-transparent z-10" />

                <Marquee speed={50} gradient={false} pauseOnHover={true}>
                    <div className="flex gap-8 py-4 px-4">
                        {screens.map((img, idx) => (
                            <div
                                key={idx}
                                className="w-[600px] aspect-[16/10] rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_70px_rgba(14,165,233,0.15)] transition-all duration-500 group"
                            >
                                <img
                                    src={img}
                                    alt={`Dashboard Screen ${idx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        ))}
                    </div>
                </Marquee>
            </div>

            <div className="flex justify-center mt-16 scale-125">
                <div className="bg-sky-500 text-white px-6 py-2 rounded-lg font-black tracking-tighter flex items-center gap-2 shadow-xl shadow-sky-500/20">
                    <span className="text-xl">1762</span>
                    <div className="flex flex-col gap-0.5">
                        <div className="w-4 h-0.5 bg-white/50 rounded-full"></div>
                        <div className="w-4 h-0.5 bg-white rounded-full"></div>
                        <div className="w-4 h-0.5 bg-white/50 rounded-full"></div>
                    </div>
                    <span className="text-xl">505</span>
                </div>
            </div>
        </section>
    );
};

export default DashboardMarquee;
