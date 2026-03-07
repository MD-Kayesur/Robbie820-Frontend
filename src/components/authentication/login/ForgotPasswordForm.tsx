import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ChevronLeft, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';


const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']);

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      toast.success('OTP sent successfully!');
    }, 1200);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some(digit => !digit)) {
      toast.error('Please enter the full 5-digit code');
      return;
    }

    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      toast.success('Code verified! You can now reset your password.');
      // navigate to reset password page...
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative">



      {/* Content Card */}
      <div className="w-full max-w-[500px] bg-white rounded-[2rem] border border-sky-100 shadow-xl shadow-sky-500/5 p-10 relative">

        {/* Back Button */}
        <button
          onClick={() => step === 'otp' ? setStep('email') : navigate(-1)}
          className="absolute -left-20 top-0 hidden lg:flex items-center justify-center w-12 h-12 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all shadow-sm"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>

        {/* Mobile Back Button */}
        <button
          onClick={() => step === 'otp' ? setStep('email') : navigate(-1)}
          className="lg:hidden mb-10 flex items-center gap-2 text-sky-500 font-bold text-sm uppercase tracking-wider transition-colors"
        >
          <ChevronLeft size={18} strokeWidth={3} />
          Back
        </button>

        <div className="text-center">
          {step === 'email' ? (
            <>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
                Recover Password
              </h1>
              <p className="text-slate-400 font-bold mb-10 leading-relaxed px-4">
                Once verified, the next time you log in, you'll be required to enter the verification code.
              </p>

              <form onSubmit={handleVerifyEmail} className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="text-[15px] font-bold text-slate-600 ml-1">Email address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
                    <input
                      type="email"
                      placeholder="georgia.young@example.com"
                      className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-100 bg-slate-50/50 font-medium text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 bg-sky-500 hover:bg-sky-600 text-white font-black text-xl rounded-2xl shadow-2xl shadow-sky-500/30 flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 disabled:opacity-70 mt-8"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Verify
                      <ArrowRight size={24} strokeWidth={3} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                Enter the code we sent to
              </h1>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                {email || 'yourmail@gmail.com'}
              </h2>
              <p className="text-slate-400 font-bold mb-8">
                We sent 5 digit code to your email address.
              </p>

              <div className="bg-[#FCFDFF] rounded-3xl border border-sky-100 p-8 mb-8">
                <h3 className="text-xl font-black text-slate-800 mb-4">OTP Required</h3>
                <p className="text-slate-400 font-bold text-sm mb-8">
                  Enter the 5 digits OTP code we've sent in your number {email || 'yourmail@gmail.com'}
                </p>

                <div className="flex justify-between gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-full h-14 text-center text-xl font-black text-slate-800 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all outline-none"
                      placeholder="-"
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full h-16 bg-sky-500 hover:bg-sky-600 text-white font-black text-xl rounded-2xl shadow-2xl shadow-sky-500/30 flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Verify
                    <ArrowRight size={24} strokeWidth={3} />
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
