import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Clock, 
  Plus, 
  Download, 
  CreditCard, 
  Mic, 
  Save, 
  Lock,
  MoreVertical,
  Gavel,
  ShieldAlert
} from 'lucide-react';
import { LanguageStrings, Case, CaseStatus, Hearing, Invoice, Evidence, CaseNote } from '../types';

interface CaseDetailProps {
  caseItem: Case;
  onBack: () => void;
  strings: LanguageStrings;
  isProPlan: boolean;
}

// Mock Data for Detail View
const MOCK_HEARINGS: Hearing[] = [
  { id: 'h1', date: '2023-10-15', title: 'First Hearing', outcome: 'Adjourned', attendees: 'Adv. Rajesh, Client' },
  { id: 'h2', date: '2023-09-01', title: 'Bail Application', outcome: 'Arguments Heard', attendees: 'Adv. Rajesh' },
  { id: 'h3', date: '2023-08-10', title: 'Filing', outcome: 'Case Registered', attendees: 'Clerk' },
];

const MOCK_INVOICES: Invoice[] = [
  { id: 'INV-001', clientId: 'c1', clientName: 'Rajesh Sharma', amount: 5000, date: '2023-08-15', status: 'Paid' },
  { id: 'INV-002', clientId: 'c1', clientName: 'Rajesh Sharma', amount: 2500, date: '2023-09-02', status: 'Unpaid' },
];

const MOCK_NOTES: CaseNote[] = [
  { id: 'n1', date: '2023-10-14', text: 'Client mentioned a new witness. Need to verify address.', isVoiceNote: false },
  { id: 'n2', date: '2023-09-01', text: 'Judge requested precedent for Section 41A compliance.', isVoiceNote: true },
];

