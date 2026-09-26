import React, { useState } from 'react';
import {
  Copy,
  Check,
  RotateCw,
  Share2,
  Flame,
  ShieldCheck,
  Scissors,
  Hash,
  Globe,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  Sparkles,
} from 'lucide-react';
import { TranslationDirection, TranslationModifier } from '../types';

interface OutputCardProps {
  output: string;
  originalInput: string;
  direction: TranslationDirection;
  mode: string;
  bullshitLevel: number;
  isLoading: boolean;
  onRegenerate: () => void;
  onApplyModifier: (mod: TranslationModifier) => void;
  onOpenShareModal: () => void;
}

export const OutputCard: React.FC<OutputCardProps> = ({
  output,
  originalInput,
  direction,
  mode,
  bullshitLevel,
  isLoading,
  onRegenerate,
  onApplyModifier,
  onOpenShareModal,
}) => {
  const [copied, setCopied] = useState(false);
  const isReverse = direction === 'linkedin_to_human';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2800);
  };

  const characterCount = output.length;
  const wordCount = output.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="w-full rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden transition-all">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900">
            {isReverse ? 'Your Reality Check™' : 'Your LinkedIn Version™'}
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500 font-medium">
            {characterCount} chars / {wordCount} words
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenShareModal}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <Share2 className="h-3.5 w-3.5 text-blue-600" />
            <span>Share the joke</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold shadow-2xs transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-950 text-white hover:bg-slate-800'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied! ✓</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Post</span>
              </>
            )}
          </button>
        </div>
      </div>

      {copied && (
        <div className="bg-emerald-50 border-b border-emerald-200/70 px-5 py-2 text-xs font-semibold text-emerald-800 flex items-center justify-between">
          <span>Copied. Go post it and confuse your network. 🚀</span>
          <span className="text-[10px] uppercase font-bold text-emerald-600">Clipboard sync active</span>
        </div>
      )}

      {/* Realistic LinkedIn Mock Card */}
      <div className="p-5 sm:p-6">
        {/* Profile Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-heading font-bold text-base shadow-xs">
              YL
              <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-blue-600 shadow-2xs">
                <Sparkles className="h-2.5 w-2.5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-slate-900 leading-none">
                  {isReverse ? 'The Realist (No BS)' : 'You (Visionary Thought Leader)'}
                </h4>
                <span className="text-xs text-blue-600 font-bold" title="Verified Thought Leader">
                  ☑️
                </span>
                <span className="text-slate-400 text-xs">· 1st</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                {isReverse
                  ? 'Ex-Corporate Buzzword Addict · Certified BS Buster'
                  : 'Chief Synergy Officer · Keynote Disruptor · 500+ Connections'}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                <span>Just now</span>
                <span>·</span>
                <Globe className="h-3 w-3" />
              </div>
            </div>
          </div>

          <div className="text-slate-400">
            <MoreHorizontal className="h-4 w-4" />
          </div>
        </div>

        {/* Post Content */}
        <div className="my-3 text-sm leading-relaxed text-slate-900 whitespace-pre-line font-normal select-text">
          {output}
        </div>

        {/* Mock LinkedIn Interaction Counter */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span className="flex -space-x-1">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[9px] text-white">👍</span>
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white">💡</span>
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] text-white">❤️</span>
            </span>
            <span className="ml-1 text-[11px] font-medium text-slate-600">
              {Math.floor(characterCount * 3.4 + 42)} reactions · 89 comments
            </span>
          </div>
          <span className="text-[11px] text-slate-600">
            {Math.floor(wordCount / 2.5)} reposts
          </span>
        </div>

        {/* Mock Action Bar */}
        <div className="mt-2 pt-2 border-t border-slate-100 grid grid-cols-4 gap-1 text-center text-xs font-semibold text-slate-600">
          <div className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
            <ThumbsUp className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden sm:inline">Like</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
            <MessageSquare className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden sm:inline">Comment</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
            <Repeat2 className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden sm:inline">Repost</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
            <Send className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden sm:inline">Send</span>
          </div>
        </div>
      </div>

      {/* Refinement Actions (Only for Reality -> LinkedIn) */}
      {!isReverse && (
        <div className="border-t border-slate-100 bg-slate-50/80 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Quick AI Fine-Tuning
            </span>
            <span className="text-[11px] font-medium text-slate-600">
              Dial in the tone
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={onRegenerate}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50 transition-colors shadow-2xs"
            >
              <RotateCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Regenerate</span>
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => onApplyModifier('unhinged')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50 transition-colors shadow-2xs"
            >
              <Flame className="h-3.5 w-3.5 text-rose-500" />
              <span>Make it more unhinged</span>
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => onApplyModifier('believable')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50 transition-colors shadow-2xs"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
              <span>Make it more believable</span>
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => onApplyModifier('shorten')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50 transition-colors shadow-2xs"
            >
              <Scissors className="h-3.5 w-3.5 text-slate-500" />
              <span>Shorten it</span>
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => onApplyModifier('more_hashtags')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50 transition-colors shadow-2xs"
            >
              <Hash className="h-3.5 w-3.5 text-indigo-500" />
              <span>Add more hashtags</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
