import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { courses } from '../data/courses';
import WorkloadMeter from '../components/WorkloadMeter';
import {
  CalendarDays, Pin, PinOff, AlertTriangle, CheckCircle2,
  Plus, Copy, Trash2, Clock, BookOpen, ArrowRight, Shield
} from 'lucide-react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const hours = Array.from({ length: 12 }, (_, i) => i + 8);

const courseColors = {
  hlth204: { bg: 'bg-navy-100 dark:bg-navy-800', border: 'border-navy-300 dark:border-navy-600', text: 'text-navy-800 dark:text-navy-200' },
  biol239: { bg: 'bg-emerald-100 dark:bg-emerald-900', border: 'border-emerald-300 dark:border-emerald-600', text: 'text-emerald-800 dark:text-emerald-200' },
  psych101: { bg: 'bg-purple-100 dark:bg-purple-900', border: 'border-purple-300 dark:border-purple-600', text: 'text-purple-800 dark:text-purple-200' },
  chem262: { bg: 'bg-amber-100 dark:bg-amber-900', border: 'border-amber-300 dark:border-amber-600', text: 'text-amber-800 dark:text-amber-200' },
  hlth340: { bg: 'bg-rose-100 dark:bg-rose-900', border: 'border-rose-300 dark:border-rose-600', text: 'text-rose-800 dark:text-rose-200' },
  hlth201: { bg: 'bg-sky-100 dark:bg-sky-900', border: 'border-sky-300 dark:border-sky-600', text: 'text-sky-800 dark:text-sky-200' },
  sci206: { bg: 'bg-orange-100 dark:bg-orange-900', border: 'border-orange-300 dark:border-orange-600', text: 'text-orange-800 dark:text-orange-200' },
  hlth310: { bg: 'bg-teal-100 dark:bg-teal-900', border: 'border-teal-300 dark:border-teal-600', text: 'text-teal-800 dark:text-teal-200' },
};
const defaultColor = { bg: 'bg-gray-100 dark:bg-gray-700', border: 'border-gray-300 dark:border-gray-600', text: 'text-gray-800 dark:text-gray-200' };

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

