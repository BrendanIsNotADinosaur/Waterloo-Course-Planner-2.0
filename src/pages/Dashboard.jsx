import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { courses } from '../data/courses';
import {
  BookOpen, Clock, AlertTriangle, ArrowRight, Bell,
  CalendarDays, Compass, TrendingUp, Star, Pin, Eye,
  Bookmark, CheckCircle2, BarChart3, Target, Shield
} from 'lucide-react';
import SeatIndicator from '../components/SeatIndicator';
import WorkloadMeter from '../components/WorkloadMeter';

export default function Dashboard() {
  const { user, notifications, unreadCount } = useApp();

  const enrolledDetails = user.enrolledCourses.map(ec => ({
    ...ec,
    course: courses.find(c => c.id === ec.courseId),
  })).filter(e => e.course);

  const savedDetails = user.savedCourses.map(id => courses.find(c => c.id === id)).filter(Boolean);
  const recentAlerts = notifications.filter(n => !n.read).slice(0, 3);
  const totalCredits = enrolledDetails.reduce((sum, e) => sum + (e.course?.credits || 0), 0);

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Welcome back, {user.name.split(' ')[0]}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.program} · {user.year} · {user.term} · GPA {user.gpa}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/notifications" className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Bell className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{unreadCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Pathway Status Banner */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-900 rounded-2xl p-5 mb-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-40 h-40 bg-gold-400/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-medium text-gold-300">Pathway: {user.pathwayProgress.goal}</span>
            <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full ml-2">{user.pathwayProgress.status}</span>
          </div>
          <p className="text-sm text-navy-200 mb-3">
            You are on track for your declared goal. Continue completing core science requirements and register for CHEM 262 next winter.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="w-full h-2 bg-white/10 rounded-full">
                <div className="h-full bg-gold-400 rounded-full transition-all" style={{ width: '35%' }} />
              </div>
              <p className="text-[10px] text-navy-400 mt-1">4 of 9 milestones reached</p>
            </div>
            <Link to="/guidance" className="flex items-center gap-1 text-xs text-gold-300 hover:text-gold-200 font-medium shrink-0">
              View Guidance <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Term Snapshot */}
          <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-navy-500" />
                Current Term
              </h2>
              <span className="text-xs text-gray-400 dark:text-gray-500">{totalCredits} credits enrolled</span>
            </div>

            <div className="space-y-3">
              {enrolledDetails.map(({ course, pinned, courseId }) => {
                const section = course.sections[0];
                return (
                  <Link
                    key={courseId}
                    to={`/course/${courseId}`}
                    className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-navy-600">{course.code}</span>
                        {pinned && <Pin className="w-3 h-3 text-gold-500" />}
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      </div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{course.title}</p>
                      <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">{section?.time} · {section?.instructor}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <WorkloadMeter level={course.workloadLevel} inline />
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Alerts */}
          {recentAlerts.length > 0 && (
            <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-500" />
                  Recent Alerts
                </h2>
                <Link to="/notifications" className="text-xs text-navy-500 hover:text-navy-700 font-medium">View all</Link>
              </div>

              <div className="space-y-2.5">
                {recentAlerts.map(alert => (
                  <Link
                    key={alert.id}
                    to={alert.action?.link || '/notifications'}
                    className={`block p-3 rounded-lg border transition-colors ${
                      alert.priority === 'high'
                        ? 'bg-amber-50/50 border-amber-200 hover:bg-amber-50'
                        : 'bg-gray-50/50 dark:bg-gray-700/50 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {alert.priority === 'high' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{alert.title}</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{alert.message}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Saved Courses */}
          {savedDetails.length > 0 && (
            <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-gold-500" />
                  Saved Courses
                </h2>
                <Link to="/explore" className="text-xs text-navy-500 hover:text-navy-700 font-medium">Browse more</Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedDetails.map(course => {
                  const lecSections = course.sections.filter(s => s.type === 'LEC');
                  const totalRemaining = lecSections.reduce((a, s) => a + s.seatsRemaining, 0);
                  const totalSeats = lecSections.reduce((a, s) => a + s.seatsTotal, 0);
                  const hasWaitlist = lecSections.some(s => s.waitlist);

                  return (
                    <Link
                      key={course.id}
                      to={`/course/${course.id}`}
                      className="p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-xs font-bold text-navy-600">{course.code}</span>
                        <SeatIndicator remaining={totalRemaining} total={totalSeats} hasWaitlist={hasWaitlist} />
                      </div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">{course.title}</p>
                      <div className="flex gap-1">
                        {course.requirementCategories.slice(0, 1).map(r => (
                          <span key={r} className="text-[9px] font-medium text-gold-700 bg-gold-50 px-1.5 py-0.5 rounded">{r}</span>
                        ))}
                        <span className="text-[9px] text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 px-1.5 py-0.5 rounded">{course.termPattern}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Progress Summary */}
          <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-navy-500" />
                Degree Progress
              </h2>
              <Link to="/progress" className="text-xs text-navy-500 hover:text-navy-700 font-medium">Details</Link>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{user.completedCredits}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">/ {user.requiredCredits} credits</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                <div className="h-full bg-navy-500 rounded-full transition-all" style={{ width: `${(user.completedCredits / user.requiredCredits) * 100}%` }} />
              </div>
            </div>

            <div className="space-y-2.5">
              {Object.entries(user.requirements).map(([key, req]) => {
                const pct = (req.completed / req.required) * 100;
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-gray-600 dark:text-gray-400 font-medium">{label}</span>
                      <span className="text-[11px] text-gray-400 dark:text-gray-500">{req.completed}/{req.required}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                      <div
                        className={`h-full rounded-full transition-all ${pct >= 100 ? 'bg-emerald-500' : pct > 50 ? 'bg-navy-400' : 'bg-amber-400'}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Upcoming Deadlines */}
          <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-amber-500" />
              Key Dates
            </h2>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-amber-50/50 border border-amber-100">
                <div className="text-center shrink-0">
                  <p className="text-[10px] text-amber-600 font-bold">MAR</p>
                  <p className="text-lg font-bold text-amber-700">21</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">Drop deadline (no penalty)</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">Winter 2026 courses</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-blue-50/50 border border-blue-100">
                <div className="text-center shrink-0">
                  <p className="text-[10px] text-blue-600 font-bold">MAR</p>
                  <p className="text-lg font-bold text-blue-700">25</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">Summer 2026 enrollment opens</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">8:00 AM ET</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-700">
                <div className="text-center shrink-0">
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold">APR</p>
                  <p className="text-lg font-bold text-gray-700 dark:text-gray-300">08</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">Final exams begin</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">Winter 2026</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pathway Risks */}
          {user.pathwayProgress.risks.length > 0 && (
            <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-amber-500" />
                Pathway Alerts
              </h2>
              <div className="space-y-2">
                {user.pathwayProgress.risks.map((risk, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border text-xs leading-relaxed ${
                      risk.level === 'warning'
                        ? 'bg-amber-50/50 border-amber-200 text-amber-800'
                        : 'bg-blue-50/50 border-blue-200 text-blue-800'
                    }`}
                  >
                    {risk.message}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recommended Next Step */}
          <section className="bg-gradient-to-br from-navy-50 to-white rounded-xl border border-navy-200 p-5">
            <h2 className="text-sm font-semibold text-navy-800 flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-navy-500" />
              Recommended Next Step
            </h2>
            <p className="text-xs text-navy-600 leading-relaxed mb-3">
              Review CHEM 262 for Winter 2027 planning. This course is only offered once per year and is critical for your Medical School pathway.
            </p>
            <Link to="/course/chem262" className="flex items-center gap-1 text-xs text-navy-700 font-semibold hover:text-navy-900">
              View CHEM 262 <ArrowRight className="w-3 h-3" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
