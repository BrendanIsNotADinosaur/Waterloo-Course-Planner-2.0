import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Compass, Target, CheckCircle2, AlertTriangle, ArrowRight,
  ChevronRight, Info, Shield, Clock, BookOpen, TrendingUp,
  Lightbulb, GraduationCap, BarChart3, Lock
} from 'lucide-react';

const pathways = [
  { id: 'med', label: 'Medical School', icon: '🏥', supported: true },
  { id: 'grad', label: 'Graduate Studies', icon: '🎓', supported: false },
  { id: 'pubhealth', label: 'Public Health', icon: '🌍', supported: false },
  { id: 'gpa', label: 'GPA Protection', icon: '📊', supported: false },
];

export default function Guidance() {
  const { user } = useApp();
  const [activePathway, setActivePathway] = useState('med');

  const activePathwayData = pathways.find(p => p.id === activePathway);
  const isSupported = activePathwayData?.supported;

  const medRecommendations = [
    {
      type: 'recommended',
      title: 'Complete CHEM 262 in Winter 2027',
      reason: 'Organic Chemistry is required for MCAT preparation. This course is only offered in Winter terms. Delaying beyond Winter 2027 pushes your MCAT timeline to 4A at the earliest.',
      urgency: 'high',
      courseCodes: ['CHEM 262'],
    },
    {
      type: 'recommended',
      title: 'Enroll in HLTH 340 in Fall 2026',
      reason: 'Epidemiology is only offered in Fall and consistently fills to capacity (100% demand). Early enrollment is strongly recommended. This course strengthens your research competency for medical school applications.',
      urgency: 'high',
      courseCodes: ['HLTH 340'],
    },
    {
      type: 'recommended',
      title: 'Complete HLTH 310 in Winter 2027',
      reason: 'Health Research Methods provides graduate-level research preparation. A research proposal from this course can directly support your medical school application. Requires HLTH 204 (currently in progress).',
      urgency: 'medium',
      courseCodes: ['HLTH 310'],
    },
    {
      type: 'suggestion',
      title: 'Consider PSYCH 101 completion for MCAT coverage',
      reason: 'You are currently enrolled in PSYCH 101, which covers key topics in the MCAT Psychological, Social, and Biological Foundations section. Maintaining strong performance here supports both your GPA and MCAT readiness.',
      urgency: 'low',
      courseCodes: ['PSYCH 101'],
    },
    {
      type: 'caution',
      title: 'Monitor workload in 2B term',
      reason: 'If you plan to take CHEM 262 and HLTH 340 in the same academic year, be mindful that both are high-workload courses (4-5/5). Consider balancing with a lighter elective to protect your GPA.',
      urgency: 'medium',
      courseCodes: [],
    },
    {
      type: 'suggestion',
      title: 'Seek research volunteer experience by 2B',
      reason: 'Medical school applications benefit from demonstrated research experience. Consider approaching HLTH 310 instructor for research assistant opportunities after completing the course.',
      urgency: 'low',
      courseCodes: [],
    },
  ];

  const scenarioAnalysis = [
    {
      scenario: 'If you take CHEM 262 in Winter 2027',
      outcome: 'On track for MCAT by Summer 2028. All prerequisite chains remain unbroken. You can continue to 3A with full pathway alignment.',
      status: 'positive',
    },
    {
      scenario: 'If you delay CHEM 262 to Winter 2028',
      outcome: 'MCAT preparation is pushed to Summer 2029. This delays medical school applications by one full year. Your pathway status would change to "At Risk".',
      status: 'negative',
    },
    {
      scenario: 'If you miss HLTH 340 in Fall 2026',
      outcome: 'Your next opportunity is Fall 2027. This does not break your pathway but weakens your application timeline for research experience.',
      status: 'warning',
    },
  ];

  const milestones = user.pathwayProgress;

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Academic Guidance</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Explainable pathway-aware recommendations to help you make informed decisions</p>
      </div>

      {/* Pathway Selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {pathways.map(p => (
          <button
            key={p.id}
            onClick={() => setActivePathway(p.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all relative ${
              activePathway === p.id
                ? 'bg-navy-700 text-white shadow-md'
                : p.supported
                  ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <span>{p.icon}</span>
            {p.label}
            {!p.supported && (
              <span className="text-[9px] font-bold bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded-full ml-1">Coming Soon</span>
            )}
          </button>
        ))}
      </div>

      {/* Unsupported Pathway State */}
      {!isSupported && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-10 text-center mb-6">
          <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{activePathwayData?.label} Guidance</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 max-w-md mx-auto">
            Pathway-specific recommendations for {activePathwayData?.label} are not yet available in this prototype.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-6 max-w-md mx-auto">
            This feature is under development. When launched, it will provide the same depth of explainable guidance —
            milestone tracking, scenario analysis, and course recommendations — tailored specifically to {activePathwayData?.label} goals.
          </p>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
            <Info className="w-3.5 h-3.5" /> Prototype preview — full pathway support coming soon
          </span>
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">In the meantime, explore the fully supported pathway:</p>
            <button
              onClick={() => setActivePathway('med')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-navy-600 dark:text-navy-400 bg-navy-50 dark:bg-navy-900/30 px-4 py-2 rounded-lg hover:bg-navy-100 dark:hover:bg-navy-900/50 transition-colors"
            >
              🏥 View Medical School Pathway <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Supported Pathway Content (Medical School) */}
      {isSupported && (
        <>
          {/* Pathway Status */}
          <div className="bg-gradient-to-r from-navy-800 to-navy-900 rounded-2xl p-6 mb-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-gold-400" />
              <h2 className="text-base font-bold">Medical School Pathway</h2>
              <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full">{milestones.status}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-[10px] text-navy-300 mb-2 font-medium">Completed Milestones</p>
                <div className="space-y-1.5">
                  {milestones.completedMilestones.map((m, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-[11px] text-navy-100">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-navy-300 mb-2 font-medium">Upcoming Milestones</p>
                <div className="space-y-1.5">
                  {milestones.upcomingMilestones.slice(0, 4).map((m, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-navy-400 shrink-0" />
                      <span className="text-[11px] text-navy-200">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full h-2.5 bg-white/10 rounded-full">
              <div className="h-full bg-gold-400 rounded-full" style={{ width: '35%' }} />
            </div>
            <p className="text-[10px] text-navy-400 mt-1">4 of 9 milestones completed · 35%</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recommendations */}
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-gold-500" /> Recommendations
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Each recommendation explains why it matters for your pathway. These are not commands — they are informed suggestions based on your current progress, course availability patterns, and goal alignment.
                </p>

                <div className="space-y-3">
                  {medRecommendations.map((rec, i) => {
                    const colors = {
                      recommended: { bg: 'bg-navy-50/50 dark:bg-navy-900/30', border: 'border-navy-200 dark:border-navy-700', icon: 'text-navy-500', badge: 'bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300' },
                      suggestion: { bg: 'bg-blue-50/30 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', icon: 'text-blue-500', badge: 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300' },
                      caution: { bg: 'bg-amber-50/30 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800', icon: 'text-amber-500', badge: 'bg-amber-100 dark:bg-amber-800 text-amber-700 dark:text-amber-300' },
                    };
                    const c = colors[rec.type];
                    const icons = { recommended: Compass, suggestion: Info, caution: AlertTriangle };
                    const Icon = icons[rec.type];

                    return (
                      <div key={i} className={`rounded-xl border p-4 ${c.bg} ${c.border}`}>
                        <div className="flex items-start gap-3">
                          <Icon className={`w-5 h-5 ${c.icon} shrink-0 mt-0.5`} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{rec.title}</p>
                              <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${c.badge}`}>{rec.type}</span>
                              {rec.urgency !== 'low' && (
                                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                  rec.urgency === 'high' ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400' : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'
                                }`}>{rec.urgency} urgency</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-2">{rec.reason}</p>
                            {rec.courseCodes.length > 0 && (
                              <div className="flex gap-1.5">
                                {rec.courseCodes.map(code => (
                                  <Link
                                    key={code}
                                    to={`/course/${code.toLowerCase().replace(' ', '')}`}
                                    className="text-[10px] font-semibold text-navy-600 dark:text-navy-400 bg-white dark:bg-gray-700 px-2 py-1 rounded border border-navy-200 dark:border-navy-700 hover:bg-navy-50 dark:hover:bg-navy-900/30 transition-colors flex items-center gap-1"
                                  >
                                    {code} <ChevronRight className="w-3 h-3" />
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Scenario Analysis */}
              <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-navy-500" /> Scenario Analysis
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Understand the consequences of different course timing decisions before you commit.
                </p>

                <div className="space-y-3">
                  {scenarioAnalysis.map((s, i) => {
                    const statusColors = {
                      positive: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
                      negative: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
                      warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
                    };
                    const statusIcons = {
                      positive: CheckCircle2,
                      negative: AlertTriangle,
                      warning: Info,
                    };
                    const statusIconColors = {
                      positive: 'text-emerald-500',
                      negative: 'text-red-500',
                      warning: 'text-amber-500',
                    };
                    const Icon = statusIcons[s.status];

                    return (
                      <div key={i} className={`rounded-lg border p-4 ${statusColors[s.status]}`}>
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-1.5">{s.scenario}</p>
                        <div className="flex items-start gap-2">
                          <Icon className={`w-4 h-4 ${statusIconColors[s.status]} shrink-0 mt-0.5`} />
                          <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">{s.outcome}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              {/* Pathway Risks */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-500" /> Pathway Risks
                </h3>
                <div className="space-y-2">
                  {milestones.risks.map((risk, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg border text-xs leading-relaxed ${
                        risk.level === 'warning'
                          ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
                          : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {risk.level === 'warning' ? (
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        ) : (
                          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        )}
                        <span>{risk.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explainability Note */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-gray-400" /> How Guidance Works
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                  Recommendations are generated based on:
                </p>
                <div className="space-y-1.5">
                  {[
                    'Your declared pathway goal (Medical School)',
                    'Current degree progress and completed courses',
                    'Course prerequisite chains and dependencies',
                    'Historical term offering patterns',
                    'Historical seat demand and fill rates',
                    'Workload balance across planned terms',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full shrink-0" />
                      <span className="text-[10px] text-gray-500 dark:text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-3 leading-relaxed">
                  All recommendations include the reasoning behind them. This guidance supports your decision-making — it does not replace academic advisor consultation for formal program requirements.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-2">
                <Link to="/progress" className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <BarChart3 className="w-4 h-4 text-navy-500 dark:text-navy-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">View Full Progress</span>
                  <ArrowRight className="w-3 h-3 text-gray-300 dark:text-gray-500 ml-auto" />
                </Link>
                <Link to="/schedule" className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <BookOpen className="w-4 h-4 text-navy-500 dark:text-navy-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Schedule Builder</span>
                  <ArrowRight className="w-3 h-3 text-gray-300 dark:text-gray-500 ml-auto" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
