import React, { useState } from 'react';
import { Sparkles, FileText, Copy, Check, Download, Mic, StopCircle, Lock, Save } from 'lucide-react';
import { generateLegalDraft } from '../services/geminiService';
import { LanguageStrings } from '../types';

interface AIDraftsProps {
  strings: LanguageStrings;
  language: 'English' | 'Hindi';
  isProPlan: boolean;
}

const CATEGORIES = [
  "Criminal",
  "Civil",
  "Family / Matrimonial",
  "Corporate / Commercial",
  "Consumer Dispute",
  "Property / Real Estate",
  "Rent / Tenancy"
];

const DOC_TYPES: Record<string, string[]> = {
  "Criminal": ["Bail Application (Sec 437/439 CrPC)", "Anticipatory Bail (Sec 438 CrPC)", "Criminal Complaint", "FIR Quashing Petition", "Exemption Application (Sec 317 CrPC)"],
  "Civil": ["Plaint", "Written Statement", "Legal Notice", "Affidavit", "Injunction Application"],
  "Family / Matrimonial": ["Divorce Petition", "Maintenance Petition (Sec 125 CrPC)", "Restitution of Conjugal Rights", "Child Custody Application"],
  "Corporate / Commercial": ["Non-Disclosure Agreement (NDA)", "Service Agreement", "Board Resolution", "Legal Opinion"],
  "Consumer Dispute": ["Consumer Complaint", "Reply to Complaint", "Legal Notice to Company"],
  "Property / Real Estate": ["Sale Deed", "Gift Deed", "Will / Testament", "Power of Attorney"],
  "Rent / Tenancy": ["Rent Agreement", "Eviction Notice", "Lease Deed"]
};

export const AIDrafts: React.FC<AIDraftsProps> = ({ strings, language, isProPlan }) => {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [draftType, setDraftType] = useState(DOC_TYPES[CATEGORIES[0]][0]);
  const [parties, setParties] = useState('');
  const [facts, setFacts] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCat = e.target.value;
    setCategory(newCat);
    setDraftType(DOC_TYPES[newCat][0]);
  };

  const handleGenerate = async () => {
    if (!isProPlan) {
      setShowUpsell(true);
      return;
    }

    if (!parties || !facts) {
      alert("Please fill in Parties and Key Facts.");
      return;
    }

    setIsGenerating(true);
    const result = await generateLegalDraft(category, draftType, parties, facts, language);
    setGeneratedContent(result);
    setIsGenerating(false);
  };

  const handleMicClick = () => {
    if (!isProPlan) {
      setShowUpsell(true);
      return;
    }
    if (isRecording) {
      setIsRecording(false);
      setFacts(prev => prev + " [Voice Note Transcribed: The accused was arrested on 14th August without a warrant...]");
    } else {
      setIsRecording(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleSave = () => {
    if (!generatedContent) return;
    alert("Draft saved to Case Files!");
  };

  return (
    <div className="p-6 md:p-8 h-full flex flex-col relative">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="text-purple-600" />
            {strings.aiDrafts}
          </h1>
          <p className="text-slate-500">Generate professional Indian legal documents instantly.</p>
        </div>
        {!isProPlan && (
           <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
             <Lock size={12} className="text-amber-400" />
             Upgrade to Pro to Generate
           </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[500px]">
        {/* Input Panel */}
        <div className="w-full lg:w-1/3 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col overflow-y-auto">
            <h2 className="font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">Draft Configuration</h2>
            
            <label className="block text-sm font-medium text-slate-700 mb-1">{strings.caseCategory}</label>
            <select 
              value={category}
              onChange={handleCategoryChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none mb-4"
            >
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <label className="block text-sm font-medium text-slate-700 mb-1">{strings.docPurpose}</label>
            <select 
              value={draftType}
              onChange={(e) => setDraftType(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none mb-4"
            >
              {DOC_TYPES[category]?.map(type => <option key={type} value={type}>{type}</option>)}
            </select>

            <label className="block text-sm font-medium text-slate-700 mb-1">{strings.partiesInvolved}</label>
            <input 
              type="text"
              value={parties}
              onChange={(e) => setParties(e.target.value)}
              placeholder="e.g. State vs. Rahul Kumar"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none mb-4"
            />

            <label className="block text-sm font-medium text-slate-700 mb-1">{strings.keyFacts}</label>
            <div className="relative flex-1 min-h-[150px]">
              <textarea 
                value={facts}
                onChange={(e) => setFacts(e.target.value)}
                placeholder="Describe case dates, sections, amounts, and specific relief sought..."
                className="w-full h-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none resize-none pb-12"
              ></textarea>
              <button 
                onClick={handleMicClick}
                className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors ${
                  isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                }`}
                title="Voice to Text"
              >
                {!isProPlan && <Lock size={12} className="absolute -top-1 -right-1 text-slate-500" />}
                {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
              </button>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`mt-4 w-full py-3 rounded-xl font-medium flex justify-center items-center gap-2 transition-all shadow-lg ${
                isProPlan 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-900 shadow-slate-300 cursor-pointer'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {strings.drafting}
                </>
              ) : (
                <>
                  {!isProPlan && <Lock size={16} className="text-amber-400" />}
                  <Sparkles size={18} />
                  {strings.generateDraft}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <FileText size={18} className="text-slate-500" />
                {strings.generatedDoc}
              </h2>
              <div className="flex gap-2">
                 <button 
                    onClick={handleCopy} 
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-slate-200 transition-all"
                    disabled={!generatedContent}
                 >
                   {copySuccess ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                   {copySuccess ? "Copied" : strings.copy}
                 </button>
                 <button 
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-slate-200 transition-all"
                    disabled={!generatedContent}
                 >
                   <Save size={14} />
                   {strings.saveToCase}
                 </button>
                 <button 
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
                    disabled={!generatedContent}
                 >
                   <Download size={14} />
                   {strings.download}
                 </button>
              </div>
            </div>
            <textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)} 
              className="flex-1 p-8 overflow-y-auto bg-white font-mono text-sm leading-relaxed text-slate-700 whitespace-pre-wrap outline-none resize-none"
              placeholder={isProPlan ? "Draft content will appear here..." : "Unlock Pro to generate drafts..."}
            />
             {!generatedContent && (
                <div className="absolute inset-0 top-14 flex flex-col items-center justify-center text-slate-400 pointer-events-none">
                  <Sparkles size={48} className="mb-4 opacity-20" />
                  <p>AI Generated content will appear here.</p>
                  <p className="text-xs mt-2 opacity-60">Optimized for Indian Legal Formats</p>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Pro Upsell Modal */}
      {showUpsell && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden text-center p-8">
             <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-purple-200">
                <Sparkles size={32} />
             </div>
             <h2 className="text-2xl font-bold text-slate-800 mb-2">Unlock AI Drafter</h2>
             <p className="text-slate-500 mb-8">Generate unlimited legal drafts, notices, and agreements instantly with Gemini 2.5 AI.</p>
             <button onClick={() => setShowUpsell(false)} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
               Maybe Later
             </button>
          </div>
        </div>
      )}
    </div>
  );
};