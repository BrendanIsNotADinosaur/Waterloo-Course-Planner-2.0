import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { courses } from '../data/courses';
import {
  BarChart3, CheckCircle2, Clock, AlertTriangle, ArrowRight,
  ChevronRight, Target, BookOpen, GraduationCap
} from 'lucide-react';

export default function Progress() {
  const { user } = useApp();

  const requirementList = [
    { key: 'core', label: 'Core Requirements', icon: BookOpen, color: 'navy' },
    { key: 'scienceBreadth', label: 'Science Breadth', icon: Target, color: 'emerald' },
    { key: 'quantitative', label: 'Quantitative Reasoning', icon: BarChart3, color: 'blue' },
    { key: 'communication', label: 'Communication', icon: GraduationCap, color: 'purple' },
    { key: 'labRequirement', label: 'Lab Requirement', icon: Target, color: 'amber' },
    { key: 'electives', label: 'Electives', icon: BookOpen, color: 'gray' },
    { key: 'researchMethods', label: 'Research Methods', icon: BarChart3, color: 'teal' },
  ];

  const colorMap = {
    navy: { bg: 'bg-navy-50', border: 'border-navy-200', bar: 'bg-navy-500', text: 'text-navy-700', icon: 'text-navy-500' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', bar: 'bg-emerald-500', text: 'text-emerald-700', icon: 'text-emerald-500' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', bar: 'bg-blue-500', text: 'text-blue-700', icon: 'text-blue-500' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', bar: 'bg-purple-500', text: 'text-purple-700', icon: 'text-purple-500' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', bar: 'bg-amber-500', text: 'text-amber-700', icon: 'text-amber-500' },
    gray: { bg: 'bg-gray-50', border: 'border-gray-200', bar: 'bg-gray-500', text: 'text-gray-700', icon: 'text-gray-500' },
    teal: { bg: 'bg-teal-50', border: 'border-teal-200', bar: 'bg-teal-500', text: 'text-teal-700', icon: 'text-teal-500' },
  };

  const prereqChains = [
    {
      label: 'Epidemiology Chain',
      steps: [
        { code: 'HLTH 101', status: 'completed' },
        { code: 'HLTH 204', status: 'in-progress' },
        { code: 'HLTH 340', status: 'planned' },
      ],
      note: 'HLTH 340 is only offered in Fall. Plan to take it Fall 2026.',
    },
    {
      label: 'Organic Chemistry Chain',
      steps: [
        { code: 'CHEM 120', status: 'completed' },
        { code: 'CHEM 123', status: 'completed' },
        { code: 'CHEM 262', status: 'planned' },
      ],
      note: 'CHEM 262 is only offered in Winter. Next opportunity: Winter 2027.',
    },
    {
      label: 'Genetics Chain',
      steps: [
        { code: 'BIOL 130', status: 'completed' },
        { code: 'BIOL 239', status: 'in-progress' },
      ],
      note: 'On track. Consider advanced biology electives after completing BIOL 239.',
    },
    {
      label: 'Research Methods Chain',
      steps: [
        { code: 'HLTH 204', status: 'in-progress' },
        { code: 'HLTH 310', status: 'planned' },
      ],
      note: 'HLTH 310 is only offered in Winter. Ensure HLTH 204 is completed first.',
    },
  ];

  const criticalCourses = [
    { code: 'CHEM 262', title: 'Organic Chemistry', urgency: 'high', reason: 'Winter-only offering. Critical for Medical School pathway and MCAT prep. Missing Winter 2027 delays timeline by one year.' },
    { code: 'HLTH 340', title: 'Epidemiology', urgency: 'high', reason: 'Fall-only offering with limited seats (80). Always fills to capacity. Essential for Public Health and grad school applications.' },
    { code: 'HLTH 310', title: 'Health Research Methods', urgency: 'medium', reason: 'Winter-only offering. Required for graduate school applications. Prerequisite: HLTH 204 (in progress).' },
  ];

  const totalReqs = requirementList.reduce((sum, r) => sum + user.requirements[r.key].required, 0);
  const completedReqs = requirementList.reduce((sum, r) => sum + user.requirements[r.key].completed, 0);

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Progress & Requirements</h1>
        <p className="text-sm text-gray-500">Track your degree completion, prerequisite chains, and critical courses</p>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Overall Degree Progress</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">{user.completedCredits}</span>
              <span className="text-sm text-gray-400">/ {user.requiredCredits} credits</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-navy-500 to-navy-400 rounded-full transition-all" style={{ width: `${(user.completedCredits / user.requiredCredits) * 100}%` }} />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">{Math.round((user.completedCredits / user.requiredCredits) * 100)}% complete · {user.requiredCredits - user.completedCredits} credits remaining</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Requirements */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Requirement Categories</h2>
            <div className="space-y-4">
              {requirementList.map(({ key, label, icon: Icon, color }) => {
                const req = user.requirements[key];
                const pct = (req.completed / req.required) * 100;
                const c = colorMap[color];
                const isComplete = pct >= 100;

                return (
                  <div key={key} className={`rounded-lg border p-4 ${isComplete ? 'bg-emerald-50/30 border-emerald-200' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${isComplete ? 'text-emerald-500' : c.icon}`} />
                        <span className="text-sm font-semibold text-gray-800">{label}</span>
                        {isComplete && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      </div>
                      <span className="text-xs font-medium text-gray-500">{req.completed} / {req.required}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full mb-2">
                      <div className={`h-full rounded-full transition-all ${isComplete ? 'bg-emerald-500' : c.bar}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                    </div>
                    {req.courses.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {req.courses.map(code => (
                          <span key={code} className="text-[9px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{code}</span>
                        ))}
                      </div>
                    )}
                    {req.completed < req.required && (
                      <p className="text-[10px] text-gray-400 mt-1">{req.required - req.completed} more needed</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Prerequisite Chains */}
          <section className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Prerequisite Chains</h2>
            <div className="space-y-4">
              {prereqChains.map((chain, idx) => (
                <div key={idx} className="border border-gray-100 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-700 mb-3">{chain.label}</p>
                  <div className="flex items-center gap-1 mb-2 flex-wrap">
                    {chain.steps.map((step, i) => (
                      <div key={step.code} className="flex items-center gap-1">
                        <span className={`text-[10px] font-bold px-2.5 py-1.5 rounded-md ${
                          step.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                          step.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {step.status === 'completed' && <span className="mr-1">&#10003;</span>}
                          {step.code}
                        </span>
                        {i < chain.steps.length - 1 && <ChevronRight className="w-3 h-3 text-gray-300" />}
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{chain.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Completed Courses Table */}
          <section className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Completed Courses</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 font-semibold text-gray-500">Course</th>
                    <th className="text-left py-2 font-semibold text-gray-500">Term</th>
                    <th className="text-left py-2 font-semibold text-gray-500">Requirement</th>
                    <th className="text-right py-2 font-semibold text-gray-500">Grade</th>
                    <th className="text-right py-2 font-semibold text-gray-500">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {user.completedCourses.map((c, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-2.5">
                        <span className="font-bold text-navy-600">{c.code}</span>
                        <p className="text-gray-400 text-[10px]">{c.title}</p>
                      </td>
                      <td className="py-2.5 text-gray-600">{c.term}</td>
                      <td className="py-2.5">
                        <span className="text-[9px] font-medium text-gold-700 bg-gold-50 px-1.5 py-0.5 rounded">{c.requirement}</span>
                      </td>
                      <td className="py-2.5 text-right font-medium text-gray-800">{c.grade}%</td>
                      <td className="py-2.5 text-right text-gray-600">{c.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Critical Courses */}
          <section className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Critical Upcoming Courses
            </h2>
            <div className="space-y-3">
              {criticalCourses.map(c => (
                <div key={c.code} className={`rounded-lg border p-3 ${c.urgency === 'high' ? 'border-amber-200 bg-amber-50/30' : 'border-gray-200'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-navy-700">{c.code}</span>
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${c.urgency === 'high' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                      {c.urgency}
                    </span>
                  </div>
                  <p className="text-[10px] font-medium text-gray-700">{c.title}</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed mt-1">{c.reason}</p>
                  <Link to={`/course/${c.code.toLowerCase().replace(' ', '')}`} className="inline-flex items-center gap-1 mt-2 text-[10px] font-semibold text-navy-600 hover:text-navy-800">
                    View Course <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* GPA Summary */}
          <section className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Academic Standing</h2>
            <div className="text-center mb-4">
              <p className="text-3xl font-bold text-gray-900">{user.gpa}</p>
              <p className="text-[10px] text-gray-500">Cumulative GPA</p>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(user.gpa / 4.0) * 100}%` }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-gray-400">0.0</span>
              <span className="text-[9px] text-gray-400">4.0</span>
            </div>
          </section>

          {/* Pathway Link */}
          <Link
            to="/guidance"
            className="block bg-gradient-to-br from-navy-50 to-white rounded-xl border border-navy-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-navy-500" />
              <span className="text-sm font-semibold text-navy-800">Pathway Guidance</span>
            </div>
            <p className="text-[11px] text-navy-600 leading-relaxed mb-2">
              See how your progress maps to your Medical School pathway goals.
            </p>
            <span className="text-[10px] font-semibold text-navy-700 flex items-center gap-1">
              View Guidance <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
