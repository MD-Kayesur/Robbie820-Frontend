import React from "react";
 import ScrollAmination from "./ScrollAmination";

const ScrollAnimationSection: React.FC = () => {
    const services = [
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
                    <ScrollAmination 
                        key={index} 
                        title={service.title} 
                        description={service.description} 
                    />
                ))}
            </div>
        </section>
    );
};

export default ScrollAnimationSection;
