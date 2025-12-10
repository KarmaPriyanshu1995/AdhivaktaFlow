import React, { useState } from 'react';
import { Scale, Globe, ArrowLeft, Mail, Lock, Linkedin } from 'lucide-react';
import { LanguageStrings } from '../types';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onSignupClick: () => void;
  onForgotPassword: () => void;
  onBack: () => void;
  language: 'English' | 'Hindi';
  setLanguage: React.Dispatch<React.SetStateAction<'English' | 'Hindi'>>;
  strings: LanguageStrings;
}

export const LoginPage: React.FC<LoginPageProps> = ({ 
  onLoginSuccess, 
  onSignupClick,
  onForgotPassword,
  onBack, 
  language, 
  setLanguage, 
  strings 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      {/* Left Column - Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative flex-col justify-between p-12 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Scale size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">Adhivakta<span className="text-blue-500">Flow</span></span>
        </div>
        
        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-bold mb-6 leading-tight">Streamline your legal practice with intelligent automation.</h2>
          <p className="text-slate-400 text-lg">Join 5,000+ Indian advocates who have digitized their case diaries and client management.</p>
        </div>

        <div className="relative z-10 text-sm text-slate-500">
          © 2024 Adhivakta Flow SaaS
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 md:p-12 relative overflow-y-auto">
        <div className="flex justify-between items-center mb-12">
           <button 
             onClick={onBack}
             className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
           >
             <ArrowLeft size={16} />
             Back
           </button>
           <button 
              onClick={() => setLanguage(l => l === 'English' ? 'Hindi' : 'English')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 transition-colors uppercase"
            >
              <Globe size={14} />
              {language === 'English' ? 'EN' : 'HI'}
            </button>
        </div>

        <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="lg:hidden flex justify-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Scale size={28} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{strings.loginTitle}</h1>
            <p className="text-slate-500">{strings.loginSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{strings.emailLabel}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-800"
                  placeholder="advocate@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{strings.passwordLabel}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-800"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={onForgotPassword}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                {strings.forgotPassword}
              </button>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                strings.signIn
              )}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-slate-400 text-sm font-medium">{strings.orContinueWith}</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
               onClick={() => onLoginSuccess()}
               className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-slate-700"
            >
              {/* Simple Google SVG Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button 
               onClick={() => onLoginSuccess()}
               className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-slate-700"
            >
              <Linkedin className="w-5 h-5 text-[#0077b5]" fill="currentColor" />
              LinkedIn
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            {strings.dontHaveAccount}{' '}
            <button onClick={onSignupClick} className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
              {strings.signUp}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};