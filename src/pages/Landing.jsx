import { Link } from 'react-router-dom';
import {
  ShieldCheck, Search, CalendarDays, Bell, Compass, BarChart3,
  ArrowRight, CheckCircle2, TrendingUp, BookOpen, Zap
} from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Rich Course Intelligence',
    desc: 'Detailed course profiles with workload ratings, student insights, assessment breakdowns, and historical demand — all in one place.',
  },
  {
    icon: Compass,
    title: 'Pathway-Aware Guidance',
    desc: 'Understand how each course choice affects your future terms, prerequisites, and long-term academic goals with explainable recommendations.',
  },
  {
    icon: CalendarDays,
    title: 'Safe Schedule Builder',
    desc: 'Plan your schedule visually, detect conflicts instantly, pin important courses, and test alternatives without fear of losing secured spots.',
  },
  {
    icon: Bell,
    title: 'Real-Time Seat Monitoring',
    desc: 'Get instant alerts when seats open, reserves change, or waitlists move. Stop refreshing Quest manually.',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    desc: 'See exactly where you stand on degree requirements, prerequisite chains, and critical timelines at a glance.',
  },
  {
    icon: BookOpen,
    title: 'Confident Enrollment',
    desc: 'Enroll with clear outcome messaging, protected courses, and actionable next steps after every action.',
  },
];

const comparisons = [
  { label: 'Course research', old: 'Reddit, Discord, RateMyProf', now: 'Built-in structured insights' },
  { label: 'Seat monitoring', old: 'Manual Quest refreshing', now: 'Automatic real-time alerts' },
  { label: 'Planning impact', old: 'Guessing future conflicts', now: 'Explainable pathway analysis' },
  { label: 'Schedule building', old: 'Fragile, error-prone', now: 'Safe, visual, reversible' },
  { label: 'Enrollment errors', old: 'Cryptic error codes', now: 'Clear explanations + next steps' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-navy-900 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h1 className="text-base font-bold text-navy-900">WatPlan</h1>
              <p className="text-[10px] text-gray-400">University of Waterloo</p>
            </div>
          </div>
          <Link
            to="/dashboard"
            className="bg-navy-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-900 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <Zap className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-xs font-medium text-gold-200">Reimagining academic course planning</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Course selection should feel like
              <span className="text-gold-400"> planning</span>, not
              <span className="text-gold-400"> gambling</span>.
            </h2>

            <p className="text-lg text-navy-200 leading-relaxed mb-8 max-w-xl">
              WatPlan transforms course enrollment from a stressful, fragmented transaction into a guided academic decision-making experience. Built for Waterloo students who want confidence, not just access.
            </p>

            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-gold-500 text-navy-950 px-6 py-3 rounded-xl text-sm font-bold hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20"
              >
                Enter WatPlan <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Explore Courses
              </Link>
            </div>
          </div>

          {/* Dashboard Preview Card */}
          <div className="hidden lg:block absolute right-6 top-16 w-96 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-navy-400 to-navy-600 flex items-center justify-center text-white text-[10px] font-bold">DR</div>
              <div>
                <p className="text-xs font-medium text-white">Dhea Denomme</p>
                <p className="text-[10px] text-navy-300">Health Sciences · 2A</p>
              </div>
              <span className="ml-auto text-[10px] font-medium bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">On Track</span>
            </div>

            <div className="space-y-2.5">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[10px] text-navy-300 mb-1">Current Term</p>
                <p className="text-xs text-white font-medium">3 courses enrolled · 1.5 credits</p>
                <div className="flex gap-1 mt-2">
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">HLTH 204</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">BIOL 239</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">PSYCH 101</span>
                </div>
              </div>
              <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/20">
                <div className="flex items-center gap-1.5">
                  <Bell className="w-3 h-3 text-amber-400" />
                  <p className="text-[10px] text-amber-300 font-medium">1 seat opened in HLTH 340</p>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[10px] text-navy-300 mb-1">Pathway: Medical School</p>
                <div className="w-full h-1.5 bg-white/10 rounded-full">
                  <div className="h-full bg-gold-400 rounded-full" style={{ width: '35%' }} />
                </div>
                <p className="text-[10px] text-navy-400 mt-1">35% milestones completed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quest Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">Why WatPlan over Quest?</h3>
          <p className="text-sm text-gray-500 text-center mb-10">A direct comparison of how course planning changes</p>

          <div className="space-y-3">
            {comparisons.map((c, i) => (
              <div key={i} className="flex items-center bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="w-40 shrink-0 px-4 py-3 bg-gray-50 border-r border-gray-100">
                  <p className="text-xs font-semibold text-gray-700">{c.label}</p>
                </div>
                <div className="flex-1 px-4 py-3 flex items-center gap-2">
                  <span className="text-red-400 text-xs">✕</span>
                  <p className="text-xs text-gray-500">{c.old}</p>
                </div>
                <div className="w-px h-8 bg-gray-100" />
                <div className="flex-1 px-4 py-3 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <p className="text-xs text-gray-800 font-medium">{c.now}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">Everything you need to plan with confidence</h3>
          <p className="text-sm text-gray-500 text-center mb-12 max-w-lg mx-auto">
            WatPlan consolidates course research, schedule building, enrollment, and academic guidance into one coherent platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all">
                  <div className="w-10 h-10 bg-navy-50 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-navy-600" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">{f.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-950">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Ready to plan smarter?</h3>
          <p className="text-sm text-navy-300 mb-8">
            Join Waterloo students who are making informed academic decisions with confidence.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-gold-500 text-navy-950 px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-gold-400 transition-colors"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-navy-400" />
            <span className="text-xs text-gray-400">WatPlan · University of Waterloo</span>
          </div>
          <p className="text-xs text-gray-400">Academic Planning Platform Prototype</p>
        </div>
      </footer>
    </div>
  );
}
