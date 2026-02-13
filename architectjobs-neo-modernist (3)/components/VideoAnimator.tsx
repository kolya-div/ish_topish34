import React, { useState, useRef, useEffect } from 'react';
import { animatePoster, SystemLogger } from '../services/apiService';

/**
 * VIDEO ANIMATOR — VEO AI ENTERPRISE ENGINE
 * -----------------------------------------------------------------------------
 * Ushbu komponent Veo 3.1 AI modelidan foydalanib, statik ish posterlarini 
 * professional kinematik videolarga aylantiradi.
 * -----------------------------------------------------------------------------
 */

// Removed redundant declare global to fix duplicate identifier errors.
// window.aistudio methods are assumed to be pre-configured and accessible.

export const VideoAnimator: React.FC = () => {
  // Holatlar (States)
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * API Key holatini tekshirish
   */
  useEffect(() => {
    const checkKey = async () => {
      // Accessing aistudio via window casting to avoid potential type conflicts with existing global declarations
      const aiStudio = (window as any).aistudio;
      if (aiStudio) {
        const selected = await aiStudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  /**
   * handleFileChange
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      SystemLogger.log(`Video uchun rasm yuklandi: ${file.name}`);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  /**
   * handleAnimate
   * Veo AI orqali video generatsiyasini boshlash.
   */
  const handleAnimate = async () => {
    if (!image) {
      alert("Iltimos, avval rasm yuklang.");
      return;
    }

    if (!hasKey) {
      SystemLogger.log("API kalit tanlash talab etiladi.");
      const aiStudio = (window as any).aistudio;
      if (aiStudio) {
        await aiStudio.openSelectKey();
        setHasKey(true);
      }
    }

    setLoading(true);
    setVideoUrl(null);
    SystemLogger.log(`Veo Video animatsiyasi boshlandi: ${prompt}`);

    try {
      const url = await animatePoster(image, prompt);
      if (url) {
        setVideoUrl(url);
        SystemLogger.log("Video muvaffaqiyatli yaratildi.");
      } else {
        alert("Video yaratishda muammo yuz berdi. Iltimos, qaytadan urinib ko'ring.");
      }
    } catch (err: any) {
      SystemLogger.error("VideoAnimator handleAnimate failure", err);
      if (err.message === "API_KEY_REQUIRED") {
        setHasKey(false);
        alert("Video generatsiyasi uchun pullik API kalit kerak.");
      } else {
        alert(`Xatolik: ${err.message || "Tizim xatosi"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      
      {/* 1. Header Section */}
      <div className="text-center mb-24 space-y-6">
        <div className="inline-flex items-center px-4 py-1 rounded-full bg-neo-orange/10 border border-neo-orange/20 text-neo-orange text-[10px] font-black uppercase tracking-[0.3em] shadow-sm">
          🎬 VEO AI 3.1 PREVIEW
        </div>
        <h2 className="text-6xl md:text-8xl font-display font-black tracking-tightest dark:text-neo-textDark uppercase leading-none">
          Video <span className="text-neo-orange">Animator</span>
        </h2>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          Statik posteringizni jonlantiring. Veo AI yordamida dinamik, yuqori sifatli vakansiya videolarni yarating.
        </p>
      </div>

      {/* 2. Main Animator Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Control Panel */}
        <div className="space-y-10 p-12 bg-white dark:bg-neo-surface border border-neo-border dark:border-neo-borderDark rounded-[3.5rem] shadow-neo dark:shadow-neo-dark animate-in slide-in-from-left-5 duration-700">
          
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-xl font-display font-black dark:text-neo-textDark uppercase tracking-tight">Sozlamalar</h3>
             <div className="flex gap-2">
                <button 
                  onClick={() => setAspectRatio('16:9')}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${aspectRatio === '16:9' ? 'neo-gradient text-neo-text' : 'text-slate-400 hover:text-neo-orange'}`}
                >
                  16:9
                </button>
                <button 
                  onClick={() => setAspectRatio('9:16')}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${aspectRatio === '9:16' ? 'neo-gradient text-neo-text' : 'text-slate-400 hover:text-neo-orange'}`}
                >
                  9:16
                </button>
             </div>
          </div>

          {/* Image Source Selection */}
          <div 
            onClick={() => inputRef.current?.click()}
            className={`aspect-video rounded-[2.5rem] border-2 border-dashed border-neo-border dark:border-neo-borderDark flex flex-col items-center justify-center cursor-pointer hover:border-neo-orange cubic-transition group overflow-hidden relative ${image ? 'bg-black' : 'bg-slate-50 dark:bg-neo-dark/50'}`}
          >
            {image ? (
              <img src={image} className="w-full h-full object-cover opacity-80 transition-transform group-hover:scale-110 duration-[2000ms]" alt="Video Source" />
            ) : (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-neo-orange/10 rounded-3xl flex items-center justify-center mx-auto text-neo-orange">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2-2v8a2 2 0 002 2z"/>
                  </svg>
                </div>
                <span className="block text-xs font-black uppercase tracking-[0.3em] text-neo-text dark:text-neo-textDark">Posterni tanlang</span>
              </div>
            )}
            <input ref={inputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>

          {/* Animation Description */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Harakat qoidasi (Prompt)</label>
            <input 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-8 py-6 bg-slate-50 dark:bg-neo-dark/50 rounded-3xl border border-neo-border dark:border-neo-borderDark outline-none font-bold dark:text-neo-textDark focus:border-neo-orange text-lg cubic-transition"
              placeholder="Masalan: 'Matnlar asta-sekin suzib kelsin'..."
            />
          </div>

          {/* API Key Warning */}
          {!hasKey && (
            <div className="p-8 bg-neo-amber/10 border border-neo-amber/30 rounded-[2rem] flex gap-6 items-center">
              <div className="w-12 h-12 flex-shrink-0 bg-neo-amber rounded-full flex items-center justify-center text-neo-text shadow-glow animate-pulse">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-neo-orange">API Kalit Tanlash Shart</h4>
                <p className="text-[10px] text-slate-500 font-bold mt-1 leading-relaxed">
                  Veo AI generatsiyasi uchun shaxsiy billing ulangan loyiha kalitini tanlashingiz lozim.
                </p>
              </div>
            </div>
          )}

          <button 
            onClick={handleAnimate}
            disabled={!image || loading}
            className="w-full py-6 rounded-[2.5rem] neo-gradient text-neo-text font-black text-lg uppercase tracking-widest neo-button-glow cubic-transition transform active:scale-95 shadow-xl disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-4">
                <div className="w-6 h-6 border-4 border-neo-text/30 border-t-neo-text rounded-full animate-spin"></div>
                <span>Veo Generatsiya qilinmoqda...</span>
              </div>
            ) : (
              <span>Video yaratishni boshlash</span>
            )}
          </button>
        </div>

        {/* Video Preview Panel */}
        <div className="bg-neo-dark rounded-[3.5rem] shadow-neo-dark flex items-center justify-center p-6 min-h-[600px] relative overflow-hidden animate-in slide-in-from-right-5 duration-700">
          
          <div className="absolute top-10 left-12">
             <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">Preview</h3>
          </div>

          {videoUrl ? (
            <div className="w-full h-full p-8 flex flex-col items-center justify-center animate-in zoom-in duration-1000">
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                loop 
                className={`max-w-full rounded-[2.5rem] shadow-2xl border border-white/10 ${aspectRatio === '9:16' ? 'h-[500px]' : 'w-full'}`}
              />
              <div className="mt-12">
                <a 
                  href={videoUrl} 
                  download="architect_jobs_ad.mp4" 
                  className="px-12 py-5 neo-gradient text-neo-text text-xs font-black uppercase tracking-widest rounded-2xl cubic-transition neo-button-glow shadow-xl"
                >
                  Videoni Yuklab Olish
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-8 opacity-30">
              <div className="w-24 h-24 border-2 border-white rounded-full flex items-center justify-center mx-auto animate-pulse">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Video kutishda...</p>
            </div>
          )}

          {/* Loading Overlay with cinematic feel */}
          {loading && (
            <div className="absolute inset-0 bg-black/80 glass-2 flex flex-col items-center justify-center z-10 p-12 text-center animate-in fade-in duration-500">
               <div className="relative mb-12">
                  <div className="w-24 h-24 border-8 border-neo-orange/10 rounded-full"></div>
                  <div className="absolute inset-0 w-24 h-24 border-8 border-neo-orange border-t-transparent rounded-full animate-spin"></div>
               </div>
               <h4 className="text-3xl font-display font-black text-white uppercase tracking-tightest">Cinematic Rendering</h4>
               <p className="text-slate-400 font-bold mt-4 max-w-xs">
                 Veo AI hozirda sizning videongizni tayyorlamoqda. Bu jarayon odatda 1-2 daqiqa vaqt oladi.
               </p>
               <div className="mt-12 flex gap-1 justify-center">
                  {[0.1, 0.2, 0.3, 0.4].map(d => (
                    <div key={d} className="w-1.5 h-1.5 bg-neo-orange rounded-full animate-bounce" style={{ animationDelay: `${d}s` }}></div>
                  ))}
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <section className="mt-40 border-t border-neo-border dark:border-neo-borderDark pt-24">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
               <h4 className="text-xl font-display font-black dark:text-neo-textDark uppercase mb-8">Nima uchun Video?</h4>
               <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                 Video-vakansiyalar statik e'lonlarga qaraganda 80% ko'proq nomzodlarni jalb qiladi. Veo AI sizga professional darajadagi 
                 reklama roliklarini soniyalar ichida yaratish imkonini beradi. Har bir kadr Neo-Modernist estetikasi qoidalariga moslanadi.
               </p>
            </div>
            <div>
               <h4 className="text-xl font-display font-black dark:text-neo-textDark uppercase mb-8">Veo AI Texnologiyasi</h4>
               <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                 Biz eng so'nggi Veo 3.1 modellaridan foydalanamiz. Bu modellarning o'ziga xosligi — ular tasvir mazmunini tushunadi va 
                 mantiqiy harakatlarni qo'shadi. Ish posterlaridagi matnlar, logotiplar va fon elementlari jonlanib, brendingizni jonli ko'rsatadi.
               </p>
            </div>
         </div>
      </section>
    </div>
  );
};
