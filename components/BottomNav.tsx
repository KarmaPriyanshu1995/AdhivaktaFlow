import React from 'react';
import { LayoutDashboard, Briefcase, Calendar, Users, Plus } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onQuickAdd: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, setCurrentTab, onQuickAdd }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 pb-safe flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      
      <NavButton 
        icon={LayoutDashboard} 
        label="Home" 
        isActive={currentTab === 'dashboard'} 
        onClick={() => setCurrentTab('dashboard')} 
      />
      
      <NavButton 
        icon={Briefcase} 
        label="Cases" 
        isActive={currentTab === 'cases'} 
        onClick={() => setCurrentTab('cases')} 
      />

      <div className="relative -top-5">
        <button 
          onClick={onQuickAdd}
          className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-400/50 hover:bg-blue-700 active:scale-95 transition-all"
        >
          <Plus size={28} />
        </button>
      </div>

      <NavButton 
        icon={Calendar} 
        label="Calendar" 
        isActive={currentTab === 'calendar'} 
        onClick={() => setCurrentTab('calendar')} 
      />

      <NavButton 
        icon={Users} 
        label="Clients" 
        isActive={currentTab === 'clients'} 
        onClick={() => setCurrentTab('clients')} 
      />

    </div>
  );
};

const NavButton = ({ icon: Icon, label, isActive, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-1 min-w-[60px] transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400'}`}
  >
    <Icon size={20} className={isActive ? 'fill-current opacity-20' : ''} />
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);