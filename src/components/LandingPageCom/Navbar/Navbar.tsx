import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logos/refer_now_logo.png";

type Props = {
  activeSection: string;
  onSectionClick: (section: string) => void;
};

const navItems = [
  { label: "Features", id: "features" },
  { label: "How It Works", id: "how-it-works" },
  { label: "Reviews", id: "reviews" },
  { label: "Pricing", id: "pricing" },
];

const Navbar = ({ activeSection, onSectionClick }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionNavigation = (sectionId: string) => {
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      onSectionClick(sectionId);
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  const handleHomeClick = () => {
    navigate("/", { replace: true, state: {} });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 0);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 sm:pt-8">
      <div className="mx-auto md:px-20 lg:px-37.5">
        <nav className="w-full bg-white sm:border sm:border-[#EAEAEA] sm:rounded-2xl px-6 py-2.5 flex items-center justify-between">
          <button
            type="button"
            className="cursor-pointer w-37.5 h-12.5 bg-transparent border-0 p-0"
            onClick={handleHomeClick}
          >
            <img
              src={logo}
              alt="ReferNow Logo"
              className="w-full h-full object-contain"
            />
          </button>

          <div className="hidden lg:flex items-center gap-8.5">
            {navItems.map(({ label, id }) => {
              const isActive = activeSection === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSectionNavigation(id)}
                  className={`text-lg leading-6.75 relative group ${
                    isActive
                      ? "text-sky-500"
                      : "text-slate-500 hover:text-sky-500"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <Link
            to="/login"
            className="hidden sm:flex bg-[#00B4FE] text-black px-6 py-3 rounded-lg leading-7.5"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
