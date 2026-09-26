export type TranslationDirection = 'reality_to_linkedin' | 'linkedin_to_human';

export type TranslationMode =
  | 'PROFESSIONAL'
  | 'INFLUENCER'
  | 'CORPORATE'
  | 'HUMBLEBRAG'
  | 'UNHINGED'
  | 'GEN_Z';

export type TranslationModifier = 'unhinged' | 'believable' | 'shorten' | 'more_hashtags';

export interface HistoryItem {
  id: string;
  input: string;
  output: string;
  direction: TranslationDirection;
  mode: TranslationMode;
  bullshitLevel: number;
  timestamp: number;
}

export interface ModeOption {
  id: TranslationMode;
  label: string;
  tagline: string;
  badge: string;
}

export interface ExamplePair {
  human: string;
  corporate: string;
  category: string;
}
