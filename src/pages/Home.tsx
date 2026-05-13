import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { getPopularTools } from '../data/tools';
import { cn } from '../lib/utils';

export function Home() {
  const popularTools = getPopularTools();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden items-center justify-center flex flex-col px-4 text-center">
        {/* Background Gradients */}
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 right-[-100px] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-gray-400 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Discover the ultimate toolkit</span>
          </div>
          
          <h1 className="text-6xl md:text-[84px] leading-[0.9] font-black tracking-tighter mb-6 uppercase">
            <span className="block">ALL SMART TOOLS</span>
            <span className="text-gradient">IN ONE PLACE</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl font-medium leading-relaxed">
            Access over 50+ AI-powered utilities, generators, and converters designed to supercharge your daily workflow in a single click.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/tools"
              className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all w-full sm:w-auto text-lg"
            >
              Explore Tools
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 w-full sm:w-auto text-lg"
            >
              Get Started <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-24 bg-[#050510] border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">Most Popular Tools</h2>
              <p className="text-zinc-500">The tools our community uses the most.</p>
            </div>
            <Link to="/tools" className="text-brand-blue hover:text-brand-purple transition-colors font-medium flex items-center gap-1">
              View all tools <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={tool.path}
                    className="group block glass-card p-6 h-full flex flex-col"
                  >
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">{tool.name}</h3>
                    <p className="text-xs text-gray-400 mb-4 flex-grow">
                      {tool.description}
                    </p>
                    <div className="text-xs font-bold uppercase tracking-widest text-blue-400 group-hover:text-blue-300">
                      Launch &rarr;
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d21] to-[#050510] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-[64px] leading-[0.9] font-black tracking-tighter uppercase mb-6">READY TO BE <span className="text-gradient">SMARTER?</span></h2>
          <p className="text-xl text-gray-400 mb-8 font-medium">Join thousands of users who are saving time with SmartTools.</p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all text-lg"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}
