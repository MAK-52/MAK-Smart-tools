import { useState } from 'react';
import { Mail, MessageSquare, Send, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
        <h1 className="text-[64px] leading-[0.9] font-black tracking-tighter uppercase mb-6 relative">
          GET IN <span className="text-gradient">TOUCH</span>
        </h1>
        <p className="text-xl text-gray-400 font-medium relative">
          Have a question, feedback, or a tool request? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6 relative z-10">
          <div className="glass-card p-6 flex items-start gap-4">
             <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <Mail className="w-6 h-6 text-blue-400" />
             </div>
             <div>
               <h3 className="font-bold mb-1 uppercase tracking-wider text-sm">Email Us</h3>
               <p className="text-gray-400 text-sm font-medium">support@smarttools.com</p>
             </div>
          </div>
          <div className="glass-card p-6 flex items-start gap-4">
             <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <MessageSquare className="w-6 h-6 text-purple-400" />
             </div>
             <div>
               <h3 className="font-bold mb-1 uppercase tracking-wider text-sm">Community</h3>
               <p className="text-gray-400 text-sm font-medium">Join our Discord server</p>
             </div>
          </div>
        </div>

        <div className="md:col-span-2 glass-card p-8 relative z-10">
          {isSuccess ? (
             <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-20 h-20 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center shadow-lg border border-blue-500/30">
                   <Send className="w-10 h-10 ml-2" />
                </div>
                <h3 className="text-[32px] font-black uppercase tracking-tight text-white mt-4">Message Sent!</h3>
                <p className="text-gray-400 font-medium">Thanks for reaching out. We'll get back to you shortly.</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-white mb-2">Name</label>
                  <input required type="text" id="name" className="w-full px-5 py-4 bg-[#0d0d21] border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all font-medium placeholder-gray-600" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-white mb-2">Email</label>
                  <input required type="email" id="email" className="w-full px-5 py-4 bg-[#0d0d21] border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all font-medium placeholder-gray-600" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-widest text-white mb-2">Subject</label>
                <input required type="text" id="subject" className="w-full px-5 py-4 bg-[#0d0d21] border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all font-medium placeholder-gray-600" placeholder="How can we help?" />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-white mb-2">Message</label>
                <textarea required id="message" rows={5} className="w-full px-5 py-4 bg-[#0d0d21] border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all resize-none shadow-inner font-medium placeholder-gray-600" placeholder="Your message here..."></textarea>
              </div>
              <button disabled={isSubmitting} type="submit" className="w-full py-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-widest uppercase disabled:opacity-50 flex items-center justify-center gap-2 transition-all text-sm mt-4">
                 {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : <><Send className="w-5 h-5" /> Send Message</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
