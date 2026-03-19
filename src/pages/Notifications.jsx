import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Bell, AlertTriangle, Eye, Clock, Compass, BookOpen,
  ChevronRight, Settings, CheckCircle2, Users
} from 'lucide-react';

const typeIcons = {
  'seat-open': Eye,
  'reserve-change': Users,
  'deadline': Clock,
  'pathway': Compass,
  'waitlist': AlertTriangle,
  'enrollment': BookOpen,
};

const typeBg = {
  'seat-open': 'bg-emerald-50 border-emerald-200',
  'reserve-change': 'bg-amber-50 border-amber-200',
  'deadline': 'bg-red-50 border-red-200',
  'pathway': 'bg-navy-50 border-navy-200',
  'waitlist': 'bg-orange-50 border-orange-200',
  'enrollment': 'bg-blue-50 border-blue-200',
};

const typeIconColor = {
  'seat-open': 'text-emerald-500',
  'reserve-change': 'text-amber-500',
  'deadline': 'text-red-500',
  'pathway': 'text-navy-500',
  'waitlist': 'text-orange-500',
  'enrollment': 'text-blue-500',
};

export default function Notifications() {
  const { notifications, markNotificationRead } = useApp();

  const unread = notifications.filter(n => !n.read);
  const read = notifications.filter(n => n.read);

  function formatTime(ts) {
    const d = new Date(ts);
    const now = new Date();
    const diff = now - d;
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Notifications</h1>
          <p className="text-sm text-gray-500">
            Stay updated on seat changes, reserve releases, waitlist movement, and pathway alerts
          </p>
        </div>
        <Link to="/settings" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 font-medium">
          <Settings className="w-3.5 h-3.5" /> Preferences
        </Link>
      </div>

      {/* Notification Preferences Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <p className="text-xs font-semibold text-gray-700 mb-2">Active Watches</p>
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Eye className="w-3 h-3" /> HLTH 340 — Seat Open
          </span>
          <span className="text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Users className="w-3 h-3" /> CHEM 262 — Reserve Change
          </span>
        </div>
      </div>

      {/* Unread */}
      {unread.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            New
            <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{unread.length}</span>
          </h2>
          <div className="space-y-2">
            {unread.map(n => (
              <NotificationCard key={n.id} notification={n} onRead={markNotificationRead} formatTime={formatTime} />
            ))}
          </div>
        </section>
      )}

      {/* Read */}
      {read.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-500 mb-3">Earlier</h2>
          <div className="space-y-2">
            {read.map(n => (
              <NotificationCard key={n.id} notification={n} onRead={markNotificationRead} formatTime={formatTime} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function NotificationCard({ notification: n, onRead, formatTime }) {
  const Icon = typeIcons[n.type] || Bell;
  const bg = typeBg[n.type] || 'bg-gray-50 border-gray-200';
  const iconColor = typeIconColor[n.type] || 'text-gray-500';

  return (
    <div
      className={`rounded-xl border p-4 transition-colors cursor-pointer ${n.read ? 'bg-white border-gray-100 opacity-75' : bg}`}
      onClick={() => !n.read && onRead(n.id)}
    >
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.read ? 'bg-gray-100' : 'bg-white/70'}`}>
          <Icon className={`w-4 h-4 ${n.read ? 'text-gray-400' : iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <p className={`text-xs font-semibold ${n.read ? 'text-gray-600' : 'text-gray-900'}`}>{n.title}</p>
            <span className="text-[10px] text-gray-400 shrink-0 ml-2">{formatTime(n.timestamp)}</span>
          </div>
          <p className={`text-[11px] leading-relaxed ${n.read ? 'text-gray-400' : 'text-gray-600'}`}>{n.message}</p>
          {n.action && (
            <Link
              to={n.action.link}
              className="inline-flex items-center gap-1 mt-2 text-[10px] font-semibold text-navy-600 hover:text-navy-800"
              onClick={(e) => e.stopPropagation()}
            >
              {n.action.label} <ChevronRight className="w-3 h-3" />
            </Link>
          )}
        </div>
        {!n.read && (
          <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-1.5" />
        )}
      </div>
    </div>
  );
}
