
/**
 * ARCHITECT DB ENGINE (SQLite Simulation)
 * -----------------------------------------------------------------------------
 * Ushbu servis brauzer xotirasida SQL-ga o'xshash jadval tizimini yaratadi.
 * Ma'lumotlar JSON formatida saqlanadi va ID-lar orqali bog'lanadi.
 * -----------------------------------------------------------------------------
 */

import { User, Job } from '../types';
import { SystemLogger } from './apiService';

interface ExtendedJob extends Job {
  ownerId?: string;
}

class DatabaseService {
  private USERS_TABLE = 'arch_users_table';
  private APPLICATIONS_TABLE = 'arch_apps_table';
  private JOBS_TABLE = 'arch_jobs_table';

  constructor() {
    this.init();
  }

  private init() {
    if (!localStorage.getItem(this.USERS_TABLE)) {
      localStorage.setItem(this.USERS_TABLE, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.APPLICATIONS_TABLE)) {
      localStorage.setItem(this.APPLICATIONS_TABLE, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.JOBS_TABLE)) {
      localStorage.setItem(this.JOBS_TABLE, JSON.stringify([]));
    }
    SystemLogger.log("SQLite DB Engine (localStorage Layer) ishga tushirildi.");
  }

  public async insertUser(name: string, telegram: string): Promise<User> {
    const users: User[] = JSON.parse(localStorage.getItem(this.USERS_TABLE) || '[]');
    const existing = users.find(u => u.telegram === telegram);
    
    if (existing) return existing;

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      telegram,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${telegram.replace('@', '')}`
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_TABLE, JSON.stringify(users));
    return newUser;
  }

  public async insertJob(job: Job, ownerId?: string) {
    const jobs = JSON.parse(localStorage.getItem(this.JOBS_TABLE) || '[]');
    const jobWithOwner = { ...job, ownerId };
    jobs.push(jobWithOwner);
    localStorage.setItem(this.JOBS_TABLE, JSON.stringify(jobs));
  }

  public async getAllJobs(): Promise<ExtendedJob[]> {
    return JSON.parse(localStorage.getItem(this.JOBS_TABLE) || '[]');
  }

  public async deleteJob(jobId: string, userId?: string) {
    const jobs = await this.getAllJobs();
    const job = jobs.find(j => j.id === jobId);
    
    // Agar foydalanuvchi admin bo'lsa yoki ish egasi bo'lsa o'chirishga ruxsat
    if (job?.ownerId === userId || userId === 'ADMIN_ID_6237727606') {
      const filtered = jobs.filter(j => j.id !== jobId);
      localStorage.setItem(this.JOBS_TABLE, JSON.stringify(filtered));
      SystemLogger.log(`Ish o'chirildi: ${jobId}`);
      return true;
    }
    return false;
  }

  public async insertApplication(userId: string, jobId: string, jobTitle: string, applicantName: string, applicantTelegram: string) {
    const apps = JSON.parse(localStorage.getItem(this.APPLICATIONS_TABLE) || '[]');
    const newApp = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      jobId,
      jobTitle,
      applicantName,
      applicantTelegram,
      appliedAt: new Date().toISOString()
    };
    apps.push(newApp);
    localStorage.setItem(this.APPLICATIONS_TABLE, JSON.stringify(apps));
  }

  public async getAllApplications(): Promise<any[]> {
    return JSON.parse(localStorage.getItem(this.APPLICATIONS_TABLE) || '[]');
  }

  public async deleteApplication(appId: string) {
    const apps = await this.getAllApplications();
    const filtered = apps.filter(a => a.id !== appId);
    localStorage.setItem(this.APPLICATIONS_TABLE, JSON.stringify(filtered));
  }
}

export const dbService = new DatabaseService();
