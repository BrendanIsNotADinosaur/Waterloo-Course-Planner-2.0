import { AlertCircle } from 'lucide-react';

export default function SeatIndicator({ remaining, total, hasWaitlist, size = 'sm' }) {
  const pct = total > 0 ? (remaining / total) * 100 : 0;
  let color, bg, text, label;

  if (remaining === 0) {
    color = 'bg-red-500';
    bg = 'bg-red-50';
    text = 'text-red-700';
    label = hasWaitlist ? 'Waitlist' : 'Full';
  } else if (pct <= 10) {
    color = 'bg-amber-500';
    bg = 'bg-amber-50';
    text = 'text-amber-700';
    label = `${remaining} left`;
  } else if (pct <= 30) {
    color = 'bg-gold-500';
    bg = 'bg-gold-50';
    text = 'text-gold-700';
    label = `${remaining} left`;
  } else {
    color = 'bg-emerald-500';
    bg = 'bg-emerald-50';
    text = 'text-emerald-700';
    label = `${remaining} seats`;
  }

  if (size === 'lg') {
    return (
      <div className={`${bg} rounded-lg px-3 py-2 text-center min-w-[80px]`}>
        <div className="flex items-center justify-center gap-1">
          {remaining === 0 && <AlertCircle className="w-3.5 h-3.5 text-red-500" />}
          <span className={`text-lg font-bold ${text}`}>{remaining}</span>
          <span className="text-xs text-gray-400">/{total}</span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1.5">
          <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${Math.max(100 - pct, 2)}%` }} />
        </div>
        <p className={`text-[10px] font-medium mt-1 ${text}`}>{label}</p>
      </div>
    );
  }

  return (
    <div className={`${bg} rounded-md px-2 py-1 flex items-center gap-1.5 shrink-0`}>
      {remaining === 0 && <AlertCircle className="w-3 h-3 text-red-500" />}
      <span className={`text-[11px] font-semibold ${text}`}>{label}</span>
    </div>
  );
}
