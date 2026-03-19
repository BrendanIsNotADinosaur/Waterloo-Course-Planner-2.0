import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard, Search, CalendarDays, BookOpen,
  GraduationCap, Bell, BarChart3, Compass, Settings,
  GitCompareArrows, LogOut, ShieldCheck, Sun, Moon
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/explore', icon: Search, label: 'Explore Courses' },
  { to: '/compare', icon: GitCompareArrows, label: 'Compare' },
  { to: '/schedule', icon: CalendarDays, label: 'Schedule Builder' },
  { to: '/enroll', icon: BookOpen, label: 'Enroll' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/progress', icon: BarChart3, label: 'Progress' },
  { to: '/guidance', icon: Compass, label: 'Guidance' },
];

export default function Sidebar() {
  const { unreadCount, user, theme, toggleTheme } = useApp();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-navy-900 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-navy-900 dark:text-white leading-tight">WatPlan</h1>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">University of Waterloo</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
              ${isActive
                ? 'bg-navy-50 dark:bg-navy-900/40 text-navy-800 dark:text-navy-200 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300'}`
            }
          >
            <Icon className="w-[18px] h-[18px] shrink-0" />
            <span className="flex-1">{label}</span>
            {label === 'Notifications' && unreadCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Theme Toggle */}
      <div className="px-3 pb-1">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>

      {/* User Card */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-700">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy-400 to-navy-600 flex items-center justify-center text-white text-xs font-bold">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{user.name}</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate">{user.program}</p>
          </div>
          <Settings className="w-4 h-4 text-gray-300 dark:text-gray-500" />
        </NavLink>
      </div>
    </aside>
  );
}
