import { motion } from 'motion/react';
import { Search, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { tools, getToolsByCategory } from '../data/tools';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Tools() {
  const [searchQuery, setSearchQuery] = useState('');
  const toolsByCategory = getToolsByCategory();

  const filteredCategories = Object.entries(toolsByCategory).reduce((acc, [category, categoryTools]) => {
    const filteredTools = categoryTools.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredTools.length > 0) {
      acc[category] = filteredTools;
    }
    return acc;
  }, {} as Record<string, typeof tools>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
        <h1 className="text-[64px] leading-[0.9] font-black tracking-tighter uppercase mb-6 relative">
          <span className="block">EXPLORE OUR</span>
          <span className="text-gradient">SMART TOOLS</span>
        </h1>
        <p className="text-lg text-gray-400 mb-10 font-medium relative">
          From developer utilities to AI assistants, everything you need in one place.
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"></div>
          <div className="relative bg-[#0d0d21] border border-white/10 rounded-2xl p-2 flex items-center shadow-2xl">
            <Search className="w-6 h-6 ml-4 text-gray-500" />
            <input
              type="text"
              className="bg-transparent border-none focus:outline-none focus:ring-0 flex-1 px-4 py-3 text-white placeholder-gray-500"
              placeholder="Search for image generator, PDF tools, code editor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-all">
              Find Tool
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-16">
        {Object.entries(filteredCategories).length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            No tools found matching "{searchQuery}"
          </div>
        ) : (
          Object.entries(filteredCategories).map(([category, categoryTools], i) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10"
            >
              <h2 className="text-2xl font-black uppercase tracking-widest mb-8 text-white">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categoryTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="group block glass-card p-6 h-full flex flex-col"
                    >
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-white transition-colors">{tool.name}</h3>
                      <p className="text-gray-400 text-xs flex-grow mb-4 leading-relaxed font-medium">{tool.description}</p>
                      <div className="text-xs font-bold uppercase tracking-widest text-blue-400 group-hover:text-blue-300">
                        Launch &rarr;
                      </div>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
