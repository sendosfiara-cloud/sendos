/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  MapPin, 
  Phone, 
  Mail, 
  Info, 
  Menu, 
  X, 
  ChevronRight, 
  Home, 
  Users, 
  GraduationCap, 
  Building2,
  Calendar,
  MessageCircle,
  Send,
  Sparkles
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Assets (Using the generated image paths)
const HERO_IMAGE = "/src/assets/images/hero_mosque_landscape_1776976653254.png";
const STUDY_IMAGE = "/src/assets/images/students_studying_1776976671266.png";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'about', label: 'Tentang Kami', icon: Info },
    { id: 'programs', label: 'Program', icon: GraduationCap },
    { id: 'facilities', label: 'Fasilitas', icon: Building2 },
  ];

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "Anda adalah asisten virtual untuk Pondok Pesantren Al Muzammil. Jawablah pertanyaan pengguna dengan sopan, religius, dan informatif tentang kehidupan di pesantren, pendidikan Islam, dan pendaftaran. Gunakan Bahasa Indonesia yang baik.",
        }
      });
      
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "Maaf, saya sedang mengalami kendala teknis." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "Terjadi kesalahan saat menghubungi asisten AI." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 sleek-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-accent rounded-lg flex items-center justify-center font-bold text-xl text-white">M</div>
              <div>
                <h1 className="text-sm font-bold leading-tight text-slate-800">AL MUZAMMIL</h1>
                <p className="text-[10px] text-brand-accent-dark tracking-widest uppercase font-bold">Smart Pesantren</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveSection(link.id)}
                  className={`text-sm font-bold transition-all hover:text-brand-accent ${
                    activeSection === link.id ? 'text-brand-accent' : 'text-slate-500'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button className="bg-brand-primary text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-brand-secondary transition-all shadow-sm uppercase tracking-wider">
                Pendaftaran
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActiveSection(link.id);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full text-left text-slate-700 p-3 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <link.icon size={20} className="text-brand-accent" />
                    <span className="font-bold text-sm tracking-tight">{link.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative pt-20 h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={HERO_IMAGE} 
              alt="Al Muzammil Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/95 via-brand-primary/70 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <span className="inline-block px-3 py-1 bg-brand-accent/20 border border-brand-accent/30 rounded-lg text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-6">
                Pendidikan Islam Modern
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tighter">
                Assalamualaikum, <br />
                <span className="text-brand-accent">Santri Masa Depan</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-medium">
                Membangun karakter Rabbani yang tangguh dengan kurikulum terpadu dan fasilitas cerdas di era digital.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-brand-accent text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-accent-dark transition-all shadow-xl flex items-center gap-2">
                  Lihat Dashboard <ChevronRight size={18} />
                </button>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all">
                  Masuk Portal
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section with sleek background */}
        <section className="bg-white py-12 border-b border-slate-100 emerald-gradient shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Santri Aktif', value: '800+' },
                { label: 'Ustadz & Pengajar', value: '45+' },
                { label: 'Status Akreditasi', value: 'A+' },
                { label: 'Program Unggulan', value: '12' },
              ].map((stat, i) => (
                <div key={i} className="text-center border-r last:border-0 border-slate-100">
                  <div className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className="text-3xl font-extrabold text-slate-800">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section - Sleek Card Style */}
        <section id="about" className="py-24 overflow-hidden bg-brand-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <motion.div 
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.95 }}
                className="lg:w-1/2 relative"
              >
                <div className="sleek-card p-0 overflow-hidden relative shadow-2xl border-none">
                   <img 
                    src={STUDY_IMAGE} 
                    alt="Students Studying" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent" />
                </div>
                {/* Dashboard-style overlay mini-card */}
                <div className="absolute -bottom-6 -right-6 bg-emerald-900 p-6 rounded-3xl shadow-2xl z-20 max-w-xs border border-emerald-800">
                  <p className="text-[10px] text-emerald-300 uppercase font-bold mb-2 tracking-widest">Informasi Akademik</p>
                  <p className="text-sm text-white leading-relaxed font-medium">95% Santri lulus dengan capaian Tahfidz minimal 5 Juz per tahun.</p>
                </div>
              </motion.div>

              <div className="lg:w-1/2 space-y-8">
                <div>
                  <span className="text-emerald-600 font-bold tracking-widest uppercase text-[10px] mb-4 block">Tentang Al Muzammil</span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6 leading-tight tracking-tighter">Ekosistem Belajar <br />Paling Efektif.</h2>
                  <p className="text-slate-500 leading-relaxed font-medium">Kami mengintegrasikan teknologi dalam keseharian santri untuk memantau perkembangan hafalan, nilai akademik, hingga aktivitas harian secara real-time.</p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { title: 'Digitalized Monitoring', desc: 'Laporan perkembangan santri yang dapat diakses wali santri kapan saja.' },
                    { title: 'Tahfidz Mastery', desc: 'Targeting sistematis dengan pendampingan ustadz berpengalaman.' },
                    { title: 'Character Building', desc: 'Kurikulum adab yang terukur dan terintegrasi dalam keseharian.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 sleek-card border-slate-100 hover:border-brand-accent transition-all cursor-default">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600">
                        <Sparkles size={24} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 mb-1 tracking-tight">{item.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section - Dashboard Layout Pattern */}
        <section id="programs" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tighter">Program Akademik</h2>
                <p className="text-slate-400 text-sm font-medium mt-1">Struktur pendidikan terukur untuk masa depan.</p>
              </div>
              <button className="text-xs font-bold text-emerald-600 hover:underline px-4 py-2 bg-emerald-50 rounded-xl">Lihat Kurikulum</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'MI Plus Tahfidz', icon: BookOpen, target: 'Pendidikan Dasar', color: 'bg-blue-500' },
                { title: 'MTs Pesantren', icon: GraduationCap, target: 'Pendidikan Menengah', color: 'bg-emerald-500' },
                { title: 'MA Unggulan', icon: Sparkles, target: 'Persiapan Karir & PTN', color: 'bg-amber-500' },
              ].map((prog, i) => (
                <div key={i} className="sleek-card border-none bg-slate-50/50 hover:bg-slate-50 transition-all p-8 flex flex-col h-full border border-slate-100">
                  <div className={`w-14 h-14 ${prog.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-8`}>
                    <prog.icon size={28} />
                  </div>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">{prog.target}</p>
                  <h3 className="text-xl font-extrabold text-slate-800 mb-6 tracking-tight">{prog.title}</h3>
                  <div className="mt-auto space-y-4">
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${prog.color}`} style={{ width: '100%' }}></div>
                    </div>
                    <button className="w-full py-3 sleek-button-outline text-xs border-slate-200">Selengkapnya</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chat Assistant CTA - Sleek Wide Widget */}
        <section className="py-24 bg-brand-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-emerald-900 rounded-[40px] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800 rounded-full -mr-48 -mt-48 opacity-50 blur-3xl" />
              <div className="relative z-10 max-w-xl">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                   <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">Konsultasi Virtual</span>
                </div>
                <h2 className="text-4xl font-extrabold mb-4 tracking-tighter">Butuh bantuan asisten Pesantren?</h2>
                <p className="text-emerald-100/70 font-medium leading-relaxed mb-0">Tanyakan tentang prosedur pendaftaran, jadwal seleksi, hingga rincian biaya tahun ajaran 2024/2025.</p>
              </div>
              <div className="relative z-10 shrink-0">
                <button 
                  onClick={() => setChatOpen(true)}
                  className="bg-white text-emerald-900 px-10 py-5 rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-all uppercase tracking-wider"
                >
                  Tanya Sekarang
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Sleek & Modern */}
        <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-900 rounded-lg flex items-center justify-center font-bold text-xl text-white">M</div>
                  <div>
                    <h1 className="text-sm font-bold leading-tight text-slate-800 tracking-tight">AL MUZAMMIL</h1>
                    <p className="text-[10px] text-emerald-600 tracking-widest uppercase font-bold">Smart Pesantren</p>
                  </div>
                </div>
                <p className="text-slate-400 max-w-sm mb-8 text-sm font-medium leading-relaxed">
                  Lembaga pendidikan Islam masa kini yang memadukan kedalaman spiritual dan kecakapan digital.
                </p>
              </div>
              
              <div>
                <h4 className="font-black text-slate-800 mb-6 uppercase tracking-widest text-[10px]">Tautan Penting</h4>
                <ul className="space-y-4 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                  <li className="hover:text-emerald-600 cursor-pointer transition-colors">Portal Pendaftaran</li>
                  <li className="hover:text-emerald-600 cursor-pointer transition-colors">Data Akademik</li>
                  <li className="hover:text-emerald-600 cursor-pointer transition-colors">Kalender Pendidikan</li>
                  <li className="hover:text-emerald-600 cursor-pointer transition-colors">Bantuan</li>
                </ul>
              </div>

              <div>
                <h4 className="font-black text-slate-800 mb-6 uppercase tracking-widest text-[10px]">Kontak Akademik</h4>
                <ul className="space-y-4 text-xs font-medium text-slate-500">
                  <li className="flex gap-3"><MapPin size={16} className="text-emerald-600 shrink-0" /> Kebumen, Jawa Tengah, Indonesia</li>
                  <li className="flex gap-3"><Phone size={16} className="text-emerald-600 shrink-0" /> +62 812-3456-7890</li>
                  <li className="flex gap-3"><Mail size={16} className="text-emerald-600 shrink-0" /> akademik@almuzammil.id</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-12 border-t border-slate-100 flex flex-col md:row items-center justify-between gap-6 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              <div>© 2024 PONDOK PESANTREN AL MUZAMMIL - DIGITAL PLATFORM</div>
              <div className="flex gap-8">
                <span className="hover:text-slate-500 cursor-pointer transition-colors">Security</span>
                <span className="hover:text-slate-500 cursor-pointer transition-colors">Privacy</span>
                <span className="hover:text-slate-500 cursor-pointer transition-colors">Terms</span>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating Chat Assistant Overlay - Sleek Dashboard Style */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg h-[650px] rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-slate-100"
            >
              <div className="bg-emerald-900 p-8 flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800 rounded-full -mr-16 -mt-16 opacity-50" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Sparkles size={28} />
                  </div>
                  <div>
                    <h3 className="text-white font-black tracking-tight">Virtual Muzammil</h3>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                       <span className="text-emerald-300 text-[10px] font-bold uppercase tracking-widest">AI Assistant Ready</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-emerald-300 hover:text-white p-2 relative z-10 transition-colors">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                      <MessageCircle size={40} />
                    </div>
                    <h4 className="text-slate-800 font-black text-lg mb-2 tracking-tighter">Assalamualaikum!</h4>
                    <p className="text-slate-400 text-xs px-12 leading-relaxed font-medium">Ada yang bisa saya bantu terkait informasi pendaftaran atau kegiatan pesantren hari ini?</p>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-5 text-sm font-medium leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-emerald-600 text-white rounded-[24px] rounded-tr-none shadow-lg shadow-emerald-200' 
                        : 'bg-white text-slate-700 sleek-card border-none rounded-tl-none shadow-md'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-5 rounded-[24px] rounded-tl-none shadow-md">
                      <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-white border-t border-slate-100">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-3"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ketik pesan anda..."
                    className="flex-1 bg-slate-50 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 border border-transparent focus:border-emerald-500/20 transition-all"
                  />
                  <button 
                    disabled={isLoading || !input.trim()}
                    className="w-14 h-14 bg-emerald-900 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-800 transition-all disabled:opacity-50 shadow-lg"
                  >
                    <Send size={24} />
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
