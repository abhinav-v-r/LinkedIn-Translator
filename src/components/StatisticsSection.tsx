import React from 'react';
import { TrendingUp, Award, Zap, Users, Infinity as InfinityIcon } from 'lucide-react';

interface StatisticsSectionProps {
  userReframesCount: number;
}

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  userReframesCount,
}) => {
  const totalReframed = 1337 + userReframesCount;
  const totalBuzzwords = 34890 + userReframesCount * 14;

  const stats = [
    {
      label: 'Problems Successfully Reframed',
      value: totalReframed.toLocaleString(),
      subtext: 'Minor disasters turned into growth chapters',
      icon: TrendingUp,
      color: 'text-blue-600',
    },
    {
      label: 'Opportunities Discovered in Normal Situations',
      value: '∞',
      subtext: 'Statistically infinite silver linings',
      icon: InfinityIcon,
      color: 'text-indigo-600',
    },
    {
      label: 'Corporate Buzzwords Injected',
      value: totalBuzzwords.toLocaleString(),
      subtext: 'High-density synergistic vocabularies',
      icon: Zap,
      color: 'text-amber-500',
    },
    {
      label: 'Recruiters Currently Confused',
      value: '9,204',
      subtext: 'Unsure whether you got fired or founded a startup',
      icon: Users,
      color: 'text-rose-500',
    },
  ];

  return (
    <section id="statistics-section" className="py-16 border-t border-slate-200/80 bg-slate-50/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 mb-2 border border-blue-100">
            <Award className="h-3.5 w-3.5" />
            <span>Q3 Paradigm Metrics</span>
          </div>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Synergy by the numbers.
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Our proprietary spin engine has rescued thousands of everyday humans from the tragic indignity of plain honesty.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition-all hover:border-slate-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {stat.label}
                  </span>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div className="font-heading text-3xl font-extrabold tracking-tight text-slate-900">
                  {stat.value}
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Humorous Testimonial Ticker */}
        <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center max-w-3xl mx-auto">
          <p className="text-sm italic text-slate-700 font-medium leading-relaxed">
            “I accidentally dropped an entire birthday cake down the stairs. Within 12 seconds, LinkedIn Translator helped me announce a ‘high-impact vertical dessert stress test designed to foster organizational resilience.’ My network applauded my agility.”
          </p>
          <div className="mt-2 text-xs font-semibold text-slate-500">
            — Anonymous Director of Narrative Optimization
          </div>
        </div>
      </div>
    </section>
  );
};
