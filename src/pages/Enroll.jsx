import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { courses } from '../data/courses';
import SeatIndicator from '../components/SeatIndicator';
import {
  BookOpen, Pin, CheckCircle2, AlertTriangle, XCircle,
  ArrowRight, Shield, RefreshCw, Eye, Trash2, ArrowUpDown
} from 'lucide-react';

export default function Enroll() {
  const { user, enrollCourse, dropCourse, togglePin, addToast } = useApp();
  const [confirmDrop, setConfirmDrop] = useState(null);
  const [showSwap, setShowSwap] = useState(null);

  const enrolledDetails = user.enrolledCourses.map(ec => ({
    ...ec,
    course: courses.find(c => c.id === ec.courseId),
  })).filter(e => e.course);

  const savedEnrollable = user.savedCourses
    .map(id => courses.find(c => c.id === id))
    .filter(c => c && c.sections.some(s => s.type === 'LEC' && s.seatsRemaining > 0));

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Enrollment</h1>
        <p className="text-sm text-gray-500">Manage your course enrollment. Pinned courses are protected from changes.</p>
      </div>

      {/* Enrollment Safety Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-blue-800 mb-1">Safe Enrollment Mode</p>
            <p className="text-[11px] text-blue-700 leading-relaxed">
              Each action only affects the specific course shown. Pinned courses cannot be modified until you unpin them.
              You'll see a clear confirmation after every action explaining the outcome and whether your plan remains on track.
            </p>
          </div>
        </div>
      </div>

      {/* Currently Enrolled */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Currently Enrolled
          <span className="text-xs text-gray-400 font-normal">({enrolledDetails.length} courses)</span>
        </h2>

        <div className="space-y-3">
          {enrolledDetails.map(({ course, pinned, courseId, sectionId }) => {
            const section = course.sections.find(s => s.id === sectionId) || course.sections[0];
            const isPinned = pinned;

            return (
              <div key={courseId} className={`bg-white rounded-xl border p-4 ${isPinned ? 'border-gold-200 bg-gold-50/20' : 'border-gray-200'}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Link to={`/course/${courseId}`} className="text-sm font-bold text-navy-600 hover:text-navy-800">{course.code}</Link>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Enrolled</span>
                      {isPinned && (
                        <span className="text-[10px] font-semibold text-gold-600 bg-gold-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Pin className="w-2.5 h-2.5" /> Protected
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-800 mb-1">{course.title}</p>
                    <p className="text-[11px] text-gray-400">
                      Section {section?.id} · {section?.time} · {section?.instructor}
                    </p>
                    <div className="flex gap-1.5 mt-2">
                      {course.requirementCategories.slice(0, 2).map(r => (
                        <span key={r} className="text-[9px] font-medium text-gold-700 bg-gold-50 px-1.5 py-0.5 rounded">{r}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => togglePin(courseId)}
                      className={`p-2 rounded-lg transition-colors ${isPinned ? 'bg-gold-50 text-gold-600 hover:bg-gold-100' : 'bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                      title={isPinned ? 'Remove protection' : 'Protect course'}
                    >
                      <Pin className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => !isPinned && setShowSwap(showSwap === courseId ? null : courseId)}
                      disabled={isPinned}
                      className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Swap section"
                    >
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (isPinned) {
                          addToast('This course is pinned. Unpin it first to make changes.', 'warning');
                          return;
                        }
                        setConfirmDrop(courseId);
                      }}
                      className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30"
                      disabled={isPinned}
                      title="Drop course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Drop Confirmation */}
                {confirmDrop === courseId && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs font-semibold text-red-800 mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Confirm Drop
                    </p>
                    <p className="text-[11px] text-red-700 mb-3">
                      Dropping {course.code} will free up {course.credits} credits in your schedule. This action removes you from the course.
                      {course.sections[0]?.seatsRemaining === 0 && ' Note: this section is currently full — you may not be able to re-enroll.'}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { dropCourse(courseId); setConfirmDrop(null); }}
                        className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700"
                      >
                        Drop Course
                      </button>
                      <button
                        onClick={() => setConfirmDrop(null)}
                        className="px-3 py-1.5 bg-white text-gray-600 text-xs font-medium rounded-lg border border-gray-200 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Swap Panel */}
                {showSwap === courseId && (
                  <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Available Sections</p>
                    <div className="space-y-1.5">
                      {course.sections.filter(s => s.type === 'LEC').map(s => (
                        <div key={s.id} className={`flex items-center gap-3 p-2 rounded-lg border ${s.id === sectionId ? 'border-navy-200 bg-navy-50' : 'border-gray-100 hover:bg-white'}`}>
                          <div className="flex-1">
                            <p className="text-[10px] font-bold text-gray-700">LEC {s.id} {s.id === sectionId && '(current)'}</p>
                            <p className="text-[10px] text-gray-400">{s.time} · {s.instructor}</p>
                          </div>
                          <SeatIndicator remaining={s.seatsRemaining} total={s.seatsTotal} hasWaitlist={!!s.waitlist} />
                          {s.id !== sectionId && s.seatsRemaining > 0 && (
                            <button
                              onClick={() => { addToast(`Swapped to Section ${s.id}. No other courses affected.`); setShowSwap(null); }}
                              className="text-[10px] font-medium text-navy-600 bg-navy-50 px-2 py-1 rounded hover:bg-navy-100"
                            >
                              Swap
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Ready to Enroll */}
      {savedEnrollable.length > 0 && (
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-navy-500" />
            Ready to Enroll
            <span className="text-xs text-gray-400 font-normal">(from saved courses with open seats)</span>
          </h2>

          <div className="space-y-3">
            {savedEnrollable.map(course => {
              const availSection = course.sections.find(s => s.type === 'LEC' && s.seatsRemaining > 0);
              return (
                <div key={course.id} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Link to={`/course/${course.id}`} className="text-sm font-bold text-navy-600 hover:text-navy-800">{course.code}</Link>
                      </div>
                      <p className="text-sm font-medium text-gray-800 mb-1">{course.title}</p>
                      <p className="text-[11px] text-gray-400">
                        Section {availSection?.id} · {availSection?.time} · {availSection?.instructor}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <SeatIndicator remaining={availSection?.seatsRemaining || 0} total={availSection?.seatsTotal || 0} />
                      <button
                        onClick={() => enrollCourse(course.id, availSection?.id)}
                        className="px-4 py-2 bg-navy-700 text-white text-xs font-semibold rounded-lg hover:bg-navy-800 transition-colors"
                      >
                        Enroll
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
