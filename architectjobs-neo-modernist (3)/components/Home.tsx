
import React, { useState, useEffect } from 'react';
import { INITIAL_JOBS } from '../constants';
import { JobCard } from './JobCard';
import { Job, JobCategory } from '../types';
import { notifyAdmin, SystemLogger } from '../services/apiService';
import { dbService } from '../services/dbService';
import { JobPostModal } from './JobPostModal';
import { useUser } from './UserContext';

export const Home: React.FC = () => {
  const { user, setLoginModalOpen } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<JobCategory | 'all'>('all');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  
  const [appName, setAppName] = useState(user?.name || '');
  const [appTelegram, setAppTelegram] = useState(user?.telegram || '');

  const loadJobs = async () => {
    const dbJobs = await dbService.getAllJobs();
    if (dbJobs.length === 0) {
      for (const j of INITIAL_JOBS) {
        await dbService.insertJob(j, 'SYSTEM');
      }
      setJobs(INITIAL_JOBS);
    } else {
      setJobs(dbJobs);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (user) {
      setAppName(user.name);
      setAppTelegram(user.telegram);
    }
  }, [user]);

  const handleDeleteJob = async (jobId: string) => {
    if (!user) return;
    const success = await dbService.deleteJob(jobId, user.id);
    if (success) {
      loadJobs();
    } else {
      alert("Sizda bu vakansiyani o'chirish huquqi yo'q.");
    }
  };

  const filtered = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         j.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || j.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob) return;

    const report = `
🚀 <b>YANGI ARIZA (Bot DB)</b>
━━━━━━━━━━━━━━━━━━━━━━━━
💼 <b>Ish:</b> ${applyingJob.title}
🏢 <b>Kompaniya:</b> ${applyingJob.company}
━━━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Nomzod:</b> ${appName}
📱 <b>Telegram:</b> ${appTelegram}
━━━━━━━━━━━━━━━━━━━━━━━━
📅 <i>Sana: ${new Date().toLocaleString('uz-UZ')}</i>
    `;

    try {
      SystemLogger.log(`Ariza yuborilmoqda: ${appName} -> ${applyingJob.title}`);
      const uId = user ? user.id : 'GUEST_' + Math.random().toString(36).substr(2, 5);
      await dbService.insertApplication(uId, applyingJob.id, applyingJob.title, appName, appTelegram);

      const success = await notifyAdmin(report.trim());
      if (success) {
        alert("Arizangiz muvaffaqiyatli yuborildi!");
      } else {
        alert("Arizani yuborishda muammo yuz berdi.");
      }
      setApplyingJob(null);
    } catch (err) {
      SystemLogger.error("handleApply Failure", err);
      alert("Xatolik yuz berdi.");
    }
  };

  const handleJobPosted = async (newJob: Job) => {
    await dbService.insertJob(newJob, user?.id);
    loadJobs();
  };

  return (
    <div className="pb-32 animate-in fade-in duration-700">
      <section className="relative pt-24 pb-48 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-neo-orange/5 blur-[180px] rounded-full -z-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-neo-orange/10 border border-neo-orange/20 text-neo-orange text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-sm">
            💎 PREMIUM KARYERA PORTALI
          </div>
          <h1 className="text-6xl md:text-9xl font-display font-black tracking-tightest leading-[0.85] dark:text-neo-textDark mb-12 select-none">
            KELAJAK <br />
            <span className="text-neo-orange italic drop-shadow-sm">LOYIHACHISI</span>
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
            <button 
              onClick={() => user ? setIsPostModalOpen(true) : setLoginModalOpen(true)}
              className="px-12 py-5 rounded-3xl neo-gradient text-neo-text font-black text-lg tracking-tight neo-button-glow cubic-transition transform hover:-translate-y-1 active:scale-95 shadow-neo"
            >
              Ish e'lon qilish
            </button>
            <button 
              onClick={() => document.getElementById('job-listings')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-5 rounded-3xl bg-white dark:bg-white/5 border border-neo-border dark:border-neo-borderDark text-neo-text dark:text-neo-textDark font-black text-lg tracking-tight cubic-transition hover:bg-slate-50 dark:hover:bg-white/10"
            >
              Ishlarni ko'rish
            </button>
          </div>
          <div className="max-w-4xl mx-auto bg-white/40 dark:bg-white/5 glass-2 p-3 rounded-[3rem] border border-neo-border dark:border-neo-borderDark shadow-neo dark:shadow-neo-dark flex flex-col md:flex-row gap-3">
            <div className="flex-grow flex items-center px-7 py-5 bg-white dark:bg-neo-surface rounded-[2rem] border border-neo-border dark:border-neo-borderDark focus-within:border-neo-orange cubic-transition">
              <input 
                type="text" 
                placeholder="Kompaniya yoki lavozim..." 
                className="w-full bg-transparent outline-none font-bold text-neo-text dark:text-neo-textDark placeholder-slate-400 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-64 relative">
              <select 
                className="w-full h-full px-8 py-5 bg-white dark:bg-neo-surface rounded-[2rem] border border-neo-border dark:border-neo-borderDark font-bold text-neo-text dark:text-neo-textDark outline-none appearance-none cursor-pointer focus:border-neo-orange cubic-transition"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
              >
                <option value="all">Soha: Barchasi</option>
                {Object.values(JobCategory).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section id="job-listings" className="max-w-7xl mx-auto px-6 scroll-mt-32">
        <div className="flex items-center justify-between mb-16">
           <h2 className="text-4xl font-display font-black dark:text-neo-textDark uppercase tracking-tight">Mavjud <span className="text-neo-orange">Ishlar</span></h2>
           <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{filtered.length} ta natija</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map(job => (
            <JobCard key={job.id} job={job} onApply={(j) => setApplyingJob(j)} onDelete={handleDeleteJob} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-neo-border dark:border-neo-borderDark rounded-[3rem]">
            <p className="text-slate-400 font-bold uppercase tracking-widest">Hech narsa topilmadi</p>
          </div>
        )}
      </section>

      {applyingJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-neo-dark/95 glass-2 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-neo-dark w-full max-w-xl rounded-[3rem] border border-neo-border dark:border-neo-borderDark shadow-neo-dark overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="p-12">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-4xl font-display font-black tracking-tight dark:text-neo-textDark uppercase">Ariza</h3>
                  <p className="text-neo-orange font-bold mt-2 text-lg">{applyingJob.company} — {applyingJob.title}</p>
                </div>
                <button onClick={() => setApplyingJob(null)} className="text-slate-400 hover:text-red-500"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg></button>
              </div>

              {!user && (
                <div className="mb-8 p-4 bg-neo-orange/10 border border-neo-orange/20 rounded-2xl text-xs font-bold text-neo-orange text-center">
                  Ariza topshirish uchun avval <button onClick={() => {setApplyingJob(null); setLoginModalOpen(true);}} className="underline">kirish</button> tavsiya etiladi.
                </div>
              )}

              <form onSubmit={handleApply} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Ism-sharifingiz</label>
                  <input 
                    required 
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    type="text" 
                    className="w-full px-8 py-5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-neo-border dark:border-neo-borderDark outline-none font-bold dark:text-neo-textDark focus:border-neo-orange cubic-transition text-lg" 
                    placeholder="Azizbek Karimov" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Telegram Link (@username)</label>
                  <input 
                    required 
                    value={appTelegram}
                    onChange={(e) => setAppTelegram(e.target.value)}
                    type="text" 
                    className="w-full px-8 py-5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-neo-border dark:border-neo-borderDark outline-none font-bold dark:text-neo-textDark focus:border-neo-orange cubic-transition text-lg" 
                    placeholder="@username" 
                  />
                </div>
                <div className="pt-8">
                  <button type="submit" className="w-full py-6 rounded-[2rem] neo-gradient text-neo-text font-black text-lg uppercase tracking-widest neo-button-glow shadow-xl">
                    Ariza yuborish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <JobPostModal 
        isOpen={isPostModalOpen} 
        onClose={() => setIsPostModalOpen(false)} 
        onSuccess={handleJobPosted}
      />
    </div>
  );
};
