import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { helpItems } from "./mock";
import Navbar from "@/components/LandingPageCom/Navbar/Navbar";
import Footer from "@/components/LandingPageCom/Footer/Footer";

const Help = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <Navbar activeSection="" onSectionClick={() => {}} />
      <section className="bg-[#F8FAFC] py-30">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              Help & Support
            </h1>
            <p className="mt-3 text-slate-500">
              Find answers to common questions about ReferNow.
            </p>
          </div>

          <div className="space-y-4">
            {helpItems.map((item) => {
              const open = openId === item.id;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white"
                >
                  <button
                    onClick={() => toggle(item.id)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-slate-800">
                      {item.question}
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 text-slate-400 transition ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {open && (
                    <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Help;
