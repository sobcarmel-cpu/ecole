export interface VoiceMetrics {
  wordsPerMinute: number;
  fillerWords: { word: string; count: number }[];
  pausesCount: number;
  averageVolumeDb: number;
  pitchVariation: number; // 0-100 score de dynamique vocale
}

export interface GeminiVoiceFeedback {
  score: number;
  strengths: string[];
  improvements: string[];
  actionableSuggestions: string[];
}

export interface VoiceAnalysisResult {
  metrics: VoiceMetrics;
  transcript: string;
  qualitativeFeedback?: GeminiVoiceFeedback;
  durationSeconds: number;
}
