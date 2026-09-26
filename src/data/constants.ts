import { ExamplePair, ModeOption } from '../types';

export const HERO_EXAMPLES: ExamplePair[] = [
  {
    human: "I got rejected from an internship.",
    corporate: "I’m grateful to share a valuable learning experience from my recent interactions with the talent selection ecosystem. Rejection is merely the market redirecting your strategic trajectory toward higher-impact verticals. #GrowthMindset #Resilience #NextChapter 🚀",
    category: "Career Pivot",
  },
  {
    human: "I stayed awake until 4 AM watching Netflix.",
    corporate: "I’m proud to share that I recently completed an intensive overnight research sprint focused on storytelling, digital media retention, and behavioral engagement algorithms. Learning doesn't always happen in a classroom—sometimes it happens at 4 AM. 💡 #ContinuousLearning #MediaSprint",
    category: "Professional Development",
  },
  {
    human: "I copied my friend's assignment.",
    corporate: "I recently participated in a high-velocity, collaborative knowledge-sharing initiative that reinforced the vital importance of peer-to-peer synergy and collective problem-solving. Innovation rarely occurs in isolation! 🤝 #Synergy #Teamwork #KnowledgeSharing",
    category: "Cross-Functional Synergy",
  },
  {
    human: "I broke the project on Friday afternoon.",
    corporate: "Proud to have spearheaded an unprompted chaos-engineering resilience drill, proactively surfacing previously undocumented architectural vulnerabilities during peak operational hours. Failure is just undocumented insight. 🔥 #DevOps #Resilience",
    category: "Infrastructure Excellence",
  },
  {
    human: "I have no idea what I'm doing.",
    corporate: "Actively leaning into ambiguity, embracing cognitive fluidity, and championing exploratory methodologies in uncharted problem spaces. Disruption begins where certainty ends. 🌱 #ThoughtLeadership #AgileMindset",
    category: "Executive Strategy",
  },
];

export const HUMAN_PROMPT_PRESETS = [
  "I got fired",
  "I failed my exam",
  "I stayed up all night",
  "I made a useless project",
  "I got rejected",
  "I have no idea what I'm doing",
  "I slept through my alarm",
  "I accidentally sent a meme to the entire company",
];

export const CORPORATE_PROMPT_PRESETS = [
  "I’m excited to announce that I’m embracing a new chapter after an unexpected organizational transition.",
  "I recently embarked on an intensive self-directed research sprint.",
  "Spearheaded an agile sync across multidisciplinary stakeholders to align core deliverables.",
  "Excited to lean into an intentional pause to recalibrate my strategic North Star.",
  "Proud to share my key learnings from an unscheduled infrastructure stress-testing initiative.",
  "Navigating dynamic ambiguity to pioneer uncharted market verticals.",
];

export const RANDOM_PROBLEMS = [
  "I forgot my password.",
  "I missed the bus.",
  "My Wi-Fi stopped working.",
  "I ordered the wrong food.",
  "I forgot someone's birthday.",
  "I lost my charger.",
  "I dropped my toast butter-side down.",
  "I spent 45 minutes looking for my glasses while wearing them.",
  "I opened 87 Chrome tabs and my laptop fan began levitating.",
  "I nodded along in a 60-minute meeting having zero clue what anyone was talking about.",
  "I accidentally clicked 'Reply All' with just a thumbs-up emoji.",
  "I burned microwave popcorn and evacuated the entire floor.",
];

export const LOADING_MESSAGES = [
  "Reframing reality...",
  "Aligning stakeholders...",
  "Converting consequences into opportunities...",
  "Adding unnecessary buzzwords...",
  "Consulting our Chief Synergy Officer...",
  "Optimizing growth mindset metrics...",
  "Synthesizing cross-functional deliverables...",
  "Injecting transformational thought leadership...",
  "Engineering strategic paradigm shifts...",
];

export const MODES: ModeOption[] = [
  {
    id: 'INFLUENCER',
    label: 'Influencer',
    tagline: 'Excessively motivational with dramatic 1-sentence paragraphs & boundless gratitude.',
    badge: '🚀 Most Popular',
  },
  {
    id: 'PROFESSIONAL',
    label: 'Professional',
    tagline: 'Polished, diplomatic corporate milestone with measured optimism.',
    badge: '👔 Clean & Polished',
  },
  {
    id: 'CORPORATE',
    label: 'Corporate',
    tagline: 'Maximum buzzword density: KPIs, synergy, alignment & core competencies.',
    badge: '💼 Buzzword Heavy',
  },
  {
    id: 'HUMBLEBRAG',
    label: 'Humblebrag',
    tagline: 'Subtly flex about something trivial while feigning deep vulnerability.',
    badge: '🙏 Humbled & Grateful',
  },
  {
    id: 'UNHINGED',
    label: 'Unhinged',
    tagline: 'Absurdist satire treating minor blunders with apocalyptic philosophical gravity.',
    badge: '🌪️ Pure Chaos',
  },
  {
    id: 'GEN_Z',
    label: 'Gen Z LinkedIn',
    tagline: 'Corporate thought leadership blended with modern internet brainrot slang.',
    badge: '✨ No Cap Synergy',
  },
];

export const BULLSHIT_LEVEL_LABELS: Record<number, string> = {
  1: "Still human",
  25: "Professional",
  50: "Classic LinkedIn",
  75: "LinkedIn Influencer",
  100: "Absolutely unbearable",
};

export function getBullshitLabel(level: number): string {
  if (level <= 15) return "Still human";
  if (level <= 38) return "Professional";
  if (level <= 62) return "Classic LinkedIn";
  if (level <= 88) return "LinkedIn Influencer";
  return "Absolutely unbearable";
}
