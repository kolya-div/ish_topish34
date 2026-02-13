
import { Job, JobCategory } from './types';

export const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Product Designer',
    company: 'NeoTech Systems',
    location: 'Toshkent, IT Park',
    salary: '$3,500 - $5,000',
    category: JobCategory.DESIGN,
    description: 'Bizga Neo-Modernist dizayn tizimlarini tushunadigan senior dizayner kerak.',
    requirements: ['5+ yillik tajriba', 'Figma Mastery', 'Design Systems expertise'],
    postedAt: '2 soat avval',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=neotech',
    isHot: true,
    type: 'Full-time'
  },
  {
    id: '2',
    title: 'Full Stack Engineer (Node/React)',
    company: 'FinSphere Global',
    location: 'Toshkent / Masofaviy',
    salary: '25,000,000 - 40,000,000 UZS',
    category: JobCategory.IT,
    description: 'Yuqori yuklamali moliyaviy tizimlarni ishlab chiqish uchun tajribali dasturchi qidiryapmiz.',
    requirements: ['React/Next.js', 'Node.js/Express', 'PostgreSQL', 'AWS'],
    postedAt: 'Bugun',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=finsphere',
    isHot: false,
    type: 'Remote'
  },
  {
    id: '3',
    title: 'Marketing Director',
    company: 'CreativeFlow Agency',
    location: 'Toshkent, Amir Temur ko\'chasi',
    salary: '15,000,000 UZS + Bonus',
    category: JobCategory.MARKETING,
    description: 'Brendimizni xalqaro darajaga olib chiqish uchun kreativ strateg kerak.',
    requirements: ['Brending strategiyasi', 'SMM/SEO tahlili', 'Jamoani boshqarish'],
    postedAt: 'Kecha',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=creative',
    isHot: true,
    type: 'Full-time'
  }
];

export const TG_CONFIG = {
  TOKEN: '8594163911:AAFs5VJ6Z4aFZk8zluyCPy-_rqwjLAIpY2w',
  ADMIN_ID: '6237727606'
};
