import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

const inputBase =
  "h-[52px] w-full rounded-[10px] border border-transparent bg-[#EEEEEE] pl-12 pr-12 text-[15px] text-[#111827] placeholder:text-[#A3A3A3] outline-none transition focus:border-[#28A9F3] focus:bg-white";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role] = useState<"referrer" | "broker">(
    (localStorage.getItem("userRole") as "referrer" | "broker") || "referrer",
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Logged in successfully!");

      if (role === "broker") {
        navigate("/broker-dashboard");
      } else {
        navigate("/referrer-dashboard");
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-106.5">
      <div className="rounded-3xl border border-[#B9D8FF] bg-transparent px-6 py-7 md:px-7 md:py-8">
        <Link
          to="/signup"
          className="mb-3 md:mb-10 mx-auto flex items-center justify-center gap-2 uppercase text-[#00B4FE] transition hover:opacity-80 leading-6"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.2} />
          Back to account type
        </Link>

        <div className="text-center">
          <h1 className="text-xl font-semibold leading-none text-black md:text-2xl">
            Welcome
          </h1>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-black">Email address</label>

            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8C8C8C]"
                strokeWidth={1.9}
              />
              <input
                type="email"
                placeholder="georgia.young@example.com"
                className={inputBase}
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-black">Password</label>

            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8C8C8C]"
                strokeWidth={1.9}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="•••••"
                className={inputBase}
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8C8C] transition hover:text-[#5B5B5B]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" strokeWidth={1.9} />
                ) : (
                  <Eye className="h-5 w-5" strokeWidth={1.9} />
                )}
              </button>
            </div>

            <div className="mt-3 flex justify-end">
              <Link
                to="/recover-password"
                className="text-[14px] font-medium text-[#E25A4B] transition hover:opacity-80"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#16AAF5] text-[16px] font-medium text-white transition hover:bg-[#0f9ae2] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Log In
                <ArrowRight className="h-5 w-5" strokeWidth={2.2} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
