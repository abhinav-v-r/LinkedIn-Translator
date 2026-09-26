import React from 'react';
import { TranslationMode } from '../types';
import { MODES } from '../data/constants';

interface ModeSelectorProps {
  selectedMode: TranslationMode;
  onChange: (mode: TranslationMode) => void;
  disabled?: boolean;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  selectedMode,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Translation Persona / Mode
        </label>
        <span className="text-[11px] font-medium text-slate-600">
          Select tone & absurdity
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {MODES.map((mode) => {
          const isSelected = selectedMode === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(mode.id)}
              className={`group relative flex flex-col items-start rounded-xl p-3 text-left transition-all border ${
                isSelected
                  ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 text-slate-900'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex w-full items-center justify-between gap-1 mb-1">
                <span className={`text-xs font-bold tracking-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {mode.label}
                </span>
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-slate-800 text-blue-200' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {mode.badge}
                </span>
              </div>
              <p
                className={`text-[11px] line-clamp-2 leading-tight ${
                  isSelected ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                {mode.tagline}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
