import React, { useState } from 'react';
import { Sparkles, FileText, Copy, Check, Download, Mic, StopCircle } from 'lucide-react';
import { generateLegalDraft } from '../services/geminiService';
import { LanguageStrings } from '../types';

interface AIDraftsProps {
  strings: LanguageStrings;
  language: 'English' | 'Hindi';
}

export const AIDrafts: React.FC<AIDraftsProps> = ({ strings, language }) => {
  const [draftType, setDraftType] = useState('Bail Application');
  const [parties, setParties] = useState('');
  const [facts, setFacts] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleGenerate = async () => {
    if (!parties || !facts) return;
    setIsGenerating(true);
    const result = await generateLegalDraft(draftType, parties, facts, language);
    setGeneratedContent(result);
    setIsGenerating(false);
  };

  const handleMicClick = () => {
    // Simulation of Voice-to-Text
    if (isRecording) {
      setIsRecording(false);
      // In a real app, we would process the audio blob here
      setFacts(prev => prev + " [Voice Note Transcribed: The accused was arrested on 14th August without a warrant...]");
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="p-6 md:p-8 h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="text-purple-600" />
          {strings.aiDrafts}
        </h1>
        <p className="text-slate-500">Generate legal documents instantly using AI.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Input Panel */}
        <div className="w-full lg:w-1/3 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
            <h2 className="font-semibold text-slate-800 mb-4">Draft Configuration</h2>
            
            <label className="block text-sm font-medium text-slate-700 mb-1">Document Type</label>
            <select 
              value={draftType}
              onChange={(e) => setDraftType(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none mb-4"
            >
              <option>Bail Application (Sec 437/439 CrPC)</option>
              <option>Legal Notice</option>
              <option>Affidavit</option>
              <option>Vakalatnama</option>
              <option>Rent Agreement</option>
              <option>Divorce Petition</option>
            </select>

            <label className="block text-sm font-medium text-slate-700 mb-1">Parties Involved</label>
            <input 
              type="text"
              value={parties}
              onChange={(e) => setParties(e.target.value)}
              placeholder="e.g. State vs. Rahul Kumar"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none mb-4"
            />

            <label className="block text-sm font-medium text-slate-700 mb-1">Key Facts & Context</label>
            <div className="relative flex-1">
              <textarea 
                value={facts}
                onChange={(e) => setFacts(e.target.value)}
                placeholder="Describe the case details, dates, sections applicable..."
                className="w-full h-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none resize-none pb-12"
              ></textarea>
              <button 
                onClick={handleMicClick}
                className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors ${
                  isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                }`}
                title="Voice to Text"
              >
                {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
              </button>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !parties || !facts}
              className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 transition-all shadow-lg shadow-blue-100"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Draft
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
                Generated Document
              </h2>
              <div className="flex gap-2">
                 <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg" title="Copy">
                   <Copy size={18} />
                 </button>
                 <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg" title="Download PDF">
                   <Download size={18} />
                 </button>
              </div>
            </div>
            <div className="flex-1 p-8 overflow-y-auto bg-white font-mono text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
              {generatedContent ? (
                generatedContent
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <Sparkles size={48} className="mb-4 opacity-20" />
                  <p>AI Generated content will appear here.</p>
                  <p className="text-xs mt-2 opacity-60">Optimized for Indian Legal Formats</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};