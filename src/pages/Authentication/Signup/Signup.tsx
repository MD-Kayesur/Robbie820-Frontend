import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { toast } from "react-hot-toast";

type Role = "referrer" | "broker";
type Step = "role" | "account" | "brand";

const inputBase =
  "h-[52px] w-full rounded-[10px] border border-transparent bg-[#EEEEEE] text-[15px] text-[#111827] placeholder:text-[#A3A3A3] outline-none transition focus:border-[#28A9F3] focus:bg-white";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<Role>("broker");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    agreeToTerms: false,
  });

  const handleNext = () => {
    if (step === "role") {
      localStorage.setItem("userRole", role);
      setStep("account");
      return;
    }

    if (step === "account") {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        toast.error("Please fill in all fields");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      if (!formData.agreeToTerms) {
        toast.error("You must agree to the Terms & Privacy Policy");
        return;
      }

      setStep("brand");

      return;
    }

    handleSignup();
  };

  const handleBack = () => {
    if (step === "account") {
      setStep("role");
      return;
    }

    if (step === "brand") {
      setStep("account");
    }
  };

  const handleSignup = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("userRole", role);
      toast.success("Account created successfully!");
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="w-full">
      {step === "role" ? (
        <div className="mx-auto w-full max-w-195">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-black md:text-2xl leading-6">
              How will you use Refer Now?
            </h1>
            <p className="mt-4 text-[#666666] leading-6">
              Choose the account type that best fits your needs.
            </p>
          </div>

          <div className="mt-12.5 grid grid-cols-2 gap-6 ">
            <button
              type="button"
              onClick={() => {
                setRole("referrer");
                localStorage.setItem("userRole", "referrer");
              }}
              className={`flex min-h-36 flex-col items-center justify-center rounded-2xl border bg-transparent p-6 text-center transition ${
                role === "referrer"
                  ? "border-[#28A9F3]"
                  : "border-[#CFCFCF] hover:border-[#9FD4F8]"
              }`}
            >
              <div className="mb-6 flex h-11.5 w-11.5 items-center justify-center rounded-[10px] bg-[#EAF6FD] text-[#28A9F3]">
                <User className="h-5 w-5" strokeWidth={2} />
              </div>

              <span className="text-[18px] font-semibold text-black">
                Referrer
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole("broker");
                localStorage.setItem("userRole", "broker");
              }}
              className={`flex min-h-36 flex-col items-center justify-center rounded-2xl border bg-transparent p-6 text-center transition ${
                role === "broker"
                  ? "border-[#28A9F3]"
                  : "border-[#CFCFCF] hover:border-[#9FD4F8]"
              }`}
            >
              <div className="mb-6 flex h-11.5 w-11.5 items-center justify-center rounded-[10px] bg-[#EAF6FD] text-[#28A9F3]">
                <Building2 className="h-5 w-5" strokeWidth={2} />
              </div>

              <span className="text-[18px] font-semibold text-black">
                Broker
              </span>
            </button>
          </div>

          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-14 min-w-59.5 items-center justify-center gap-3 rounded-2xl bg-[#16AAF5] px-8 text-[16px] font-medium text-white transition hover:bg-[#0f9ae2]"
            >
              Next
              <ArrowRight className="h-5 w-5" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-sm">
          <div className="rounded-3xl border border-[#3A86FF80] bg-transparent p-4 md:px-6 md:py-8.5">
            <button
              type="button"
              onClick={handleBack}
              className="mb-3 md:mb-10 mx-auto flex items-center gap-2 uppercase text-[#00B4FE] transition hover:opacity-80 leading-6"
            >
              <ArrowLeft size={24} className="mb-0.5" />
              Back to account type
            </button>

            <div className="text-center">
              <h1 className="text-xl font-semibold leading-6 text-black md:text-2xl">
                {step === "account"
                  ? "Create Your Account"
                  : "Setup your brand"}
              </h1>

              <p className="mt-1 md:mt-3 font-light leading-6 text-[#9A9A9A]">
                {step === "account"
                  ? "Setting up your individual profile."
                  : "Give your training business a name."}
              </p>
            </div>

            {step === "account" && (
              <div className="mt-3 md:mt-6 space-y-3.5">
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
                      className={`${inputBase} pl-12 pr-4`}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
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
                      className={`${inputBase} pl-12 pr-12`}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8C8C] transition hover:text-[#5B5B5B]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" strokeWidth={1.9} />
                      ) : (
                        <Eye className="h-5 w-5" strokeWidth={1.9} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-black">
                    Confirm password
                  </label>

                  <div className="relative">
                    <Lock
                      className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8C8C8C]"
                      strokeWidth={1.9}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="•••••"
                      className={`${inputBase} pl-12 pr-12`}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8C8C] transition hover:text-[#5B5B5B]"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" strokeWidth={1.9} />
                      ) : (
                        <Eye className="h-5 w-5" strokeWidth={1.9} />
                      )}
                    </button>
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        agreeToTerms: e.target.checked,
                      }))
                    }
                    className="mt-0.5 h-4 w-4 rounded-sm border border-[#D6D6D6] accent-[#00B4FE]"
                  />

                  <span className="text-sm font-light text-[#7C7C7C]">
                    I agree to the{" "}
                    <span className="text-[#6BAEFF]">
                      Terms & Privacy Policy
                    </span>
                  </span>
                </label>
              </div>
            )}

            {step === "brand" && (
              <div className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-[15px] font-medium text-black">
                    Business Name (Optional)
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Peak Performance Studio"
                    className={`${inputBase} px-4`}
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        businessName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={loading}
              className="mt-6 md:mt-8.5 inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#16AAF5] text-[16px] font-medium text-white transition hover:bg-[#0f9ae2] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-5 w-5" strokeWidth={2.2} />
                </>
              )}
            </button>

            <div className="mt-6 md:mt-8.5 text-center text-sm text-[#5F5F5F]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#00B4FE] transition hover:opacity-80"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
