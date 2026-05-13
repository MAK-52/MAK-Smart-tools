import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Boxes, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Tools', path: '/tools' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-black text-xl text-white">S</div>
              <span className="text-xl font-bold tracking-tight text-white">SMART<span className="text-blue-400">TOOLS</span></span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-baseline space-x-6 text-sm font-medium text-gray-400">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "transition-colors relative pb-1",
                      isActive ? "text-white border-b-2 border-blue-500" : "hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
                Login
              </Link>
              <Link to="/signup" className="px-5 py-2 text-sm font-bold rounded-full bg-white text-black hover:bg-gray-200 transition-colors">
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white p-2 rounded-md"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-zinc-900/95 border-b border-zinc-800"
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block px-3 py-3 rounded-md text-base font-medium",
                location.pathname === link.path ? "text-white bg-zinc-800" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-center text-base font-medium text-white border border-zinc-800 rounded-lg hover:bg-zinc-800">
              Log in
            </Link>
            <Link to="/signup" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-center text-base font-medium text-black bg-white rounded-lg hover:bg-zinc-200">
              Get Started
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
