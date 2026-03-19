export const userData = {
  name: 'Dhea Denomme',
  studentId: '20845672',
  program: 'Honours Health Sciences',
  faculty: 'Health',
  year: '2A',
  term: 'Winter 2026',
  gpa: 3.7,
  completedCredits: 5.0,
  requiredCredits: 20.0,
  coopSequence: 'Sequence 2',
  declaredGoal: 'Medical School',
  avatar: null,

  enrolledCourses: [
    { courseId: 'hlth204', sectionId: '001', tutorialId: '101', status: 'enrolled', pinned: true },
    { courseId: 'biol239', sectionId: '001', status: 'enrolled', pinned: false },
    { courseId: 'psych101', sectionId: '001', status: 'enrolled', pinned: false },
  ],

  savedCourses: ['chem262', 'hlth340', 'hlth201'],

  watchedCourses: [
    { courseId: 'hlth340', sectionId: '001', alertType: 'seat-open' },
    { courseId: 'chem262', sectionId: '001', alertType: 'reserve-change' },
  ],

  completedCourses: [
    { code: 'HLTH 101', title: 'Introduction to Health Studies', grade: 82, term: 'Fall 2025', credits: 0.5, requirement: 'Core' },
    { code: 'BIOL 130', title: 'Introductory Cell Biology', grade: 75, term: 'Fall 2025', credits: 0.5, requirement: 'Science Breadth' },
    { code: 'CHEM 120', title: 'General Chemistry 1', grade: 71, term: 'Fall 2025', credits: 0.5, requirement: 'Science Breadth' },
    { code: 'CHEM 123', title: 'General Chemistry Laboratory', grade: 78, term: 'Fall 2025', credits: 0.25, requirement: 'Lab Requirement' },
    { code: 'ENGL 109', title: 'Introduction to Academic Writing', grade: 80, term: 'Fall 2025', credits: 0.5, requirement: 'Communication' },
    { code: 'HLTH 102', title: 'Health in a Global Context', grade: 85, term: 'Fall 2025', credits: 0.5, requirement: 'Core' },
    { code: 'MATH 127', title: 'Calculus 1 for Sciences', grade: 68, term: 'Fall 2025', credits: 0.5, requirement: 'Quantitative Reasoning' },
    { code: 'REC 100', title: 'Leisure and Community Health', grade: 77, term: 'Fall 2025', credits: 0.5, requirement: 'Elective' },
    { code: 'SCI 238', title: 'Introductory Astronomy', grade: 83, term: 'Winter 2026', credits: 0.5, requirement: 'Science Breadth' },
    { code: 'HLTH 220', title: 'Fundamentals of Nutrition', grade: 79, term: 'Winter 2026', credits: 0.5, requirement: 'Core' },
  ],

  requirements: {
    core: { completed: 4, required: 10, courses: ['HLTH 101', 'HLTH 102', 'HLTH 220', 'HLTH 204'] },
    scienceBreadth: { completed: 3, required: 4, courses: ['BIOL 130', 'CHEM 120', 'SCI 238'] },
    quantitative: { completed: 2, required: 2, courses: ['MATH 127', 'HLTH 204'] },
    communication: { completed: 1, required: 2, courses: ['ENGL 109'] },
    labRequirement: { completed: 1, required: 2, courses: ['CHEM 123'] },
    electives: { completed: 1, required: 6, courses: ['REC 100'] },
    researchMethods: { completed: 0, required: 2, courses: [] },
  },

  pathwayProgress: {
    goal: 'Medical School',
    status: 'On Track',
    completedMilestones: [
      'Completed introductory biology (BIOL 130)',
      'Completed general chemistry (CHEM 120/123)',
      'Enrolled in biostatistics (HLTH 204)',
      'Enrolled in genetics (BIOL 239)',
    ],
    upcomingMilestones: [
      'Complete organic chemistry (CHEM 262) — Required, winter-only offering',
      'Complete epidemiology (HLTH 340) — Recommended, fall-only, fills fast',
      'Complete research methods (HLTH 310) — Required for grad applications',
      'Take MCAT preparation courses by end of 3A',
      'Secure research volunteer position by 2B',
    ],
    risks: [
      { level: 'warning', message: 'CHEM 262 is only offered in Winter. Missing it this year delays your timeline by one full year.' },
      { level: 'info', message: 'HLTH 340 consistently fills to capacity. Early enrollment is strongly recommended for Fall 2026.' },
    ],
  },

  scheduleSlots: [
    { day: 'Mon', start: '10:00', end: '11:20', courseId: 'hlth204', type: 'LEC' },
    { day: 'Wed', start: '10:00', end: '11:20', courseId: 'hlth204', type: 'LEC' },
    { day: 'Fri', start: '13:30', end: '14:20', courseId: 'hlth204', type: 'TUT' },
    { day: 'Mon', start: '13:00', end: '13:50', courseId: 'biol239', type: 'LEC' },
    { day: 'Wed', start: '13:00', end: '13:50', courseId: 'biol239', type: 'LEC' },
    { day: 'Fri', start: '11:30', end: '12:20', courseId: 'biol239', type: 'LEC' },
    { day: 'Tue', start: '10:00', end: '11:20', courseId: 'psych101', type: 'LEC' },
    { day: 'Thu', start: '10:00', end: '11:20', courseId: 'psych101', type: 'LEC' },
  ],
};
