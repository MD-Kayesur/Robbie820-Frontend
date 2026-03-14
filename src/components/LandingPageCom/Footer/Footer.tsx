import { Link, useNavigate } from "react-router-dom";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logos/refer_now_logo.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#cfefff] pt-5 pb-5 text-[#2D3E50] md:pt-20 md:pb-10 px-4.5 md:px-0">
      <div className="mx-auto md:px-20 lg:px-37.5">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:gap-12 md:flex-row md:items-start md:justify-between">
          {/* Left Column: Logo & Description */}
          <div className="md:space-y-4 space-y-2">
            <div className="w-fit cursor-pointer" onClick={() => navigate("/")}>
              <img src={logo} alt="ReferNow logo" className="w-25 md:w-40" />
            </div>

            <p className="max-w-md text-sm leading-relaxed text-[#666666] md:text-base">
              Automated Referral Commission Management For Brokers, And Referral
              Partners. Built For Accuracy, Transparency, And Trust.
            </p>

            <div className="flex gap-4.5 md:gap-7 text-[#1F2D2E] text-sm md:text-lg">
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
          <div className="flex flex-col justify-start space-y-3 md:space-y-5 md:items-start">
            <span className="text-sky-500 font-semibold text-base md:text-lg">
              Get the app
            </span>

            <div className="flex flex-col gap-3 md:gap-4">
              <a
                href="https://apps.apple.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-fit"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on the App Store"
                  className="h-10 w-auto md:h-12"
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
                  className="h-10 w-auto md:h-12"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block mb-6 h-px w-full bg-[#3A86FF40] md:mb-8" />

        {/* Bottom Row: Copyright & Social */}
        <div className="flex flex-col-reverse gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-sm text-black md:text-base">
            &#169; {new Date().getFullYear()} ReferNow All Rights Reserved.
          </p>

          {/* Horizontal divider */}
          <div className="block md:hidden h-px w-full bg-[#00B4FE4A]" />

          <div className="flex flex-col gap-4 items-start md:items-end">
            <div className="flex items-center justify-center gap-6 md:gap-8">
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
