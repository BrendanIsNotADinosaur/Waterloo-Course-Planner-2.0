import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Bookmark, BookmarkCheck, Eye, EyeOff, GitCompareArrows,
  Clock, Users, TrendingUp, Star, AlertCircle, CheckCircle2
} from 'lucide-react';
import SeatIndicator from './SeatIndicator';
import WorkloadMeter from './WorkloadMeter';

export default function CourseCard({ course, compact = false }) {
  const { user, toggleSavedCourse, toggleWatch, toggleCompare, compareList } = useApp();

  const isSaved = user.savedCourses.includes(course.id);
  const isWatching = user.watchedCourses.some(w => w.courseId === course.id);
  const isComparing = compareList.includes(course.id);
  const isEnrolled = user.enrolledCourses.some(e => e.courseId === course.id);

  const totalSeats = course.sections.filter(s => s.type === 'LEC').reduce((a, s) => a + s.seatsTotal, 0);
  const totalRemaining = course.sections.filter(s => s.type === 'LEC').reduce((a, s) => a + s.seatsRemaining, 0);
  const hasWaitlist = course.sections.some(s => s.waitlist);

  const requirementMatch = course.requirementCategories?.length > 0;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200 ${isEnrolled ? 'ring-2 ring-emerald-100 dark:ring-emerald-900 border-emerald-200 dark:border-emerald-700' : ''}`}>
      <Link to={`/course/${course.id}`} className="block p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-navy-600 dark:text-navy-400 bg-navy-50 dark:bg-navy-900/40 px-2 py-0.5 rounded-md">{course.code}</span>
              {isEnrolled && (
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Enrolled
                </span>
              )}
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">{course.title}</h3>
          </div>
          <SeatIndicator remaining={totalRemaining} total={totalSeats} hasWaitlist={hasWaitlist} />
        </div>

        {/* Description */}
        {!compact && (
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-2">{course.description}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {requirementMatch && course.requirementCategories.slice(0, 2).map(req => (
            <span key={req} className="text-[10px] font-medium bg-gold-50 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 border border-gold-200 dark:border-gold-700 px-2 py-0.5 rounded-full">{req}</span>
          ))}
          <span className="text-[10px] font-medium bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 px-2 py-0.5 rounded-full">{course.deliveryMode}</span>
          <span className="text-[10px] font-medium bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 px-2 py-0.5 rounded-full">{course.termPattern}</span>
        </div>

        {/* Metrics Row */}
        <div className="flex items-center gap-4 text-[11px] text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-gold-400" />
            <span className="text-gray-600 dark:text-gray-300 font-medium">{course.studentInsights.overallRating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <WorkloadMeter level={course.workloadLevel} inline />
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{course.classSize}</span>
          </div>
          {course.averageGrade && (
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Avg {course.averageGrade}%</span>
            </div>
          )}
        </div>

        {/* Student Insight Tags */}
        {!compact && course.studentInsights.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5">
            {course.studentInsights.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 px-1.5 py-0.5 rounded">{tag}</span>
            ))}
          </div>
        )}
      </Link>

      {/* Action Bar */}
      <div className="flex items-center border-t border-gray-100 dark:border-gray-700 px-3 py-2 gap-1">
        <button
          onClick={(e) => { e.preventDefault(); toggleSavedCourse(course.id); }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors
            ${isSaved ? 'text-gold-600 dark:text-gold-400 bg-gold-50 dark:bg-gold-900/30' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          title={isSaved ? 'Remove from saved' : 'Save course'}
        >
          {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          {isSaved ? 'Saved' : 'Save'}
        </button>
        <button
          onClick={(e) => { e.preventDefault(); toggleCompare(course.id); }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors
            ${isComparing ? 'text-navy-600 dark:text-navy-400 bg-navy-50 dark:bg-navy-900/30' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          title={isComparing ? 'Remove from compare' : 'Add to compare'}
        >
          <GitCompareArrows className="w-3.5 h-3.5" />
          Compare
        </button>
        <button
          onClick={(e) => { e.preventDefault(); toggleWatch(course.id, course.sections[0]?.id); }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors
            ${isWatching ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          title={isWatching ? 'Stop watching' : 'Watch for seats'}
        >
          {isWatching ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          Watch
        </button>
      </div>
    </div>
  );
}
