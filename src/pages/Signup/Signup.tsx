import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Building, Mail, Lock, Eye, EyeOff, ChevronLeft, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';


type Role = 'referrer' | 'broker';
type Step = 'role' | 'account' | 'brand';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('role');
  const [role, setRole] = useState<Role>('referrer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    agreeToTerms: false
  });

  const handleNext = () => {
    if (step === 'role') {
      setStep('account');
    } else if (step === 'account') {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        toast.error('Please fill in all fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (!formData.agreeToTerms) {
        toast.error('You must agree to the Terms & Privacy Policy');
        return;
      }

      if (role === 'broker') {
        setStep('brand');
      } else {
        handleSignup();
      }
    } else if (step === 'brand') {
      handleSignup();
    }
  };

  const handleBack = () => {
    if (step === 'account') setStep('role');
    if (step === 'brand') setStep('account');
  };

  const handleSignup = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('userRole', role);
      toast.success('Account created successfully!');
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">


      {/* Content Card */}
      <div className="w-full max-w-[500px] bg-white rounded-[2rem] border border-sky-100 shadow-xl shadow-sky-500/5 p-10 relative">

        {/* Back Button */}
        {step !== 'role' && (
          <button
            onClick={handleBack}
            className="absolute left-10 top-10 flex items-center gap-2 text-sky-500 font-bold text-sm uppercase tracking-wider hover:text-sky-600 transition-colors"
          >
            <ChevronLeft size={18} strokeWidth={3} />
            Back to account type
          </button>
        )}

        <div className={`${step !== 'role' ? 'mt-12' : ''} text-center`}>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
            {step === 'role' ? 'How will you use Refer Now?' :
              step === 'account' ? 'Create Your Account' : 'Setup your brand'}
          </h1>
          <p className="text-slate-400 font-bold mb-10">
            {step === 'role' ? 'Choose the account type that best fits your needs.' :
              step === 'account' ? 'Setting up your individual profile.' : 'Give your training business a name.'}
          </p>

          {/* Step 1: Role Selection */}
          {step === 'role' && (
            <div className="grid grid-cols-2 gap-6 mb-10">
              <button
                onClick={() => { setRole('referrer'); localStorage.setItem('userRole', 'referrer'); }}
                className={`flex flex-col items-center gap-4 p-8 rounded-2xl border-2 transition-all duration-300 ${role === 'referrer'
                  ? 'border-sky-500 bg-white shadow-lg shadow-sky-500/10'
                  : 'border-slate-100 bg-slate-50/50 hover:border-sky-200'
                  }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${role === 'referrer' ? 'bg-sky-100 text-sky-500' : 'bg-white text-slate-400'
                  } shadow-sm`}>
                  <User size={24} strokeWidth={2.5} />
                </div>
                <span className="font-black text-slate-800">Referrer</span>
              </button>
              <button
                onClick={() => { setRole('broker'); localStorage.setItem('userRole', 'broker'); }}
                className={`flex flex-col items-center gap-4 p-8 rounded-2xl border-2 transition-all duration-300 ${role === 'broker'
                  ? 'border-sky-500 bg-white shadow-lg shadow-sky-500/10'
                  : 'border-slate-100 bg-slate-50/50 hover:border-sky-200'
                  }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${role === 'broker' ? 'bg-sky-100 text-sky-500' : 'bg-white text-slate-400'
                  } shadow-sm`}>
                  <Building size={24} strokeWidth={2.5} />
                </div>
                <span className="font-black text-slate-800">Broker</span>
              </button>
            </div>
          )}

          {/* Step 2: Account Details */}
          {step === 'account' && (
            <div className="space-y-6 mb-10 text-left">
              <div className="space-y-2">
                <label className="text-[15px] font-bold text-slate-600 ml-1">Email address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
                  <input
                    type="email"
                    placeholder="georgia.young@example.com"
                    className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-100 bg-slate-50/50 font-medium text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[15px] font-bold text-slate-600 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="•••••"
                    className="w-full h-14 pl-12 pr-12 rounded-xl border border-slate-100 bg-slate-50/50 font-medium text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[15px] font-bold text-slate-600 ml-1">Confirm password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="•••••"
                    className="w-full h-14 pl-12 pr-12 rounded-xl border border-slate-100 bg-slate-50/50 font-medium text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 ml-1 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-5 h-5 rounded border-2 border-slate-200 text-sky-500 focus:ring-sky-500 focus:ring-offset-0 cursor-pointer accent-sky-500"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                />
                <label htmlFor="terms" className="text-sm font-bold text-slate-400 cursor-pointer">
                  I agree to the <span className="text-sky-500">Terms & Privacy Policy</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Brand Details */}
          {step === 'brand' && (
            <div className="space-y-6 mb-10 text-left">
              <div className="space-y-2">
                <label className="text-[15px] font-bold text-slate-600 ml-1">Business Name (Optional)</label>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="e.g. Peak Performance Studio"
                    className="w-full h-14 px-6 rounded-xl border border-slate-100 bg-slate-50/50 font-medium text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Primary Button */}
          <button
            onClick={handleNext}
            disabled={loading}
            className="w-full h-16 bg-sky-500 hover:bg-sky-600 text-white font-black text-xl rounded-2xl shadow-2xl shadow-sky-500/30 flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:active:scale-100"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {step === 'brand' || (step === 'account' && role === 'referrer') ? 'Continue' : 'Next'}
                <ArrowRight size={24} strokeWidth={3} />
              </>
            )}
          </button>

          {/* Footer Link */}
          {step !== 'brand' && (
            <div className="mt-10 font-bold text-slate-400">
              Already have an account? <Link to="/login" className="text-sky-500">Sign In</Link>
            </div>
          )}
          {step === 'brand' && (
            <div className="mt-10 font-bold text-slate-400">
              Already have an account? <Link to="/login" className="text-sky-500">Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
