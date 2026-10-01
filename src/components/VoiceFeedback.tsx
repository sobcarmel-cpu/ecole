import React, { useState, useMemo } from 'react';
import { useVoiceAnalysis } from '../hooks/useVoiceAnalysis';
import { VoiceAnalysisResult } from '../types/voice';

export interface VoiceFeedbackProps {
  geminiApiKey?: string;
}

export const VoiceFeedback: React.FC<VoiceFeedbackProps> = ({ geminiApiKey = '' }) => {
  const {
    isRecording,
    recordingTime,
    volumeLevel,
    transcript,
    audioBlob,
    isAnalyzingGemini,
    startRecording,
    stopRecording,
    calculateLocalMetrics,
    analyzeWithGemini
  } = useVoiceAnalysis();

  const [result, setResult] = useState<VoiceAnalysisResult | null>(null);

  const audioUrl = useMemo(() => {
    return audioBlob ? URL.createObjectURL(audioBlob) : null;
  }, [audioBlob]);

  const handleStart = () => {
    setResult(null);
    startRecording();
  };

  const handleStopAndProcess = () => {
    stopRecording();
    setTimeout(() => {
      const metrics = calculateLocalMetrics();
      setResult({
        metrics,
        transcript,
        durationSeconds: recordingTime
      });
    }, 300);
  };

  const handleRunGemini = async () => {
    if (!result) return;
    const qualitative = await analyzeWithGemini(geminiApiKey);
    setResult((prev) => (prev ? { ...prev, qualitativeFeedback: qualitative } : null));
  };

  const formatTime = (sec: number) =>
    `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;

  const getWpmStatusColor = (wpm: number) => {
    if (wpm >= 120 && wpm <= 160) return 'text-emerald-400 bg-emerald-950/40 border-emerald-800';
    if (wpm < 120) return 'text-amber-400 bg-amber-950/40 border-amber-800';
    return 'text-rose-400 bg-rose-950/40 border-rose-800';
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Analyse Vocale Live & Feedback IA
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Évaluez votre débit, vos tics de langage et votre dynamique oratoire.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="font-mono text-lg sm:text-xl font-bold px-4 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-200">
            {formatTime(recordingTime)}
          </div>

          {/* Recording Control & Live Waveform Indicator */}
          {isRecording ? (
            <button
              onClick={handleStopAndProcess}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-md transition-all cursor-pointer ring-4 ring-rose-900/40 animate-pulse"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
              <span>Arrêter l'enregistrement</span>
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[#f2552f] hover:bg-[#d94420] shadow-md transition-all cursor-pointer ring-4 ring-orange-950/50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="6" fill="currentColor" />
              </svg>
              <span>Démarrer la prise de parole</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Audio Visualizer */}
      <div className="space-y-2 bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-4">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span className="font-medium">Intensité sonore (Web Audio API)</span>
          <span className="font-mono font-bold text-neutral-200">{volumeLevel}%</span>
        </div>
        <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-100 rounded-full ${
              volumeLevel > 80
                ? 'bg-rose-500'
                : volumeLevel > 40
                ? 'bg-emerald-400'
                : 'bg-cyan-500'
            }`}
            style={{ width: `${volumeLevel}%` }}
          ></div>
        </div>

        {/* Audio player if recorded */}
        {audioUrl && !isRecording && (
          <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between">
            <audio src={audioUrl} controls className="h-8 max-w-xs" />
            <button
              onClick={handleStart}
              className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Nouvel essai
            </button>
          </div>
        )}
      </div>

      {/* Realtime Live Transcript Preview */}
      {isRecording && (
        <div className="space-y-2 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#f2552f] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            Transcription en direct
          </div>
          <p className="text-sm text-neutral-300 font-serif italic leading-relaxed">
            « {transcript || 'Parlez dans votre microphone...'} »
          </p>
        </div>
      )}

      {/* Post-Recording Analysis Dashboard */}
      {result && !isRecording && (
        <div className="space-y-6 pt-2">
          {/* Quantitative Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Débit (Mots/Min) */}
            <div
              className={`p-4 rounded-2xl border transition-all ${getWpmStatusColor(
                result.metrics.wordsPerMinute
              )}`}
            >
              <div className="text-xs opacity-80 uppercase tracking-wider font-medium mb-1">
                Débit (Mots/Min)
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono">
                {result.metrics.wordsPerMinute}
              </div>
              <div className="text-xs mt-1.5 opacity-90 font-medium">
                {result.metrics.wordsPerMinute >= 120 && result.metrics.wordsPerMinute <= 160
                  ? 'Cible idéale (120-160 WPM)'
                  : result.metrics.wordsPerMinute < 120
                  ? 'Légèrement trop lent'
                  : 'Débit trop rapide'}
              </div>
            </div>

            {/* Tics de langage */}
            <div className="p-4 rounded-2xl border bg-neutral-950/60 border-neutral-800 text-neutral-200">
              <div className="text-xs text-neutral-400 uppercase tracking-wider font-medium mb-1">
                Tics de langage
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-rose-400">
                {result.metrics.fillerWords.reduce((acc, f) => acc + f.count, 0)}
              </div>
              <div className="text-xs mt-1.5 text-neutral-400 truncate">
                {result.metrics.fillerWords.map((f) => `${f.word} (${f.count})`).join(', ') ||
                  'Aucun tic détecté !'}
              </div>
            </div>

            {/* Pauses stratégiques */}
            <div className="p-4 rounded-2xl border bg-neutral-950/60 border-neutral-800 text-neutral-200">
              <div className="text-xs text-neutral-400 uppercase tracking-wider font-medium mb-1">
                Pauses stratégiques
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">
                {result.metrics.pausesCount}
              </div>
              <div className="text-xs mt-1.5 text-neutral-400">
                Silences respirants retenus
              </div>
            </div>

            {/* Modulation vocale */}
            <div className="p-4 rounded-2xl border bg-neutral-950/60 border-neutral-800 text-neutral-200">
              <div className="text-xs text-neutral-400 uppercase tracking-wider font-medium mb-1">
                Modulation vocale
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">
                {result.metrics.pitchVariation}
                <span className="text-sm font-normal text-neutral-500">/100</span>
              </div>
              <div className="text-xs mt-1.5 text-neutral-400">
                Variabilité mélodique
              </div>
            </div>
          </div>

          {/* Transcription finale */}
          {result.transcript && (
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
              <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                Texte prononcé ({result.durationSeconds}s) :
              </span>
              <p className="text-sm text-neutral-200 font-serif italic leading-relaxed">
                « {result.transcript} »
              </p>
            </div>
          )}

          {/* Trigger Gemini Qualitative Analysis */}
          {!result.qualitativeFeedback && (
            <div className="pt-2">
              <button
                onClick={handleRunGemini}
                disabled={isAnalyzingGemini}
                className="w-full py-3.5 px-6 rounded-2xl text-sm font-bold text-neutral-950 bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 hover:from-amber-300 hover:to-amber-500 disabled:opacity-60 transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                {isAnalyzingGemini ? (
                  <>
                    <span className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Analyse Gemini 2.5 en cours...</span>
                  </>
                ) : (
                  <span>✨ Analyser le fond & la rhétorique avec Gemini</span>
                )}
              </button>
            </div>
          )}

          {/* Qualitative Feedback Cards */}
          {result.qualitativeFeedback && (
            <div className="p-6 sm:p-7 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block">
                    Diagnostic d'Éloquence
                  </span>
                  <h4 className="text-lg font-bold text-white mt-0.5">
                    Feedback Qualitatif IA
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400 block">Score global :</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    {result.qualitativeFeedback.score}/100
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                {/* Points Forts */}
                <div className="space-y-2 p-4 rounded-2xl bg-neutral-900 border border-emerald-900/40">
                  <div className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    ✓ Points Forts
                  </div>
                  <ul className="space-y-1.5 text-neutral-200">
                    {result.qualitativeFeedback.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Axes d'Amélioration */}
                <div className="space-y-2 p-4 rounded-2xl bg-neutral-900 border border-rose-900/40">
                  <div className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    ⚠ Axes d'Amélioration
                  </div>
                  <ul className="space-y-1.5 text-neutral-200">
                    {result.qualitativeFeedback.improvements.map((imp, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-400">•</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exercices Conseillés */}
                <div className="space-y-2 p-4 rounded-2xl bg-neutral-900 border border-amber-900/40">
                  <div className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    💡 Exercices Conseillés
                  </div>
                  <ul className="space-y-1.5 text-neutral-200">
                    {result.qualitativeFeedback.actionableSuggestions.map((sug, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400">→</span>
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
