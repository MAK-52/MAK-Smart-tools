import { useState } from 'react';
import { Sparkles, FileText, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function TextSummarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generateSummary = async () => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Summarize the following text clearly and concisely, highlighting the main points:\n\n" + text,
      });

      setSummary(response.text || 'Could not generate a summary.');
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
      <div className="mb-12 text-center">
        <h1 className="text-[64px] leading-[0.9] font-black tracking-tighter uppercase mb-4 flex justify-center items-center gap-4">
          <FileText className="text-blue-500 w-14 h-14" />
          <span className="text-gradient">TEXT</span> SUMMARIZER
        </h1>
        <p className="text-gray-400 text-lg font-medium">Paste a long article or document, and get the key points in seconds.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 h-[600px]">
        {/* Input Area */}
        <div className="glass-card p-6 flex flex-col h-full bg-[#0d0d21] border border-white/10 focus-within:border-blue-500/50 transition-all">
          <div className="flex justify-between items-center mb-4">
             <label className="text-sm font-bold uppercase tracking-wider text-white">Original Text</label>
             <span className="text-xs font-bold text-gray-500">{text.length} chars</span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full flex-1 bg-transparent border-none resize-none text-white placeholder-gray-600 focus:outline-none focus:ring-0 leading-relaxed font-medium text-lg"
            placeholder="Paste your text here (news articles, reports, emails)..."
          />
          <div className="pt-4 border-t border-white/10 mt-2 flex justify-end">
            <button
              onClick={generateSummary}
              disabled={isLoading || !text.trim()}
              className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold tracking-widest uppercase disabled:opacity-50 flex items-center justify-center gap-2 hover:bg-blue-500 transition-all shadow-md active:scale-95 text-xs"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {isLoading ? 'Summarizing...' : 'Summarize Text'}
            </button>
          </div>
        </div>

        {/* Output Area */}
        <div className="glass-card p-6 flex flex-col h-full bg-white/5 border border-white/10 relative">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold uppercase tracking-wider text-blue-400">AI Summary</label>
            {summary && (
               <button onClick={copyToClipboard} className="text-gray-400 hover:text-white transition-colors" title="Copy to clipboard">
                   {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
               </button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto w-full relative">
              {isLoading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                      <div className="relative">
                          <Loader2 className="w-12 h-12 animate-spin text-gray-400 absolute" />
                          <Sparkles className="w-12 h-12 animate-pulse text-purple-500 blur-sm" />
                      </div>
                      <p className="mt-4 animate-pulse font-bold tracking-widest uppercase text-xs">Analyzing text...</p>
                  </div>
              ) : error ? (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl font-medium">
                      {error}
                  </div>
              ) : summary ? (
                  <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="max-w-none text-white leading-relaxed font-medium text-lg"
                  >
                      {/* Simple formatting for the summary if it contains newlines or lists */}
                      {summary.split('\n').map((paragraph, index) => {
                          if (!paragraph.trim()) return <br key={index} />;
                          if (paragraph.trim().startsWith('*') || paragraph.trim().startsWith('-')) {
                              return <li key={index} className="ml-4 mb-2">{paragraph.replace(/^[-*]\s*/, '')}</li>;
                          }
                          return <p key={index} className="mb-4">{paragraph}</p>;
                      })}
                  </motion.div>
              ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 italic font-medium">
                      Your summary will appear here.
                  </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
