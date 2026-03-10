import Navbar from "@/components/LandingPageCom/Navbar/Navbar";
import { privacySections } from "./mock";
import Footer from "@/components/LandingPageCom/Footer/Footer";

const Privacy = () => {
  return (
    <>
      <Navbar activeSection="" onSectionClick={() => {}} />
      <section className="bg-[#F8FAFC] py-30">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">
              Legal
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Privacy Policy
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
              Your privacy matters to ReferNow. This policy explains what
              information we collect, how we use it, and how we protect it while
              you use our platform.
            </p>
            <p className="mt-4 text-sm text-slate-400">
              Last updated: March 2026
            </p>
          </div>

          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <div className="space-y-10 text-sm leading-7 text-slate-600 md:text-base">
              {privacySections.map((section) => (
                <section key={section.id}>
                  <h2 className="mb-3 text-xl font-semibold text-slate-900">
                    {section.id}. {section.title}
                  </h2>
                  <p>{section.content}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Privacy;
