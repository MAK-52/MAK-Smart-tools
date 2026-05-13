import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Link as LinkIcon, Palette, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';

export function QrGenerator() {
  const [url, setUrl] = useState('https://example.com');
  const [fgColor, setFgColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#000000');
  const [renderCounter, setRenderCounter] = useState(0); // to force re-render for download
  
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'smart-tools-qr.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <div className="mb-12 text-center">
        <h1 className="text-[64px] leading-[0.9] font-black tracking-tighter uppercase mb-4">QR CODE <span className="text-gradient">GENERATOR</span></h1>
        <p className="text-gray-400 text-lg font-medium">Create custom QR codes for your links instantly.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="glass-card p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-white mb-2 flex items-center gap-2 uppercase tracking-wide">
              <LinkIcon className="w-4 h-4" /> Enter URL or Text
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 bg-[#0d0d21] border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all font-medium"
              placeholder="https://your-link.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-white mb-2 flex items-center gap-2 uppercase tracking-wide">
                <Palette className="w-4 h-4" /> Foreground
              </label>
              <div className="flex items-center gap-3 bg-[#0d0d21] p-3 rounded-xl border border-white/10">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-none p-0 outline-none"
                />
                <span className="text-gray-400 font-mono text-sm">{fgColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-white mb-2 flex items-center gap-2 uppercase tracking-wide">
                <ImageIcon className="w-4 h-4" /> Background
              </label>
              <div className="flex items-center gap-3 bg-[#0d0d21] p-3 rounded-xl border border-white/10">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-none p-0"
                />
                <span className="text-gray-400 font-mono text-sm">{bgColor}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[400px]">
          <motion.div
            key={url + fgColor + bgColor}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 bg-white rounded-2xl shadow-2xl mb-8"
            ref={qrRef}
            style={{ backgroundColor: bgColor }}
          >
            <QRCodeCanvas
              value={url || 'https://example.com'}
              size={200}
              bgColor={bgColor}
              fgColor={fgColor}
              level="H"
              includeMargin={true}
            />
          </motion.div>

          <button
            onClick={downloadQR}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all flex items-center gap-2"
          >
            <Download className="w-5 h-5" /> DOWNLOAD PNG
          </button>
        </div>
      </div>
    </div>
  );
}
