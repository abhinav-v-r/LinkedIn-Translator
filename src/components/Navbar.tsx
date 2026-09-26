import React from 'react';
import { Sparkles, Briefcase, History, TrendingUp, RefreshCw } from 'lucide-react';
import { TranslationDirection } from '../types';

interface NavbarProps {
  direction: TranslationDirection;
  onDirectionChange: (dir: TranslationDirection) => void;
  onOpenHistory: () => void;
  historyCount: number;
  onScrollToTranslator: () => void;
  onScrollToStats: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  direction,
  onDirectionChange,
  onOpenHistory,
  historyCount,
  onScrollToTranslator,
  onScrollToStats,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand */}
        <div 
          onClick={onScrollToTranslator}
          className="flex cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
            <Briefcase className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-lg font-bold tracking-tight text-slate-900">
                LinkedIn Translator
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                ™
              </span>
            </div>
            <p className="hidden text-[11px] font-medium text-slate-500 sm:block">
              Say it like a normal person. We’ll make it LinkedIn.
            </p>
          </div>
        </div>

        {/* Center mode switcher */}
        <div className="hidden md:flex items-center rounded-full bg-slate-100 p-1 border border-slate-200/70">
          <button
            type="button"
            onClick={() => onDirectionChange('reality_to_linkedin')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              direction === 'reality_to_linkedin'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Reality → LinkedIn™</span>
          </button>
          <button
            type="button"
            onClick={() => onDirectionChange('linkedin_to_human')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              direction === 'linkedin_to_human'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>LinkedIn → Human™</span>
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onScrollToStats}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <TrendingUp className="h-3.5 w-3.5 text-slate-500" />
            <span>Impact Stats</span>
          </button>

          <button
            type="button"
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            aria-label="View history"
          >
            <History className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
