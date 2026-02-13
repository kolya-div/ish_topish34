
import React from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useUser } from './UserContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, setLoginModalOpen } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleVacanciesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/' && location.pathname !== '/vakansiyalar') {
      navigate('/');
      // Timeout is needed to allow navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById('job-listings');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const element = document.getElementById('job-listings');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass-2 bg-white/70 dark:bg-neo-dark/70 border-b border-neo-border dark:border-neo-borderDark h-20">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 neo-gradient rounded-xl flex items-center justify-center shadow-glow transform group-hover:rotate-12 cubic-transition">
              <span className="text-neo-text font-black text-xl">A</span>
            </div>
            <span className="text-xl font-display font-black tracking-tighter uppercase dark:text-neo-textDark">
              Architect<span className="text-neo-orange">Jobs</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) => `
                px-5 py-2 rounded-xl text-sm font-bold tracking-tight cubic-transition
                ${isActive && location.pathname === '/' 
                  ? 'text-neo-orange bg-neo-orange/5' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-neo-orange hover:bg-slate-100 dark:hover:bg-white/5'}
              `}
            >
              Asosiy
            </NavLink>
            <button
              onClick={handleVacanciesClick}
              className="px-5 py-2 rounded-xl text-sm font-bold tracking-tight cubic-transition text-slate-500 dark:text-slate-400 hover:text-neo-orange hover:bg-slate-100 dark:hover:bg-white/5"
            >
              Vakansiyalar
            </button>
            <NavLink
              to="/admin"
              className={({ isActive }) => `
                px-5 py-2 rounded-xl text-sm font-bold tracking-tight cubic-transition
                ${isActive 
                  ? 'text-neo-orange bg-neo-orange/5' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-neo-orange hover:bg-slate-100 dark:hover:bg-white/5'}
              `}
            >
              Admin
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-neo-surface border border-neo-border dark:border-neo-borderDark cubic-transition hover:scale-105"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-neo-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              ) : (
                <svg className="w-5 h-5 text-neo-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3 bg-slate-100 dark:bg-white/5 p-1 pr-4 rounded-2xl border border-neo-border dark:border-neo-borderDark">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-xl bg-neo-orange/20" />
                <span className="text-xs font-black dark:text-neo-textDark hidden sm:block">{user.name}</span>
                <button 
                  onClick={logout}
                  className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-red-500 cubic-transition"
                  title="Chiqish"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setLoginModalOpen(true)}
                className="hidden sm:block px-6 py-2.5 rounded-xl neo-gradient text-neo-text font-black text-sm tracking-tight neo-button-glow cubic-transition transform hover:-translate-y-0.5 active:scale-95 shadow-neo"
              >
                Kirish
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-neo-dark border-t border-neo-border dark:border-neo-borderDark py-16">
        <div className="max-w-7xl auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 neo-gradient rounded-lg flex items-center justify-center">
                <span className="text-neo-text font-black text-sm">A</span>
              </div>
              <span className="text-lg font-display font-black tracking-tighter uppercase dark:text-neo-textDark">
                Architect<span className="text-neo-orange">Jobs</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm leading-relaxed">
              O'zbekistondagi eng innovatsion ish qidirish portali. Har bir muloqot va amal bizning Neo-Modernist tizimimiz bilan bog'langan.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-slate-400">Platforma</h4>
            <ul className="space-y-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
              <li>
                <button onClick={handleVacanciesClick} className="hover:text-neo-orange transition-colors text-left">
                  Vakansiyalar
                </button>
              </li>
              <li><Link to="/admin" className="hover:text-neo-orange transition-colors">Admin Panel</Link></li>
              {!user && <li><button onClick={() => setLoginModalOpen(true)} className="hover:text-neo-orange transition-colors">Tizimga kirish</button></li>}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-slate-400">Aloqa</h4>
            <ul className="space-y-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
              <li>Telegram: @Kpakona</li>
              <li>Email: info@archjobs.uz</li>
              <li>Toshkent, O'zbekiston</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-neo-border dark:border-neo-borderDark text-center">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
            © 2024 ArchitectJobs Enterprise. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </footer>
    </div>
  );
};
