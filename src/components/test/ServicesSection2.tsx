 



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

             const targetLine = windowHeight * 0.9; 

            // এলিমেন্টের উপরের প্রান্ত থেকে টার্গেট লাইন পর্যন্ত দূরত্ব
            const distanceToTarget = targetLine - rect.top; 

            // মোট স্ক্রল রেঞ্জ যা ইফেক্ট ঘটাবে (এলিমেন্টের উচ্চতা)
            const totalScrollRange = rect.height; 
            
            // 0 থেকে 1 এর মধ্যে প্রগ্রেস হিসাব
            // Progress calculation between 0 and 1
            const progress = distanceToTarget / totalScrollRange;

            // প্রগ্রেসকে 0% এবং 100% এর মধ্যে সীমাবদ্ধ করুন
            const clampedProgress = Math.max(0, Math.min(1, progress));
            
            // দৃশ্যমান অক্ষর সংখ্যা গণনা
            const targetVisibleChars = Math.floor(description.length * clampedProgress);

            setVisibleChars(targetVisibleChars);
        };

        // কম্পোনেন্ট মাউন্ট হওয়ার সময় স্ক্রল লিসেনার যোগ করা
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // initial check

        // কম্পোনেন্ট আনমাউন্ট হওয়ার সময় লিসেনার অপসারণ
        return () => window.removeEventListener("scroll", handleScroll);
    }, [description]);

    return (
        // Tailwind CSS classes for styling
        <div ref={ref} className="p-6 text-center border-b border-gray-200">
            <h2 className="text-3xl font-extrabold mb-4 text-gray-800">{title}</h2>
            <p className="text-lg leading-relaxed">
                {description.split("").map((char, idx) => (
                    <span
                        key={idx}
                        style={{
                            // মসৃণ কালার পরিবর্তনের জন্য ট্রানজিশন
                            transition: "color 0.6s ease-in-out",
                            // দৃশ্যমান/আলোকিত অক্ষরের রঙ: indigo-600
                            // অদৃশ্য/অনুজ্জ্বল অক্ষরের রঙ: gray-400
                            color: idx < visibleChars ? "#4f46e5" : "#9ca3af", 
                            // টেক্সট যাতে স্পেস হিসেবে রেন্ডার হয়
                            whiteSpace: 'pre-wrap' 
                        }}
                    >
                        {char}
                    </span>
                ))}
            </p>
        </div>
    );
};

// ServicesSection কম্পোনেন্ট (যেটি সব সার্ভিসকে একত্রিত করে)
const ServicesSection: React.FC = () => {
    // সার্ভিসগুলির ডেটা
    const services = [
        // .repeat(15) ব্যবহার করা হয়েছে যাতে স্ক্রল করার জন্য যথেষ্ট কন্টেন্ট থাকে
        { 
            title: "Web Development", 
            description: "We build fast, modern, and scalable web applications. We focus on performance and robust architecture.".repeat(15) 
        },
        { 
            title: "UI/UX Design", 
            description: "Creating intuitive and beautiful user experiences. Design is about solving problems elegantly.".repeat(15) 
        },
        { 
            title: "SEO Optimization", 
            description: "Boosting your site’s visibility on search engines. Get discovered by the right audience at the right time.".repeat(15) 
        },
    ];

    return (
        <section className="py-20 bg-white min-h-screen">
            <div className="max-w-4xl mx-auto grid gap-20">
                <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-10">Our Services</h1>
                {services.map((service, index) => (
                    <Service 
                        key={index} 
                        title={service.title} 
                        description={service.description} 
                    />
                ))}
            </div>
        </section>
    );
};

export default ServicesSection;
