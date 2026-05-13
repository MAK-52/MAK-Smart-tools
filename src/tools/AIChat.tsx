import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', content: 'Hello! I am your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Configure history
      const history = messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
      }));
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...history.map(c => c.parts[0]), userMessage.content],
      });

      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response.text || 'I could not generate a response.'
      };
      
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-8 flex flex-col items-center">
        <h1 className="text-[64px] leading-[0.9] font-black tracking-tighter uppercase mb-4 flex items-center justify-center gap-4">
           <Bot className="text-blue-500 w-12 h-12" />
           <span className="text-gradient">AI ASSISTANT</span>
        </h1>
        <p className="text-gray-400 text-lg font-medium">Powered by Gemini 3 Flash</p>
      </div>

      <div className="flex-grow glass-card overflow-hidden flex flex-col rounded-2xl relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex gap-4 max-w-[85%]",
                  message.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-1",
                  message.role === 'user' ? "bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg" : "bg-white/10"
                )}>
                  {message.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-gray-300" />}
                </div>
                <div className={cn(
                  "p-5 rounded-[24px] text-base leading-relaxed font-medium shadow-xl",
                  message.role === 'user' 
                    ? "bg-blue-600 text-white rounded-tr-sm" 
                    : "bg-[#0d0d21] border border-white/10 text-gray-200 rounded-tl-sm"
                )}>
                  {message.content}
                </div>
              </motion.div>
            ))}
            {isLoading && (
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex gap-4 max-w-[85%]"
               >
                 <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 mt-1">
                   <Bot className="w-5 h-5 text-zinc-300" />
                 </div>
                 <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 rounded-tl-sm flex items-center gap-2 text-zinc-400">
                    <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
                 </div>
               </motion.div>
            )}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        </div>

        <div className="p-4 bg-[#050510] border-t border-white/10 rounded-b-[24px]">
          <form onSubmit={handleSubmit} className="relative flex items-center max-w-4xl mx-auto w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full bg-[#0d0d21] border border-white/10 rounded-full pl-8 pr-16 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all shadow-inner font-medium text-lg"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-3 rounded-full bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition-all font-bold"
            >
              <Send className="w-5 h-5 -ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
