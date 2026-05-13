import { Boxes, Users, Zap, Search } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-16 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
        <h1 className="text-[64px] leading-[0.9] font-black tracking-tighter uppercase mb-6 relative">
          ABOUT <span className="text-gradient">SMARTTOOLS</span>
        </h1>
        <p className="text-xl text-gray-400 font-medium">
          Our mission is to simplify your digital life by bringing all the essential tools and AI utilities into one beautiful, easy-to-use platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16 relative z-10">
        <div className="glass-card p-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-xl">
             <Boxes className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4 uppercase tracking-widest text-white">All-in-One</h3>
          <p className="text-gray-400 leading-relaxed font-medium">
            Stop switching between dozen of bookmark folders. From QR codes to advanced AI Image Generation, everything is just a click away in a unified interface.
          </p>
        </div>
        <div className="glass-card p-8">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 shadow-xl">
             <Zap className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4 uppercase tracking-widest text-white">Lightning Fast</h3>
          <p className="text-gray-400 leading-relaxed font-medium">
            Built with modern web technologies, SmartTools is designed to be instantly responsive. No waiting, no loading screens—just pure productivity.
          </p>
        </div>
      </div>

      <div className="glass-card p-12 text-center relative overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
         <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 relative z-10 text-white">Built with 💙 by developers, for everyone.</h2>
         <p className="text-gray-400 text-lg max-w-2xl mx-auto relative z-10 font-medium">
           We started SmartTools because we were tired of searching for basic utilities and landing on ad-filled, slow websites. We believe essential web tools should be free, fast, and beautifully designed.
         </p>
      </div>
    </div>
  );
}
