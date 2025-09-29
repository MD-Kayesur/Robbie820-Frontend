import React, { useEffect, useRef, useState } from "react";

interface ServiceProps {
    title: string;
    description: string;
}

const Service: React.FC<ServiceProps> = ({ title, description }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visibleChars, setVisibleChars] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate fraction of text visible
            const visibleFraction = Math.max(0, Math.min(1, (windowHeight - rect.top) / rect.height));
            const targetVisibleChars = Math.floor(description.length * visibleFraction);

            // Smooth transition over time (~5 seconds)
            setVisibleChars((prev) => {
                const diff = targetVisibleChars - prev;
                const step = diff * 0.02; // adjust speed here
                return prev + step;
            });
        };

        const interval = setInterval(handleScroll, 50); // update every 50ms
        handleScroll();

        return () => clearInterval(interval);
    }, [description]);

    return (
        <div ref={ref} className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-base">
                {description.split('').map((char, idx) => (
                    <span
                        key={idx}
                        className={`transition-colors duration-[5000ms] ease-in-out ${idx < Math.floor(visibleChars) ? 'text-indigo-600' : 'text-gray-400'}`}
                    >
                        {char}
                    </span>
                ))}
            </p>
        </div>
    );
};

const ServicesSection: React.FC = () => {
    const services = [
        { title: "Web Development", description: "We build fast, modern, and scalable web applications.".repeat(15) },
        { title: "UI/UX Design", description: "Creating intuitive and beautiful user experiences.".repeat(15) },
        { title: "SEO Optimization", description: "Boosting your site’s visibility on search engines.".repeat(15) },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto grid gap-10">
                {services.map((service, index) => (
                    <Service key={index} title={service.title} description={service.description} />
                ))}
            </div>
        </section>
    );
};

export default ServicesSection;