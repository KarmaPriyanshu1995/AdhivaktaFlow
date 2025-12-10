import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { LanguageStrings, Notification, Case, Client } from '../types';

interface MainLayoutProps {
  children: React.ReactNode;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  strings: LanguageStrings;
  language: 'English' | 'Hindi';
  setLanguage: (lang: 'English' | 'Hindi') => void;
  onLogout: () => void;
  notifications: Notification[];
  onNotificationClick: () => void;
  onSearch: (query: string) => void;
  onQuickAdd: () => void;
  cases: Case[];
  clients: Client[];
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  currentTab, 
  setCurrentTab, 
  strings, 
  language, 
  setLanguage,
  onLogout,
  notifications,
  onNotificationClick,
  onSearch,
  onQuickAdd,
  cases,
  clients
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop Fixed / Mobile Drawer */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <Sidebar currentTab={currentTab} setCurrentTab={(tab) => { setCurrentTab(tab); setSidebarOpen(false); }} strings={strings} />
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        
        <TopBar 
          strings={strings} 
          language={language} 
          setLanguage={setLanguage} 
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
          onLogout={onLogout}
          notifications={notifications}
          onNotificationClick={onNotificationClick}
          onSearch={onSearch}
          cases={cases}
          clients={clients}
        />

        <main className="flex-1 pb-20 lg:pb-0 overflow-x-hidden">
          {children}
        </main>
      </div>

      <BottomNav 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        onQuickAdd={onQuickAdd}
      />

    </div>
  );
};