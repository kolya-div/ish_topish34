
export enum JobCategory {
  IT = 'Axborot Texnologiyalari',
  MARKETING = 'Marketing va PR',
  DESIGN = 'UI/UX va Grafik Dizayn',
  SALES = 'Savdo va Sotuv',
  FINANCE = 'Moliya va Audit',
  MANAGEMENT = 'Boshqaruv va HR',
  CONSTRUCTION = 'Muhandislik va Qurilish'
}

export enum ApplicationStatus {
  SENT = 'YUBORILGAN',
  REVIEWING = 'KO_RIB_CHIQILMOQDA',
  INTERVIEW = 'SUHBAT',
  ACCEPTED = 'QABUL QILINGAN',
  REJECTED = 'RAD ETILGAN'
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  category: JobCategory;
  description: string;
  requirements: string[];
  postedAt: string;
  logo: string;
  isHot: boolean;
  type: 'Full-time' | 'Remote' | 'Contract';
}

export interface User {
  id: string;
  name: string;
  telegram: string; // Email o'rniga Telegram link
  avatar?: string;
}
