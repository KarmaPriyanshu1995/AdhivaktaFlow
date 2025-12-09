import React from 'react';
import { X, CheckCircle, HelpCircle } from 'lucide-react';

interface ClarificationModalProps {
  onClose: () => void;
}

export const ClarificationModal: React.FC<ClarificationModalProps> = ({ onClose }) => {
  const questions = [
    "Do you require specific integration with the e-Courts Services CIS (Case Information System)?",
    "Should the billing module support GST compliant invoicing formats?",
    "Do you need a separate login portal for Junior Advocates/Clerks with restricted permissions?",
    "Is 'Offline Mode' a critical requirement for courtrooms with poor connectivity?",
    "Should the app include specific templates for different High Courts (e.g., Delhi vs. Bombay)?",
    "Is WhatsApp integration required for sending automated hearing reminders to clients?",
    "Do you need document storage limits (Basic vs. Pro plan differentiation)?",
    "Should we include a Bar Council ID verification step during signup?",
    "Do you need a dedicated 'Citations' library or integration with SCC Online/Manupatra?",
    "Is the client portal required to be bilingual as well?"
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <HelpCircle size={24} />
             </div>
             <div>
                <h2 className="text-xl font-bold text-slate-800">Project Scoping & Clarifications</h2>
                <p className="text-sm text-slate-500">Please review the following specification questions.</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
           <div className="space-y-4">
              {questions.map((q, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold mt-0.5">
                          {i + 1}
                      </span>
                      <div className="flex-1">
                          <p className="text-slate-700 font-medium mb-3">{q}</p>
                          <div className="flex gap-4">
                              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                  <input type="radio" name={`q-${i}`} className="text-blue-600 focus:ring-blue-500" /> Yes
                              </label>
                              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                  <input type="radio" name={`q-${i}`} className="text-blue-600 focus:ring-blue-500" /> No
                              </label>
                              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                  <input type="radio" name={`q-${i}`} className="text-blue-600 focus:ring-blue-500" defaultChecked /> Discuss Later
                              </label>
                          </div>
                      </div>
                  </div>
              ))}
           </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-white rounded-b-2xl flex justify-end gap-3">
            <button onClick={onClose} className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-colors">
                Save Draft
            </button>
            <button onClick={onClose} className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center gap-2">
                <CheckCircle size={18} />
                Confirm Scope & Launch
            </button>
        </div>
      </div>
    </div>
  );
};