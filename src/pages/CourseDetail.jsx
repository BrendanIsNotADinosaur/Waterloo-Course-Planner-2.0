import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { courses } from '../data/courses';
import SeatIndicator from '../components/SeatIndicator';
import WorkloadMeter from '../components/WorkloadMeter';
import {
  ArrowLeft, Bookmark, BookmarkCheck, Eye, EyeOff, GitCompareArrows,
  Star, Clock, Users, TrendingUp, CalendarDays, AlertTriangle, Info,
  CheckCircle2, XCircle, BookOpen, Pin, GraduationCap, BarChart3,
  Shield, ChevronRight, Target
} from 'lucide-react';

export default function CourseDetail() {
  const { id } = useParams();
  const { user, toggleSavedCourse, toggleWatch, toggleCompare, togglePin, enrollCourse, compareList, addToast } = useApp();

  const course = courses.find(c => c.id === id);
  if (!course) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Course not found</div>;

  const isSaved = user.savedCourses.includes(course.id);
  const isWatching = user.watchedCourses.some(w => w.courseId === course.id);
  const isComparing = compareList.includes(course.id);
  const enrollment = user.enrolledCourses.find(e => e.courseId === course.id);
  const isEnrolled = !!enrollment;

  const lecSections = course.sections.filter(s => s.type === 'LEC');
  const tutSections = course.sections.filter(s => s.type === 'TUT');
  const totalRemaining = lecSections.reduce((a, s) => a + s.seatsRemaining, 0);
  const totalSeats = lecSections.reduce((a, s) => a + s.seatsTotal, 0);

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      {/* Breadcrumb */}
      <Link to="/explore" className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 mb-4 font-medium">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Explore
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-navy-600 bg-navy-50 dark:bg-navy-900/40 px-2.5 py-1 rounded-lg">{course.code}</span>
                  {isEnrolled && (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Enrolled
                    </span>
                  )}
                  <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded-md">{course.credits} credits</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h1>
                <div className="flex flex-wrap gap-1.5">
                  {course.requirementCategories.map(r => (
                    <span key={r} className="text-[10px] font-medium text-gold-700 bg-gold-50 border border-gold-200 px-2 py-0.5 rounded-full">{r}</span>
                  ))}
                  <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded-full">{course.faculty}</span>
                  <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded-full">{course.deliveryMode}</span>
                </div>
              </div>
              <SeatIndicator remaining={totalRemaining} total={totalSeats} hasWaitlist={lecSections.some(s => s.waitlist)} size="lg" />
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{course.description}</p>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                <Star className="w-4 h-4 text-gold-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900 dark:text-white">{course.studentInsights.overallRating}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Rating</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900 dark:text-white">{course.workloadLevel}/5</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Workload</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                <Users className="w-4 h-4 text-gray-400 dark:text-gray-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900 dark:text-white">{course.classSize}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Class Size</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                <TrendingUp className="w-4 h-4 text-gray-400 dark:text-gray-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900 dark:text-white">{course.averageGrade}%</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Avg Grade</p>
              </div>
            </div>
          </div>

          {/* Prerequisites & Anti-requisites */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Requirements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 mb-2">Prerequisites</p>
                {course.prerequisites.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {course.prerequisites.map(p => {
                      const met = user.completedCourses.some(c => c.code === p) || user.enrolledCourses.some(e => courses.find(c => c.id === e.courseId)?.code === p);
                      return (
                        <span key={p} className={`text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1 ${met ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                          {met ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} {p}
                        </span>
                      );
                    })}
                  </div>
                ) : <p className="text-xs text-gray-400 dark:text-gray-500">None</p>}
              </div>
              <div>
                <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 mb-2">Antirequisites</p>
                {course.antirequisites.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {course.antirequisites.map(a => (
                      <span key={a} className="text-xs font-medium bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md">{a}</span>
                    ))}
                  </div>
                ) : <p className="text-xs text-gray-400 dark:text-gray-500">None</p>}
              </div>
              <div>
                <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 mb-2">Term Availability</p>
                <div className="flex gap-1.5">
                  {['Fall', 'Winter', 'Spring'].map(t => (
                    <span key={t} className={`text-xs font-medium px-2 py-1 rounded-md ${course.termsOffered.includes(t) ? 'bg-navy-50 dark:bg-navy-900/40 text-navy-700' : 'bg-gray-50 dark:bg-gray-700 text-gray-300 dark:text-gray-500'}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Sections</h2>

            {lecSections.length > 0 && (
              <>
                <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Lectures</p>
                <div className="space-y-2 mb-4">
                  {lecSections.map(s => (
                    <div key={s.id} className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${s.seatsRemaining === 0 ? 'bg-gray-50/50 dark:bg-gray-700/50 border-gray-100 dark:border-gray-700' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">LEC {s.id}</span>
                          {s.reserveGroups?.length > 0 && (
                            <span className="text-[9px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                              Reserve: {s.reserveGroups.join(', ')}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{s.time} · {s.room}</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500">{s.instructor}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <SeatIndicator remaining={s.seatsRemaining} total={s.seatsTotal} hasWaitlist={!!s.waitlist} />
                        {s.waitlist && (
                          <span className="text-[10px] font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded">
                            WL: {s.waitlist}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tutSections.length > 0 && (
              <>
                <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Tutorials</p>
                <div className="space-y-2">
                  {tutSections.map(s => (
                    <div key={s.id} className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex-1">
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">TUT {s.id}</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{s.time} · {s.room}</p>
                      </div>
                      <SeatIndicator remaining={s.seatsRemaining} total={s.seatsTotal} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Assessment Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Assessment</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{course.assessmentStyle}</p>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(course.assessmentBreakdown).map(([key, value]) => (
                <div key={key} className="bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 text-center min-w-[80px]">
                  <p className="text-lg font-bold text-navy-700">{value}%</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 capitalize">{key.replace(/([0-9]+)/g, ' $1')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Student Insights */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-gold-500" /> Student Insights
            </h2>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Overall', value: course.studentInsights.overallRating },
                { label: 'Workload', value: course.studentInsights.workloadRating },
                { label: 'Difficulty', value: course.studentInsights.difficultyRating },
                { label: 'Usefulness', value: course.studentInsights.usefulnessRating },
              ].map(item => (
                <div key={item.label} className="text-center">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{item.value}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">{item.label}</p>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mt-1">
                    <div className="h-full bg-gold-400 rounded-full" style={{ width: `${(item.value / 5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {course.studentInsights.tags.map(tag => (
                <span key={tag} className="text-[10px] font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">{tag}</span>
              ))}
            </div>

            <div className="space-y-2">
              {course.studentInsights.comments.map((comment, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed italic">"{comment}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Demand */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-navy-500" /> Historical Demand
            </h2>
            <div className="flex gap-2">
              {Object.entries(course.historicalDemand).map(([term, pct]) => (
                <div key={term} className="flex-1 text-center">
                  <div className="h-20 flex items-end justify-center mb-1">
                    <div
                      className={`w-full max-w-[40px] rounded-t-md ${pct >= 95 ? 'bg-red-400' : pct >= 80 ? 'bg-amber-400' : 'bg-navy-400'}`}
                      style={{ height: `${pct}%` }}
                    />
                  </div>
                  <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{pct}%</p>
                  <p className="text-[9px] text-gray-400 dark:text-gray-500">{term.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 text-center">Percentage of seats filled at enrollment close</p>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 sticky top-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Actions</h3>

            {!isEnrolled ? (
              <button
                onClick={() => {
                  const avail = lecSections.find(s => s.seatsRemaining > 0);
                  if (avail) enrollCourse(course.id, avail.id);
                  else addToast('No available seats. You can watch this course for openings.', 'warning');
                }}
                className="w-full bg-navy-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-800 transition-colors mb-3"
              >
                Enroll Now
              </button>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <p className="text-xs font-semibold text-emerald-800">You're enrolled</p>
                </div>
                <p className="text-[10px] text-emerald-600">This course keeps your requirement plan on track.</p>
              </div>
            )}

            <div className="space-y-2">
              <button
                onClick={() => toggleSavedCourse(course.id)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors
                  ${isSaved ? 'bg-gold-50 border-gold-200 text-gold-700' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                {isSaved ? 'Saved' : 'Save for Later'}
              </button>
              <button
                onClick={() => toggleCompare(course.id)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors
                  ${isComparing ? 'bg-navy-50 dark:bg-navy-900/40 border-navy-200 text-navy-700' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                <GitCompareArrows className="w-4 h-4" /> {isComparing ? 'In Compare List' : 'Add to Compare'}
              </button>
              <button
                onClick={() => toggleWatch(course.id, lecSections[0]?.id)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors
                  ${isWatching ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                {isWatching ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {isWatching ? 'Stop Watching' : 'Watch for Seats'}
              </button>
              <Link
                to="/schedule"
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <CalendarDays className="w-4 h-4" /> Add to Schedule
              </Link>
            </div>
          </div>

          {/* Pathway Relevance */}
          {course.pathwayRelevance && Object.keys(course.pathwayRelevance).length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-navy-500" /> Pathway Fit
              </h3>
              <div className="space-y-3">
                {Object.entries(course.pathwayRelevance).map(([path, data]) => {
                  const colors = {
                    critical: 'border-red-200 bg-red-50',
                    high: 'border-amber-200 bg-amber-50',
                    medium: 'border-blue-200 bg-blue-50',
                  };
                  const badges = {
                    critical: 'bg-red-100 text-red-700',
                    high: 'bg-amber-100 text-amber-700',
                    medium: 'bg-blue-100 text-blue-700',
                  };
                  return (
                    <div key={path} className={`rounded-lg border p-3 ${colors[data.relevance]}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{path}</span>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${badges[data.relevance]}`}>
                          {data.relevance}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">{data.reason}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Similar Courses */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Related Courses</h3>
            <div className="space-y-2">
              {courses
                .filter(c => c.id !== course.id && (c.faculty === course.faculty || c.requirementCategories.some(r => course.requirementCategories.includes(r))))
                .slice(0, 3)
                .map(c => (
                  <Link key={c.id} to={`/course/${c.id}`} className="block p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-bold text-navy-600">{c.code}</span>
                      <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-500" />
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">{c.title}</p>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
