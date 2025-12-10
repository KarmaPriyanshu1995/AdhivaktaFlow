import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Calendar as CalendarIcon, 
  FileText, 
  CreditCard, 
  Settings,
  Scale,
  UserCog,
  HardDrive
} from 'lucide-react';
import { LanguageStrings } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  strings: LanguageStrings;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab, strings }) => {
  const menuItems = [
    { id: 'dashboard', label: strings.dashboard, icon: LayoutDashboard },
    { id: 'cases', label: strings.cases, icon: Briefcase },
    { id: 'clients', label: strings.clients, icon: Users },
    { id: 'calendar', label: strings.calendar, icon: CalendarIcon },
    { id: 'evidence', label: strings.evidenceLocker, icon: HardDrive },
    { id: 'ai-drafts', label: strings.aiDrafts, icon: FileText },
    { id: 'team', label: strings.team, icon: UserCog },
    { id: 'billing', label: strings.billing, icon: CreditCard },
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-slate-200 flex flex-col shadow-lg">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-blue-200 shadow-md">
            <Scale size={24} />
        </div>
        <span className="text-xl font-bold text-slate-800 tracking-tight">Adhivakta<span className="text-blue-600">Flow</span></span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 shadow-sm font-medium' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={() => setCurrentTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
            currentTab === 'settings' 
              ? 'bg-slate-100 text-slate-800' 
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Settings size={20} />
          {strings.settings}
        </button>
      </div>
    </div>
  );
};