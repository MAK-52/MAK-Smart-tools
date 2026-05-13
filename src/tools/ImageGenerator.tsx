import { useState } from 'react';
import { Send, Image as ImageIcon, Loader2, Download } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    setImageUrl(null);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
      });

      let foundImage = false;
      const parts = response.candidates?.[0]?.content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            setImageUrl(`data:image/png;base64,${base64EncodeString}`);
            foundImage = true;
            break;
          }
        }
      }
      
      if (!foundImage) {
        setError('No image could be generated. Please try a different prompt.');
      }

    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <div className="mb-12 text-center">
        <h1 className="text-[64px] leading-[0.9] font-black tracking-tighter uppercase mb-4 flex justify-center items-center gap-4">
          <ImageIcon className="text-purple-500 w-14 h-14" />
          <span className="text-gradient">IMAGE</span> GENERATOR
        </h1>
        <p className="text-gray-400 text-lg font-medium">Transform your text into stunning, high-quality images in seconds.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-card p-6 md:p-8 flex flex-col h-full">
          <form onSubmit={generateImage} className="flex-1 flex flex-col justify-end gap-6 space-y-4">
            <div className="flex-1 flex flex-col">
              <label htmlFor="prompt" className="block text-sm font-bold uppercase tracking-wider text-white mb-3">
                 Describe what you want to see
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full flex-1 min-h-[150px] bg-[#0d0d21] border border-white/10 rounded-2xl p-5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all resize-none shadow-inner font-medium text-lg"
                placeholder="A futuristic city at sunset, cyberpunk style, high detail..."
                disabled={isLoading}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="w-full py-5 rounded-xl bg-purple-600 text-white font-bold tracking-widest uppercase disabled:opacity-50 flex items-center justify-center gap-2 hover:bg-purple-500 transition-all text-sm"
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Generating Image...</>
              ) : (
                <><Send className="w-5 h-5" /> Generate</>
              )}
            </button>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </form>
        </div>

        <div className="glass-card p-2 md:p-4 min-h-[300px] md:min-h-[400px] flex items-center justify-center flex-col relative overflow-hidden group">
           {isLoading ? (
             <div className="flex flex-col items-center text-gray-400 gap-4">
               <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
               <p className="animate-pulse font-bold tracking-widest uppercase text-xs">Creating your masterpiece...</p>
             </div>
           ) : imageUrl ? (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative w-full h-full flex items-center justify-center rounded-lg overflow-hidden group"
             >
               <img src={imageUrl} alt="Generated" className="object-contain w-full h-full rounded-lg" />
               <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
                  <a 
                    href={imageUrl} 
                    download={`smart-tools-image-${Date.now()}.png`}
                    className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </a>
               </div>
             </motion.div>
           ) : (
             <div className="text-zinc-600 flex flex-col items-center gap-3">
               <ImageIcon className="w-16 h-16 opacity-50" />
               <p className="text-sm">Your image will appear here</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