export const CaseDetail: React.FC<CaseDetailProps> = ({ caseItem, onBack, strings, isProPlan }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'hearings' | 'evidence' | 'billing' | 'notes'>('overview');
  const [noteText, setNoteText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    if (!isProPlan) return;
    setIsRecording(!isRecording);
  };

  return (
    <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-4 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          {strings.backToCases}
        </button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-slate-900">{caseItem.title}</h1>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                caseItem.status === CaseStatus.OPEN ? 'bg-blue-50 text-blue-700 border-blue-100' :
                caseItem.status === CaseStatus.CLOSED ? 'bg-slate-100 text-slate-600 border-slate-200' :
                'bg-amber-50 text-amber-700 border-amber-100'
              }`}>
                {caseItem.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
               <span className="flex items-center gap-1.5"><Gavel size={14} /> {caseItem.cnrNumber}</span>
               <span className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block"></span>
               <span className="flex items-center gap-1.5"><MapPin size={14} /> {caseItem.court}</span>
               <span className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block"></span>
               <span className="flex items-center gap-1.5"><User size={14} /> {caseItem.judge}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="bg-white border border-slate-200 text-slate-700 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
              <MoreVertical size={20} />
            </button>
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
              <Plus size={18} /> {strings.addHearing}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-slate-200 mb-6 gap-6">
        {[
          { id: 'overview', label: strings.overview },
          { id: 'hearings', label: strings.hearings },
          { id: 'evidence', label: strings.evidence },
          { id: 'billing', label: strings.billing },
          { id: 'notes', label: strings.notes },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Next Hearing Card */}
             <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                   <div>
                      <div className="flex items-center gap-2 text-blue-200 mb-2 font-medium">
                         <Clock size={18} />
                         Next Hearing
                      </div>
                      <h2 className="text-3xl font-bold mb-1">
                        {new Date(caseItem.nextHearing).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </h2>
                      <p className="text-slate-400">10:30 AM • Court Room 4</p>
                   </div>
                   <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl max-w-sm">
                      <p className="text-sm text-slate-300 italic">"Ensure all property documents are notarized before this session."</p>
                   </div>
                </div>
             </div>

             {/* Client Info */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                   <User size={18} className="text-slate-400" /> 
                   {strings.clientDetails}
                </h3>
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold">
                         {caseItem.clientName.charAt(0)}
                      </div>
                      <div>
                         <div className="font-semibold text-slate-900">{caseItem.clientName}</div>
                         <div className="text-xs text-slate-500">Client ID: #8832</div>
                      </div>
                   </div>
                   <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                         <Phone size={16} /> +91 98765 43210
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                         <Mail size={16} /> client@email.com
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                         <MapPin size={16} /> Mumbai, Maharashtra
                      </div>
                   </div>
                </div>
             </div>

             {/* Recent Activity Mini List */}
             <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4">{strings.recentActivity}</h3>
                <div className="space-y-4">
                   {[1,2].map((i) => (
                      <div key={i} className="flex gap-4">
                         <div className="flex flex-col items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <div className="w-0.5 flex-1 bg-slate-100 my-1"></div>
                         </div>
                         <div className="pb-4">
                            <p className="text-sm font-medium text-slate-800">New Evidence Uploaded</p>
                            <p className="text-xs text-slate-500">Affidavit_v2.pdf was added by Adv. Sharma</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">2 hours ago</span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {/* HEARINGS TAB */}
        {activeTab === 'hearings' && (
          <div className="max-w-3xl">
             <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pb-8">
                {MOCK_HEARINGS.map((hearing) => (
                   <div key={hearing.id} className="relative pl-8 group">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-500 group-hover:scale-125 transition-transform"></div>
                      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                         <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
                            <h3 className="font-bold text-slate-800">{hearing.title}</h3>
                            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200 w-fit">
                               {hearing.outcome}
                            </span>
                         </div>
                         <div className="text-sm text-slate-600 mb-3 flex items-center gap-2">
                            <Calendar size={14} />
                            {new Date(hearing.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                         </div>
                         <p className="text-sm text-slate-500">
                            <strong>Attendees:</strong> {hearing.attendees}
                         </p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        )}

        {/* EVIDENCE TAB */}
        {activeTab === 'evidence' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
             <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-semibold text-slate-500">
                   <tr>
                      <th className="px-6 py-4">File Name</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Size</th>
                      <th className="px-6 py-4 text-right">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {[1, 2, 3].map((i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                         <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-3">
                            <FileText size={18} className="text-blue-500" />
                            Document_{i}.pdf
                         </td>
                         <td className="px-6 py-4">Oct 1{i}, 2023</td>
                         <td className="px-6 py-4">2.{i} MB</td>
                         <td className="px-6 py-4 text-right">
                            <button className="text-slate-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                               <Download size={18} />
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
             <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-center">
                <button className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:underline">
                   <Plus size={16} /> Upload New Evidence
                </button>
             </div>
          </div>
        )}

        {/* BILLING TAB */}
        {activeTab === 'billing' && (
          <div className="space-y-4">
             {MOCK_INVOICES.map((inv) => (
                <div key={inv.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                   <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${inv.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                         <CreditCard size={20} />
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-800">Invoice #{inv.id}</h4>
                         <p className="text-sm text-slate-500">{inv.date}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${inv.status === 'Paid' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                         {inv.status}
                      </span>
                      <div className="text-right">
                         <div className="font-bold text-slate-900">₹{inv.amount.toLocaleString()}</div>
                         <div className="text-xs text-slate-400">Total Amount</div>
                      </div>
                      <button className="text-slate-400 hover:text-blue-600">
                         <Download size={18} />
                      </button>
                   </div>
                </div>
             ))}
          </div>
        )}

        {/* NOTES TAB */}
        {activeTab === 'notes' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
             {/* Notes List */}
             <div className="lg:col-span-1 space-y-4 overflow-y-auto max-h-[500px] pr-2">
                {MOCK_NOTES.map((note) => (
                   <div key={note.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-blue-300 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-xs text-slate-400">{note.date}</span>
                         {note.isVoiceNote && <Mic size={14} className="text-purple-500" />}
                      </div>
                      <p className="text-sm text-slate-700 line-clamp-3">{note.text}</p>
                   </div>
                ))}
             </div>

             {/* Editor */}
             <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[500px]">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
                   <h3 className="font-bold text-slate-800">{strings.notes}</h3>
                   <div className="flex items-center gap-2">
                      <button 
                        onClick={toggleRecording}
                        className={`p-2 rounded-lg transition-all flex items-center gap-2 ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : isProPlan ? 'hover:bg-purple-50 text-slate-500 hover:text-purple-600' : 'text-slate-300 cursor-not-allowed'}`}
                        title={isProPlan ? "Voice Note" : "Pro Feature: Voice to Text"}
                      >
                         {!isProPlan && <Lock size={14} />}
                         <Mic size={18} />
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
                         <Save size={16} /> {strings.saveNote}
                      </button>
                   </div>
                </div>
                <textarea 
                   value={noteText}
                   onChange={(e) => setNoteText(e.target.value)}
                   className="flex-1 p-6 focus:outline-none resize-none text-slate-700 leading-relaxed"
                   placeholder="Type your case notes here..."
                ></textarea>
                
                {/* Pro Upsell Banner inside Editor if Basic */}
                {!isProPlan && (
                  <div className="p-4 bg-gradient-to-r from-slate-900 to-blue-900 text-white m-2 rounded-xl flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white/10 rounded-lg"><ShieldAlert size={20} className="text-amber-400" /></div>
                       <div>
                          <p className="font-bold text-sm">Unlock Voice-to-Text Notes</p>
                          <p className="text-xs text-slate-300">Dictate your case notes instantly with Pro Plan.</p>
                       </div>
                    </div>
                    <button className="px-3 py-1.5 bg-white text-blue-900 text-xs font-bold rounded-lg hover:bg-blue-50">Upgrade</button>
                  </div>
                )}
             </div>
          </div>
        )}

      </div>
    </div>
  );
};