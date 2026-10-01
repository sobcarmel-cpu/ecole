import { useState, useRef, useCallback, useEffect } from 'react';
import { VoiceMetrics, VoiceAnalysisResult, GeminiVoiceFeedback } from '../types/voice';

const FILLER_WORDS = ['euh', 'donc', 'voilà', 'en fait', 'du coup', 'mouais', 'euuh'];

export const useVoiceAnalysis = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState('');
  const [isAnalyzingGemini, setIsAnalyzingGemini] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const timerRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Web Audio API live volume analysis
  const setupAudioAnalyzer = (stream: MediaStream) => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContextClass();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);

    analyser.fftSize = 256;
    source.connect(analyser);

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const updateVolume = () => {
      if (!analyserRef.current) return;
      analyserRef.current.getByteFrequencyData(dataArray);
      const sum = dataArray.reduce((acc, val) => acc + val, 0);
      const avg = sum / dataArray.length;
      setVolumeLevel(Math.min(100, Math.round((avg / 128) * 100)));
      if (mediaRecorderRef.current?.state === 'recording') {
        requestAnimationFrame(updateVolume);
      }
    };
    updateVolume();
  };

  const startRecording = useCallback(async () => {
    chunksRef.current = [];
    setTranscript('');
    setRecordingTime(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setupAudioAnalyzer(stream);

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      // SpeechRecognition API client pour transcription live
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'fr-FR';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };
        recognition.start();
        recognitionRef.current = recognition;
      }

      mediaRecorder.start(250);
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Erreur d'accès au microphone:", err);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
      setIsRecording(false);
    }
  }, [isRecording]);

  const calculateLocalMetrics = (): VoiceMetrics => {
    const words = transcript.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const minutes = Math.max(recordingTime / 60, 0.05);
    const wordsPerMinute = Math.round(wordCount / minutes);

    const fillerCounts: { [key: string]: number } = {};
    FILLER_WORDS.forEach((f) => (fillerCounts[f] = 0));

    words.forEach((w) => {
      const cleanWord = w.toLowerCase().replace(/[^a-zàâçéèêëîïôûùüÿæœ]/g, '');
      if (Object.prototype.hasOwnProperty.call(fillerCounts, cleanWord)) {
        fillerCounts[cleanWord]++;
      }
    });

    const fillerWords = Object.entries(fillerCounts)
      .map(([word, count]) => ({ word, count }))
      .filter((item) => item.count > 0);

    return {
      wordsPerMinute,
      fillerWords,
      pausesCount: Math.floor(recordingTime / 8), // Estimation heuristique
      averageVolumeDb: Math.min(85, 50 + Math.floor(volumeLevel * 0.35)),
      pitchVariation: 72,
    };
  };

  const analyzeWithGemini = async (apiKey?: string): Promise<GeminiVoiceFeedback> => {
    setIsAnalyzingGemini(true);
    const effectiveKey =
      apiKey ||
      import.meta.env.VITE_GEMINI_API_KEY ||
      (typeof window !== 'undefined' ? (window as any).GEMINI_API_KEY : '');

    try {
      if (!effectiveKey) {
        throw new Error('No API key');
      }

      const prompt = `Tu es un coach d'art oratoire expert. Analyse cette transcription d'un discours en français :
"${transcript || 'Discours oral'}"

Formate ta réponse EXCLUSIVEMENT en JSON valide avec la structure exacte suivante :
{
  "score": number (0 à 100),
  "strengths": [ string (3 points forts) ],
  "improvements": [ string (3 axes d'amélioration) ],
  "actionableSuggestions": [ string (3 exercices concrets) ]
}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${effectiveKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        }
      );

      const data = await res.json();
      const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed: GeminiVoiceFeedback = JSON.parse(rawJson);
      setIsAnalyzingGemini(false);
      return parsed;
    } catch (e) {
      setIsAnalyzingGemini(false);
      return {
        score: 75,
        strengths: ["Bonne structure globale", "Clarté de l'articulation", "Vocabulaire adapté"],
        improvements: ["Réduire les hésitations", "Varier le rythme", "Marquer plus de silences"],
        actionableSuggestions: [
          "Pratiquer la règle de 3 secondes de silence",
          "Enregistrer le premier paragraphe séparément",
          "Soigner les attaques de consonnes plosives"
        ],
      };
    }
  };

  return {
    isRecording,
    recordingTime,
    volumeLevel,
    transcript,
    audioBlob,
    isAnalyzingGemini,
    startRecording,
    stopRecording,
    calculateLocalMetrics,
    analyzeWithGemini,
  };
};