export default function ScheduleBuilder() {
  const { user, togglePin } = useApp();
  const [draftName, setDraftName] = useState('Draft A');

  const enrolledDetails = user.enrolledCourses.map(ec => ({
    ...ec,
    course: courses.find(c => c.id === ec.courseId),
  })).filter(e => e.course);

  const totalWorkload = enrolledDetails.reduce((sum, e) => sum + (e.course?.workloadLevel || 0), 0);
  const avgWorkload = enrolledDetails.length > 0 ? Math.round(totalWorkload / enrolledDetails.length * 10) / 10 : 0;
  const totalCredits = enrolledDetails.reduce((sum, e) => sum + (e.course?.credits || 0), 0);

  // Convert schedule slots to renderable blocks
  const blocks = user.scheduleSlots.map(slot => {
    const course = courses.find(c => c.id === slot.courseId);
    const color = courseColors[slot.courseId] || defaultColor;
    const startMin = timeToMinutes(slot.start);
    const endMin = timeToMinutes(slot.end);
    const top = ((startMin - 480) / 60) * 60; // 480 = 8:00
    const height = ((endMin - startMin) / 60) * 60;
    return { ...slot, course, color, top, height };
  });

  // Check for conflicts
  const conflicts = [];
  for (let i = 0; i < blocks.length; i++) {
    for (let j = i + 1; j < blocks.length; j++) {
      if (blocks[i].day === blocks[j].day) {
        const aStart = timeToMinutes(blocks[i].start);
        const aEnd = timeToMinutes(blocks[i].end);
        const bStart = timeToMinutes(blocks[j].start);
        const bEnd = timeToMinutes(blocks[j].end);
        if (aStart < bEnd && bStart < aEnd) {
          conflicts.push({ a: blocks[i], b: blocks[j] });
        }
      }
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Schedule Builder</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Plan your term schedule visually. Pin important courses to protect them.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button className="px-3 py-1.5 text-xs font-medium text-white bg-navy-700 rounded-md">{draftName}</button>
            <button className="px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-md">Draft B</button>
          </div>
          <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" title="Duplicate draft">
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-[60px_repeat(5,1fr)] border-b border-gray-100 dark:border-gray-700">
            <div className="p-2 bg-gray-50 dark:bg-gray-700" />
            {days.map(day => (
              <div key={day} className="p-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 text-center border-l border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                {day}
              </div>
            ))}
          </div>

          {/* Time Grid */}
          <div className="grid grid-cols-[60px_repeat(5,1fr)] relative" style={{ height: `${12 * 60}px` }}>
            {/* Time Labels */}
            <div className="relative">
              {hours.map(h => (
                <div key={h} className="absolute w-full text-right pr-2 -translate-y-1/2" style={{ top: `${(h - 8) * 60}px` }}>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">{h > 12 ? h - 12 : h}:{h >= 12 ? '00 PM' : '00 AM'}</span>
                </div>
              ))}
            </div>

            {/* Day Columns */}
            {days.map((day, dayIdx) => (
              <div key={day} className="relative border-l border-gray-100 dark:border-gray-700">
                {/* Hour lines */}
                {hours.map(h => (
                  <div key={h} className="absolute w-full border-t border-gray-50 dark:border-gray-700/50" style={{ top: `${(h - 8) * 60}px` }} />
                ))}

                {/* Course Blocks */}
                {blocks.filter(b => b.day === day).map((block, i) => (
                  <div
                    key={`${block.courseId}-${i}`}
                    className={`absolute left-1 right-1 ${block.color.bg} ${block.color.border} border rounded-lg px-2 py-1.5 cursor-pointer hover:shadow-md transition-shadow overflow-hidden`}
                    style={{ top: `${block.top}px`, height: `${block.height}px` }}
                  >
                    <p className={`text-[10px] font-bold ${block.color.text} truncate`}>{block.course?.code}</p>
                    <p className="text-[9px] text-gray-500 dark:text-gray-400 truncate">{block.type}</p>
                    <p className="text-[9px] text-gray-400 dark:text-gray-500 truncate">{block.start}-{block.end}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Panel */}
        <div className="space-y-5">
          {/* Schedule Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Schedule Summary</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2.5 text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{totalCredits}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Credits</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2.5 text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{enrolledDetails.length}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Courses</p>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">Workload Balance</p>
              <WorkloadMeter level={Math.round(avgWorkload)} />
            </div>

            {conflicts.length > 0 ? (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-2.5">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                  <p className="text-[10px] font-semibold text-red-700 dark:text-red-400">{conflicts.length} time conflict(s)</p>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-2.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <p className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">No conflicts detected</p>
                </div>
              </div>
            )}
          </div>

          {/* Course List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Enrolled Courses</h3>
            <div className="space-y-2">
              {enrolledDetails.map(({ course, pinned, courseId }) => {
                const color = courseColors[courseId] || defaultColor;
                return (
                  <div key={courseId} className={`flex items-center gap-2.5 p-2.5 rounded-lg border ${pinned ? 'border-gold-200 dark:border-gold-700 bg-gold-50/30 dark:bg-gold-900/20' : 'border-gray-100 dark:border-gray-700'}`}>
                    <div className={`w-2.5 h-2.5 rounded-sm ${color.bg} ${color.border} border`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{course.code}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">{course.title}</p>
                    </div>
                    <button
                      onClick={() => togglePin(courseId)}
                      className={`p-1 rounded ${pinned ? 'text-gold-500' : 'text-gray-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300'}`}
                      title={pinned ? 'Unpin (remove protection)' : 'Pin (protect from changes)'}
                    >
                      {pinned ? <Pin className="w-3.5 h-3.5" /> : <PinOff className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                );
              })}
            </div>

            <Link to="/explore" className="flex items-center gap-1.5 mt-3 text-[11px] font-medium text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-300">
              <Plus className="w-3.5 h-3.5" /> Add another course
            </Link>
          </div>

          {/* Safety Note */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1">Safe Planning Mode</p>
                <p className="text-[10px] text-blue-700 dark:text-blue-400 leading-relaxed">
                  Changes to this draft do not affect your enrollment. Pin courses you want to protect. When ready, move to the Enroll page to commit changes.
                </p>
              </div>
            </div>
          </div>

          {/* Move to Enrollment */}
          <Link
            to="/enroll"
            className="flex items-center justify-center gap-2 w-full bg-navy-700 text-white py-3 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors"
          >
            Proceed to Enrollment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
