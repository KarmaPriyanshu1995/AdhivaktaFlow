import React, { useState } from 'react';
import { Search, Briefcase, Users, FileText, ArrowRight } from 'lucide-react';
import { LanguageStrings, Case, Client } from '../types';

interface SearchResultsProps {
  query: string;
  strings: LanguageStrings;
  cases: Case[];
  clients: Client[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query, strings, cases, clients }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'cases' | 'clients' | 'files'>('all');

  const filteredCases = cases.filter(c => c.title.toLowerCase().includes(query.toLowerCase()));
  const filteredClients = clients.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
  
  // Mock file search results
  const filteredFiles = [
    { title: 'Bail Application Draft', type: 'doc', context: 'Sharma vs State' },
    { title: 'FIR Report Scan', type: 'pdf', context: 'Sharma vs State' }
  ].filter(f => f.title.toLowerCase().includes(query.toLowerCase()));

  const totalResults = filteredCases.length + filteredClients.length + filteredFiles.length;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto h-full animate-fade-in">
       <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{strings.searchResults}</h1>
          <p className="text-slate-500">
             Found {totalResults} results for <span className="font-bold text-slate-900">"{query}"</span>
          </p>
       </div>

       {/* Tabs */}
       <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit mb-8">
          {['all', 'cases', 'clients', 'files'].map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                  activeTab === tab 
                     ? 'bg-white text-blue-600 shadow-sm' 
                     : 'text-slate-500 hover:text-slate-800'
               }`}
             >
                {tab}
             </button>
          ))}
       </div>

       <div className="space-y-8">
          {/* Cases Section */}
          {(activeTab === 'all' || activeTab === 'cases') && filteredCases.length > 0 && (
             <section>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                   <Briefcase size={16} /> Cases ({filteredCases.length})
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                   {filteredCases.map(c => (
                      <div key={c.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer transition-all group">
                         <div className="flex justify-between items-start">
                            <h4 className="font-bold text-slate-800 group-hover:text-blue-600">{c.title}</h4>
                            <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                         </div>
                         <p className="text-sm text-slate-500 mt-1">{c.cnrNumber} • {c.court}</p>
                         <div className="mt-3 flex gap-2">
                            <span className="text-xs bg-slate-100 px-2 py-1 rounded font-medium text-slate-600">{c.status}</span>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          )}

          {/* Clients Section */}
          {(activeTab === 'all' || activeTab === 'clients') && filteredClients.length > 0 && (
             <section>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                   <Users size={16} /> Clients ({filteredClients.length})
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                   {filteredClients.map(c => (
                      <div key={c.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-green-400 cursor-pointer transition-all flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                            {c.name.charAt(0)}
                         </div>
                         <div>
                            <div className="font-bold text-slate-800 text-sm">{c.name}</div>
                            <div className="text-xs text-slate-500">{c.phone}</div>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          )}

          {/* Files Section */}
          {(activeTab === 'all' || activeTab === 'files') && filteredFiles.length > 0 && (
             <section>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                   <FileText size={16} /> Files ({filteredFiles.length})
                </h3>
                <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                   {filteredFiles.map((f, i) => (
                      <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer">
                         <div className={`p-2 rounded-lg ${f.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                            <FileText size={20} />
                         </div>
                         <div>
                            <div className="font-semibold text-slate-800 text-sm">{f.title}</div>
                            <div className="text-xs text-slate-500">Found in: {f.context}</div>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          )}

          {totalResults === 0 && (
             <div className="text-center py-20 text-slate-400">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <h2 className="text-xl font-bold text-slate-600 mb-2">{strings.noResults}</h2>
                <p>Try checking your spelling or use different keywords.</p>
             </div>
          )}
       </div>
    </div>
  );
};