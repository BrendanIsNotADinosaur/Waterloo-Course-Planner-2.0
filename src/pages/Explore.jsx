import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import CourseCard from '../components/CourseCard';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

const faculties = ['All', 'Health', 'Science', 'Arts', 'Engineering', 'Math'];
const deliveryModes = ['All', 'In-Person', 'Online', 'Hybrid'];
const workloadLevels = ['All', 'Light (1-2)', 'Moderate (3)', 'Heavy (4-5)'];
const seatFilters = ['All', 'Available Seats', 'Waitlist Available'];
const termFilters = ['All', 'Fall', 'Winter', 'Spring'];
const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'seats', label: 'Seat Availability' },
  { value: 'rating', label: 'Student Rating' },
  { value: 'workload-low', label: 'Workload: Low to High' },
  { value: 'workload-high', label: 'Workload: High to Low' },
  { value: 'grade', label: 'Average Grade' },
];

export default function Explore() {
  const { allCourses, compareList } = useApp();
  const [search, setSearch] = useState('');
  const [faculty, setFaculty] = useState('All');
  const [delivery, setDelivery] = useState('All');
  const [workload, setWorkload] = useState('All');
  const [seatFilter, setSeatFilter] = useState('All');
  const [termFilter, setTermFilter] = useState('All');
  const [sort, setSort] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...allCourses];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.studentInsights.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (faculty !== 'All') result = result.filter(c => c.faculty === faculty);
    if (delivery !== 'All') result = result.filter(c => c.deliveryMode === delivery);
    if (termFilter !== 'All') result = result.filter(c => c.termsOffered.includes(termFilter));

    if (workload === 'Light (1-2)') result = result.filter(c => c.workloadLevel <= 2);
    else if (workload === 'Moderate (3)') result = result.filter(c => c.workloadLevel === 3);
    else if (workload === 'Heavy (4-5)') result = result.filter(c => c.workloadLevel >= 4);

    if (seatFilter === 'Available Seats') {
      result = result.filter(c => c.sections.some(s => s.type === 'LEC' && s.seatsRemaining > 0));
    } else if (seatFilter === 'Waitlist Available') {
      result = result.filter(c => c.sections.some(s => s.waitlist));
    }

    switch (sort) {
      case 'seats':
        result.sort((a, b) => {
          const aSeats = a.sections.filter(s => s.type === 'LEC').reduce((sum, s) => sum + s.seatsRemaining, 0);
          const bSeats = b.sections.filter(s => s.type === 'LEC').reduce((sum, s) => sum + s.seatsRemaining, 0);
          return bSeats - aSeats;
        });
        break;
      case 'rating':
        result.sort((a, b) => b.studentInsights.overallRating - a.studentInsights.overallRating);
        break;
      case 'workload-low':
        result.sort((a, b) => a.workloadLevel - b.workloadLevel);
        break;
      case 'workload-high':
        result.sort((a, b) => b.workloadLevel - a.workloadLevel);
        break;
      case 'grade':
        result.sort((a, b) => (b.averageGrade || 0) - (a.averageGrade || 0));
        break;
    }

    return result;
  }, [allCourses, search, faculty, delivery, workload, seatFilter, termFilter, sort]);

  const activeFilters = [faculty, delivery, workload, seatFilter, termFilter].filter(f => f !== 'All').length;

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Explore Courses</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Discover courses with detailed insights, student feedback, and real-time seat availability</p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search by course code, title, keyword, or instructor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-navy-200 focus:border-navy-300 transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors
            ${showFilters || activeFilters > 0 ? 'bg-navy-50 border-navy-200 text-navy-700' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilters > 0 && (
            <span className="bg-navy-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{activeFilters}</span>
          )}
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 mb-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <FilterSelect label="Faculty" value={faculty} onChange={setFaculty} options={faculties} />
            <FilterSelect label="Delivery" value={delivery} onChange={setDelivery} options={deliveryModes} />
            <FilterSelect label="Workload" value={workload} onChange={setWorkload} options={workloadLevels} />
            <FilterSelect label="Seats" value={seatFilter} onChange={setSeatFilter} options={seatFilters} />
            <FilterSelect label="Term" value={termFilter} onChange={setTermFilter} options={termFilters} />
          </div>
          {activeFilters > 0 && (
            <button
              onClick={() => { setFaculty('All'); setDelivery('All'); setWorkload('All'); setSeatFilter('All'); setTermFilter('All'); }}
              className="mt-3 text-xs text-navy-500 hover:text-navy-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Sort & Results Count */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-800 dark:text-gray-200">{filtered.length}</span> courses found
          {compareList.length > 0 && (
            <span className="ml-3 text-navy-600 font-medium">· {compareList.length} in compare</span>
          )}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 dark:text-gray-500">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-navy-200"
          >
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Course Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(course => <CourseCard key={course.id} course={course} />)}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
          <Search className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">No courses match your search</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1 block">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 pr-7 focus:outline-none focus:ring-2 focus:ring-navy-200"
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 dark:text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
}
