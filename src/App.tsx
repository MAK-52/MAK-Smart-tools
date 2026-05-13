/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Tools } from './pages/Tools';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { QrGenerator } from './tools/QRGenerator';
import { PasswordGenerator } from './tools/PasswordGenerator';
import { AIChat } from './tools/AIChat';
import { ImageGenerator } from './tools/ImageGenerator';
import { TextSummarizer } from './tools/TextSummarizer';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="tools" element={<Tools />} />
          <Route path="tools/qr-generator" element={<QrGenerator />} />
          <Route path="tools/password-generator" element={<PasswordGenerator />} />
          <Route path="tools/ai-chat" element={<AIChat />} />
          <Route path="tools/image-generator" element={<ImageGenerator />} />
          <Route path="tools/text-summarizer" element={<TextSummarizer />} />
        </Route>
      </Routes>
    </Router>
  );
}
