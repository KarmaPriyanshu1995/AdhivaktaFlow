import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Clock,
  ArrowUpRight,
  Gavel,
  PlusCircle,
  UserPlus,
  UploadCloud,
  FileText,
  AlertCircle,
  Sparkles,
  ChevronRight,
  HardDrive
} from 'lucide-react';
import { LanguageStrings, Case, Invoice, Evidence } from '../types';

interface DashboardProps {
  strings: LanguageStrings;
  cases: Case[];
  onCaseClick: (c: Case) => void;
}

// Mock Data for new components
const MOCK_INVOICES: Invoice[] = [
  { id: '1', clientId: 'c1', clientName: 'Amit Verma', amount: 15000, date: '2023-10-10', status: 'Unpaid' },
  { id: '2', clientId: 'c2', clientName: 'TechCorp Ltd', amount: 45000, date: '2023-10-05', status: 'Overdue' },
  { id: '3', clientId: 'c3', clientName: 'Rajesh Sharma', amount: 5000, date: '2023-10-12', status: 'Unpaid' },
];

const MOCK_EVIDENCE: Evidence[] = [
  { id: 'e1', fileName: 'FIR_Report_2023.pdf', caseId: '1', caseTitle: 'Sharma vs State', uploadDate: '2023-10-14', size: '2.4 MB', type: 'pdf' },
  { id: 'e2', fileName: 'Property_Deed_Scan.jpg', caseId: '2', caseTitle: 'Land Dispute: Plot 44A', uploadDate: '2023-10-13', size: '5.1 MB', type: 'img' },
];

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  trend: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, color, bg, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col transition-all hover:shadow-md">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} ${color}`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
          <ArrowUpRight size={12} />
          {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ strings, cases, onCaseClick }) => {
  const [activeTab, setActiveTab] = useState<'hearings' | 'invoices'>('hearings');
  
  // Calculate stats
  const totalPendingAmount = MOCK_INVOICES.reduce((acc, inv) => acc + inv.amount, 0);
  const pendingCount = MOCK_INVOICES.length;
  const hearingsCount = cases.length; // Simplified for mock

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();

  // Helper to generate calendar days
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentYear);
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1).getDay();

  return (
    <div className="p-6 md:p-8 space-y-8 animate-fade-in max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{strings.welcome}</h1>
          <p className="text-slate-500">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg shadow-blue-200 transition-all">
            <PlusCircle size={18} />
            <span className="hidden md:inline">{strings.addCase}</span>
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
            <UserPlus size={18} />
            <span className="hidden md:inline">{strings.addClient}</span>
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
            <UploadCloud size={18} />
            <span className="hidden md:inline">{strings.uploadEvidence}</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label={strings.totalCases} 
          value={cases.length.toString()} 
          icon={Briefcase} 
          color="text-blue-600" 
          bg="bg-blue-50"
          trend="+2 this month"
        />
        <StatCard 
          label={strings.upcomingHearings} 
          value={hearingsCount.toString()} 
          icon={Gavel} 
          color="text-amber-600" 
          bg="bg-amber-50"
          trend="Next: Tomorrow"
        />
        <StatCard 
          label={strings.pendingInvoices} 
          value={`₹${(totalPendingAmount/1000).toFixed(1)}k`} 
          icon={AlertCircle} 
          color="text-red-600" 
          bg="bg-red-50"
          trend={`${pendingCount} unpaid`}
        />
        <StatCard 
          label={strings.storageUsed} 
          value="4.2 GB" 
          icon={HardDrive} 
          color="text-purple-600" 
          bg="bg-purple-50"
          trend="42% of 10GB"
        />
      </div>

      {/* Main Content Split */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column (Lists) */}
        <div className="w-full lg:w-2/3 space-y-8">
          
          {/* Priority Items Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex border-b border-slate-100">
              <button 
                onClick={() => setActiveTab('hearings')}
                className={`flex-1 py-4 text-sm font-semibold text-center transition-colors ${activeTab === 'hearings' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {strings.upcomingHearings}
              </button>
              <button 
                onClick={() => setActiveTab('invoices')}
                className={`flex-1 py-4 text-sm font-semibold text-center transition-colors ${activeTab === 'invoices' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {strings.pendingInvoices}
              </button>
            </div>

            <div className="p-2 min-h-[300px]">
              {activeTab === 'hearings' ? (
                <div className="space-y-2">
                  {cases.map((c, i) => (
                    <div 
                      key={i} 
                      onClick={() => onCaseClick(c)}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 text-blue-600 p-3 rounded-xl font-bold text-center min-w-[60px] shadow-sm">
                          <div className="text-xs uppercase opacity-80">{new Date(c.nextHearing).toLocaleString('default', { month: 'short' })}</div>
                          <div className="text-xl leading-none mt-1">{new Date(c.nextHearing).getDate()}</div>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{c.title}</h4>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1.5">
                            <span className="font-medium text-slate-700">{c.court}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span>{c.cnrNumber}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <div className="flex items-center justify-end gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full mb-1 w-fit ml-auto">
                           <Clock size={12} /> 10:30 AM
                        </div>
                        <span className="text-xs text-slate-400">{c.judge}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {MOCK_INVOICES.map((inv) => (
                     <div key={inv.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-xs">
                             ₹
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-800">{inv.clientName}</h4>
                              <p className="text-xs text-slate-500">Invoice #{inv.id} • {inv.date}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="font-bold text-slate-900">₹{inv.amount.toLocaleString('en-IN')}</div>
                           <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${inv.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                              {inv.status}
                           </span>
                        </div>
                     </div>
                  ))}
                  <div className="p-4 text-center">
                    <button className="text-blue-600 text-sm font-medium hover:underline">View All Invoices</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Evidence Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <HardDrive size={20} className="text-purple-600" />
                {strings.evidenceSummary}
              </h2>
              <button className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
                {strings.viewAll} <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
               {MOCK_EVIDENCE.map((e) => (
                 <div key={e.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:shadow-md hover:border-blue-100 transition-all bg-slate-50/50">
                    <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${e.type === 'pdf' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                          <FileText size={18} />
                       </div>
                       <div className="overflow-hidden">
                          <h4 className="text-sm font-semibold text-slate-800 truncate max-w-[200px]">{e.fileName}</h4>
                          <p className="text-xs text-slate-500 truncate max-w-[200px]">{e.caseTitle}</p>
                       </div>
                    </div>
                    <div className="text-right text-xs text-slate-500">
                       <div className="font-medium">{e.size}</div>
                       <div>{e.uploadDate}</div>
                    </div>
                 </div>
               ))}
            </div>

            {/* Storage Bar */}
            <div className="mt-6">
               <div className="flex justify-between text-xs font-medium text-slate-600 mb-2">
                  <span>4.2 GB Used</span>
                  <span>10 GB Total</span>
               </div>
               <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[42%] rounded-full"></div>
               </div>
            </div>
          </div>

        </div>

        {/* Right Column (Widgets) */}
        <div className="w-full lg:w-1/3 space-y-8">
          
          {/* Calendar Widget */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-slate-800">{strings.calendar}</h2>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{currentMonth} {currentYear}</span>
             </div>
             
             {/* Simple Calendar Grid */}
             <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['S','M','T','W','T','F','S'].map((d, i) => (
                  <div key={i} className="text-xs font-bold text-slate-400 py-2">{d}</div>
                ))}
             </div>
             <div className="grid grid-cols-7 gap-1 text-center">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square"></div>
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isToday = day === currentDay;
                  // Mock random hearings for visual
                  const hasEvent = [14, 28, 5, 12].includes(day); 
                  
                  return (
                    <div 
                      key={day} 
                      className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm font-medium relative cursor-pointer hover:bg-slate-50 transition-colors ${isToday ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200' : 'text-slate-700'}`}
                    >
                      {day}
                      {hasEvent && !isToday && (
                        <div className="w-1 h-1 rounded-full bg-amber-500 absolute bottom-1.5"></div>
                      )}
                      {hasEvent && isToday && (
                         <div className="w-1 h-1 rounded-full bg-white absolute bottom-1.5"></div>
                      )}
                    </div>
                  );
                })}
             </div>
             <div className="mt-4 pt-4 border-t border-slate-100">
               <div className="flex items-center gap-2 text-xs text-slate-500">
                 <div className="w-2 h-2 rounded-full bg-amber-500"></div> Hearing
                 <div className="w-2 h-2 rounded-full bg-blue-600 ml-2"></div> Today
               </div>
             </div>
          </div>

          {/* AI Suggestions - Pro Feature */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt blur-[2px]"></div>
            <div className="relative bg-white p-6 rounded-2xl shadow-sm">
               <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg text-purple-600">
                     <Sparkles size={20} />
                  </div>
                  <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                    Pro Feature
                  </span>
               </div>
               
               <h3 className="font-bold text-slate-900 mb-2">Smart Suggestion</h3>
               <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                 Hearing tomorrow for <strong>Sharma vs State</strong>. Would you like to draft a <em>Section 317 Exemption Application</em>?
               </p>

               <button className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2">
                 <Sparkles size={14} /> Draft with AI
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};