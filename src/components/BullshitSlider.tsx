import React from 'react';
import { Flame, Sparkles, AlertTriangle } from 'lucide-react';
import { getBullshitLabel, BULLSHIT_LEVEL_LABELS } from '../data/constants';

interface BullshitSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const BullshitSlider: React.FC<BullshitSliderProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const currentLabel = getBullshitLabel(value);

  // Dynamic color depending on intensity
  const getIntensityColor = () => {
    if (value <= 25) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (value <= 50) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (value <= 75) return 'text-indigo-600 bg-indigo-50 border-indigo-200';
    if (value <= 90) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200 animate-pulse';
  };

  const getTrackGradient = () => {
    return `linear-gradient(to right, #10b981 0%, #3b82f6 25%, #6366f1 50%, #f59e0b 75%, #ef4444 100%)`;
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200/90 bg-slate-50/60 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <label htmlFor="bullshit-slider" className="font-heading text-xs font-bold uppercase tracking-wider text-slate-800">
            Corporate Bullshit Level™
          </label>
          <span className="text-[10px] text-slate-600">
            (1 → 100)
          </span>
        </div>

        <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 border text-xs font-bold ${getIntensityColor()}`}>
          {value >= 90 ? (
            <Flame className="h-3.5 w-3.5" />
          ) : (
            <Sparkles className="h-3.5 w-3.5" />
          )}
          <span>{value}% — {currentLabel}</span>
        </div>
      </div>

      {/* Slider input */}
      <div className="relative py-2">
        <input
          id="bullshit-slider"
          type="range"
          min="1"
          max="100"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2.5 rounded-lg appearance-none cursor-pointer bg-slate-200 accent-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          style={{
            background: getTrackGradient(),
          }}
        />
      </div>

      {/* Milestone tick buttons */}
      <div className="mt-2 flex justify-between text-[11px] font-medium text-slate-500 px-0.5">
        {[1, 25, 50, 75, 100].map((level) => (
          <button
            key={level}
            type="button"
            disabled={disabled}
            onClick={() => onChange(level)}
            className={`transition-colors hover:text-slate-900 ${
              value === level ? 'font-bold text-slate-950 underline underline-offset-2' : ''
            }`}
          >
            {BULLSHIT_LEVEL_LABELS[level]}
          </button>
        ))}
      </div>

      {/* Dynamic subtitle microcopy */}
      <p className="mt-3 text-[11px] leading-relaxed text-slate-500 italic">
        {value <= 20 && "Mild corporate etiquette. Your friends might still recognize you as a normal human."}
        {value > 20 && value <= 40 && "Standard workplace polish. Perfect for annual performance self-evaluations."}
        {value > 40 && value <= 65 && "Authentic LinkedIn energy. Expect 37 comments saying 'Congratulations! Great share!'"}
        {value > 65 && value <= 85 && "Thought leader territory. People will wonder if you sleep or just generate synergies."}
        {value > 85 && "🚨 Warning: Level 100 includes 'cross-functional paradigms', 'strategic recalibration', and existential gratitude."}
      </p>
    </div>
  );
};
