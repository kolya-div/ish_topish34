
import React, { useState } from 'react';
import { useUser } from './UserContext';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setLoginModalOpen, login } = useUser();
  const [telegram, setTelegram] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegram.startsWith('@')) {
      alert("Telegram username @ belgisi bilan boshlanishi kerak.");
      return;
    }
    setLoading(true);
    // SQLite simulyatsiyasi va login
    await login(name || 'Mehmon', telegram);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-neo-dark/90 glass-2 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-neo-dark w-full max-w-md rounded-[3rem] border border-neo-border dark:border-neo-borderDark shadow-neo-dark overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="p-10">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-3xl font-display font-black tracking-tight dark:text-neo-textDark uppercase">Tizimga Kirish</h3>
            <button 
              onClick={() => setLoginModalOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-neo-orange cubic-transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ism-sharifingiz</label>
              <input 
                required 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-neo-surface rounded-2xl border border-neo-border dark:border-neo-borderDark outline-none font-bold dark:text-neo-textDark focus:border-neo-orange cubic-transition" 
                placeholder="Azizbek Karimov" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Telegram Username</label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-neo-orange">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                </div>
                <input 
                  required 
                  type="text" 
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-neo-surface rounded-2xl border border-neo-border dark:border-neo-borderDark outline-none font-bold dark:text-neo-textDark focus:border-neo-orange cubic-transition" 
                  placeholder="@azizbek_dev" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Maxfiy parol</label>
              <input 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-neo-surface rounded-2xl border border-neo-border dark:border-neo-borderDark outline-none font-bold dark:text-neo-textDark focus:border-neo-orange cubic-transition" 
                placeholder="••••••••" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 rounded-[2rem] neo-gradient text-neo-text font-black text-sm uppercase tracking-widest neo-button-glow shadow-xl transform active:scale-95 cubic-transition mt-4"
            >
              {loading ? "Jarayonda..." : "Kirish va Saqlash"}
            </button>
          </form>

          <p className="text-center mt-8 text-xs text-slate-500 font-medium italic">
            Ma'lumotlaringiz xavfsiz SQLite bazamizda saqlanadi.
          </p>
        </div>
      </div>
    </div>
  );
};
