import { QrCode, Key, MessageSquare, Image as ImageIcon, Calculator, FileText, Code, DollarSign } from 'lucide-react';

export const tools = [
  {
    id: 'qr-generator',
    name: 'QR Generator',
    description: 'Instantly generate customizable QR codes for any link or text.',
    icon: QrCode,
    category: 'Design Tools',
    path: '/tools/qr-generator',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Create strong, secure passwords with custom rules.',
    icon: Key,
    category: 'Utility Tools',
    path: '/tools/password-generator',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'ai-chat',
    name: 'AI Assistant',
    description: 'Chat with an advanced AI for answers, ideas, and help.',
    icon: MessageSquare,
    category: 'AI Tools',
    path: '/tools/ai-chat',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'text-summarizer',
    name: 'Text Summarizer',
    description: 'Condense long articles and documents into key points quickly.',
    icon: FileText,
    category: 'AI Tools',
    path: '/tools/text-summarizer',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'image-generator',
    name: 'Image Generator',
    description: 'Create stunning AI-generated images from text prompts.',
    icon: ImageIcon,
    category: 'AI Tools',
    path: '/tools/image-generator',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Effortlessly convert between different units of measurement.',
    icon: Calculator,
    category: 'Utility Tools',
    path: '/tools/unit-converter',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data instantly.',
    icon: Code,
    category: 'Developer Tools',
    path: '/tools/json-formatter',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Live exchange rates and currency conversion calculator.',
    icon: DollarSign,
    category: 'Utility Tools',
    path: '/tools/currency-converter',
    color: 'from-green-500 to-emerald-500'
  }
];

export const getPopularTools = () => tools.slice(0, 4);
export const getToolsByCategory = () => {
    return tools.reduce((acc, tool) => {
        if (!acc[tool.category]) {
            acc[tool.category] = [];
        }
        acc[tool.category].push(tool);
        return acc;
    }, {} as Record<string, typeof tools>);
}
