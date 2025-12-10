import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, FileText, MoreVertical, Calendar, ChevronLeft, ChevronRight, Download, Lock, MapPin, BadgeAlert } from 'lucide-react';
import { LanguageStrings, Case, CaseStatus, CourtType } from '../types';

interface CasesProps {
  strings: LanguageStrings;
  cases: Case[];
  setCases: React.Dispatch<React.SetStateAction<Case[]>>;
  onCaseClick: (c: Case) => void;
  isProPlan: boolean;
  setIsProPlan: React.Dispatch<React.SetStateAction<boolean>>;
}

// Generate more mock data for pagination demonstration
const GENERATED_CASES: Case[] = Array.from({ length: 45 }).map((_, i) => ({
  id: `gen-${i}`,
  title: `State vs. ${['Ramesh', 'Suresh', 'Mahesh', 'Dinesh', 'Ganesh'][i % 5]} ${['Kumar', 'Singh', 'Patel', 'Sharma', 'Gupta'][i % 5]}`,
  cnrNumber: `MH-${1000 + i}-2023`,
  clientName: ['Ramesh Kumar', 'Suresh Singh', 'Mahesh Patel', 'Dinesh Sharma', 'Ganesh Gupta'][i % 5],
  court: Object.values(CourtType)[i % 4],
  judge: `Hon. Justice ${['Rao', 'Reddy', 'Bose', 'Khan'][i % 4]}`,
  nextHearing: new Date(Date.now() + (i * 86400000)).toISOString(),
  status: Object.values(CaseStatus)[i % 4],
  notes: 'Routine hearing'
}));

