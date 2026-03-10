import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/refer_now_logo.png";

type Props = {
  activeSection: string;

  onSectionClick: (section: string) => void;
};

const navItems = ["Features", "How It Works", "Reviews", "Pricing"];

const Navbar = ({ activeSection, onSectionClick }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionNavigation = (sectionId: string) => {
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      onSectionClick?.(sectionId);
      window.history.replaceState(null, "", `#${sectionId}`);
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 md:pt-8">
      <div className="mx-auto md:px-20 lg:px-37.5">
        <nav className="w-full bg-white border border-[#EAEAEA] rounded-2xl px-6 py-3 flex items-center justify-between">
          <div
            className="cursor-pointer w-34 h-10"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="ReferNow Logo" className="w-full h-auto" />
          </div>

          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navItems.map((item) => {
              const sectionId = item.toLowerCase().replace(/\s+/g, "-");
              const isActive = activeSection === sectionId;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSectionNavigation(sectionId)}
                  className={`text-lg transition-all duration-300 relative group ${
                    isActive
                      ? "text-sky-500"
                      : "text-slate-500 hover:text-sky-500"
                  }`}
                >
                  {item}

                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-sky-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button className="hidden sm:flex bg-[#00B4FE] text-black font-normal px-6 py-3 rounded-lg leading-7.5 transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
