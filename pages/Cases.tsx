import React, { useState } from 'react';
import { Search, Filter, Plus, FileText, MoreVertical } from 'lucide-react';
import { LanguageStrings, Case, CaseStatus, CourtType } from '../types';

interface CasesProps {
  strings: LanguageStrings;
  cases: Case[];
  setCases: React.Dispatch<React.SetStateAction<Case[]>>;
}

export const Cases: React.FC<CasesProps> = ({ strings, cases }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = cases.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.cnrNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{strings.cases}</h1>
          <p className="text-slate-500">Manage your ongoing litigations and records.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-blue-200 transition-all">
          <Plus size={20} />
          {strings.newCase}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder={strings.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-medium transition-colors">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="col-span-4">Case Details</div>
          <div className="col-span-2">Client</div>
          <div className="col-span-2">Court</div>
          <div className="col-span-2">Next Hearing</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1">
          {filteredCases.map((c) => (
            <div key={c.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-100 items-center hover:bg-slate-50 transition-colors group">
              <div className="col-span-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">{c.title}</h3>
                    <p className="text-xs text-slate-500">CNR: {c.cnrNumber}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 text-sm text-slate-600">{c.clientName}</div>
              <div className="col-span-2">
                 <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded text-slate-600">{c.court}</span>
              </div>
              <div className="col-span-2 text-sm text-slate-600">
                {new Date(c.nextHearing).toLocaleDateString()}
              </div>
              <div className="col-span-1">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  c.status === CaseStatus.OPEN ? 'bg-green-100 text-green-700' :
                  c.status === CaseStatus.STAYED ? 'bg-amber-100 text-amber-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {c.status}
                </span>
              </div>
              <div className="col-span-1 text-right">
                <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ))}
          {filteredCases.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <FileText size={48} className="mb-4 opacity-20" />
              <p>No cases found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};