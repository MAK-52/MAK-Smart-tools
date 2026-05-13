import { Boxes } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-12 py-12 bg-[#050510]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-black text-xl text-white">S</div>
              <span className="text-xl font-bold tracking-tight text-white">SMART<span className="text-blue-400">TOOLS</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
              Your all-in-one platform for everyday digital utilities. Powered by AI and modern web tech.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4 uppercase tracking-widest text-xs">Tools</h3>
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li><Link to="/tools/qr-generator" className="hover:text-blue-400 transition-colors">QR Generator</Link></li>
              <li><Link to="/tools/password-generator" className="hover:text-purple-400 transition-colors">Password Generator</Link></li>
              <li><Link to="/tools/ai-chat" className="hover:text-blue-400 transition-colors">AI Chat</Link></li>
              <li><Link to="/tools" className="hover:text-white transition-colors">View All Tools &rarr;</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 uppercase tracking-widest text-xs">Company</h3>
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 uppercase tracking-widest text-xs">Legal</h3>
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
          <span>&copy; {new Date().getFullYear()} SmartTools Platform</span>
          <div className="flex gap-6">
            <span>52 Active Tools</span>
            <span>1.2M Actions Executed</span>
            <span>99.9% Uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
