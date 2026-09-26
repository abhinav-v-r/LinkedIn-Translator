import React from 'react';
import { Briefcase, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-white">
              <Briefcase className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <span className="font-heading text-sm font-bold text-slate-900">
                LinkedIn Translator™
              </span>
              <p className="text-xs text-slate-500">
                Say it like a normal person. We’ll make it LinkedIn.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-medium text-center sm:text-right">
            LinkedIn Translator — Because every bad decision is a learning opportunity. 🚀
          </p>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-[11px] text-slate-600 space-y-1">
          <p>
            ⚠️ Disclaimer: This application is a 100% satirical parody of corporate hustle culture and exaggerated LinkedIn discourse.
          </p>
          <p>
            Not affiliated with, endorsed by, or sponsored by LinkedIn Corporation or Microsoft. No recruiters were harmed in the making of this app.
          </p>
        </div>
      </div>
    </footer>
  );
};
