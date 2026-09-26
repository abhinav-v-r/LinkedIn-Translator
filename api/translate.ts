import { GoogleGenAI } from '@google/genai';

interface TranslateRequestBody {
  text: string;
  direction?: 'reality_to_linkedin' | 'linkedin_to_human';
  mode?: 'PROFESSIONAL' | 'INFLUENCER' | 'CORPORATE' | 'HUMBLEBRAG' | 'UNHINGED' | 'GEN_Z';
  bullshitLevel?: number; // 1 - 100
  modifier?: 'unhinged' | 'believable' | 'shorten' | 'more_hashtags' | null;
}

// Fallback dictionary for instant witty offline/busy handling
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

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Please use POST.' });
    return;
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // keep as is
      }
    }

    const {
      text,
      direction = 'reality_to_linkedin',
      mode = 'INFLUENCER',
      bullshitLevel = 75,
      modifier = null,
    }: TranslateRequestBody = body || {};

    if (!text || typeof text !== 'string' || !text.trim()) {
      res.status(400).json({ error: 'Please enter a sentence to translate.' });
      return;
    }

    if (text.length > 2000) {
      res.status(400).json({ error: 'Text exceeds maximum character limit of 2,000 characters.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      const fallback = getFallbackTranslation(text, direction, mode, bullshitLevel, modifier);
      res.status(200).json({
        result: fallback,
        direction,
        mode,
        bullshitLevel,
        isFallback: true,
      });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    let systemInstruction = '';
    let userPrompt = '';

    if (direction === 'linkedin_to_human') {
      systemInstruction = `You are "The Brutal Honesty Decoder" in the LinkedIn Translator app.
Your task is to take self-important, jargon-heavy, toxic-positivity corporate LinkedIn posts and translate them into 1-2 brutally honest, punchy, funny human sentences in plain, everyday English.

RULES:
- Strip away all the corporate doublespeak, spin, and inflated vocabulary.
- Identify the embarrassing, mundane, or painful reality beneath the post.
- Be witty, sharp, concise, and hilarious.
- Do NOT provide commentary, preambles, or analysis. Return ONLY the honest decoded sentence.`;

      userPrompt = `Decode this corporate LinkedIn post into raw, honest human truth:\n\n"${text}"`;
    } else {
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
   - 26-50: "Classic LinkedIn" (notable corporate optimism, buzzwords, growth-oriented reflection)
   - 51-75: "LinkedIn Influencer" (high buzzwords, dramatic line spacing, philosophical life lessons, boundless gratitude)
   - 76-100: "Absolutely Unbearable / Hyper-Synergized" (pure corporate parody, dense jargon, existential breakthrough)
4. Selected Persona Mode: ${mode} - ${selectedModeDesc}
5. Formatting & Cadence:
   - Classic LinkedIn structure: Attention-grabbing hook line, short paragraphs (1-2 sentences per line), emotional turnaround/insight, call-to-action or reflection question, 3-5 hashtags.
   - Emojis: Use typical LinkedIn emojis (🚀, 💡, 📈, 🤝, 🎯, ✨, 🧠, 💫) appropriately according to bullshit level.
   - Do NOT wrap output in quotation marks or say "Here is your post:". Output ONLY the LinkedIn post text.
${modifierInstruction}`;

      userPrompt = `Transform this honest statement into an exaggerated LinkedIn post:\n\n"${text}"`;
    }

    let outputText = '';

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
      console.warn('Primary model error, trying backup model:', primaryErr?.message);
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
        console.warn('Backup model failed, using fallback:', backupErr?.message);
        outputText = getFallbackTranslation(text, direction, mode, bullshitLevel, modifier);
      }
    }

    if (!outputText) {
      outputText = getFallbackTranslation(text, direction, mode, bullshitLevel, modifier);
    }

    res.status(200).json({
      result: outputText,
      direction,
      mode,
      bullshitLevel,
    });
  } catch (error: any) {
    console.error('Translation handler error:', error);
    res.status(500).json({
      error: '🚨 Corporate systems are currently experiencing a strategic outage.',
      details: error?.message || 'Unknown operational latency event.',
    });
  }
}
