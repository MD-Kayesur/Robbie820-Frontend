import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

const inputBase =
  "h-[52px] w-full rounded-[10px] border border-transparent bg-[#EEEEEE] text-[15px] text-[#111827] placeholder:text-[#A3A3A3] outline-none transition focus:border-[#28A9F3] focus:bg-white";

const RecoverPassword: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      toast.success("OTP sent successfully!");
    }, 1200);
  };

  const handleOtpChange = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, "").slice(0, 1);

    const nextOtp = [...otp];
    nextOtp[index] = cleanValue;
    setOtp(nextOtp);

    if (cleanValue && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const nextOtp = [...otp];
        nextOtp[index] = "";
        setOtp(nextOtp);
        return;
      }

      if (index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 5);

    if (!pasted) return;

    const nextOtp = ["", "", "", "", ""];
    pasted.split("").forEach((char, index) => {
      nextOtp[index] = char;
    });

    setOtp(nextOtp);

    const focusIndex = Math.min(pasted.length, 5) - 1;
    if (focusIndex >= 0) {
      otpRefs.current[focusIndex]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    if (otp.some((digit) => !digit)) {
      toast.error("Please enter the full 5-digit code");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Code verified! You can now reset your password.");
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="w-full">
      {step === "email" ? (
        <div className="mx-auto w-full max-w-106.5">
          <div className="rounded-3xl border border-[#B9D8FF] bg-transparent px-6 py-7 md:px-7 md:py-8">
            <div className="text-center">
              <h1 className="text-[24px] font-bold leading-none text-black md:text-[26px]">
                Recover Password
              </h1>

              <p className="mx-auto mt-4 max-w-80 text-[15px] leading-[1.45] text-[#9A9A9A]">
                Once verified, the next time you log in, you'll be required to
                enter the verification code.
              </p>
            </div>

            <form onSubmit={handleVerifyEmail} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-[15px] font-medium text-black">
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8C8C8C]"
                    strokeWidth={1.9}
                  />
                  <input
                    type="email"
                    placeholder="georgia.young@example.com"
                    className={`${inputBase} pl-12 pr-4`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                    Verify
                    <ArrowRight className="h-5 w-5" strokeWidth={2.2} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-106.5 text-center">
          <h1 className="mx-auto max-w-80 text-[24px] font-bold leading-[1.2] text-black md:text-[26px]">
            Enter the code we sent to
            <br />
            {email || "yourmail@gmail.com"}
          </h1>

          <p className="mt-4 text-[15px] text-[#9A9A9A]">
            We sent 5 digit code to your email address.
          </p>

          <div className="mt-7 rounded-3xl border border-[#B9D8FF] bg-transparent px-6 py-7 md:px-7 md:py-8">
            <h2 className="text-[18px] font-semibold text-black">
              OTP Required
            </h2>

            <p className="mx-auto mt-4 max-w-72.5 text-[15px] leading-[1.55] text-[#7F7F7F]">
              Enter the 5 digits OTP code we've sent in your number{" "}
              {email || "yourmail@gmail.com"}
            </p>

            <div className="mt-6 grid grid-cols-5 gap-2.5 md:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    otpRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  onPaste={handleOtpPaste}
                  className="h-12 w-full rounded-lg border border-[#D9D9D9] bg-[#E9E9E9] text-center text-[24px] font-medium text-[#222222] outline-none transition focus:border-[#28A9F3] focus:bg-white"
                  placeholder="-"
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={loading}
            className="mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#16AAF5] text-[16px] font-medium text-white transition hover:bg-[#0f9ae2] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Verify
                <ArrowRight className="h-5 w-5" strokeWidth={2.2} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default RecoverPassword;
