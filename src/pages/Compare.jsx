import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { courses } from '../data/courses';
import WorkloadMeter from '../components/WorkloadMeter';
import SeatIndicator from '../components/SeatIndicator';
import {
  GitCompareArrows, X, Plus, Star, Clock, Users,
  TrendingUp, CheckCircle2, AlertTriangle, Target
} from 'lucide-react';

export default function Compare() {
  const { compareList, toggleCompare, allCourses } = useApp();
  const compared = compareList.map(id => courses.find(c => c.id === id)).filter(Boolean);

  if (compared.length === 0) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Compare Courses</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Add courses to compare from the Explore page</p>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
          <GitCompareArrows className="w-10 h-10 text-gray-300 dark:text-gray-500 mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">No courses to compare</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Add up to 4 courses from the explore page to see a detailed side-by-side comparison.</p>
          <Link to="/explore" className="inline-flex items-center gap-2 bg-navy-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-navy-800 transition-colors">
            <Plus className="w-4 h-4" /> Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  const rows = [
    { label: 'Rating', key: 'rating', render: (c) => (
      <div className="flex items-center gap-1.5">
        <Star className="w-3.5 h-3.5 text-gold-400" />
        <span className="text-sm font-bold dark:text-white">{c.studentInsights.overallRating}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500">/5</span>
      </div>
    )},
    { label: 'Workload', key: 'workload', render: (c) => <WorkloadMeter level={c.workloadLevel} /> },
    { label: 'Difficulty', key: 'difficulty', render: (c) => (
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{c.studentInsights.difficultyRating}/5</span>
    )},
    { label: 'Usefulness', key: 'usefulness', render: (c) => (
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{c.studentInsights.usefulnessRating}/5</span>
    )},
    { label: 'Average Grade', key: 'grade', render: (c) => (
      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{c.averageGrade}%</span>
    )},
    { label: 'Class Size', key: 'classSize', render: (c) => (
      <span className="text-sm text-gray-700 dark:text-gray-300">{c.classSize}</span>
    )},
    { label: 'Seat Availability', key: 'seats', render: (c) => {
      const lecs = c.sections.filter(s => s.type === 'LEC');
      const remaining = lecs.reduce((a, s) => a + s.seatsRemaining, 0);
      const total = lecs.reduce((a, s) => a + s.seatsTotal, 0);
      return <SeatIndicator remaining={remaining} total={total} hasWaitlist={lecs.some(s => s.waitlist)} />;
    }},
    { label: 'Terms Offered', key: 'terms', render: (c) => (
      <div className="flex gap-1">
        {['F', 'W', 'S'].map((t, i) => (
          <span key={t} className={`text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center ${c.termsOffered.includes(['Fall', 'Winter', 'Spring'][i]) ? 'bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-300 dark:text-gray-500'}`}>{t}</span>
        ))}
      </div>
    )},
    { label: 'Delivery', key: 'delivery', render: (c) => (
      <span className="text-xs text-gray-600 dark:text-gray-400">{c.deliveryMode}</span>
    )},
    { label: 'Assessment Style', key: 'assessment', render: (c) => (
      <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{c.assessmentStyle}</span>
    )},
    { label: 'Requirements Met', key: 'requirements', render: (c) => (
      <div className="flex flex-wrap gap-1">
        {c.requirementCategories.map(r => (
          <span key={r} className="text-[9px] font-medium text-gold-700 dark:text-gold-400 bg-gold-50 dark:bg-gold-900/30 px-1.5 py-0.5 rounded">{r}</span>
        ))}
      </div>
    )},
    { label: 'Prerequisites', key: 'prereqs', render: (c) => (
      c.prerequisites.length > 0
        ? <div className="flex flex-wrap gap-1">{c.prerequisites.map(p => <span key={p} className="text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded">{p}</span>)}</div>
        : <span className="text-xs text-gray-400 dark:text-gray-500">None</span>
    )},
    { label: 'Med School Pathway', key: 'pathway', render: (c) => {
      const med = c.pathwayRelevance?.['Medical School'];
      if (!med) return <span className="text-xs text-gray-300 dark:text-gray-600">—</span>;
      const colors = { critical: 'text-red-600 dark:text-red-400', high: 'text-amber-600 dark:text-amber-400', medium: 'text-blue-600 dark:text-blue-400' };
      return (
        <div>
          <span className={`text-xs font-bold capitalize ${colors[med.relevance]}`}>{med.relevance}</span>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{med.reason}</p>
        </div>
      );
    }},
    { label: 'Student Tags', key: 'tags', render: (c) => (
      <div className="flex flex-wrap gap-1">
        {c.studentInsights.tags.slice(0, 3).map(t => (
          <span key={t} className="text-[9px] text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-1.5 py-0.5 rounded">{t}</span>
        ))}
      </div>
    )},
  ];

  // Find best value for highlighting
  const getBest = (key) => {
    if (key === 'rating') return compared.reduce((a, b) => a.studentInsights.overallRating > b.studentInsights.overallRating ? a : b).id;
    if (key === 'workload') return compared.reduce((a, b) => a.workloadLevel < b.workloadLevel ? a : b).id;
    if (key === 'grade') return compared.reduce((a, b) => (a.averageGrade || 0) > (b.averageGrade || 0) ? a : b).id;
    if (key === 'difficulty') return compared.reduce((a, b) => a.studentInsights.difficultyRating < b.studentInsights.difficultyRating ? a : b).id;
    if (key === 'seats') {
      return compared.reduce((a, b) => {
        const aS = a.sections.filter(s => s.type === 'LEC').reduce((s, sec) => s + sec.seatsRemaining, 0);
        const bS = b.sections.filter(s => s.type === 'LEC').reduce((s, sec) => s + sec.seatsRemaining, 0);
        return aS > bS ? a : b;
      }).id;
    }
    return null;
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Compare Courses</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Side-by-side comparison to find your best fit</p>
        </div>
        <Link to="/explore" className="flex items-center gap-2 text-xs font-medium text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-300 bg-navy-50 dark:bg-navy-900/30 px-3 py-2 rounded-lg">
          <Plus className="w-3.5 h-3.5" /> Add Course
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              <th className="w-40 p-4 text-left bg-gray-50 dark:bg-gray-700" />
              {compared.map(c => (
                <th key={c.id} className="p-4 text-left border-l border-gray-100 dark:border-gray-700 min-w-[200px]">
                  <div className="flex items-start justify-between">
                    <Link to={`/course/${c.id}`} className="group">
                      <span className="text-[10px] font-bold text-navy-600 dark:text-navy-400 bg-navy-50 dark:bg-navy-900/40 px-1.5 py-0.5 rounded">{c.code}</span>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1 group-hover:text-navy-700 dark:group-hover:text-navy-400">{c.title}</p>
                    </Link>
                    <button onClick={() => toggleCompare(c.id)} className="text-gray-300 dark:text-gray-500 hover:text-red-400 p-1 rounded">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const bestId = getBest(row.key);
              return (
                <tr key={row.key} className={i % 2 === 0 ? 'bg-gray-50/30 dark:bg-gray-700/20' : ''}>
                  <td className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-700/30">{row.label}</td>
                  {compared.map(c => (
                    <td key={c.id} className={`px-4 py-3 border-l border-gray-100 dark:border-gray-700 ${bestId === c.id ? 'bg-emerald-50/30 dark:bg-emerald-900/10' : ''}`}>
                      {row.render(c)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Decision Aid */}
      <div className="mt-6 bg-gradient-to-br from-navy-50 dark:from-navy-900/30 to-white dark:to-gray-800 rounded-xl border border-navy-200 dark:border-navy-700 p-5">
        <h3 className="text-sm font-semibold text-navy-800 dark:text-navy-200 flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-navy-500 dark:text-navy-400" /> Comparison Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {compared.map(c => {
            const lecs = c.sections.filter(s => s.type === 'LEC');
            const seatsAvail = lecs.reduce((a, s) => a + s.seatsRemaining, 0) > 0;
            return (
              <div key={c.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <span className="text-xs font-bold text-navy-700 dark:text-navy-300">{c.code}</span>
                <div className="mt-2 space-y-1">
                  {seatsAvail ? (
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Seats available</p>
                  ) : (
                    <p className="text-[10px] text-red-600 dark:text-red-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Currently full</p>
                  )}
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">Workload: {['','Light','Light-Mod','Moderate','Heavy','Very Heavy'][c.workloadLevel]}</p>
                  {c.pathwayRelevance?.['Medical School'] && (
                    <p className="text-[10px] text-navy-600 dark:text-navy-400">Med path: {c.pathwayRelevance['Medical School'].relevance}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
