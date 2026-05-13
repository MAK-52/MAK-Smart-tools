import { useState, useEffect } from 'react';
import { Copy, RefreshCw, ShieldCheck, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    if (charset === '') {
        setPassword('');
        return;
    }

    let newPassword = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      newPassword += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(newPassword);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    let strength = 0;
    if (password.length > 8) strength++;
    if (password.length > 14) strength++;
    if (includeUppercase) strength++;
    if (includeNumbers) strength++;
    if (includeSymbols) strength++;
    return strength;
  };

  const strength = getStrength();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
      <div className="mb-12 text-center">
        <h1 className="text-[64px] leading-[0.9] font-black tracking-tighter uppercase mb-4">PASSWORD <span className="text-gradient">GENERATOR</span></h1>
        <p className="text-gray-400 text-lg font-medium">Instantly generate a secure, random password.</p>
      </div>

      <div className="glass-card p-6 md:p-8 border border-white/10">
        <div className="relative mb-8">
          <div className="w-full bg-[#0d0d21] border border-white/10 rounded-2xl p-6 pr-16 min-h-[6rem] flex items-center justify-center text-center overflow-x-auto shadow-inner">
             <span className={cn(
                 "text-2xl md:text-4xl font-mono tracking-wider break-all font-bold",
                 password ? "text-purple-400" : "text-gray-600"
             )}>
                 {password || "Select options..."}
             </span>
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            <button
                onClick={copyToClipboard}
                className="p-3 text-gray-400 hover:text-white bg-white/5 rounded-xl transition-colors relative group border border-white/5"
            >
                <AnimatePresence>
                    {copied && (
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-10 right-0 bg-blue-500 text-white font-bold tracking-wider uppercase text-[10px] py-1 px-2 rounded"
                        >
                            Copied
                        </motion.span>
                    )}
                </AnimatePresence>
                <Copy className="w-5 h-5" />
            </button>
            <button
              onClick={generatePassword}
              className="p-3 text-gray-400 hover:text-white bg-white/5 rounded-xl transition-colors border border-white/5"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Strength Meter */}
        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-zinc-400 font-medium">Password Strength</span>
                <div className="flex items-center gap-1.5 text-sm font-medium">
                    {strength >= 4 ? (
                        <><ShieldCheck className="w-4 h-4 text-emerald-500" /> <span className="text-emerald-500">Strong</span></>
                    ) : strength >= 2 ? (
                        <><ShieldAlert className="w-4 h-4 text-yellow-500" /> <span className="text-yellow-500">Medium</span></>
                    ) : (
                        <><ShieldAlert className="w-4 h-4 text-red-500" /> <span className="text-red-500">Weak</span></>
                    )}
                </div>
            </div>
            <div className="flex gap-2 h-1.5">
                {[1, 2, 3, 4, 5].map((level) => (
                    <div
                        key={level}
                        className={cn(
                            "flex-1 rounded-full transition-colors",
                            strength >= level 
                                ? (strength >= 4 ? "bg-emerald-500" : strength >= 2 ? "bg-yellow-500" : "bg-red-500")
                                : "bg-zinc-800"
                        )}
                    />
                ))}
            </div>
        </div>

        <div className="space-y-8">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-white uppercase tracking-wider">Length</label>
                    <span className="text-xl font-black font-mono text-white bg-white/5 px-4 py-1.5 rounded-lg border border-white/10">{length}</span>
                </div>
                <input 
                    type="range" 
                    min="6" 
                    max="64" 
                    value={length} 
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full accent-blue-500 h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { id: 'uppercase', label: 'Uppercase (A-Z)', state: includeUppercase, setter: setIncludeUppercase },
                    { id: 'lowercase', label: 'Lowercase (a-z)', state: includeLowercase, setter: setIncludeLowercase },
                    { id: 'numbers', label: 'Numbers (0-9)', state: includeNumbers, setter: setIncludeNumbers },
                    { id: 'symbols', label: 'Symbols (!@#$)', state: includeSymbols, setter: setIncludeSymbols },
                ].map((option) => (
                    <label key={option.id} className="flex items-center gap-4 p-5 bg-[#0d0d21] rounded-2xl border border-white/10 cursor-pointer hover:border-blue-500/50 transition-all select-none">
                        <input 
                            type="checkbox" 
                            checked={option.state}
                            onChange={(e) => option.setter(e.target.checked)}
                            className="w-5 h-5 rounded border-white/20 bg-black text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm font-bold text-gray-300">{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
