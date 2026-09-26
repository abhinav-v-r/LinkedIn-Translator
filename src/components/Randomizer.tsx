import React, { useState } from 'react';
import { Dices, Sparkles } from 'lucide-react';
import { RANDOM_PROBLEMS } from '../data/constants';

interface RandomizerProps {
  onSelectProblem: (problem: string, autoSubmit?: boolean) => void;
  disabled?: boolean;
}

export const Randomizer: React.FC<RandomizerProps> = ({
  onSelectProblem,
  disabled = false,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRandomize = () => {
    if (disabled) return;
    setIsSpinning(true);
    
    // Pick random problem different from last if possible
    const randomIndex = Math.floor(Math.random() * RANDOM_PROBLEMS.length);
    const selected = RANDOM_PROBLEMS[randomIndex];

    setTimeout(() => {
      setIsSpinning(false);
      onSelectProblem(selected, true);
    }, 200);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleRandomize}
      className={`inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'
      }`}
      title="Generate a random everyday mundane situation and reframe it"
    >
      <Dices className={`h-4 w-4 text-blue-600 ${isSpinning ? 'animate-spin' : ''}`} />
      <span>Generate My LinkedIn Problem</span>
    </button>
  );
};
