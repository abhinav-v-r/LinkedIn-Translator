import React, { useRef, useState } from 'react';
import { X, Download, Share2, Copy, Check, Sparkles } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  humanText: string;
  translatedText: string;
  mode: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  humanText,
  translatedText,
  mode,
}) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleCopyText = async () => {
    const textToCopy = `REALITY:\n"${humanText}"\n\nLINKEDIN:\n"${translatedText}"\n\n— Generated with LinkedIn Translator (Say it like a normal person. We'll make it LinkedIn)`;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadImage = async () => {
    setIsDownloading(true);
    try {
      // Create high-res canvas for crystal clear image export
      const canvas = document.createElement('canvas');
      const width = 1200;
      const height = 1000;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Canvas not supported');

      // Background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      // Subtle gradient header
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#1e293b');
      ctx.fillStyle = gradient;
      ctx.fillRect(60, 60, width - 120, 100);

      // Header Text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('LinkedIn Translator™', 100, 125);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Reality vs. Corporate Spin', 760, 125);

      // Reality Card (White background with red accent)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(60, 190, width - 120, 220, 16);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#e2e8f0';
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('WHAT ACTUALLY HAPPENED (REALITY):', 90, 235);

      ctx.fillStyle = '#0f172a';
      ctx.font = '600 26px "Plus Jakarta Sans", sans-serif';
      wrapText(ctx, `“${humanText}”`, 90, 280, width - 180, 36);

      // Arrow indicator
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('↓ PROFESSIONALIZED INTO ↓', width / 2 - 160, 445);

      // LinkedIn Card (Dark / Professional accent)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(60, 475, width - 120, 380, 16);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#cbd5e1';
      ctx.stroke();

      ctx.fillStyle = '#2563eb';
      ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`LINKEDIN VERSION™ (${mode}):`, 90, 520);

      ctx.fillStyle = '#1e293b';
      ctx.font = 'normal 21px "Plus Jakarta Sans", sans-serif';
      wrapText(ctx, translatedText, 90, 565, width - 180, 32);

      // Footer
      ctx.fillStyle = '#64748b';
      ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Generated with LinkedIn Translator — Say it like a normal person.', 100, 915);

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('linkedin-translator.app', 920, 915);

      // Trigger download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `linkedin-reframe-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Helper to wrap text cleanly on canvas
  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const paragraphs = text.split('\n');
    let currentY = y;

    for (const paragraph of paragraphs) {
      if (!paragraph.trim()) {
        currentY += lineHeight * 0.7;
        continue;
      }
      const words = paragraph.split(' ');
      let line = '';

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
          if (currentY > 820) {
            ctx.fillText('...', x, currentY);
            return;
          }
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, currentY);
      currentY += lineHeight;
      if (currentY > 820) return;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <h3 className="font-heading text-lg font-bold text-slate-900">
              Share the Joke
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body: Card preview */}
        <div className="overflow-y-auto p-6 bg-slate-50">
          <div
            ref={previewRef}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-heading text-sm font-bold tracking-tight text-slate-900">
                LinkedIn Translator™
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Reality vs. Corporate Spin
              </span>
            </div>

            {/* Reality */}
            <div className="rounded-lg bg-rose-50/70 p-3.5 border border-rose-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                REALITY:
              </span>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                “{humanText}”
              </p>
            </div>

            {/* LinkedIn */}
            <div className="rounded-lg bg-blue-50/70 p-3.5 border border-blue-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                LINKEDIN™:
              </span>
              <p className="mt-1 text-xs leading-relaxed text-slate-800 whitespace-pre-line font-normal">
                {translatedText}
              </p>
            </div>

            {/* Footer */}
            <div className="pt-2 text-center">
              <p className="text-[11px] font-medium text-slate-600">
                Generated with LinkedIn Translator — Say it like a normal person.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-6 py-4 bg-white">
          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-slate-500" />
                <span>Copy Share Text</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadImage}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>{isDownloading ? 'Generating Image...' : 'Download Image Card (PNG)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
