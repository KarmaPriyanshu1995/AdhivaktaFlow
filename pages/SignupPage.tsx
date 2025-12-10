import React, { useState } from 'react';
import { Scale, Globe, ArrowLeft, Mail, Lock, User, CheckCircle, Linkedin, ShieldCheck } from 'lucide-react';
import { LanguageStrings } from '../types';

interface SignupPageProps {
  onSignupSuccess: () => void;
  onLoginClick: () => void;
  onBack: () => void;
  language: 'English' | 'Hindi';
  setLanguage: React.Dispatch<React.SetStateAction<'English' | 'Hindi'>>;
  strings: LanguageStrings;
}

export const SignupPage: React.FC<SignupPageProps> = ({ 
  onSignupSuccess, 
  onLoginClick,
  onBack, 
  language, 
  setLanguage, 
  strings 
}) => {
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    // Simulate API call to create account and send OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('verify');
    }, 1500);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      onSignupSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      {/* Left Column - Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-blue-900 relative flex-col justify-between p-12 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-slate-900/90"></div>
        
        <div className="relative z-10 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg">
              <Scale size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">Adhivakta<span className="text-blue-400">Flow</span></span>
        </div>
        
        <div className="relative z-10 max-w-lg">
          <div className="flex gap-1 mb-4 text-amber-400">
             <ShieldCheck size={24} />
          </div>
          <h2 className="text-4xl font-bold mb-6 leading-tight">Bank-grade security for your confidential legal data.</h2>
          <p className="text-blue-100 text-lg">We understand the importance of privilege. Your case files and client data are encrypted and secure.</p>
        </div>

        <div className="relative z-10 text-sm text-blue-200/60">
          Trusted by 5,000+ Advocates across India
        </div>
      </div>

      {/* Right Column - Forms */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 md:p-12 relative overflow-y-auto">
        {/* Header Navigation */}
        <div className="flex justify-between items-center mb-8">
           <button 
             onClick={step === 'verify' ? () => setStep('form') : onBack}
             className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
           >
             <ArrowLeft size={16} />
             {step === 'verify' ? 'Change Email' : 'Back'}
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
          
          {step === 'form' ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{strings.createAccount}</h1>
                <p className="text-slate-500">Start your 14-day free trial today.</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{strings.fullNameLabel}</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-800"
                      placeholder="Adv. Rajesh Kumar"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{strings.emailLabel}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-800"
                      placeholder="advocate@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">{strings.passwordLabel}</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-800"
                        placeholder="••••••"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">{strings.confirmPasswordLabel}</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="password" 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-800"
                        placeholder="••••••"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2">
                  <input 
                    type="checkbox" 
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    id="terms"
                    required
                    className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" 
                  />
                  <label htmlFor="terms" className="text-sm text-slate-500 leading-tight">
                    {strings.agreeTerms}
                  </label>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    strings.signUp
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
                  onClick={onSignupSuccess}
                  className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-slate-700"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </button>
                <button 
                   onClick={onSignupSuccess}
                   className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-slate-700"
                >
                  <Linkedin className="w-5 h-5 text-[#0077b5]" fill="currentColor" />
                  LinkedIn
                </button>
              </div>

              <p className="mt-8 text-center text-sm text-slate-500">
                {strings.alreadyHaveAccount}{' '}
                <button onClick={onLoginClick} className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                  {strings.login}
                </button>
              </p>
            </>
          ) : (
            // Verification View
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 animate-pulse">
                <Mail size={40} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{strings.verifyEmailTitle}</h2>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                {strings.verifyEmailSubtitle} <span className="font-semibold text-slate-800">{formData.email}</span>. 
                Please enter it below to confirm your account.
              </p>

              <form onSubmit={handleVerifySubmit} className="max-w-xs mx-auto space-y-6">
                <div>
                  <label className="sr-only">OTP</label>
                  <input 
                    type="text" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full text-center text-2xl tracking-[0.5em] py-4 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all text-slate-800 font-bold placeholder:tracking-normal"
                    placeholder="000000"
                    required
                    minLength={6}
                    maxLength={6}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isLoading || otp.length < 6}
                  className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-70 flex justify-center items-center gap-2"
                >
                   {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      {strings.verifyBtn}
                    </>
                  )}
                </button>
              </form>

              <p className="mt-8 text-sm text-slate-500">
                Didn't receive the email?{' '}
                <button className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                  {strings.resendCode}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};