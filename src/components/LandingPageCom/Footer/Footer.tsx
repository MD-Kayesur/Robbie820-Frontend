import { Link, useNavigate } from "react-router-dom";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logos/refer_now_logo.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#cfefff] pt-5 pb-5 text-[#2D3E50] sm:pt-20 sm:pb-10 px-4.5 sm:px-0">
      <div className="mx-auto md:px-20 lg:px-37.5">
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:gap-12 md:flex-row md:items-start md:justify-between">
          {/* Left Column: Logo & Description */}
          <div className="sm:space-y-4 space-y-2">
            <div className="w-fit cursor-pointer" onClick={() => navigate("/")}>
              <img src={logo} alt="ReferNow logo" className="w-25 sm:w-40" />
            </div>

            <p className="max-w-md text-sm leading-relaxed text-[#666666] sm:text-base">
              Automated Referral Commission Management For Brokers, And Referral
              Partners. Built For Accuracy, Transparency, And Trust.
            </p>

            <div className="flex gap-4.5 sm:gap-7 text-[#1F2D2E] text-sm sm:text-lg">
              <Link
                to="/help"
                className="hover:text-sky-500 hover:underline transition-colors"
              >
                Help
              </Link>

              <Link
                to="/privacy"
                className="hover:text-sky-500 hover:underline transition-colors"
              >
                Privacy
              </Link>
            </div>
          </div>

          {/* Right Column: App Links */}
          <div className="flex flex-col justify-start space-y-3 sm:space-y-5 md:items-start">
            <span className="text-sky-500 font-semibold text-base sm:text-lg">
              Get the app
            </span>

            <div className="flex flex-col gap-3 sm:gap-4">
              <a
                href="https://apps.apple.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-fit"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on the App Store"
                  className="h-10 w-auto sm:h-12"
                />
              </a>

              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-fit"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-10 w-auto sm:h-12"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block mb-6 h-px w-full bg-[#3A86FF40] sm:mb-8" />

        {/* Bottom Row: Copyright & Social */}
        <div className="flex flex-col-reverse gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-sm text-black sm:text-base">
            2024 ReferNow All Rights Reserved.
          </p>

          {/* Horizontal divider */}
          <div className="block sm:hidden h-px w-full bg-[#00B4FE4A]" />

          <div className="flex flex-col gap-4 items-start sm:items-end">
            <div className="flex items-center justify-center gap-6 sm:gap-8">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A4A7AE] hover:text-sky-500"
              >
                <Linkedin size={34} />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A4A7AE] hover:text-sky-500"
              >
                <Facebook size={34} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A4A7AE] hover:text-sky-500"
              >
                <Instagram size={34} />
              </a>
            </div>

            <div className="text-center text-black md:text-right">
              Follow us on Social Media
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
