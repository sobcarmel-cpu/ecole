import { GoogleGenAI } from '@google/genai';
import { GeminiVoiceFeedback, VoiceMetrics } from '../types/voiceAnalysis';

export async function analyzeSpeechWithGemini(
  transcript: string,
  metrics: VoiceMetrics,
  durationSeconds: number
): Promise<GeminiVoiceFeedback> {
  const apiKey =
    import.meta.env.VITE_GEMINI_API_KEY ||
    (typeof window !== 'undefined' ? (window as any).GEMINI_API_KEY : '');

  if (!apiKey) {
    return generateLocalFallbackFeedback(transcript, metrics, durationSeconds);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `
Tu es le jury officiel et Maître de Rhétorique de l'École d'Art Oratoire "Verbe".
Tu analyses la transcription d'une prise de parole d'un orateur, ainsi que ses indicateurs physiques (débit, tics, volume dB, intonation, pauses).

Donne un bilan rigoureux et bienveillant en français selon les canons de l'art oratoire.
Réponds STRICTEMENT sous format JSON avec ce schéma :
{
  "score": number, // note globale de 0 à 100
  "strengths": string[], // max 3 points forts précis
  "improvements": string[], // max 3 axes d'amélioration prioritaires
  "actionableSuggestions": string[] // max 3 exercices ou ajustements concrets immédiats
}
    `.trim();

    const userPrompt = `
Transcription du discours :
"${transcript || 'Discours oral capté sans texte complet'}"

Indicateurs mesurés :
- Durée : ${durationSeconds} secondes
- Débit mesuré : ${metrics.wordsPerMinute} mots/minute (WPM idéal : 120-140)
- Tics de langage détectés : ${metrics.fillerWords.map((f) => `${f.word} (${f.count})`).join(', ') || 'aucun'}
- Nombre de pauses significatives : ${metrics.pausesCount}
- Volume moyen : ${metrics.averageVolumeDb} dB
- Score de dynamique vocale : ${metrics.pitchVariation}/100
    `.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const text = response.text || '';
    const parsed = JSON.parse(text) as GeminiVoiceFeedback;
    return parsed;
  } catch (error) {
    console.warn('Gemini API call failed, falling back to local heuristic evaluation:', error);
    return generateLocalFallbackFeedback(transcript, metrics, durationSeconds);
  }
}

function generateLocalFallbackFeedback(
  transcript: string,
  metrics: VoiceMetrics,
  durationSeconds: number
): GeminiVoiceFeedback {
  const wpm = metrics.wordsPerMinute;
  const totalFillers = metrics.fillerWords.reduce((acc, f) => acc + f.count, 0);
  const variance = metrics.pitchVariation;

  let score = 74;
  if (wpm >= 115 && wpm <= 145) score += 12;
  else if (wpm > 155 || (wpm < 95 && durationSeconds > 5)) score -= 10;

  if (totalFillers === 0 && durationSeconds > 8) score += 10;
  else if (totalFillers > 3) score -= Math.min(totalFillers * 3, 16);

  if (variance >= 35) score += 6;
  else if (variance < 20) score -= 8;

  score = Math.max(35, Math.min(98, score));

  const strengths: string[] = [];
  const improvements: string[] = [];
  const suggestions: string[] = [];

  if (wpm >= 115 && wpm <= 145) {
    strengths.push('Cadence de parole idéale (120-140 WPM), propice à la clarté et à l\'écoute.');
  } else if (wpm > 145) {
    improvements.push('Débit légèrement trop rapide : risque de perte de relief sur les mots clés.');
    suggestions.push('Installez une respiration diaphragmatique de 2 secondes avant chaque nouvel argument.');
  } else {
    improvements.push('Rythme trop mesuré : risque d\'assoupir l\'auditoire.');
    suggestions.push('Accélérez le tempo sur vos verbes d\'action pour entraîner la salle.');
  }

  if (totalFillers <= 1) {
    strengths.push('Élocution très soignée, quasiment aucun mot parasite.');
  } else {
    improvements.push(`${totalFillers} tics de langage relevés (${metrics.fillerWords.map((f) => `"${f.word}"`).join(', ')}).`);
    suggestions.push('Fermez doucement les lèvres lorsque vous cherchez vos mots : le silence pose l\'autorité.');
  }

  if (variance >= 30) {
    strengths.push('Ligne mélodique vivante qui évite la monotonie soporifique.');
  } else {
    improvements.push('Ligne mélodique relativement monocorde.');
    suggestions.push('Variez les registres : voix grave de poitrine pour asseoir les faits, voix montante pour interpeller.');
  }

  if (metrics.pausesCount >= 2) {
    strengths.push('Bonne gestion des silences pour ponctuer le propos.');
  }

  return {
    score,
    strengths: strengths.slice(0, 3),
    improvements: improvements.slice(0, 3),
    actionableSuggestions: suggestions.slice(0, 3),
  };
}