export const Cases: React.FC<CasesProps> = ({ strings, cases, setCases, onCaseClick, isProPlan, setIsProPlan }) => {
  const [allCases, setAllCases] = useState<Case[]>([...cases, ...GENERATED_CASES]);
  
  // Filtering States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'All'>('All');
  const [courtFilter, setCourtFilter] = useState<CourtType | 'All'>('All');
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [showUpsell, setShowUpsell] = useState(false);

  // Filter Logic
  const filteredCases = allCases.filter(c => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cnrNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesCourt = courtFilter === 'All' || c.court === courtFilter;

    return matchesSearch && matchesStatus && matchesCourt;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCases = filteredCases.slice(startIndex, startIndex + itemsPerPage);

  const handleExport = () => {
    if (!isProPlan) {
      setShowUpsell(true);
    } else {
      alert("Downloading CSV...");
    }
  };

  return (
    <div className="p-6 md:p-8 h-full flex flex-col relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{strings.cases}</h1>
          <p className="text-slate-500">Manage your ongoing litigations and records.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all group"
          >
            {isProPlan ? <Download size={18} /> : <Lock size={16} className="text-amber-500" />}
            {strings.exportData}
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-blue-200 transition-all">
            <Plus size={20} />
            {strings.newCase}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden animate-fade-in">
        
        {/* Filters Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text"
              placeholder={strings.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {/* Status Filter */}
            <div className="relative">
               <select 
                 value={statusFilter}
                 onChange={(e) => setStatusFilter(e.target.value as CaseStatus)}
                 className="appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm font-medium cursor-pointer shadow-sm hover:bg-slate-50"
               >
                 <option value="All">All Statuses</option>
                 {Object.values(CaseStatus).map(s => <option key={s} value={s}>{s}</option>)}
               </select>
               <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>

             {/* Court Filter */}
            <div className="relative">
               <select 
                 value={courtFilter}
                 onChange={(e) => setCourtFilter(e.target.value as CourtType)}
                 className="appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm font-medium cursor-pointer shadow-sm hover:bg-slate-50"
               >
                 <option value="All">All Courts</option>
                 {Object.values(CourtType).map(c => <option key={c} value={c}>{c}</option>)}
               </select>
               <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {/* Desktop Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="col-span-4">Case Details</div>
          <div className="col-span-2">Client</div>
          <div className="col-span-2">Court</div>
          <div className="col-span-2">Next Hearing</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {/* Scrollable List Area */}
        <div className="overflow-y-auto flex-1 bg-white">
          {currentCases.length > 0 ? (
            currentCases.map((c) => (
              <div 
                key={c.id} 
                onClick={() => onCaseClick(c)}
                className="group border-b border-slate-100 hover:bg-blue-50/30 transition-colors cursor-pointer"
              >
                
                {/* Desktop Row Layout */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 items-center">
                  <div className="col-span-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm font-bold text-lg
                        ${c.status === CaseStatus.OPEN ? 'bg-blue-500' : 
                          c.status === CaseStatus.CLOSED ? 'bg-slate-400' : 
                          'bg-amber-500'}`}
                      >
                        {c.title.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-800 text-sm truncate group-hover:text-blue-600 transition-colors" title={c.title}>{c.title}</h3>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">CNR: {c.cnrNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 text-sm text-slate-600 truncate">{c.clientName}</div>
                  <div className="col-span-2">
                     <span className="text-xs font-medium px-2 py-1 bg-slate-100 border border-slate-200 rounded-md text-slate-600 truncate block w-fit max-w-full">
                       {c.court}
                     </span>
                  </div>
                  <div className="col-span-2 text-sm text-slate-600 flex items-center gap-1.5">
                    <Calendar size={14} className="text-slate-400" />
                    {new Date(c.nextHearing).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                  <div className="col-span-1">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${
                      c.status === CaseStatus.OPEN ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      c.status === CaseStatus.STAYED ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                      c.status === CaseStatus.CLOSED ? 'bg-slate-100 text-slate-600 border border-slate-200' :
                      'bg-purple-50 text-purple-700 border border-purple-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        c.status === CaseStatus.OPEN ? 'bg-blue-500' :
                        c.status === CaseStatus.STAYED ? 'bg-amber-500' :
                        c.status === CaseStatus.CLOSED ? 'bg-slate-500' :
                        'bg-purple-500'
                      }`}></span>
                      {c.status}
                    </span>
                  </div>
                  <div className="col-span-1 text-right">
                    <button className="text-slate-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                {/* Mobile Card Layout */}
                <div className="md:hidden p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm font-bold text-lg
                          ${c.status === CaseStatus.OPEN ? 'bg-blue-500' : 
                            c.status === CaseStatus.CLOSED ? 'bg-slate-400' : 
                            'bg-amber-500'}`}
                        >
                          {c.title.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 text-sm">{c.title}</h3>
                          <p className="text-xs text-slate-500 font-mono">CNR: {c.cnrNumber}</p>
                        </div>
                    </div>
                    <button className="text-slate-400 p-1">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm border-t border-slate-50 pt-3">
                     <div>
                       <span className="text-xs text-slate-400 block mb-1">Client</span>
                       <span className="text-slate-700 font-medium">{c.clientName}</span>
                     </div>
                     <div>
                       <span className="text-xs text-slate-400 block mb-1">Status</span>
                       <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          c.status === CaseStatus.OPEN ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                       }`}>
                         {c.status}
                       </span>
                     </div>
                     <div>
                       <span className="text-xs text-slate-400 block mb-1">Next Hearing</span>
                       <span className="text-slate-700 flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(c.nextHearing).toLocaleDateString()}
                       </span>
                     </div>
                     <div>
                       <span className="text-xs text-slate-400 block mb-1">Court</span>
                       <span className="text-slate-700 truncate">{c.court}</span>
                     </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-400 animate-fade-in">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Search size={32} className="opacity-40" />
              </div>
              <p className="text-lg font-medium text-slate-600">{strings.noCasesFound}</p>
              <p className="text-sm">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => {setSearchTerm(''); setStatusFilter('All'); setCourtFilter('All');}}
                className="mt-4 text-blue-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {filteredCases.length > 0 && (
          <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50">
            <div className="text-sm text-slate-500">
              {strings.showing} <span className="font-bold text-slate-800">{startIndex + 1}</span> - <span className="font-bold text-slate-800">{Math.min(startIndex + itemsPerPage, filteredCases.length)}</span> {strings.of} <span className="font-bold text-slate-800">{filteredCases.length}</span> {strings.entries}
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 rounded-lg hover:bg-white hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              
              {/* Page Numbers */}
              <div className="flex gap-1">
                 {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                   // Simple pagination logic for demo (showing first 5 or relevant range)
                   let p = i + 1;
                   if (totalPages > 5 && currentPage > 3) {
                      p = currentPage - 2 + i;
                      if (p > totalPages) p = p - (p - totalPages); // Clamp
                   }
                   
                   if (p > totalPages || p <= 0) return null;

                   return (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                        currentPage === p 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                          : 'text-slate-600 hover:bg-white hover:border border-transparent hover:border-slate-200'
                      }`}
                    >
                      {p}
                    </button>
                   );
                 })}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 rounded-lg hover:bg-white hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pro Upsell Modal */}
      {showUpsell && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 p-6 text-white text-center">
               <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                 <Lock size={24} className="text-amber-400" />
               </div>
               <h2 className="text-2xl font-bold mb-1">Unlock Pro Features</h2>
               <p className="text-blue-200 text-sm">Take your practice to the next level</p>
            </div>
            <div className="p-6">
               <ul className="space-y-4 mb-8">
                 <li className="flex items-center gap-3 text-slate-700">
                    <div className="p-1 rounded-full bg-green-100 text-green-600"><BadgeAlert size={14} /></div>
                    <span>Export cases to CSV/Excel</span>
                 </li>
                 <li className="flex items-center gap-3 text-slate-700">
                    <div className="p-1 rounded-full bg-green-100 text-green-600"><BadgeAlert size={14} /></div>
                    <span>Unlimited case storage</span>
                 </li>
                 <li className="flex items-center gap-3 text-slate-700">
                    <div className="p-1 rounded-full bg-green-100 text-green-600"><BadgeAlert size={14} /></div>
                    <span>Advanced Analytics Dashboard</span>
                 </li>
               </ul>
               <div className="flex gap-3">
                 <button 
                   onClick={() => setShowUpsell(false)}
                   className="flex-1 py-3 text-slate-500 font-medium hover:bg-slate-50 rounded-xl transition-colors"
                 >
                   Maybe Later
                 </button>
                 <button 
                   onClick={() => {setIsProPlan(true); setShowUpsell(false);}}
                   className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
                 >
                   Upgrade Now
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};