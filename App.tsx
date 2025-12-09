import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Cases } from './pages/Cases';
import { AIDrafts } from './pages/AIDrafts';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ClarificationModal } from './pages/ClarificationModal';
import { ENGLISH_STRINGS, HINDI_STRINGS, LanguageStrings, Case, CaseStatus, CourtType } from './types';
import { Menu, Bell, Globe } from 'lucide-react';

const MOCK_CASES: Case[] = [
  {
    id: '1',
    title: 'Sharma vs State of Maharashtra',
    cnrNumber: 'MHB001-2023-1029',
    clientName: 'Rajesh Sharma',
    court: CourtType.HIGH_COURT,
    judge: 'Hon. Justice Patel',
    nextHearing: '2023-11-15T10:00:00',
    status: CaseStatus.OPEN,
    notes: 'Bail hearing scheduled.'
  },
  {
    id: '2',
    title: 'Land Dispute: Plot 44A',
    cnrNumber: 'DL0405-2022-8892',
    clientName: 'Amit Verma',
    court: CourtType.DISTRICT_COURT,
    judge: 'Judge Singh',
    nextHearing: '2023-10-28T14:00:00',
    status: CaseStatus.PENDING,
    notes: 'Documents submission.'
  },
  {
    id: '3',
    title: 'TechCorp Breach of Contract',
    cnrNumber: 'KA0203-2023-1111',
    clientName: 'Innovate Systems Ltd',
    court: CourtType.TRIBUNAL,
    judge: 'Member Rao',
    nextHearing: '2023-12-05T11:30:00',
    status: CaseStatus.STAYED,
    notes: 'Arbitration pending.'
  }
];

type AppView = 'landing' | 'login' | 'dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [language, setLanguage] = useState<'English' | 'Hindi'>('English');
  const [cases, setCases] = useState<Case[]>(MOCK_CASES);
  const [showClarification, setShowClarification] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const strings: LanguageStrings = language === 'English' ? ENGLISH_STRINGS : HINDI_STRINGS;

  // Toggle body scroll when modal is open
  useEffect(() => {
    if (showClarification) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showClarification]);

  const handleLoginSuccess = () => {
    setCurrentView('dashboard');
    setShowClarification(true); // Show onboarding questions after first login
  };

  const handleLogout = () => {
    setCurrentView('landing');
    setShowClarification(false);
  };

  // Render Landing Page
  if (currentView === 'landing') {
    return (
      <LandingPage 
        onLogin={() => setCurrentView('login')} 
        language={language}
        setLanguage={setLanguage}
        strings={strings}
      />
    );
  }

  // Render Login Page
  if (currentView === 'login') {
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess}
        onBack={() => setCurrentView('landing')}
        language={language}
        setLanguage={setLanguage}
        strings={strings}
      />
    );
  }

  // Render Dashboard / Main App
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden glass"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Wrapper - Fixed on both mobile and desktop */}
      <aside className={`fixed inset-y-0 left-0 z-30 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
         <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} strings={strings} />
      </aside>

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col min-h-screen transition-all">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Menu size={24} />
            </button>
            <span className="font-bold text-lg text-slate-800">Adhivakta</span>
          </div>
          
          <div className="hidden md:block w-1"></div> {/* Spacer */}

          <div className="flex items-center gap-4">
             {/* Language Toggle */}
             <button 
                onClick={() => setLanguage(l => l === 'English' ? 'Hindi' : 'English')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition-colors"
             >
                <Globe size={16} />
                {language === 'English' ? 'ENG' : 'हिन्दी'}
             </button>

             {/* Notifications */}
             <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>

             {/* Profile */}
             <div 
               className="h-9 w-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white cursor-pointer"
               onClick={handleLogout}
               title="Click to Logout"
             >
                AD
             </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden">
          {currentTab === 'dashboard' && <Dashboard strings={strings} cases={cases} />}
          {currentTab === 'cases' && <Cases strings={strings} cases={cases} setCases={setCases} />}
          {currentTab === 'ai-drafts' && <AIDrafts strings={strings} language={language} />}
          {/* Placeholders for other tabs */}
          {(currentTab !== 'dashboard' && currentTab !== 'cases' && currentTab !== 'ai-drafts') && (
            <div className="flex flex-col items-center justify-center h-[80vh] text-slate-400">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                 <Globe size={32} className="opacity-50" />
               </div>
               <h2 className="text-xl font-semibold text-slate-600 mb-2">Coming Soon</h2>
               <p>This module is under development.</p>
            </div>
          )}
        </main>
      </div>

      {/* Onboarding / Questions Modal - Shown after login */}
      {showClarification && <ClarificationModal onClose={() => setShowClarification(false)} />}
    </div>
  );
}