import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowRight, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { HERO_EXAMPLES } from '../data/constants';

interface HeroProps {
  onTranslateClick: () => void;
  onSelectExample?: (humanText: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onTranslateClick, onSelectExample }) => {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setExampleIndex((prev) => (prev + 1) % HERO_EXAMPLES.length);
        setIsFading(false);
      }, 350);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const currentExample = HERO_EXAMPLES[exampleIndex];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Background aesthetic gradient accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-40">
        <div className="h-[420px] w-[580px] rounded-full bg-gradient-to-tr from-blue-200/50 via-indigo-100/40 to-transparent blur-3xl" />
        <div className="h-[300px] w-[400px] -translate-y-20 translate-x-32 rounded-full bg-gradient-to-br from-amber-100/40 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Satire Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1.5 shadow-2xs backdrop-blur-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            🚨 PROFESSIONALIZING REALITY SINCE 2026
          </span>
        </div>

        {/* Large Heading */}
        <h1 className="font-heading mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl sm:leading-[1.1]">
          Turn your problems <br className="hidden sm:inline" />
          into <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">LinkedIn posts.</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl text-lg font-normal text-slate-600 sm:text-xl sm:leading-relaxed">
          Say it like a normal person. <br className="sm:hidden" />
          We’ll make it sound like a career milestone.
        </p>

        {/* Primary CTA */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          <button
            type="button"
            onClick={onTranslateClick}
            className="group relative inline-flex items-center gap-2.5 rounded-xl bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-800 hover:shadow-lg active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>Translate My Life</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <span className="text-xs font-medium text-slate-600">
            No recruiters were harmed in the making of this app.
          </span>
        </div>

        {/* Animated Comparison Showcase */}
        <div className="mt-12 text-left">
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-7">
            {/* Header with pill indicators */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Paradigm Showcase</span>
                <span className="text-slate-300">·</span>
                <span className="font-mono text-[11px] text-slate-600">{currentExample.category}</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                {HERO_EXAMPLES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setExampleIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === exampleIndex ? 'w-6 bg-slate-900' : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`View example ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Content Transition */}
            <div className={`transition-opacity duration-300 ${isFading ? 'opacity-20' : 'opacity-100'}`}>
              {/* Normal Human Input */}
              <div className="mt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500">
                  NORMAL HUMAN:
                </span>
                <p className="mt-1 text-base font-semibold text-slate-900">
                  “{currentExample.human}”
                </p>
              </div>

              {/* Animated Arrow */}
              <div className="my-3.5 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
                </div>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              {/* LinkedIn Human Output */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  LINKEDIN HUMAN™:
                </span>
                <p className="mt-1 text-sm leading-relaxed text-slate-700 italic bg-blue-50/40 p-3.5 rounded-xl border border-blue-100/60 font-normal">
                  “{currentExample.corporate}”
                </p>
              </div>
            </div>

            {/* Quick try button */}
            {onSelectExample && (
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => onSelectExample(currentExample.human)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
                >
                  Try this prompt in translator →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
