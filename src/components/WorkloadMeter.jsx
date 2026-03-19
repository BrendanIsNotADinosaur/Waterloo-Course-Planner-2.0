const labels = ['', 'Light', 'Light-Moderate', 'Moderate', 'Heavy', 'Very Heavy'];
const colors = ['', 'text-emerald-600', 'text-emerald-500', 'text-amber-500', 'text-orange-500', 'text-red-500'];
const barColors = ['', 'bg-emerald-400', 'bg-emerald-400', 'bg-amber-400', 'bg-orange-400', 'bg-red-400'];

export default function WorkloadMeter({ level, inline = false }) {
  if (inline) {
    return <span className={`font-medium ${colors[level]}`}>{labels[level]}</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className={`w-3 h-1.5 rounded-sm ${i <= level ? barColors[level] : 'bg-gray-200 dark:bg-gray-600'}`}
          />
        ))}
      </div>
      <span className={`text-xs font-medium ${colors[level]}`}>{labels[level]}</span>
    </div>
  );
}
