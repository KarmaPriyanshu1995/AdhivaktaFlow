import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  Globe, 
  Menu, 
  User, 
  LogOut,
  FileText,
  Briefcase,
  Users
} from 'lucide-react';
import { LanguageStrings, Case, Client, Evidence, Notification } from '../types';

interface TopBarProps {
  strings: LanguageStrings;
  language: 'English' | 'Hindi';
  setLanguage: (lang: 'English' | 'Hindi') => void;
  toggleSidebar: () => void;
  onLogout: () => void;
  notifications: Notification[];
  onNotificationClick: () => void;
  onSearch: (query: string) => void;
  cases: Case[];
  clients: Client[];
}

// Mock Files for search since evidence is not fully lifted to App state in this demo
const MOCK_FILES: Evidence[] = [
  { id: 'e1', fileName: 'FIR_Report_2023.pdf', caseId: '1', caseTitle: 'Sharma vs State', uploadDate: '2023-10-14', size: '2.4 MB', type: 'pdf' },
  { id: 'e2', fileName: 'Property_Deed_Scan.jpg', caseId: '2', caseTitle: 'Land Dispute: Plot 44A', uploadDate: '2023-10-13', size: '5.1 MB', type: 'img' },
  { id: 'e3', fileName: 'Bail_Application_Draft.docx', caseId: '1', caseTitle: 'Sharma vs State', uploadDate: '2023-10-12', size: '0.5 MB', type: 'doc' }
];

export const TopBar: React.FC<TopBarProps> = ({ 
  strings, 
  language, 
  setLanguage, 
  toggleSidebar, 
  onLogout,
  notifications,
  onNotificationClick,
  onSearch,
  cases,
  clients
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setIsSearchFocused(false);
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setIsSearchFocused(false);
    }
  };

  // Filter for autocomplete
  const filteredCases = cases.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3);
  const filteredClients = clients.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3);
  const filteredFiles = MOCK_FILES.filter(f => f.fileName.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3);

  const hasResults = filteredCases.length > 0 || filteredClients.length > 0 || filteredFiles.length > 0;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex justify-between items-center h-16">
      
      {/* Left: Hamburger & Brand (Mobile) */}
      <div className="flex items-center gap-3 lg:hidden">
        <button onClick={toggleSidebar} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
          <Menu size={24} />
        </button>
        <span className="font-bold text-lg text-slate-800">Adhivakta</span>
      </div>

      {/* Center/Left: Global Search */}
      <div className="hidden lg:flex flex-1 max-w-xl relative" ref={searchRef}>
         <form onSubmit={handleSearchSubmit} className="w-full relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
               type="text" 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               onFocus={() => setIsSearchFocused(true)}
               placeholder={strings.searchPlaceholder}
               className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white border focus:border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm"
            />
         </form>

         {/* Search Dropdown */}
         {isSearchFocused && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in">
               {hasResults ? (
                 <>
                   {filteredCases.length > 0 && (
                     <div className="p-2">
                        <div className="text-xs font-bold text-slate-400 uppercase px-3 mb-1">Cases</div>
                        {filteredCases.map(c => (
                           <button key={c.id} onClick={() => onSearch(c.title)} className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg flex items-center gap-3">
                              <Briefcase size={16} className="text-blue-500" />
                              <div className="truncate text-sm text-slate-700">{c.title}</div>
                           </button>
                        ))}
                     </div>
                   )}
                   {filteredClients.length > 0 && (
                     <div className="p-2 border-t border-slate-50">
                        <div className="text-xs font-bold text-slate-400 uppercase px-3 mb-1">Clients</div>
                        {filteredClients.map(c => (
                           <button key={c.id} onClick={() => onSearch(c.name)} className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg flex items-center gap-3">
                              <Users size={16} className="text-green-500" />
                              <div className="truncate text-sm text-slate-700">{c.name}</div>
                           </button>
                        ))}
                     </div>
                   )}
                   {filteredFiles.length > 0 && (
                     <div className="p-2 border-t border-slate-50">
                        <div className="text-xs font-bold text-slate-400 uppercase px-3 mb-1">Files</div>
                        {filteredFiles.map(f => (
                           <button key={f.id} onClick={() => onSearch(f.fileName)} className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg flex items-center gap-3">
                              <FileText size={16} className="text-purple-500" />
                              <div className="truncate text-sm text-slate-700">{f.fileName}</div>
                           </button>
                        ))}
                     </div>
                   )}
                   <div className="bg-slate-50 p-2 text-center border-t border-slate-100">
                      <button onClick={handleSearchSubmit} className="text-xs text-blue-600 font-bold hover:underline">
                         View all results for "{searchQuery}"
                      </button>
                   </div>
                 </>
               ) : (
                 <div className="p-8 text-center text-slate-500 text-sm">
                    {strings.noResults}
                 </div>
               )}
            </div>
         )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 lg:gap-4 ml-auto">
         
         {/* Language */}
         <button 
            onClick={() => setLanguage(language === 'English' ? 'Hindi' : 'English')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors uppercase"
         >
            <Globe size={14} />
            <span className="hidden sm:inline">{language === 'English' ? 'EN' : 'HI'}</span>
         </button>

         {/* Notifications */}
         <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              )}
            </button>
            
            {isNotifOpen && (
               <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in origin-top-right">
                  <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                     <span className="font-bold text-slate-700 text-sm">Notifications</span>
                     <button onClick={onNotificationClick} className="text-xs text-blue-600 hover:underline">View All</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                     {notifications.length > 0 ? (
                        notifications.slice(0, 5).map(n => (
                           <div key={n.id} className={`p-3 border-b border-slate-50 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-blue-50/50' : ''}`}>
                              <div className="flex justify-between items-start mb-1">
                                 <h4 className="text-sm font-semibold text-slate-800">{n.title}</h4>
                                 <span className="text-[10px] text-slate-400">{n.date}</span>
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-2">{n.message}</p>
                           </div>
                        ))
                     ) : (
                        <div className="p-8 text-center text-slate-400 text-sm">{strings.noNotifications}</div>
                     )}
                  </div>
               </div>
            )}
         </div>

         {/* Profile */}
         <div className="relative" ref={profileRef}>
             <div 
               className="h-9 w-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white cursor-pointer select-none"
               onClick={() => setIsProfileOpen(!isProfileOpen)}
             >
                AD
             </div>
             
             {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in origin-top-right">
                   <div className="p-4 border-b border-slate-100">
                      <div className="font-bold text-slate-800">Adv. Rajesh</div>
                      <div className="text-xs text-slate-500">rajesh@lawfirm.com</div>
                   </div>
                   <div className="p-1">
                      <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg flex items-center gap-2">
                         <User size={16} /> Profile
                      </button>
                      <button onClick={onLogout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2">
                         <LogOut size={16} /> Logout
                      </button>
                   </div>
                </div>
             )}
         </div>

      </div>
    </header>
  );
};