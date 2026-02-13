
import React, { useState } from 'react';
import { Job, JobCategory } from '../types';
import { notifyAdmin, SystemLogger } from '../services/apiService';

/**
 * JOB POST MODAL — EMPLOYER DASHBOARD CORE
 * -----------------------------------------------------------------------------
 * Ushbu komponent ish beruvchilar uchun yangi vakansiya e'lon qilish interfeysini taqdim etadi.
 * Neo-Modernist estetikasi va murakkab validatsiya mantiqlarini o'z ichiga oladi.
 * -----------------------------------------------------------------------------
 */

interface JobPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newJob: Job) => void;
}

export const JobPostModal: React.FC<JobPostModalProps> = ({ isOpen, onClose, onSuccess }) => {
  // Form holati (State)
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: 'Toshkent',
    salary: '',
    category: JobCategory.IT,
    description: '',
    type: 'Full-time' as const,
    requirements: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  /**
   * validateForm
   * Yuborishdan oldin barcha maydonlarni tekshiradi.
   */
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.title || formData.title.length < 5) errors.title = "Sarlavha juda qisqa.";
    if (!formData.company) errors.company = "Kompaniya nomi majburiy.";
    if (!formData.salary) errors.salary = "Maosh ko'rsatilishi shart.";
    if (!formData.description || formData.description.length < 20) errors.description = "Tavsif kamida 20 ta harf bo'lsin.";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * handleSubmit
   * Mantiqiy ishlov berish va natijani server/statga uzatish.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    SystemLogger.log("Yangi ish e'loni yuborilmoqda...");
    
    try {
      // Simulyatsiya qilingan API kechikishi
      await new Promise(r => setTimeout(r, 1500));

      const newJob: Job = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        company: formData.company,
        location: formData.location,
        salary: formData.salary,
        category: formData.category,
        description: formData.description,
        requirements: formData.requirements.split(',').map(r => r.trim()),
        postedAt: 'Hozirgina',
        logo: `https://api.dicebear.com/7.x/identicon/svg?seed=${formData.company}`,
        isHot: false,
        type: formData.type
      };

      // Telegram Sync
      const message = `
💼 <b>YANGI VAKANSIYA E'LON QILINDI</b>
━━━━━━━━━━━━━━━━━━━━━━━━
🏛️ <b>Kompaniya:</b> ${newJob.company}
🏷️ <b>Lavozim:</b> ${newJob.title}
💰 <b>Maosh:</b> ${newJob.salary}
📍 <b>Manzil:</b> ${newJob.location}
━━━━━━━━━━━━━━━━━━━━━━━━
📅 <i>Nashr etildi: ${new Date().toLocaleString('uz-UZ')}</i>
      `;
      
      await notifyAdmin(message.trim());
      
      SystemLogger.log(`Muvaffaqiyatli: ${newJob.id}`);
      onSuccess(newJob);
      onClose();
      
      // Formani tozalash
      setFormData({
        title: '',
        company: '',
        location: 'Toshkent',
        salary: '',
        category: JobCategory.IT,
        description: '',
        type: 'Full-time',
        requirements: ''
      });

    } catch (error) {
      SystemLogger.error("Job Submission Failed", error);
      alert("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 glass-morphism bg-neo-dark/95 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-neo-dark w-full max-w-4xl rounded-[4rem] border border-neo-border dark:border-neo-borderDark shadow-neo-dark overflow-hidden transform animate-in zoom-in-95 duration-500 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-12 border-b border-neo-border dark:border-neo-borderDark flex justify-between items-center bg-white dark:bg-neo-surface">
          <div>
            <h2 className="text-4xl font-display font-black text-neo-text dark:text-neo-textDark tracking-tight uppercase">
              Yangi <span className="text-neo-orange">Vakansiya</span>
            </h2>
            <p className="text-slate-500 font-bold mt-2">Professional iste'dodlarni platformamiz orqali toping.</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-16 h-16 flex items-center justify-center rounded-3xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-neo-orange cubic-transition shadow-sm"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <div className="flex-grow overflow-y-auto p-12 no-scrollbar bg-slate-50/50 dark:bg-neo-dark">
          <form onSubmit={handleSubmit} id="job-post-form" className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* 1. Job Title */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Lavozim nomi</label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className={`w-full px-8 py-5 rounded-2xl bg-white dark:bg-neo-surface border ${formErrors.title ? 'border-red-500' : 'border-neo-border dark:border-neo-borderDark'} focus:border-neo-orange dark:text-neo-textDark outline-none font-bold text-lg cubic-transition`} 
                placeholder="Masalan: Senior UI Designer"
              />
              {formErrors.title && <p className="text-red-500 text-[10px] font-black uppercase">{formErrors.title}</p>}
            </div>

            {/* 2. Company Name */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Kompaniya nomi</label>
              <input 
                required
                type="text" 
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
                className="w-full px-8 py-5 rounded-2xl bg-white dark:bg-neo-surface border border-neo-border dark:border-neo-borderDark focus:border-neo-orange dark:text-neo-textDark outline-none font-bold text-lg cubic-transition" 
                placeholder="Kompaniya nomi"
              />
            </div>

            {/* 3. Category */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Soha / Kategoriya</label>
              <div className="relative">
                <select 
                  className="w-full px-8 py-5 rounded-2xl bg-white dark:bg-neo-surface border border-neo-border dark:border-neo-borderDark focus:border-neo-orange dark:text-neo-textDark outline-none font-bold text-lg cubic-transition appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as JobCategory})}
                >
                  {Object.values(JobCategory).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-neo-orange">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>

            {/* 4. Salary */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Maosh (USD yoki UZS)</label>
              <input 
                required
                type="text" 
                value={formData.salary}
                onChange={e => setFormData({...formData, salary: e.target.value})}
                className="w-full px-8 py-5 rounded-2xl bg-white dark:bg-neo-surface border border-neo-border dark:border-neo-borderDark focus:border-neo-orange dark:text-neo-textDark outline-none font-bold text-lg cubic-transition" 
                placeholder="Masalan: $2000 - $3500"
              />
            </div>

            {/* 5. Job Type */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Ish turi</label>
              <div className="flex gap-4">
                {['Full-time', 'Remote', 'Contract'].map(type => (
                  <button 
                    key={type}
                    type="button"
                    onClick={() => setFormData({...formData, type: type as any})}
                    className={`flex-1 py-4 rounded-2xl border font-black text-xs uppercase tracking-widest cubic-transition ${formData.type === type ? 'neo-gradient text-neo-text border-transparent shadow-md' : 'bg-white dark:bg-neo-surface border-neo-border dark:border-neo-borderDark text-slate-500'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Location */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Manzil</label>
              <input 
                required
                type="text" 
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                className="w-full px-8 py-5 rounded-2xl bg-white dark:bg-neo-surface border border-neo-border dark:border-neo-borderDark focus:border-neo-orange dark:text-neo-textDark outline-none font-bold text-lg cubic-transition" 
                placeholder="Toshkent, IT Park"
              />
            </div>

            {/* 7. Requirements */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Asosiy talablar (vergul bilan ajrating)</label>
              <input 
                type="text" 
                value={formData.requirements}
                onChange={e => setFormData({...formData, requirements: e.target.value})}
                className="w-full px-8 py-5 rounded-2xl bg-white dark:bg-neo-surface border border-neo-border dark:border-neo-borderDark focus:border-neo-orange dark:text-neo-textDark outline-none font-bold text-lg cubic-transition" 
                placeholder="React, TypeScript, Figma, UI/UX..."
              />
            </div>

            {/* 8. Description */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">To'liq ish tavsifi</label>
              <textarea 
                required
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className={`w-full px-8 py-6 rounded-[2rem] bg-white dark:bg-neo-surface border ${formErrors.description ? 'border-red-500' : 'border-neo-border dark:border-neo-borderDark'} focus:border-neo-orange dark:text-neo-textDark outline-none font-bold text-lg cubic-transition min-h-[150px]`} 
                placeholder="Vazifalar, afzalliklar va talablar haqida batafsil ma'lumot bering..."
              />
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-12 border-t border-neo-border dark:border-neo-borderDark bg-white dark:bg-neo-surface flex gap-6">
          <button 
            type="button" 
            onClick={onClose}
            className="flex-1 px-10 py-6 rounded-[2rem] bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 font-black text-sm uppercase tracking-widest cubic-transition hover:bg-slate-200 active:scale-95"
          >
            Bekor qilish
          </button>
          <button 
            form="job-post-form"
            type="submit" 
            disabled={isSubmitting}
            className="flex-[2] px-10 py-6 rounded-[2rem] neo-gradient text-neo-text font-black text-sm uppercase tracking-widest neo-button-glow cubic-transition transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4 shadow-xl"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-3 border-neo-text/30 border-t-neo-text rounded-full animate-spin"></div>
                <span>Nashr etilmoqda...</span>
              </>
            ) : (
              <span>Vakansiyani nashr etish</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
