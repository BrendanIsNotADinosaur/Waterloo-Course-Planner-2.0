import { useApp } from '../context/AppContext';
import { Settings as SettingsIcon, User, Bell, Target, Shield, ChevronRight, Sun, Moon } from 'lucide-react';

const notifPrefConfig = [
  { key: 'seatOpening', label: 'Seat opening alerts', desc: 'Get notified when seats open in watched courses' },
  { key: 'reserveChange', label: 'Reserve change alerts', desc: 'Get notified when reserve seats are released' },
  { key: 'waitlistMovement', label: 'Waitlist movement', desc: 'Updates on your waitlist position changes' },
  { key: 'enrollmentDeadlines', label: 'Enrollment deadlines', desc: 'Reminders for important enrollment dates' },
  { key: 'pathwayWarnings', label: 'Pathway warnings', desc: 'Alerts when course decisions may affect your pathway' },
  { key: 'emailNotifications', label: 'Email notifications', desc: 'Receive notifications via email in addition to in-app' },
];

export default function Settings() {
  const { user, setUser, theme, toggleTheme, notifPrefs, toggleNotifPref } = useApp();

  const handleGoalChange = (goal) => {
    setUser(prev => ({ ...prev, declaredGoal: goal }));
  };

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your profile, notification preferences, and pathway goals</p>
      </div>

      {/* Profile */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 mb-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-navy-500 dark:text-navy-400" /> Profile
        </h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-navy-400 to-navy-600 flex items-center justify-center text-white text-lg font-bold">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.studentId} · {user.program}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{user.year} · {user.term} · {user.coopSequence}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <p className="text-[10px] text-gray-400 dark:text-gray-500">GPA</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{user.gpa}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <p className="text-[10px] text-gray-400 dark:text-gray-500">Credits Completed</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{user.completedCredits}</p>
          </div>
        </div>
      </section>

      {/* Appearance */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 mb-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          {theme === 'dark' ? <Moon className="w-4 h-4 text-navy-500 dark:text-navy-400" /> : <Sun className="w-4 h-4 text-navy-500 dark:text-navy-400" />}
          Appearance
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => theme !== 'light' && toggleTheme()}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
              theme === 'light'
                ? 'border-navy-500 bg-navy-50 dark:bg-navy-900/40 text-navy-700 dark:text-navy-300 shadow-sm'
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            <Sun className="w-4 h-4" />
            Light
          </button>
          <button
            onClick={() => theme !== 'dark' && toggleTheme()}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
              theme === 'dark'
                ? 'border-navy-500 bg-navy-50 dark:bg-navy-900/40 text-navy-700 dark:text-navy-300 shadow-sm'
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            <Moon className="w-4 h-4" />
            Dark
          </button>
        </div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-3">
          Your theme preference is saved automatically and persists across sessions.
        </p>
      </section>

      {/* Pathway Goal */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 mb-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-navy-500 dark:text-navy-400" /> Pathway Goal
        </h2>
        <div className="space-y-2">
          {['Medical School', 'Graduate Studies', 'Public Health', 'Law School', 'GPA Protection', 'Co-op Optimization'].map(goal => (
            <label
              key={goal}
              onClick={() => handleGoalChange(goal)}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                user.declaredGoal === goal
                  ? 'border-navy-300 dark:border-navy-500 bg-navy-50 dark:bg-navy-900/30'
                  : 'border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                user.declaredGoal === goal ? 'border-navy-600 dark:border-navy-400' : 'border-gray-300 dark:border-gray-500'
              }`}>
                {user.declaredGoal === goal && <div className="w-2 h-2 bg-navy-600 dark:bg-navy-400 rounded-full" />}
              </div>
              <span className={`text-xs font-medium ${user.declaredGoal === goal ? 'text-navy-800 dark:text-navy-200' : 'text-gray-600 dark:text-gray-400'}`}>{goal}</span>
            </label>
          ))}
        </div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-3">
          Your pathway goal shapes the recommendations and guidance you receive. You can change it at any time.
        </p>
      </section>

      {/* Notification Preferences */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 mb-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4 text-navy-500 dark:text-navy-400" /> Notification Preferences
        </h2>
        <div className="space-y-3">
          {notifPrefConfig.map((pref) => (
            <div key={pref.key} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-600">
              <div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{pref.label}</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">{pref.desc}</p>
              </div>
              <button
                onClick={() => toggleNotifPref(pref.key)}
                className={`w-10 h-5.5 rounded-full p-0.5 cursor-pointer transition-colors ${
                  notifPrefs[pref.key] ? 'bg-navy-600' : 'bg-gray-200 dark:bg-gray-600'
                }`}
                role="switch"
                aria-checked={notifPrefs[pref.key]}
                aria-label={pref.label}
              >
                <div className={`w-4.5 h-4.5 bg-white rounded-full shadow transition-transform ${
                  notifPrefs[pref.key] ? 'translate-x-4.5' : ''
                }`} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Data & Privacy */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-navy-500 dark:text-navy-400" /> Data & Privacy
        </h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
            <div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Export my data</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">Download all your course plans and preferences</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-500" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
            <div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Clear saved data</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">Remove saved courses, watch lists, and draft schedules</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-500" />
          </div>
        </div>
      </section>
    </div>
  );
}
