import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TranslatorCard } from './components/TranslatorCard';
import { OutputCard } from './components/OutputCard';
import { HistoryDrawer } from './components/HistoryDrawer';
import { ShareModal } from './components/ShareModal';
import { StatisticsSection } from './components/StatisticsSection';
import { Footer } from './components/Footer';
import {
  TranslationDirection,
  TranslationMode,
  TranslationModifier,
  HistoryItem,
} from './types';

const STORAGE_KEY_HISTORY = 'linkedin_translator_history_v2';
const STORAGE_KEY_COUNT = 'linkedin_translator_reframe_count_v2';

export default function App() {
  const [inputText, setInputText] = useState<string>('');
  const [direction, setDirection] = useState<TranslationDirection>('reality_to_linkedin');
  const [mode, setMode] = useState<TranslationMode>('INFLUENCER');
  const [bullshitLevel, setBullshitLevel] = useState<number>(75);
  const [output, setOutput] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Local storage state
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [userReframesCount, setUserReframesCount] = useState<number>(0);

  // Modal & Drawer visibility
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  const translatorRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage on initial render
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
      const storedCount = localStorage.getItem(STORAGE_KEY_COUNT);
      if (storedCount) {
        setUserReframesCount(parseInt(storedCount, 10) || 0);
      }
    } catch (e) {
      console.error('Failed to load local storage data:', e);
    }
  }, []);

  // Save history helper
  const saveHistoryItem = (item: HistoryItem) => {
    setHistory((prev) => {
      const updated = [item, ...prev.filter((i) => i.id !== item.id)].slice(0, 30);
      try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
      return updated;
    });

    setUserReframesCount((prev) => {
      const updated = prev + 1;
      try {
        localStorage.setItem(STORAGE_KEY_COUNT, updated.toString());
      } catch (e) {
        console.error('Failed to save count to localStorage:', e);
      }
      return updated;
    });
  };

  const scrollToTranslator = () => {
    translatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToStats = () => {
    statsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleTranslate = async (modifier?: TranslationModifier) => {
    const textToTranslate = inputText.trim();
    if (!textToTranslate) {
      setErrorMessage('Please enter a sentence or situation to translate.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: textToTranslate,
          direction,
          mode,
          bullshitLevel,
          modifier: modifier || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Corporate systems encountered a strategic outage.');
      }

      if (!data.result) {
        throw new Error('Received empty response from the corporate spin engine.');
      }

      setOutput(data.result);
      setCurrentPrompt(textToTranslate);

      // Save to history
      const newItem: HistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        input: textToTranslate,
        output: data.result,
        direction,
        mode,
        bullshitLevel,
        timestamp: Date.now(),
      };
      saveHistoryItem(newItem);

      // Smooth scroll to output card on mobile/desktop
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } catch (err: any) {
      console.error('Translation failed:', err);
      setErrorMessage(
        err.message || '🚨 Corporate systems are currently experiencing a strategic outage. Please retry shortly.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectExampleFromHero = (humanText: string) => {
    setInputText(humanText);
    setDirection('reality_to_linkedin');
    setErrorMessage(null);
    scrollToTranslator();
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to update localStorage:', e);
      }
      return updated;
    });
  };

  const handleClearAllHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch (e) {
      console.error('Failed to clear localStorage:', e);
    }
  };

  const handleLoadHistoryItem = (item: HistoryItem) => {
    setInputText(item.input);
    setOutput(item.output);
    setCurrentPrompt(item.input);
    setDirection(item.direction);
    setMode(item.mode);
    setBullshitLevel(item.bullshitLevel);
    setIsHistoryOpen(false);
    setErrorMessage(null);
    scrollToTranslator();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <Navbar
        direction={direction}
        onDirectionChange={(dir) => {
          setDirection(dir);
          setOutput(null);
          setErrorMessage(null);
        }}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
        onScrollToTranslator={scrollToTranslator}
        onScrollToStats={scrollToStats}
      />

      {/* Hero Section */}
      <Hero
        onTranslateClick={scrollToTranslator}
        onSelectExample={handleSelectExampleFromHero}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 pb-20">
        <div ref={translatorRef} className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8">
          {/* Translator Input Card */}
          <TranslatorCard
            inputText={inputText}
            onInputChange={setInputText}
            direction={direction}
            onDirectionChange={(dir) => {
              setDirection(dir);
              setOutput(null);
              setErrorMessage(null);
            }}
            mode={mode}
            onModeChange={setMode}
            bullshitLevel={bullshitLevel}
            onBullshitLevelChange={setBullshitLevel}
            onSubmit={() => handleTranslate()}
            isLoading={isLoading}
            errorMessage={errorMessage}
            onClearError={() => setErrorMessage(null)}
          />

          {/* Output Card */}
          {output && (
            <div ref={outputRef} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <OutputCard
                output={output}
                originalInput={currentPrompt || inputText}
                direction={direction}
                mode={mode}
                bullshitLevel={bullshitLevel}
                isLoading={isLoading}
                onRegenerate={() => handleTranslate()}
                onApplyModifier={(mod) => handleTranslate(mod)}
                onOpenShareModal={() => setIsShareModalOpen(true)}
              />
            </div>
          )}
        </div>

        {/* Statistics section */}
        <div ref={statsRef} className="mt-20">
          <StatisticsSection userReframesCount={userReframesCount} />
        </div>
      </main>

      {/* Modals & Drawers */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={history}
        onDeleteItem={handleDeleteHistoryItem}
        onClearAll={handleClearAllHistory}
        onLoadItem={handleLoadHistoryItem}
      />

      {output && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          humanText={currentPrompt || inputText}
          translatedText={output}
          mode={direction === 'linkedin_to_human' ? 'Honest Reality' : mode}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
