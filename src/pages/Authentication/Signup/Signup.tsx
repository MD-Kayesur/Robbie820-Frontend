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
  FileText,
  CheckCircle2,
  X,
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
  const [showAgreement, setShowAgreement] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    agreeToTerms: false,
    agreeToContract: false,
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

      if (role === "broker" && !isSigned) {
        toast.error("Please sign the Service Agreement");
        return;
      }

      if (role === "broker" && !formData.agreeToContract) {
        toast.error("Please accept the Service Agreement terms");
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
              className={`flex min-h-36 flex-col items-center justify-center rounded-2xl border bg-transparent p-6 text-center transition ${role === "referrer"
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
              className={`flex min-h-36 flex-col items-center justify-center rounded-2xl border bg-transparent p-6 text-center transition ${role === "broker"
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

          <div className="mt-16 flex flex-col items-center">
            {role === "referrer" && (
              <p className="mb-6 max-w-[480px] text-center text-[15px] leading-6 text-[#666666]">
                *** Note: Referrers must reach out to their broker referral partner to set them up to have their logins. Account creation is for brokers only. ***
              </p>
            )}
            <button
              type="button"
              onClick={role === "referrer" ? () => navigate("/login") : handleNext}
              className="inline-flex h-14 min-w-59.5 items-center justify-center gap-3 rounded-2xl bg-[#16AAF5] px-8 text-[16px] font-medium text-white transition hover:bg-[#0f9ae2]"
            >
              {role === "referrer" ? "Log In" : "Next"}
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

                {role === "broker" && (
                  <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
                    <h3 className="text-[15px] font-semibold text-black mb-3">Service Agreement & Contract</h3>
                    <div className={`rounded-2xl border ${isSigned ? "border-green-200 bg-green-50" : "border-[#3A86FF40] bg-[#F9FBFF]"} p-4 transition-all`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isSigned ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                            <FileText size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-black leading-tight">Head Agreement Holder</p>
                            <p className="text-[10px] text-[#9A9A9A]">Ref: RN-AGREE-2024-V1</p>
                          </div>
                        </div>
                        {isSigned && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
                            <CheckCircle2 size={10} />
                            Executed
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowAgreement(true)}
                        className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${isSigned
                          ? "bg-white border border-green-200 text-green-700 hover:bg-green-100"
                          : "bg-white border border-blue-200 text-[#3A86FF] hover:bg-blue-50"
                          }`}
                      >
                        {isSigned ? "View Signed Agreement" : "Open & Sign Agreement"}
                      </button>
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 mt-4">
                      <input
                        type="checkbox"
                        checked={formData.agreeToContract}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            agreeToContract: e.target.checked,
                          }))
                        }
                        disabled={!isSigned}
                        className={`mt-0.5 h-4 w-4 rounded-sm border border-[#D6D6D6] accent-[#00B4FE] ${!isSigned && "opacity-50 cursor-not-allowed"}`}
                      />
                      <span className={`text-sm font-light ${!isSigned ? "text-[#9A9A9A]" : "text-[#7C7C7C]"}`}>
                        I confirm that I have read and accept the terms of the executed contract.
                      </span>
                    </label>
                  </div>
                )}
              </div>
            )}

            {showAgreement && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="flex items-center justify-between border-b border-[#EEEEEE] p-5 md:p-6 bg-[#F9FBFF]">
                    <div>
                      <h2 className="text-xl font-bold text-black">Service Agreement</h2>
                      <p className="text-xs text-[#666666] mt-0.5">Please review and sign the contract below</p>
                    </div>
                    <button
                      onClick={() => setShowAgreement(false)}
                      className="p-2 hover:bg-[#F3F4F6] rounded-full transition-colors"
                    >
                      <X size={20} className="text-[#666666]" />
                    </button>
                  </div>

                  <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto text-sm leading-relaxed text-[#4B5563]">
                    <div className="space-y-6">
                      <section>
                        <h4 className="text-base font-bold text-black mb-3">1. PARTIES AND PURPOSE</h4>
                        <p>This Service Agreement ("Agreement") is entered into by and between the Platform ("Refer Now") and the Brokerage Entity ("Broker"). This Agreement governs the use of the Referral Management System and the financial obligations associated therewith.</p>
                      </section>

                      <section>
                        <h4 className="text-base font-bold text-black mb-3">2. TERMS OF SERVICE</h4>
                        <p>The Broker agrees to maintain professional standards in all referral handlings and data processing. Refer Now provides the digital infrastructure for tracking, management, and reporting of referral activities.</p>
                      </section>

                      <section>
                        <h4 className="text-base font-bold text-black mb-3">3. COMPLIANCE & LEGAL</h4>
                        <p>Both parties agree to comply with all relevant financial regulations and data privacy laws (GDPR/ADPD). This executed contract will be maintained in the platform's Legal Documents section and remains accessible to the Broker and Super Admin at all times.</p>
                      </section>

                      <section className="p-6 bg-yellow-50 border border-yellow-100 rounded-2xl">
                        <h4 className="text-base font-bold text-yellow-800 mb-2">Important Notice</h4>
                        <p className="text-yellow-700">By signing this document, you acknowledge that you are the authorized representative of the head agreement holder and have the legal capacity to enter into this contract.</p>
                      </section>
                    </div>
                  </div>

                  <div className="border-t border-[#EEEEEE] p-6 bg-white flex flex-col items-center gap-4">
                    {!isSigned ? (
                      <button
                        type="button"
                        onClick={() => {
                          setIsSigned(true);
                          setShowAgreement(false);
                          toast.success("Agreement signed successfully!");
                        }}
                        className="w-full h-14 bg-[#16AAF5] hover:bg-[#0f9ae2] text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                      >
                        Sign & Accept Agreement
                        <CheckCircle2 size={22} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowAgreement(false)}
                        className="w-full h-14 border-2 border-[#EEEEEE] text-[#666666] rounded-2xl font-bold text-lg transition-all"
                      >
                        Close
                      </button>
                    )}
                    <p className="text-[11px] text-[#9A9A9A] text-center">
                      Securely processed via ReferNow Digital Signature Service
                    </p>
                  </div>
                </div>
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
              disabled={
                loading ||
                (step === "account" && role === "broker" && (!isSigned || !formData.agreeToContract || !formData.agreeToTerms))
              }
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
