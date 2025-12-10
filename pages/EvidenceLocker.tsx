import React, { useState } from 'react';
import { 
  HardDrive, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Plus, 
  FileText, 
  Download, 
  MoreVertical,
  Briefcase
} from 'lucide-react';
import { LanguageStrings, Evidence, Case } from '../types';

interface EvidenceLockerProps {
  strings: LanguageStrings;
  isProPlan: boolean;
  cases: Case[]; // To link/filter by case
}

// Mock Data for the Locker
const MOCK_ALL_EVIDENCE: Evidence[] = [
  { id: 'e1', fileName: 'FIR_Report_2023.pdf', caseId: '1', caseTitle: 'Sharma vs State', uploadDate: '2023-10-14', size: '2.4 MB', type: 'pdf', tags: ['Urgent', 'Court'] },
  { id: 'e2', fileName: 'Property_Deed_Scan.jpg', caseId: '2', caseTitle: 'Land Dispute: Plot 44A', uploadDate: '2023-10-13', size: '5.1 MB', type: 'img', tags: ['Evidence'] },
  { id: 'e3', fileName: 'Bail_Application_Draft.docx', caseId: '1', caseTitle: 'Sharma vs State', uploadDate: '2023-10-12', size: '0.5 MB', type: 'doc', tags: ['Draft'] },
  { id: 'e4', fileName: 'Witness_Statement_01.pdf', caseId: '3', caseTitle: 'TechCorp Breach', uploadDate: '2023-09-20', size: '1.2 MB', type: 'pdf', tags: ['Witness'] },
  { id: 'e5', fileName: 'Site_Map_Survey.png', caseId: '2', caseTitle: 'Land Dispute: Plot 44A', uploadDate: '2023-09-18', size: '3.8 MB', type: 'img', tags: ['Map'] },
];

export const EvidenceLocker: React.FC<EvidenceLockerProps> = ({ strings, isProPlan, cases }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [caseFilter, setCaseFilter] = useState<string>('All');

  const filteredEvidence = MOCK_ALL_EVIDENCE.filter(item => {
    const matchesSearch = item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.caseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    const matchesCase = caseFilter === 'All' || item.caseId === caseFilter;
    return matchesSearch && matchesType && matchesCase;
  });

  // Calculate usage
  const usedSpace = 4.2; // GB
  const totalSpace = isProPlan ? 10 : 0.5; // GB
  const usagePercent = (usedSpace / totalSpace) * 100;

  return (
    <div className="p-6 md:p-8 h-full flex flex-col animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <HardDrive className="text-purple-600" /> {strings.evidenceLocker}
           </h1>
           <p className="text-slate-500">Centralized repository for all your legal documents.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
           {/* Storage Pill */}
           <div className="hidden md:flex flex-col items-end mr-4">
              <div className="text-xs font-bold text-slate-600 mb-1">{usedSpace}GB / {isProPlan ? '10GB' : '500MB'} Used</div>
              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className={`h-full rounded-full ${usagePercent > 90 ? 'bg-red-500' : 'bg-purple-500'}`} style={{ width: `${Math.min(usagePercent, 100)}%` }}></div>
              </div>
           </div>
           
           <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-purple-200 transition-all">
              <Plus size={20} /> <span className="hidden sm:inline">{strings.uploadFile}</span>
           </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-20 z-10">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
               type="text" 
               placeholder="Search files..."
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-400 transition-all"
            />
         </div>
         
         <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <select 
               value={caseFilter} 
               onChange={e => setCaseFilter(e.target.value)}
               className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-purple-400"
            >
               <option value="All">All Cases</option>
               {cases.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>

            <select 
               value={typeFilter} 
               onChange={e => setTypeFilter(e.target.value)}
               className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-purple-400"
            >
               <option value="All">{strings.filterByType}</option>
               <option value="pdf">PDF Documents</option>
               <option value="img">Images</option>
               <option value="doc">Word Documents</option>
            </select>

            <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block"></div>

            <div className="flex bg-slate-100 p-1 rounded-lg">
               <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-purple-600' : 'text-slate-400'}`}
               >
                  <LayoutGrid size={18} />
               </button>
               <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-purple-600' : 'text-slate-400'}`}
               >
                  <List size={18} />
               </button>
            </div>
         </div>
      </div>

      {/* Content Area */}
      {filteredEvidence.length > 0 ? (
         <>
            {viewMode === 'grid' ? (
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredEvidence.map(item => (
                     <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all group cursor-pointer relative">
                        <div className={`aspect-square rounded-lg mb-3 flex items-center justify-center relative overflow-hidden ${
                           item.type === 'pdf' ? 'bg-red-50 text-red-500' : 
                           item.type === 'img' ? 'bg-blue-50 text-blue-500' : 
                           'bg-blue-50 text-blue-600'
                        }`}>
                           <FileText size={40} strokeWidth={1.5} />
                           {item.tags && item.tags.length > 0 && (
                              <div className="absolute top-2 right-2 flex flex-wrap justify-end gap-1">
                                 {item.tags.slice(0, 2).map(t => (
                                    <span key={t} className="text-[9px] bg-white/90 px-1.5 py-0.5 rounded shadow-sm font-bold uppercase text-slate-600">
                                       {t}
                                    </span>
                                 ))}
                              </div>
                           )}
                        </div>
                        <h4 className="font-semibold text-slate-800 text-sm truncate mb-1" title={item.fileName}>{item.fileName}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2 truncate">
                           <Briefcase size={10} />
                           {item.caseTitle}
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-100 pt-2">
                           <span>{item.size}</span>
                           <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
                        </div>
                        <button className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-purple-600">
                           <Download size={16} />
                        </button>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <table className="w-full text-left text-sm text-slate-600">
                     <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-semibold text-slate-500">
                        <tr>
                           <th className="px-6 py-4">Name</th>
                           <th className="px-6 py-4">Case Link</th>
                           <th className="px-6 py-4">Type</th>
                           <th className="px-6 py-4">Size</th>
                           <th className="px-6 py-4">Date</th>
                           <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {filteredEvidence.map(item => (
                           <tr key={item.id} className="hover:bg-slate-50">
                              <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-3">
                                 <div className={`p-2 rounded-lg ${item.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                    <FileText size={18} />
                                 </div>
                                 {item.fileName}
                              </td>
                              <td className="px-6 py-4">{item.caseTitle}</td>
                              <td className="px-6 py-4 uppercase text-xs font-bold">{item.type}</td>
                              <td className="px-6 py-4">{item.size}</td>
                              <td className="px-6 py-4">{item.uploadDate}</td>
                              <td className="px-6 py-4 text-right">
                                 <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-purple-600">
                                    <MoreVertical size={18} />
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
         </>
      ) : (
         <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 m-4">
            <HardDrive size={48} className="mb-4 opacity-20" />
            <p className="font-medium text-slate-600">No files found</p>
            <p className="text-sm">Try adjusting filters or upload a new document.</p>
         </div>
      )}
    </div>
  );
};