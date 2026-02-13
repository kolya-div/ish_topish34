
import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import { Job } from '../types';
import { useUser } from './UserContext';

export const AdminPanel: React.FC = () => {
  const { user } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'jobs' | 'apps'>('jobs');

  const loadData = async () => {
    setLoading(true);
    const allJobs = await dbService.getAllJobs();
    const allApps = await dbService.getAllApplications();
    setJobs(allJobs);
    setApps(allApps);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteJob = async (id: string) => {
    if (window.confirm("Ushbu vakansiyani o'chirmoqchimisiz?")) {
      await dbService.deleteJob(id);
      loadData();
    }
  };

  const handleDeleteApp = async (id: string) => {
    if (window.confirm("Ushbu arizani o'chirmoqchimisiz?")) {
      await dbService.deleteApplication(id);
      loadData();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            ⚡ ADMIN PANEL
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black tracking-tightest dark:text-neo-textDark uppercase">
            Tizim <span className="text-neo-orange">Boshqaruvi</span>
          </h2>
        </div>
        
        <div className="flex bg-slate-100 dark:bg-white/5 p-1.5 rounded-[2rem] border border-neo-border dark:border-neo-borderDark">
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'jobs' ? 'bg-white dark:bg-neo-surface text-neo-orange shadow-sm' : 'text-slate-400'}`}
          >
            Vakansiyalar ({jobs.length})
          </button>
          <button 
            onClick={() => setActiveTab('apps')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'apps' ? 'bg-white dark:bg-neo-surface text-neo-orange shadow-sm' : 'text-slate-400'}`}
          >
            Arizalar ({apps.length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-40">
          <div className="w-12 h-12 border-4 border-neo-orange/20 border-t-neo-orange rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {activeTab === 'jobs' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.length === 0 ? (
                <p className="col-span-full text-center py-20 text-slate-400 font-bold uppercase tracking-widest">Vakansiyalar mavjud emas</p>
              ) : (
                jobs.map(job => (
                  <div key={job.id} className="p-8 bg-white dark:bg-neo-surface rounded-[2.5rem] border border-neo-border dark:border-neo-borderDark flex justify-between items-center group hover:border-neo-orange cubic-transition">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-neo-dark flex items-center justify-center border border-neo-border dark:border-neo-borderDark">
                         <img src={job.logo} alt="" className="w-10 h-10 object-contain" />
                      </div>
                      <div>
                        <h4 className="font-display font-black dark:text-neo-textDark text-lg">{job.title}</h4>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">{job.company}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteJob(job.id)}
                      className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white cubic-transition"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {apps.length === 0 ? (
                <p className="text-center py-20 text-slate-400 font-bold uppercase tracking-widest">Arizalar mavjud emas</p>
              ) : (
                apps.map(app => (
                  <div key={app.id} className="p-8 bg-white dark:bg-neo-surface rounded-[2.5rem] border border-neo-border dark:border-neo-borderDark flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-neo-orange cubic-transition">
                    <div className="flex flex-col gap-1">
                      <h4 className="font-display font-black dark:text-neo-textDark text-xl">{app.jobTitle}</h4>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-neo-orange uppercase tracking-widest">{app.applicantName}</span>
                        <span className="text-xs font-bold text-slate-400">{app.applicantTelegram}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="text-right hidden md:block">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Topshirildi</p>
                        <p className="text-xs font-bold dark:text-slate-300">{new Date(app.appliedAt).toLocaleDateString()}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteApp(app.id)}
                        className="flex-grow md:flex-grow-0 px-8 py-4 rounded-2xl bg-red-500/10 text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white cubic-transition"
                      >
                        O'chirish
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
