import React from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Scale, 
  FileText, 
  Gavel, 
  Users, 
  Zap, 
  Shield, 
  Globe, 
  Star
} from 'lucide-react';
import { LanguageStrings } from '../types';

interface LandingPageProps {
  onLogin: () => void;
  language: 'English' | 'Hindi';
  setLanguage: React.Dispatch<React.SetStateAction<'English' | 'Hindi'>>;
  strings: LanguageStrings;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin, language, setLanguage, strings }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Scale size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Adhivakta<span className="text-blue-600">Flow</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">{strings.features}</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">{strings.pricing}</a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">{strings.testimonials}</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLanguage(l => l === 'English' ? 'Hindi' : 'English')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors uppercase"
            >
              <Globe size={14} />
              {language === 'English' ? 'EN' : 'HI'}
            </button>
            <button onClick={onLogin} className="text-slate-600 font-medium hover:text-blue-600 px-4 py-2 transition-colors">
              {strings.login}
            </button>
            <button onClick={onLogin} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:shadow-xl">
              {strings.signUp}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase mb-6 animate-fade-in">
            <Zap size={12} />
            #1 Legal SaaS in India
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-b from-slate-900 to-slate-700 bg-clip-text text-transparent">
            {strings.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            {strings.heroSubtitle}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button onClick={onLogin} className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2 group">
              {strings.startTrial}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-all shadow-sm">
              View Demo
            </button>
          </div>
          
          {/* Hero Image Mockup */}
          <div className="mt-16 mx-auto max-w-5xl rounded-2xl shadow-2xl border border-slate-200/60 bg-white p-2 overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 opacity-20"></div>
             <img 
               src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000" 
               alt="Dashboard Preview" 
               className="rounded-xl w-full"
             />
             <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{strings.features}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Everything an independent advocate or law firm needs to streamline their practice.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FileText className="text-blue-600" size={24} />}
              title={strings.featureCaseMgmt}
              description="Digital case diary organized by CNR, client, or court. Never miss a detail."
            />
            <FeatureCard 
              icon={<Gavel className="text-amber-600" size={24} />}
              title="Hearing Tracking"
              description="Automated hearing reminders and court status updates synced to your calendar."
            />
             <FeatureCard 
              icon={<Zap className="text-purple-600" size={24} />}
              title={strings.featureAiDrafting}
              description="Generate bail applications, affidavits, and notices in seconds using Gemini AI."
            />
            <FeatureCard 
              icon={<Users className="text-emerald-600" size={24} />}
              title="Client Portal"
              description="Secure access for clients to view case status, invoices, and shared documents."
            />
            <FeatureCard 
              icon={<Shield className="text-red-600" size={24} />}
              title="Secure Evidence"
              description="Bank-grade encryption for all your sensitive case files and client data."
            />
            <FeatureCard 
              icon={<Globe className="text-indigo-600" size={24} />}
              title="Bilingual Support"
              description="Work seamlessly in English and Hindi. Perfect for district court practitioners."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{strings.pricing}</h2>
            <p className="text-slate-500">Transparent pricing. No hidden fees. Cancel anytime.</p>
            
            <div className="mt-8 inline-flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
               <button className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium shadow-md">Monthly</button>
               <button className="px-6 py-2 text-slate-500 hover:text-slate-800 rounded-lg text-sm font-medium">Yearly (Save 20%)</button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
               <h3 className="text-xl font-bold text-slate-800 mb-2">{strings.planBasic}</h3>
               <div className="flex items-baseline gap-1 mb-6">
                 <span className="text-4xl font-bold text-slate-900">₹500</span>
                 <span className="text-slate-500">/month</span>
               </div>
               <p className="text-slate-500 mb-8 text-sm">Perfect for independent advocates starting their digital journey.</p>
               <button onClick={onLogin} className="w-full py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors mb-8">
                 Start Basic Trial
               </button>
               <ul className="space-y-4">
                 <PricingCheck text="Up to 50 active cases" />
                 <PricingCheck text="Client management" />
                 <PricingCheck text="Basic Calendar" />
                 <PricingCheck text="500MB Document Storage" />
               </ul>
            </div>

            {/* Pro Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-200 hover:shadow-2xl transition-all duration-300 relative">
               <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
               <h3 className="text-xl font-bold text-slate-800 mb-2">{strings.planPro}</h3>
               <div className="flex items-baseline gap-1 mb-6">
                 <span className="text-4xl font-bold text-slate-900">₹1000</span>
                 <span className="text-slate-500">/month</span>
               </div>
               <p className="text-slate-500 mb-8 text-sm">For established firms requiring advanced AI and team tools.</p>
               <button onClick={onLogin} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 mb-8">
                 Start Pro Trial
               </button>
               <ul className="space-y-4">
                 <PricingCheck text="Unlimited active cases" />
                 <PricingCheck text="AI Legal Drafting (Gemini)" />
                 <PricingCheck text="Team access (up to 3)" />
                 <PricingCheck text="10GB Document Storage" />
                 <PricingCheck text="Priority Support" />
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center">{strings.testimonials}</h2>
          <div className="grid md:grid-cols-3 gap-8">
             <TestimonialCard 
               quote="Adhivakta Flow has completely transformed how I manage my dates. The AI drafting is a lifesaver for bail applications."
               author="Adv. Rajesh Kumar"
               role="High Court, Delhi"
             />
             <TestimonialCard 
               quote="Finally, a software that understands Indian courts. The bilingual interface helps my staff work efficiently."
               author="Adv. Priya Sharma"
               role="District Court, Pune"
             />
             <TestimonialCard 
               quote="The billing feature alone is worth the subscription. I recover my fees 3x faster now."
               author="Adv. Vikram Singh"
               role="Supreme Court of India"
             />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4 text-white">
               <Scale size={24} />
               <span className="text-xl font-bold">AdhivaktaFlow</span>
            </div>
            <p className="max-w-xs text-sm">Empowering Indian Legal Professionals with cutting-edge technology.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Security</a></li>
              <li><a href="#" className="hover:text-white">Updates</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
          &copy; 2024 Adhivakta Flow SaaS. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
  </div>
);

const PricingCheck = ({ text }: { text: string }) => (
  <li className="flex items-center gap-3 text-sm text-slate-600">
    <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
    {text}
  </li>
);

const TestimonialCard = ({ quote, author, role }: { quote: string, author: string, role: string }) => (
  <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex gap-1 mb-4 text-amber-400">
      {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
    </div>
    <p className="text-slate-600 mb-6 italic">"{quote}"</p>
    <div>
      <div className="font-bold text-slate-900">{author}</div>
      <div className="text-xs text-slate-400 uppercase tracking-wide">{role}</div>
    </div>
  </div>
);