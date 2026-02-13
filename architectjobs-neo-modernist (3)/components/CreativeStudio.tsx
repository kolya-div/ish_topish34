
import React, { useState, useRef, useEffect } from 'react';
import { editDesignImage, SystemLogger } from '../services/apiService';

/**
 * CREATIVE STUDIO — NEO-MODERNIST AI ENGINE
 * -----------------------------------------------------------------------------
 * Ushbu komponent Gemini 2.5 Flash Image modelidan foydalanib, foydalanuvchilarga
 * o'z vakansiya posterlarini professional darajada tahrirlash imkonini beradi.
 * -----------------------------------------------------------------------------
 */

export const CreativeStudio: React.FC = () => {
  // Holatlar (States)
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * handleFileChange
   * Faylni tanlash va uni base64 formatiga o'tkazish.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      SystemLogger.log(`Yangi rasm tanlandi: ${file.name}`);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null); // Yangi rasm tanlanganda eski natijani tozalash
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * handleProcess
   * AI modeliga tahrirlash buyrug'ini yuborish.
   */
  const handleProcess = async () => {
    if (!image || !prompt) {
      alert("Iltimos, rasm yuklang va buyruq matnini kiriting.");
      return;
    }
    
    setLoading(true);
    SystemLogger.log(`AI tahrirlash boshlandi: "${prompt}"`);
    
    try {
      const res = await editDesignImage(image, prompt);
      if (res) {
        setResult(res);
        setHistory(prev => [res, ...prev].slice(0, 5)); // Oxirgi 5 ta natijani saqlash
        SystemLogger.log("AI tahrirlash muvaffaqiyatli yakunlandi.");
      } else {
        alert("AI rasm qaytara olmadi. Iltimos, boshqacharoq buyruq berib ko'ring.");
      }
    } catch (err) {
      SystemLogger.error("CreativeStudio handleProcess failure", err);
      alert("Xatolik yuz berdi. API kalit yoki tarmoq holatini tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * handleReset
   * Studiyani boshlang'ich holatga qaytarish.
   */
  const handleReset = () => {
    setImage(null);
    setResult(null);
    setPrompt('');
    SystemLogger.log("Studio tozalandi.");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      {/* 1. Header Section */}
      <div className="text-center mb-24 space-y-6">
        <div className="inline-flex items-center px-4 py-1 rounded-full bg-neo-orange/10 border border-neo-orange/20 text-neo-orange text-[10px] font-black uppercase tracking-[0.3em] shadow-sm">
          🎨 GEMINI AI POWERED
        </div>
        <h2 className="text-6xl md:text-8xl font-display font-black tracking-tightest dark:text-neo-textDark uppercase">
          Kreativ <span className="text-neo-orange">Studio</span>
        </h2>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          O'z posteringizni yuklang va AI orqali uni elit darajadagi Neo-Modernist dizaynga aylantiring.
        </p>
      </div>

      {/* 2. Main Studio Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left: Editor Panel */}
        <div className="space-y-10 p-12 bg-white dark:bg-neo-surface border border-neo-border dark:border-neo-borderDark rounded-[3.5rem] shadow-neo dark:shadow-neo-dark animate-in slide-in-from-left-5 duration-700">
          
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-display font-black dark:text-neo-textDark uppercase tracking-tight">Tahrirlovchi</h3>
            <button 
              onClick={handleReset}
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 cubic-transition"
            >
              Tozalash
            </button>
          </div>

          {/* Upload Area */}
          <div 
            onClick={() => inputRef.current?.click()}
            className="aspect-square bg-slate-50 dark:bg-neo-dark/50 rounded-[2.5rem] border-2 border-dashed border-neo-border dark:border-neo-borderDark flex flex-col items-center justify-center cursor-pointer hover:border-neo-orange cubic-transition group overflow-hidden relative"
          >
            {image ? (
              <img src={image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" alt="Uploaded" />
            ) : (
              <div className="text-center space-y-6 p-10">
                <div className="w-20 h-20 bg-neo-orange/10 rounded-3xl flex items-center justify-center mx-auto text-neo-orange group-hover:rotate-12 cubic-transition shadow-sm">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <span className="block text-sm font-black uppercase tracking-[0.2em] text-neo-text dark:text-neo-textDark">Posterni Yuklang</span>
                  <p className="text-xs text-slate-500 mt-2">PNG, JPG formatlar (Max 5MB)</p>
                </div>
              </div>
            )}
            <input ref={inputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>

          {/* Command Prompt */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Tahrirlash ssenariysi</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-8 py-6 bg-slate-50 dark:bg-neo-dark/50 rounded-3xl border border-neo-border dark:border-neo-borderDark outline-none font-bold dark:text-neo-textDark focus:border-neo-orange min-h-[140px] text-lg cubic-transition"
              placeholder="Masalan: 'Posterni futuristik uslubga o'tkaz, Cyber Amber neon elementlarini qo'sh va fonni qoraytir'..."
            />
          </div>

          <button 
            onClick={handleProcess}
            disabled={!image || loading}
            className="w-full py-6 rounded-[2rem] neo-gradient text-neo-text font-black text-lg uppercase tracking-widest neo-button-glow disabled:opacity-50 disabled:cursor-not-allowed cubic-transition transform active:scale-95 shadow-xl"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-4">
                <div className="w-6 h-6 border-4 border-neo-text/30 border-t-neo-text rounded-full animate-spin"></div>
                <span>AI tahlil qilmoqda...</span>
              </div>
            ) : 'AI bilan tahrirlashni boshlash'}
          </button>
        </div>

        {/* Right: Results Panel */}
        <div className="space-y-10 flex flex-col items-center justify-center min-h-[700px] border border-neo-border dark:border-neo-borderDark rounded-[3.5rem] bg-slate-50/50 dark:bg-neo-dark/30 relative overflow-hidden animate-in slide-in-from-right-5 duration-700">
          
          <div className="absolute top-10 left-12">
             <h3 className="text-xl font-display font-black dark:text-neo-textDark uppercase tracking-tight">Natija</h3>
          </div>

          {result ? (
            <div className="w-full h-full p-12 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-1000">
              <div className="relative group max-w-md">
                <img src={result} className="w-full rounded-[2.5rem] shadow-neo-dark border border-white/10" alt="AI Generated" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 glass-2 rounded-[2.5rem] flex items-center justify-center cubic-transition">
                  <span className="text-white font-black text-xs uppercase tracking-widest">Sifat: 2K Ultra HD</span>
                </div>
              </div>
              
              <div className="mt-12 flex flex-col sm:flex-row gap-6">
                <a 
                  href={result} 
                  download="architect_ai_design.png" 
                  className="px-12 py-5 bg-neo-text dark:bg-neo-textDark text-neo-light dark:text-neo-dark text-xs font-black uppercase tracking-widest rounded-2xl cubic-transition hover:bg-neo-orange dark:hover:bg-neo-orange hover:text-white dark:hover:text-white shadow-xl"
                >
                  Yuklab olish
                </a>
                <button 
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-12 py-5 bg-white dark:bg-white/5 border border-neo-border dark:border-neo-borderDark text-neo-text dark:text-neo-textDark text-xs font-black uppercase tracking-widest rounded-2xl cubic-transition hover:border-neo-orange"
                >
                  Tarix ({history.length})
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-8 max-w-xs">
              <div className="w-24 h-24 border border-neo-border dark:border-neo-borderDark rounded-full flex items-center justify-center mx-auto opacity-30 animate-pulse">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.022.547l-2.387 2.387a2 2 0 001.414 3.414h15.828a2 2 0 001.414-3.414l-2.387-2.387zM12 13V4M8 8l4-4 4 4"/>
                </svg>
              </div>
              <p className="text-sm font-black uppercase tracking-[0.4em] text-slate-400">AI natijasini kutishda...</p>
              <p className="text-xs text-slate-500 font-medium">Chap tarafdagi panel orqali buyruq bering.</p>
            </div>
          )}

          {/* Processing Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white/60 dark:bg-black/70 glass-2 flex flex-col items-center justify-center z-10 animate-in fade-in duration-300">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-neo-orange/20 rounded-full"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-neo-orange border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h4 className="mt-10 text-xl font-display font-black tracking-tightest uppercase dark:text-neo-textDark">Gemini AI Engine</h4>
              <p className="mt-2 text-[10px] font-black uppercase tracking-[0.3em] text-neo-orange animate-pulse">Dizayn qoidalarini qo'llamoqda...</p>
            </div>
          )}

          {/* History Drawer Simulation */}
          {showHistory && history.length > 0 && (
            <div className="absolute bottom-0 w-full p-8 glass-2 border-t border-neo-border dark:border-neo-borderDark bg-white/90 dark:bg-neo-surface/90 animate-in slide-in-from-bottom-full duration-500">
               <div className="flex items-center justify-between mb-6">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] dark:text-neo-textDark">Oxirgi natijalar</h4>
                 <button onClick={() => setShowHistory(false)} className="text-slate-400 hover:text-neo-orange">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                 </button>
               </div>
               <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                 {history.map((h, i) => (
                   <img key={i} src={h} onClick={() => setResult(h)} className="w-24 h-24 rounded-2xl cursor-pointer border-2 border-transparent hover:border-neo-orange cubic-transition shadow-lg" />
                 ))}
               </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Guide Section */}
      <section className="mt-32 p-16 bg-white dark:bg-neo-surface border border-neo-border dark:border-neo-borderDark rounded-[4rem] shadow-neo">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="text-3xl font-display font-black text-neo-orange">01.</div>
              <h4 className="text-lg font-black uppercase dark:text-neo-textDark">Yuklash</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Tayyor vakansiya posterini yoki kompaniya logotipini yuklang.</p>
            </div>
            <div className="space-y-4">
              <div className="text-3xl font-display font-black text-neo-orange">02.</div>
              <h4 className="text-lg font-black uppercase dark:text-neo-textDark">Buyruq Berish</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Dizayn bo'yicha o'z xohishingizni yozing (masalan, "Cyberpunk uslubida").</p>
            </div>
            <div className="space-y-4">
              <div className="text-3xl font-display font-black text-neo-orange">03.</div>
              <h4 className="text-lg font-black uppercase dark:text-neo-textDark">Tayyor Natija</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">AI tomonidan Neo-Modernist qoidalar asosida tayyorlangan posterga ega bo'ling.</p>
            </div>
         </div>
      </section>
    </div>
  );
};
