import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google GenAI client if API key is provided
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

interface TranslateRequestBody {
  text: string;
  direction?: 'reality_to_linkedin' | 'linkedin_to_human';
  mode?: 'PROFESSIONAL' | 'INFLUENCER' | 'CORPORATE' | 'HUMBLEBRAG' | 'UNHINGED' | 'GEN_Z';
  bullshitLevel?: number; // 1 - 100
  modifier?: 'unhinged' | 'believable' | 'shorten' | 'more_hashtags' | null;
}

// Creative fallback dictionary if offline, rate limited, or model 503
function getFallbackTranslation(
  text: string,
  direction: string,
  mode: string,
  level: number,
  modifier?: string | null
): string {
  const lower = text.toLowerCase();

  if (direction === 'linkedin_to_human') {
    if (lower.includes('transition') || lower.includes('chapter') || lower.includes('pause') || lower.includes('reassess')) {
      return "Translation: I got fired.";
    }
    if (lower.includes('sprint') || lower.includes('research') || lower.includes('digital media') || lower.includes('storytelling')) {
      return "Translation: I stayed awake until 4 AM binge-watching TV.";
    }
    if (lower.includes('knowledge-sharing') || lower.includes('collaborative') || lower.includes('peer learning')) {
      return "Translation: I copied someone else's work at the last minute.";
    }
    if (lower.includes('chaos') || lower.includes('edge case') || lower.includes('vulnerabilit')) {
      return "Translation: I broke the entire system right before going home on Friday.";
    }
    if (lower.includes('ambiguity') || lower.includes('exploratory') || lower.includes('fluidity')) {
      return "Translation: I have absolutely no idea what I'm doing and I'm winging it.";
    }
    if (lower.includes('transit') || lower.includes('scheduling challenge')) {
      return "Translation: I woke up late and missed the bus.";
    }
    return `Translation: Honestly? Nothing significant happened, but corporate pride demanded 3 paragraphs, 4 buzzwords, and an inspirational rocket emoji. (Original: "${text.slice(0, 60)}...")`;
  }

  // Reality -> LinkedIn
  if (lower.includes('fired') || lower.includes('laid off') || lower.includes('lost my job')) {
    return `I’m thrilled to announce that I’m embracing a brand new chapter in my professional journey! 🚀

Following an unexpected organizational restructuring, I’ve been granted a rare and valuable opportunity to pause, reflect, and recalibrate my strategic trajectory.

This milestone has reinforced the paramount importance of resilience, agility, and continuous personal growth. Sometimes, the greatest career accelerations begin with an unexpected transition.

Here’s to the next disruption! 💫

#Resilience #NewBeginnings #CareerJourney #ContinuousGrowth #OpenToWork`;
  }

  if (lower.includes('netflix') || lower.includes('stayed up') || lower.includes('all night') || lower.includes('4 am') || lower.includes('sleep')) {
    return `I’m proud to share that I recently completed an intensive overnight research sprint focused on storytelling, behavioral engagement algorithms, and content retention dynamics! 💡

This experience reminded me that true innovation doesn’t observe arbitrary office hours.

Sometimes, the most profound strategic insights occur at 4 AM when the rest of the ecosystem is offline.

Never stop learning, questioning, and absorbing data from unexpected sources. 🚀

#ContinuousLearning #Innovation #ResearchSprint #Storytelling #GrowthMindset`;
  }

  if (lower.includes('copied') || lower.includes('cheated') || lower.includes('friend')) {
    return `I recently participated in a high-velocity, peer-to-peer collaborative knowledge-sharing initiative that reinforced the foundational value of cross-functional synergy! 🤝

In today's interconnected landscape, real breakthroughs rarely occur in isolation. Leveraging pre-existing research assets allows for optimal velocity and collective problem-solving.

Teamwork makes the dream work! 💫

#Collaboration #PeerLearning #Synergy #KnowledgeSharing #Innovation`;
  }

  if (lower.includes('broke') || lower.includes('crash') || lower.includes('bug') || lower.includes('error')) {
    return `Proud to announce that I successfully conducted an unscheduled, live-fire chaos engineering drill that proactively surfaced undocumented architectural vulnerabilities during peak operational hours! 🔥

Failure isn’t an impediment—it’s merely high-fidelity data informing our next resilience iteration.

Onward and upward! 🚀

#DevOps #EngineeringExcellence #ChaosEngineering #Resilience #ContinuousImprovement`;
  }

  if (lower.includes('no idea') || lower.includes("don't know") || lower.includes('lost') || lower.includes('confused')) {
    return `I’m actively leaning into radical ambiguity and navigating an exhilarating period of exploratory discovery! 🌱

The modern business environment demands leaders who are comfortable operating outside of conventional certainty. By embracing cognitive fluidity, we unlock previously unimaginable operational horizons.

Disruption begins where certainty ends. ✨

#ThoughtLeadership #GrowthMindset #AgileLeadership #EmbracingAmbiguity #FutureOfWork`;
  }

  if (lower.includes('exam') || lower.includes('failed') || lower.includes('test')) {
    return `I recently encountered a profound learning experience during a rigorous formal competency evaluation! 📈

While the immediate quantitative metrics diverged from preliminary forecasts, the qualitative feedback has provided an invaluable blueprint for strategic recalibration.

Success is not a linear vector; it is an iterative feedback loop. 🚀

#Resilience #ContinuousLearning #GrowthMindset #PersonalDevelopment #NeverStopGrowing`;
  }

  // General smart generative fallback
  const buzzwordMap: Record<string, string[]> = {
    PROFESSIONAL: ['strategic recalibration', 'operational milestone', 'measured agility', 'collaborative stakeholder alignment'],
    INFLUENCER: ['pivotal inflection point', 'transformational journey', 'unapologetic resilience', 'awakening at 4 AM'],
    CORPORATE: ['core competency optimization', 'cross-functional deliverable', 'synergistic paradigm shift', 'bandwidth allocation'],
    HUMBLEBRAG: ['deeply humbled milestone', 'unexpected recognition', 'grateful reflection', 'quiet resilience'],
    UNHINGED: ['quantum leap into existential chaos', 'hyper-optimized cosmic pivot', 'apocalyptic paradigm acceleration'],
    GEN_Z: ['valid career pivot no cap', 'it is giving thought leadership', 'locked in on deliverables', 'chat is this synergy'],
  };

  const buzzwords = buzzwordMap[mode] || buzzwordMap.INFLUENCER;
  const pickedBuzzword = buzzwords[Math.floor(Math.random() * buzzwords.length)];

  return `I'm profoundly energized to announce a major breakthrough in my ongoing professional evolution! 🚀

Following a recent real-world case study ("${text.trim()}"), I initiated a high-impact ${pickedBuzzword} to transform unexpected operational variables into sustainable competitive advantages.

True leadership isn't about avoiding turbulence—it's about extracting actionable learnings and sharing the journey with your network.

What unexpected lesson did reality teach you today? Let's discuss in the comments! 👇

#ThoughtLeadership #Innovation #GrowthMindset #Resilience #LeadershipEvolution`;
}

