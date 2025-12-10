import React, { useState } from 'react';
import { Scale, Globe, ArrowLeft, Mail, CheckCircle, KeyRound } from 'lucide-react';
import { LanguageStrings } from '../types';

interface ForgotPasswordPageProps {
  onBack: () => void;
  language: 'English' | 'Hindi';
  setLanguage: React.Dispatch<React.SetStateAction<'English' | 'Hindi'>>;
  strings: LanguageStrings;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ 
  onBack, 
  language, 
  setLanguage, 
  strings 
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      {/* Left Column - Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative flex-col justify-between p-12 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Scale size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">Adhivakta<span className="text-blue-500">Flow</span></span>
        </div>
        
        <div className="relative z-10 max-w-lg">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm border border-blue-500/30">
            <KeyRound size={24} className="text-blue-400" />
          </div>
          <h2 className="text-4xl font-bold mb-6 leading-tight">Secure access recovery.</h2>
          <p className="text-slate-400 text-lg">We use industry-standard encryption to protect your identity and ensure only you can access your case files.</p>
        </div>

        <div className="relative z-10 text-sm text-slate-500">
          © 2024 Adhivakta Flow SaaS
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 md:p-12 relative overflow-y-auto">
        <div className="flex justify-between items-center mb-12">
           <button 
             onClick={onBack}
             className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
           >
             <ArrowLeft size={16} />
             {strings.backToLogin}
           </button>
           <button 
              onClick={() => setLanguage(l => l === 'English' ? 'Hindi' : 'English')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 transition-colors uppercase"
            >
              <Globe size={14} />
              {language === 'English' ? 'EN' : 'HI'}
            </button>
        </div>

        <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center animate-fade-in">
          
          {!isSubmitted ? (
            <>
              <div className="mb-8">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                    <KeyRound size={24} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{strings.resetPasswordTitle}</h1>
                <p className="text-slate-500">{strings.resetPasswordSubtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    strings.sendResetLink
                  )}
                </button>
              </form>
            </>
          ) : (
            // Success State
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-pulse">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{strings.resetEmailSentTitle}</h2>
              <p className="text-slate-500 mb-8">
                {strings.resetEmailSentSubtitle} <span className="font-semibold text-slate-800">{email}</span>.
              </p>

              <button 
                onClick={() => window.open('mailto:')}
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all mb-4"
              >
                {strings.openEmailApp}
              </button>

              <button 
                onClick={onBack}
                className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
              >
                {strings.didntReceiveEmail} <span className="text-blue-600 hover:underline">{strings.resendCode}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};