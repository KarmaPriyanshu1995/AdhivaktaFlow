import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Cases } from './pages/Cases';
import { Clients } from './pages/Clients';
import { Calendar } from './pages/Calendar';
import { CaseDetail } from './pages/CaseDetail';
import { AIDrafts } from './pages/AIDrafts';
import { Billing } from './pages/Billing';
import { Team } from './pages/Team';
import { Settings } from './pages/Settings';
import { EvidenceLocker } from './pages/EvidenceLocker';
import { Notifications } from './pages/Notifications';
import { SearchResults } from './pages/SearchResults';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ClarificationModal } from './pages/ClarificationModal';
import { ENGLISH_STRINGS, HINDI_STRINGS, LanguageStrings, Case, CaseStatus, CourtType, Notification, Client } from './types';

// Mock Data
const MOCK_CASES: Case[] = [
  { id: '1', title: 'Sharma vs State of Maharashtra', cnrNumber: 'MHB001-2023-1029', clientName: 'Rajesh Sharma', court: CourtType.HIGH_COURT, judge: 'Hon. Justice Patel', nextHearing: '2023-11-15T10:00:00', status: CaseStatus.OPEN, notes: 'Bail hearing scheduled.' },
  { id: '2', title: 'Land Dispute: Plot 44A', cnrNumber: 'DL0405-2022-8892', clientName: 'Amit Verma', court: CourtType.DISTRICT_COURT, judge: 'Judge Singh', nextHearing: '2023-10-28T14:00:00', status: CaseStatus.PENDING, notes: 'Documents submission.' },
  { id: '3', title: 'TechCorp Breach of Contract', cnrNumber: 'KA0203-2023-1111', clientName: 'Innovate Systems Ltd', court: CourtType.TRIBUNAL, judge: 'Member Rao', nextHearing: '2023-12-05T11:30:00', status: CaseStatus.STAYED, notes: 'Arbitration pending.' }
];

const MOCK_CLIENTS: Client[] = [
  { id: 'c1', name: 'Rajesh Sharma', phone: '+91 98765 43210', email: 'rajesh@example.com', address: 'Mumbai', status: 'Active', totalCases: 2, pendingAmount: 5000, lastContact: '2023-10-10' },
  { id: 'c2', name: 'Amit Verma', phone: '+91 91234 56789', email: 'amit@example.com', address: 'Delhi', status: 'Active', totalCases: 1, pendingAmount: 0, lastContact: '2023-10-05' }
];

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Hearing Tomorrow', message: 'Sharma vs State hearing at 10:30 AM', type: 'hearing', date: '2 mins ago', read: false },
  { id: 'n2', title: 'Invoice Overdue', message: 'Client TechCorp Ltd has pending invoice #203', type: 'billing', date: '1 hour ago', read: false },
  { id: 'n3', title: 'System Update', message: 'New AI drafting features available now.', type: 'system', date: 'Yesterday', read: true },
];

type AppView = 'landing' | 'login' | 'signup' | 'forgot-password' | 'dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [language, setLanguage] = useState<'English' | 'Hindi'>('English');
  const [cases, setCases] = useState<Case[]>(MOCK_CASES);
  const [clients] = useState<Client[]>(MOCK_CLIENTS);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [showClarification, setShowClarification] = useState(false);
  const [isProPlan, setIsProPlan] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const strings: LanguageStrings = language === 'English' ? ENGLISH_STRINGS : HINDI_STRINGS;

  useEffect(() => {
    document.body.style.overflow = showClarification ? 'hidden' : 'auto';
  }, [showClarification]);

  const handleLoginSuccess = () => {
    setCurrentView('dashboard');
    setShowClarification(true);
  };

  const handleLogout = () => {
    setCurrentView('landing');
    setShowClarification(false);
  };

  const handleCaseClick = (c: Case) => {
    setSelectedCase(c);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentTab('search');
  };

  const handleQuickAdd = () => {
    alert("Quick Add Action Sheet would open here (Add Case, Client, etc.)");
  };

  // Render Public Pages
  if (currentView === 'landing') return <LandingPage onLogin={() => setCurrentView('login')} onSignup={() => setCurrentView('signup')} language={language} setLanguage={setLanguage} strings={strings} />;
  if (currentView === 'login') return <LoginPage onLoginSuccess={handleLoginSuccess} onSignupClick={() => setCurrentView('signup')} onForgotPassword={() => setCurrentView('forgot-password')} onBack={() => setCurrentView('landing')} language={language} setLanguage={setLanguage} strings={strings} />;
  if (currentView === 'signup') return <SignupPage onSignupSuccess={handleLoginSuccess} onLoginClick={() => setCurrentView('login')} onBack={() => setCurrentView('landing')} language={language} setLanguage={setLanguage} strings={strings} />;
  if (currentView === 'forgot-password') return <ForgotPasswordPage onBack={() => setCurrentView('login')} language={language} setLanguage={setLanguage} strings={strings} />;

  // Render Authenticated App
  return (
    <>
      <MainLayout
        currentTab={currentTab}
        setCurrentTab={(tab) => { setCurrentTab(tab); setSelectedCase(null); }}
        strings={strings}
        language={language}
        setLanguage={setLanguage}
        onLogout={handleLogout}
        notifications={notifications}
        onNotificationClick={() => setCurrentTab('notifications')}
        onSearch={handleSearch}
        onQuickAdd={handleQuickAdd}
        cases={cases}
        clients={clients}
      >
        {selectedCase ? (
          <CaseDetail caseItem={selectedCase} onBack={() => setSelectedCase(null)} strings={strings} isProPlan={isProPlan} />
        ) : (
          <>
            {currentTab === 'dashboard' && <Dashboard strings={strings} cases={cases} onCaseClick={handleCaseClick} />}
            {currentTab === 'cases' && <Cases strings={strings} cases={cases} setCases={setCases} onCaseClick={handleCaseClick} isProPlan={isProPlan} setIsProPlan={setIsProPlan} />}
            {currentTab === 'clients' && <Clients strings={strings} isProPlan={isProPlan} />}
            {currentTab === 'calendar' && <Calendar strings={strings} cases={cases} isProPlan={isProPlan} />}
            {currentTab === 'evidence' && <EvidenceLocker strings={strings} isProPlan={isProPlan} cases={cases} />}
            {currentTab === 'ai-drafts' && <AIDrafts strings={strings} language={language} isProPlan={isProPlan} />}
            {currentTab === 'team' && <Team strings={strings} cases={cases} isProPlan={isProPlan} setIsProPlan={setIsProPlan} />}
            {currentTab === 'billing' && <Billing strings={strings} isProPlan={isProPlan} setIsProPlan={setIsProPlan} />}
            {currentTab === 'settings' && <Settings strings={strings} isProPlan={isProPlan} setIsProPlan={setIsProPlan} language={language} setLanguage={setLanguage} />}
            {currentTab === 'notifications' && <Notifications strings={strings} notifications={notifications} setNotifications={setNotifications} />}
            {currentTab === 'search' && <SearchResults query={searchQuery} strings={strings} cases={cases} clients={clients} />}
          </>
        )}
      </MainLayout>
      
      {showClarification && <ClarificationModal onClose={() => setShowClarification(false)} />}
    </>
  );
}