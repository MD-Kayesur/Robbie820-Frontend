import React, { useEffect, useRef, useState } from "react";

interface ScrollAmination {
    title: string;
    description: string;
}

const ScrollAmination: React.FC<ScrollAmination> = ({ title, description }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visibleChars, setVisibleChars] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const targetLine = windowHeight * 0.7;
            const distanceToTarget = targetLine - rect.top;
            const totalScrollRange = rect.height;
            const progress = distanceToTarget / totalScrollRange;
            const clampedProgress = Math.max(0, Math.min(1, progress));
            const targetVisibleChars = Math.floor(description.length * clampedProgress);

            setVisibleChars(targetVisibleChars);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, [description]);

    return (
        <div ref={ref} className="p-6 text-center border-b border-gray-200">
            <h2 className="text-3xl font-extrabold mb-4 text-gray-800">{title}</h2>
            <p className="text-lg leading-relaxed">
                {description.split("").map((char, idx) => (
                    <span
                        key={idx}
                        style={{
                            transition: "color 0.6s ease-in-out",
                            color: idx < visibleChars ? "#4f46e5" : "#9ca3af",
                            whiteSpace: "pre-wrap"
                        }}
                    >
                        {char}
                    </span>
                ))}
            </p>
        </div>
    );
};

export default ScrollAmination;