app.post('/api/translate', async (req: Request, res: Response) => {
  try {
    const {
      text,
      direction = 'reality_to_linkedin',
      mode = 'INFLUENCER',
      bullshitLevel = 75,
      modifier = null,
    }: TranslateRequestBody = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      res.status(400).json({ error: 'Please enter a sentence to translate.' });
      return;
    }

    if (text.length > 2000) {
      res.status(400).json({ error: 'Text exceeds maximum character limit of 2,000 characters.' });
      return;
    }

    // If no GenAI client available, return fallback
    if (!ai) {
      const fallback = getFallbackTranslation(text, direction, mode, bullshitLevel, modifier);
      res.json({
        result: fallback,
        direction,
        mode,
        bullshitLevel,
        isFallback: true,
      });
      return;
    }

    let systemInstruction = '';
    let userPrompt = '';

    if (direction === 'linkedin_to_human') {
      systemInstruction = `You are "The Brutal Honesty Decoder" in the LinkedIn Translator app.
Your task is to take self-important, jargon-heavy, toxic-positivity corporate LinkedIn posts and translate them into 1-2 brutally honest, punchy, funny human sentences in plain, everyday English.

RULES:
- Strip away all the corporate doublespeak, spin, and inflated vocabulary.
- Identify the embarrassing, mundane, or painful reality beneath the post.
- Examples:
  Input: "I’m excited to announce that I’m embracing a new chapter after an unexpected organizational transition."
  Output: "I got fired."
  Input: "I recently embarked on an intensive self-directed research sprint focusing on narrative engagement."
  Output: "I stayed up all night watching Netflix."
  Input: "Spearheaded an agile sync across multidisciplinary stakeholders."
  Output: "Sat in a useless 90-minute meeting where nobody made a decision."
- Be witty, sharp, concise, and hilarious.
- Do NOT provide commentary, preambles, or analysis. Return ONLY the honest decoded sentence.`;

      userPrompt = `Decode this corporate LinkedIn post into raw, honest human truth:\n\n"${text}"`;
    } else {
      // reality_to_linkedin
      const modeDescriptions: Record<string, string> = {
        PROFESSIONAL: 'Clean, diplomatic corporate milestone with polished optimism and measured enthusiasm.',
        INFLUENCER: 'Excessively motivational LinkedIn influencer style. Dramatic 1-sentence spacing, philosophical revelations at 4 AM, boundless gratitude, rhetorical questions, and deep passion.',
        CORPORATE: 'Maximum enterprise buzzword overload. Heavy use of KPIs, stakeholder alignment, paradigm shifts, core competencies, deliverables, bandwidth, and strategic recalibration.',
        HUMBLEBRAG: 'Subtly flaunt a massive flex or trivial event while pretending to be overwhelmed with humble gratitude and vulnerability.',
        UNHINGED: 'Completely absurd LinkedIn satire. Treat minor trivialities (losing a pen, burnt toast, minor glitch) with apocalyptic existential gravity and manic founder energy.',
        GEN_Z: 'Mix authentic corporate LinkedIn cadence with Gen Z internet slang (e.g., "no cap", "it\'s giving transformational leadership", "we locked in on Q3 deliverables", "chat is this a paradigm shift?", "valid career pivot").',
      };

      const selectedModeDesc = modeDescriptions[mode] || modeDescriptions.INFLUENCER;

      let modifierInstruction = '';
      if (modifier === 'unhinged') {
        modifierInstruction = 'CRITICAL MODIFIER: Make this significantly MORE UNHINGED, existential, and absurdly dramatic.';
      } else if (modifier === 'believable') {
        modifierInstruction = 'CRITICAL MODIFIER: Make this MORE BELIEVABLE—like an actual real post someone would have the audacity to post on LinkedIn without realizing it is ridiculous.';
      } else if (modifier === 'shorten') {
        modifierInstruction = 'CRITICAL MODIFIER: Keep it SHORT and punchy—maximum 2 short paragraphs plus hashtags.';
      } else if (modifier === 'more_hashtags') {
        modifierInstruction = 'CRITICAL MODIFIER: Add 7-10 hilarious, hyper-specific corporate/inspirational hashtags at the end.';
      }

      systemInstruction = `You are LinkedIn Translator, a satire engine that transforms brutally honest everyday statements into exaggerated LinkedIn-style professional posts.
Your goal is humorous corporate reframing.

CRITICAL RULES:
1. Preserve the underlying event: Do NOT invent major fake achievements, employers, degrees, awards, or job titles that were not in the input. If the user says "I spilled coffee on my laptop", reframe the spilled coffee as a rapid hardware stress test or unexpected pause for analog reflection—do not say they got hired at Google.
2. Reframing principles:
   - Turn failures into valuable learning opportunities.
   - Turn mundane activities into strategic initiatives.
   - Turn rejection into exposure to the talent ecosystem.
   - Turn confusion into navigating ambiguity with a growth mindset.
   - Turn mistakes into actionable data-driven edge cases.
   - Turn laziness or procrastination into intentional cognitive recovery sprints.
3. Corporate Bullshit Level is set to ${bullshitLevel}/100:
   - 1-25: "Still human" to "Professional" (light polish, mild corporate phrasing)
   - 26-50: "Classic LinkedIn" (upbeat, growth mindset, lessons learned, 3 hashtags)
   - 51-75: "LinkedIn Influencer" (dramatic line breaks, philosophical takeaways, rocket emojis, boundless energy)
   - 76-100: "Absolutely unbearable" (dense buzzwords: 'strategic recalibration', 'cross-functional synergy', 'purpose-driven impact', 'paradigm shift', 'stakeholder buy-in', 'innovation ecosystem')
4. Target Mode: ${mode} (${selectedModeDesc})
5. Structure:
   - Strong opening hook (e.g. "I’m thrilled to announce...", "A lot of people ask me...", "Yesterday taught me a lesson I won't soon forget...")
   - 2 to 4 short, punchy paragraphs (use single line spacing between them for that authentic LinkedIn reading experience)
   - A reflective, philosophical lesson
   - A motivational forward-looking sign-off
   - 3 to 6 relevant hashtags (or more if specified)
   - Tasteful emojis (🚀, 💡, 🔥, 🌱, 💫, 🤝), but don't place one after every single word.
6. ${modifierInstruction}
7. DO NOT explain the joke or add meta commentary. Output ONLY the LinkedIn post text.`;

      userPrompt = `Transform this honest statement into an exaggerated LinkedIn post:\n\n"${text}"`;
    }

    let outputText = '';

    // First try gemini-3.8-flash; if busy/503, try gemini-3.1-flash-lite
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.85,
        },
      });
      outputText = response.text ? response.text.trim() : '';
    } catch (primaryErr: any) {
      console.warn('Primary model (gemini-3.8-flash) error, trying gemini-3.1-flash-lite:', primaryErr?.message);
      try {
        const responseLite = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: userPrompt,
          config: {
            systemInstruction,
            temperature: 0.85,
          },
        });
        outputText = responseLite.text ? responseLite.text.trim() : '';
      } catch (backupErr: any) {
        console.warn('Backup model also failed, utilizing satirical fallback engine:', backupErr?.message);
        outputText = getFallbackTranslation(text, direction, mode, bullshitLevel, modifier);
      }
    }

    if (!outputText) {
      outputText = getFallbackTranslation(text, direction, mode, bullshitLevel, modifier);
    }

    res.json({
      result: outputText,
      direction,
      mode,
      bullshitLevel,
      modifier,
    });
  } catch (error: any) {
    console.error('Translation error:', error);
    res.status(500).json({
      error: '🚨 Corporate systems are currently experiencing a strategic outage.',
      details: error?.message || 'Unknown operational latency event.',
    });
  }
});

// Vite middleware for dev or static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[LinkedIn Translator] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server boot failure:', err);
});
