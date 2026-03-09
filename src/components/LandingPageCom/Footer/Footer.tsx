import { useNavigate } from "react-router-dom";
import { Linkedin, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#DFF5FF] pt-20 pb-10 px-6 md:px-12 text-[#2D3E50] clash">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Left Column: Logo & Description */}
          <div className="space-y-8">
            <div
              className="flex items-center gap-2.5 cursor-pointer group w-fit"
              onClick={() => navigate("/")}
            >
              <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-black text-lg">R</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1E293B]">
                Refer<span className="text-sky-500">Now</span>
              </span>
            </div>

            <p className="max-w-md text-[15px] font-normal leading-relaxed opacity-80">
              Automated Referral Commission Management For Brokers, And Referral
              Partners. Built For Accuracy, Transparency, And Trust.
            </p>

            <div className="flex gap-8 text-[15px] font-normal">
              <a href="#" className="hover:text-sky-500 transition-colors">
                Help
              </a>
              <a href="#" className="hover:text-sky-500 transition-colors">
                Privacy
              </a>
            </div>
          </div>

          {/* Right Column: App Links */}
          <div className="flex flex-col md:items-end justify-start space-y-6">
            <span className="text-sky-500 font-semibold text-[15px] uppercase tracking-wider">
              Get the app
            </span>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="block hover:scale-105 transition-transform"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on the App Store"
                  className="h-10 w-auto"
                />
              </a>
              <a
                href="#"
                className="block hover:scale-105 transition-transform"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-10 w-auto"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-sky-200 w-full mb-8 opacity-50" />

        {/* Bottom Row: Copyright & Social */}
        <div className="flex flex-col md:row items-center justify-between gap-6 md:flex-row">
          <p className="text-[13px] font-normal opacity-70 order-2 md:order-1">
            2024 ReferNow All Rights Reserved.
          </p>

          <div className="flex flex-col items-center md:items-end gap-3 order-1 md:order-2">
            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 h-9 bg-slate-300/30 rounded-md flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all duration-300 text-slate-500"
              >
                <Linkedin
                  size={18}
                  fill="currentColor"
                  className="stroke-none"
                />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-slate-300/30 rounded-md flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all duration-300 text-slate-500"
              >
                <Facebook
                  size={18}
                  fill="currentColor"
                  className="stroke-none"
                />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-slate-300/30 rounded-md flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all duration-300 text-slate-500"
              >
                <Instagram size={18} />
              </a>
            </div>
            <span className="text-[11px] font-normal opacity-60 uppercase tracking-widest">
              Follow us on Social Media
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
