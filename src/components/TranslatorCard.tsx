import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
  Sliders,
  RotateCcw,
  Zap,
  AlertCircle,
  Dices,
} from 'lucide-react';
import { ModeSelector } from './ModeSelector';
import { BullshitSlider } from './BullshitSlider';
import { Randomizer } from './Randomizer';
import {
  HUMAN_PROMPT_PRESETS,
  CORPORATE_PROMPT_PRESETS,
  LOADING_MESSAGES,
} from '../data/constants';
import { TranslationDirection, TranslationMode } from '../types';

interface TranslatorCardProps {
  inputText: string;
  onInputChange: (text: string) => void;
  direction: TranslationDirection;
  onDirectionChange: (dir: TranslationDirection) => void;
  mode: TranslationMode;
  onModeChange: (mode: TranslationMode) => void;
  bullshitLevel: number;
  onBullshitLevelChange: (val: number) => void;
  onSubmit: () => void;
  isLoading: boolean;
  errorMessage: string | null;
  onClearError: () => void;
}

export const TranslatorCard: React.FC<TranslatorCardProps> = ({
  inputText,
  onInputChange,
  direction,
  onDirectionChange,
  mode,
  onModeChange,
  bullshitLevel,
  onBullshitLevelChange,
  onSubmit,
  isLoading,
  errorMessage,
  onClearError,
}) => {
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isReverse = direction === 'linkedin_to_human';

  // Cycle loading messages during API call
  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setLoadingMessageIndex(0);
      interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 1600);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSelectPreset = (preset: string) => {
    onInputChange(preset);
    onClearError();
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleRandomSelect = (problem: string, autoSubmit?: boolean) => {
    onInputChange(problem);
    onClearError();
    if (autoSubmit) {
      setTimeout(() => {
        onSubmit();
      }, 150);
    }
  };

  const presets = isReverse ? CORPORATE_PROMPT_PRESETS : HUMAN_PROMPT_PRESETS;

  return (
    <div
      id="translator-card"
      className="w-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 transition-all"
    >
      {/* Top Header & Direction Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
              {isReverse ? 'LinkedIn → Human™' : 'Reality → LinkedIn™'}
            </h2>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-100">
              {isReverse ? 'Decoder Active' : 'Professionalizer'}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {isReverse
              ? 'Paste unbearable corporate fluff to reveal what actually happened.'
              : 'Tell us what actually happened. We’ll turn it into a career milestone.'}
          </p>
        </div>

        {/* Direction Switch Tab */}
        <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200/80 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onDirectionChange('reality_to_linkedin')}
            disabled={isLoading}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              !isReverse
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Reality → LinkedIn
          </button>
          <button
            type="button"
            onClick={() => onDirectionChange('linkedin_to_human')}
            disabled={isLoading}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              isReverse
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            LinkedIn → Human
          </button>
        </div>
      </div>

      {/* Input Text Area Container */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between">
          <label
            htmlFor="translator-input"
            className="text-xs font-bold uppercase tracking-wider text-slate-700"
          >
            {isReverse ? 'Corporate Input' : 'Raw Reality'}
          </label>
          <span className="text-[11px] font-mono text-slate-600">
            {inputText.length} / 2000 chars
          </span>
        </div>

        <div className="relative">
          <textarea
            id="translator-input"
            ref={textareaRef}
            rows={4}
            value={inputText}
            onChange={(e) => {
              onInputChange(e.target.value);
              if (errorMessage) onClearError();
            }}
            disabled={isLoading}
            placeholder={
              isReverse
                ? 'e.g., "I’m excited to announce that I’m embracing a new chapter after an unexpected organizational transition..."'
                : 'e.g., "I got rejected from 15 internships..." or "I slept through my morning meeting..."'
            }
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/40 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10 transition-all leading-relaxed"
          />

          {inputText && (
            <button
              type="button"
              onClick={() => onInputChange('')}
              className="absolute right-3 top-3 text-xs font-medium text-slate-600 hover:text-slate-600 rounded bg-white/80 px-1.5 py-0.5 border border-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Presets & Randomizer */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-semibold text-slate-600 mr-1">
            Try:
          </span>
          {presets.slice(0, 6).map((preset) => (
            <button
              key={preset}
              type="button"
              disabled={isLoading}
              onClick={() => handleSelectPreset(preset)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              “{preset.length > 30 ? preset.slice(0, 30) + '...' : preset}”
            </button>
          ))}
          {!isReverse && (
            <Randomizer onSelectProblem={handleRandomSelect} disabled={isLoading} />
          )}
        </div>
      </div>

      {/* Settings Grid (Only shown in Reality -> LinkedIn mode) */}
      {!isReverse && (
        <div className="mt-6 space-y-6 pt-6 border-t border-slate-100">
          {/* Corporate Bullshit Level Slider */}
          <BullshitSlider
            value={bullshitLevel}
            onChange={onBullshitLevelChange}
            disabled={isLoading}
          />

          {/* Persona Mode Selector */}
          <ModeSelector
            selectedMode={mode}
            onChange={onModeChange}
            disabled={isLoading}
          />
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800 flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">{errorMessage}</p>
            <p className="mt-0.5 text-rose-700">
              Try rephrasing, or verify that your internet connection and API systems are aligned with our synergistic vision.
            </p>
          </div>
          <button
            type="button"
            onClick={onClearError}
            className="text-rose-600 hover:text-rose-800 font-bold ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-xs text-slate-600">
          {isLoading ? (
            <div className="flex items-center gap-2 text-blue-600 font-semibold animate-pulse">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              <span>{LOADING_MESSAGES[loadingMessageIndex]}</span>
            </div>
          ) : (
            <span>
              {isReverse
                ? 'Reverses spin into blunt reality.'
                : '100% Satirical. 0% Actual career advice.'}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={isLoading || !inputText.trim()}
          onClick={onSubmit}
          className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-sm transition-all ${
            isLoading || !inputText.trim()
              ? 'bg-slate-300 cursor-not-allowed opacity-60'
              : 'bg-slate-950 hover:bg-slate-800 hover:shadow-md active:scale-[0.99] cursor-pointer'
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin text-white" />
              <span>Reframing Reality...</span>
            </>
          ) : (
            <>
              <span>{isReverse ? 'Decode Reality 🔍' : 'Professionalize This 🚀'}</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
