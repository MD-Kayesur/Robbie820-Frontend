import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ChevronLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role] = useState<'referrer' | 'broker'>((localStorage.getItem('userRole') as any) || 'referrer');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Logged in successfully!');

      // Redirect based on selected role
      if (role === 'broker') {
        navigate('/broker-dashboard');
      } else {
        navigate('/referrer-dashboard');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
      {/* Content Card */}
      <div className="w-full max-w-[500px] bg-white rounded-[2rem] border border-sky-100 shadow-xl shadow-sky-500/5 p-10 relative">

        {/* Back Button */}
        <Link
          to="/signup"
          className="absolute left-10 top-10 flex items-center gap-2 text-sky-500 font-bold text-sm uppercase tracking-wider hover:text-sky-600 transition-colors"
        >
          <ChevronLeft size={18} strokeWidth={3} />
          Back to signup
        </Link>

        <div className="mt-12 text-center">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-8">
            Welcome back
          </h1>



          <form onSubmit={handleLogin} className="space-y-6 text-left">
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

            <div className="space-y-2 relative">
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
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex justify-end pt-1">
                <Link to="/forgot-password" className="text-sm font-bold text-slate-400 hover:text-sky-500 transition-colors">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Primary Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-sky-500 hover:bg-sky-600 text-white font-black text-xl rounded-2xl shadow-2xl shadow-sky-500/30 flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:active:scale-100 mt-8"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Log In
                  <ArrowRight size={24} strokeWidth={3} />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-10 font-bold text-slate-400">
            Don't have an account? <Link to="/signup" className="text-sky-500">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
