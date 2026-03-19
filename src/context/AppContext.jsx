import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { courses } from '../data/courses';
import { userData as initialUser } from '../data/user';
import { notifications as initialNotifications } from '../data/notifications';

const AppContext = createContext();

// Helper: parse section time string into schedule slots
// e.g. "Mon Wed 10:00-11:20" → [{ day: 'Mon', start: '10:00', end: '11:20' }, { day: 'Wed', start: '10:00', end: '11:20' }]
function parseSectionTime(timeStr) {
  if (!timeStr) return [];
  const parts = timeStr.split(' ');
  const timePart = parts.find(p => p.includes(':') && p.includes('-'));
  if (!timePart) return [];
  const [start, end] = timePart.split('-');
  const days = parts.filter(p => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(p));
  return days.map(day => ({ day, start, end }));
}

// Build schedule slots from an enrolled course + its section data
function buildSlotsForCourse(courseId, sectionId) {
  const course = courses.find(c => c.id === courseId);
  if (!course) return [];
  const section = course.sections.find(s => s.id === sectionId);
  if (!section) return [];
  return parseSectionTime(section.time).map(slot => ({
    ...slot,
    courseId,
    type: section.type,
  }));
}

const defaultNotifPrefs = {
  seatOpening: true,
  reserveChange: true,
  waitlistMovement: true,
  enrollmentDeadlines: true,
  pathwayWarnings: true,
  emailNotifications: false,
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(initialUser);
  const [allCourses] = useState(courses);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [compareList, setCompareList] = useState([]);
  const [scheduleDrafts, setScheduleDrafts] = useState([user.scheduleSlots]);
  const [activeDraft, setActiveDraft] = useState(0);
  const [enrollmentQueue, setEnrollmentQueue] = useState([]);
  const [toasts, setToasts] = useState([]);

  // --- Theme state ---
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('watplan-theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('watplan-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // --- Notification preferences state ---
  const [notifPrefs, setNotifPrefs] = useState(defaultNotifPrefs);

  const toggleNotifPref = useCallback((key) => {
    setNotifPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // --- Standard actions ---
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const toggleSavedCourse = useCallback((courseId) => {
    setUser(prev => ({
      ...prev,
      savedCourses: prev.savedCourses.includes(courseId)
        ? prev.savedCourses.filter(id => id !== courseId)
        : [...prev.savedCourses, courseId]
    }));
  }, []);

  const toggleCompare = useCallback((courseId) => {
    setCompareList(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : prev.length < 4 ? [...prev, courseId] : prev
    );
  }, []);

  const toggleWatch = useCallback((courseId, sectionId) => {
    setUser(prev => {
      const isWatching = prev.watchedCourses.some(w => w.courseId === courseId);
      return {
        ...prev,
        watchedCourses: isWatching
          ? prev.watchedCourses.filter(w => w.courseId !== courseId)
          : [...prev.watchedCourses, { courseId, sectionId, alertType: 'seat-open' }]
      };
    });
  }, []);

  const togglePin = useCallback((courseId) => {
    setUser(prev => ({
      ...prev,
      enrolledCourses: prev.enrolledCourses.map(c =>
        c.courseId === courseId ? { ...c, pinned: !c.pinned } : c
      )
    }));
  }, []);

  // --- Enrollment → Schedule sync ---
  const enrollCourse = useCallback((courseId, sectionId) => {
    // Prevent duplicate enrollment
    setUser(prev => {
      if (prev.enrolledCourses.some(e => e.courseId === courseId)) return prev;
      return {
        ...prev,
        enrolledCourses: [...prev.enrolledCourses, { courseId, sectionId, status: 'enrolled', pinned: false }],
        savedCourses: prev.savedCourses.filter(id => id !== courseId),
      };
    });

    // Build new schedule slots from the section
    const newSlots = buildSlotsForCourse(courseId, sectionId);

    // Update schedule slots on user (the single source of truth for the planner)
    setUser(prev => {
      // Guard against duplicates in schedule
      const existingCourseSlots = prev.scheduleSlots.filter(s => s.courseId === courseId);
      if (existingCourseSlots.length > 0) return prev; // already in schedule
      return {
        ...prev,
        scheduleSlots: [...prev.scheduleSlots, ...newSlots],
      };
    });

    // Also update the schedule drafts so the planner view reflects it
    setScheduleDrafts(prev => {
      const updated = [...prev];
      if (updated[0]) {
        // Guard against duplicates
        const alreadyInDraft = updated[0].some(s => s.courseId === courseId);
        if (!alreadyInDraft) {
          updated[0] = [...updated[0], ...newSlots];
        }
      }
      return updated;
    });

    // Check for conflicts and provide accurate toast
    const course = courses.find(c => c.id === courseId);
    const courseName = course ? course.code : 'the course';
    if (newSlots.length > 0) {
      addToast(`You're enrolled in ${courseName}. Your schedule has been updated.`);
    } else {
      addToast(`You're enrolled in ${courseName}. This course keeps your plan on track.`);
    }
  }, [addToast]);

  const dropCourse = useCallback((courseId) => {
    // Remove from enrolled courses
    setUser(prev => ({
      ...prev,
      enrolledCourses: prev.enrolledCourses.filter(c => c.courseId !== courseId),
      // Also remove from schedule slots
      scheduleSlots: prev.scheduleSlots.filter(s => s.courseId !== courseId),
    }));

    // Also update schedule drafts
    setScheduleDrafts(prev => {
      const updated = [...prev];
      if (updated[0]) {
        updated[0] = updated[0].filter(s => s.courseId !== courseId);
      }
      return updated;
    });

    addToast('Course dropped successfully. Your schedule has been updated.', 'info');
  }, [addToast]);

  const markNotificationRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      user, setUser,
      allCourses,
      notifications, setNotifications, markNotificationRead, unreadCount,
      compareList, toggleCompare,
      scheduleDrafts, setScheduleDrafts, activeDraft, setActiveDraft,
      enrollmentQueue, setEnrollmentQueue,
      toggleSavedCourse, toggleWatch, togglePin,
      enrollCourse, dropCourse,
      toasts, addToast,
      theme, toggleTheme, setTheme,
      notifPrefs, toggleNotifPref,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
