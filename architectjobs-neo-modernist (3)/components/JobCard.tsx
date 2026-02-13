
import React from 'react';
import { Job } from '../types';
import { useUser } from './UserContext';

interface ExtendedJob extends Job {
  ownerId?: string;
}

interface JobCardProps {
  job: ExtendedJob;
  onApply: (job: Job) => void;
  onDelete?: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply, onDelete }) => {
  const { user } = useUser();
  const isOwner = user && job.ownerId === user.id;

  return (
    <div className="group relative bg-white dark:bg-neo-surface rounded-[2rem] p-8 border border-neo-border dark:border-neo-borderDark shadow-neo dark:shadow-neo-dark cubic-transition hover:border-neo-orange hover:shadow-glow overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-neo-orange/5 rounded-full -mr-16 -mt-16 blur-3xl cubic-transition group-hover:bg-neo-orange/10"></div>
      
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-neo-border dark:border-neo-borderDark shadow-sm bg-white p-1">
          <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
        </div>
        <div className="flex gap-2">
          {job.isHot && (
            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-[10px] font-black uppercase tracking-widest animate-pulse">
              HOT
            </span>
          )}
          {isOwner && onDelete && (
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(job.id); }}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white cubic-transition"
              title="O'chirish"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-8 relative z-10">
        <h3 className="text-xl font-display font-black tracking-tight text-neo-text dark:text-neo-textDark group-hover:text-neo-orange cubic-transition">
          {job.title}
        </h3>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
          {job.company} • {job.location}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 relative z-10">
        <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">
          {job.type}
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-neo-orange/5 text-[10px] font-black text-neo-orange uppercase tracking-widest">
          {job.salary}
        </span>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-neo-border dark:border-neo-borderDark relative z-10">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{job.postedAt}</span>
        <button 
          onClick={() => onApply(job)}
          className="px-6 py-2.5 rounded-xl bg-neo-text dark:bg-neo-textDark text-neo-light dark:text-neo-dark text-[10px] font-black uppercase tracking-widest cubic-transition hover:bg-neo-orange dark:hover:bg-neo-orange hover:text-white dark:hover:text-white"
        >
          Ariza topshirish
        </button>
      </div>
    </div>
  );
};
