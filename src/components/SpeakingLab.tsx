import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Mic, Eye, Sparkles, Check, ChevronRight, MessageSquare, Activity, Camera } from 'lucide-react';
import { VIRELANGUES } from '../data/courses';
import { VoiceFeedback } from './VoiceFeedback';
import { ChatCoach } from './ChatCoach';
import { VideoPostureAnalyzer } from './VideoPostureAnalyzer';

export const SpeakingLab: React.FC = () => {
  const [labMode, setLabMode] = useState<'voice' | 'coach' | 'video'>('voice');
  // Breathing Trainer State
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inspire' | 'retention' | 'expire'>('inspire');
  const [breathCountdown, setBreathCountdown] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  // Teleprompter / Pacer State
  const [isPrompting, setIsPrompting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [targetWpm, setTargetWpm] = useState(130);
  const [promptText, setPromptText] = useState(
    `Mesdames et messieurs, chaque prise de parole est une promesse. Lorsque vous montez sur cette estrade, le silence qui précède vos premiers mots n'est pas un vide angoissant : c'est un espace sacré que vous habitez.\n\nRegardez le dernier rang de la salle. Sentez vos pieds fermement ancrés dans le sol. Respirez par le ventre. Ce que vous êtes sur le point de partager a le pouvoir de clarifier un doute, d'éclairer une décision, ou d'inspirer une vie.`
  );

  // Virelangue active index
  const [activeVirelangueIndex, setActiveVirelangueIndex] = useState(0);
  const [virelangueDone, setVirelangueDone] = useState<number[]>([]);

  // Selected Photo Analysis
  const [selectedPhoto, setSelectedPhoto] = useState<number>(0);

  // Breathing interval engine
  useEffect(() => {
    if (!isBreathing) return;

    const timer = setInterval(() => {
      setBreathCountdown((prev) => {
        if (prev > 1) return prev - 1;

        if (breathPhase === 'inspire') {
          setBreathPhase('retention');
          return 2;
        } else if (breathPhase === 'retention') {
          setBreathPhase('expire');
          return 6;
        } else {
          setBreathPhase('inspire');
          setCyclesCompleted((c) => c + 1);
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreathing, breathPhase]);

  // Teleprompter interval engine
  useEffect(() => {
    if (!isPrompting) return;

    const interval = setInterval(() => {
      setScrollProgress((prev) => {
        if (prev >= 100) {
          setIsPrompting(false);
          return 100;
        }
        // Advance smoothly based on WPM
        return prev + 0.35 * (targetWpm / 120);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPrompting, targetWpm]);

  const photoAnalyses = [
    {
      title: 'L\'entrée en scène et l\'adresse au grand auditorium',
      image: '/src/assets/images/hero_black_speaker_1790879377283.jpg',
      alt: 'Conférencier noir sur scène face à un vaste public attentif',
      points: [
        'Posture verticale sans raideur : le buste est ouvert vers l\'ensemble de l\'hémicycle.',
        'Prise en main du micro : maintenu fermement sans crispation des phalanges.',
        'Regard à 180 degrés : balayage continu pour inclure chaque travée dans le champ d\'énergie.',
        'Gestion de la lumière : ne cillez pas sous les projecteurs, utilisez les halos comme repères scéniques.'
      ]
    },
    {
      title: 'L\'intimité de la voix et la captation au microphone',
      image: '/src/assets/images/speaker_black_orator_mic_1790879402116.jpg',
      alt: 'Gros plan sur un orateur noir et son micro de scène',
      points: [
        'Distance idéale de 3 à 5 cm sous la commissure des lèvres pour éliminer les bruits de souffle.',
        'Relâchement de la mâchoire inférieure pour libérer la résonance du masque facial.',
        'La tête reste droite pour ne pas comprimer la trachée et le larynx.',
        'L\'expression faciale soutient le sens du mot avant même que le son ne sorte.'
      ]
    },
    {
      title: 'La gestuelle ouverte et l\'énergie illustrative',
      image: '/src/assets/images/speaker_black_woman_stage_1790879390986.jpg',
      alt: 'Conférencière noire avec gestuelle ouverte sur scène',
      points: [
        'Paumes de mains visibles au-dessus de la ceinture : symbole universel de sincérité et de clarté.',
        'Gestes synchronisés avec les mots clés majeurs : jamais de mouvements erratiques ou saccadés.',
        'Occupation de l\'espace scénique : déplacements mesurés sur 3 pas avant de se stabiliser.',
        'Sourire bienveillant dès l\'amorce d\'une nouvelle partie du discours.'
      ]
    },
    {
      title: 'L\'art oratoire classique au pupitre solennel',
      image: '/src/assets/images/speaker_black_keynote_hall_1790879414109.jpg',
      alt: 'Orateur noir à la tribune classique avec éclairage dramatique',
      points: [
        'Ne vous affaissez jamais sur le pupitre : utilisez-le comme un tremplin d\'autorité.',
        'Feuilles de notes non agrafées pour éviter le bruissement et la manipulation nerveuse.',
        'Silences solennels de 3 secondes pour laisser infuser les phrases charnières.',
        'Modulation de la hauteur de voix (passage de la basse de conviction à l\'élan d\'espoir).'
      ]
    },
    {
      title: 'L\'interaction vivante et la proximité avec le public',
      image: '/src/assets/images/speaker_black_coach_workshop_1790879424808.jpg',
      alt: 'Formateur noir descendant vers son auditoire lors d\'un atelier',
      points: [
        'Réduction de la distance physique pour créer une relation de confiance immédiate.',
        'Écoute active des questions : inclinaison légère de la tête et hochement d\'encouragement.',
        'Relais de la parole : répéter la question pour que toute la salle l\'entende.',
        'Démocratisation de l\'éloquence : encourager chaque participant à oser s\'exprimer.'
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold text-[#f2552f] uppercase tracking-wider">
          Laboratoire d’entraînement interactif
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
          L'Atelier Pratique de l'Orateur
        </h2>
        <p className="text-neutral-600 text-sm mt-1 max-w-2xl">
          Développez vos automatismes vocaux et corporels avec des simulateurs d'exercices conçus par des professionnels de la scène.
        </p>
      </div>

      {/* Sélecteur de mode d'entraînement interactif */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-neutral-100 rounded-2xl w-fit">
        <button
          onClick={() => setLabMode('voice')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            labMode === 'voice'
              ? 'bg-white text-neutral-900 shadow-xs'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Activity className="w-4 h-4 text-[#f2552f]" />
          <span>Analyseur Vocal Live</span>
        </button>
        <button
          onClick={() => setLabMode('coach')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            labMode === 'coach'
              ? 'bg-white text-neutral-900 shadow-xs'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-[#f2552f]" />
          <span>Coach Marcus (IA Senior)</span>
        </button>
        <button
          onClick={() => setLabMode('video')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            labMode === 'video'
              ? 'bg-white text-neutral-900 shadow-xs'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Camera className="w-4 h-4 text-[#f2552f]" />
          <span>Vidéo Lab & Vision IA</span>
        </button>
      </div>

      {/* Module interactif actif */}
      {labMode === 'voice' ? (
        <VoiceFeedback />
      ) : labMode === 'coach' ? (
        <ChatCoach />
      ) : (
        <VideoPostureAnalyzer />
      )}

      {/* Grid des simulateurs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Simulateur 1 : Guide Respiratoire 4-2-6 */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-neutral-400">EXERCICE PHYSIOLOGIQUE</span>
                <h3 className="text-xl font-bold text-neutral-900">Le Calme Diaphragmatique (4-2-6)</h3>
              </div>
              <span className="text-xs text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full font-medium">
                {cyclesCompleted} cycle{cyclesCompleted > 1 ? 's' : ''} validé{cyclesCompleted > 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Régule la fréquence cardiaque et dissipe le trac en activant le nerf vague par une expiration deux fois plus longue que l'inspiration.
            </p>
          </div>

          {/* Anneau interactif */}
          <div className="my-8 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Cercle d'animation */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                  breathPhase === 'inspire'
                    ? 'scale-110 bg-orange-100 border-4 border-[#f2552f]'
                    : breathPhase === 'retention'
                    ? 'scale-110 bg-amber-100 border-4 border-amber-500'
                    : 'scale-90 bg-emerald-50 border-4 border-[#2f9e63]'
                }`}
              ></div>

              <div className="relative text-center z-10 space-y-1">
                <span className="text-xs font-bold tracking-widest uppercase text-neutral-600">
                  {breathPhase === 'inspire' ? 'Inspirez' : breathPhase === 'retention' ? 'Retenez' : 'Expirez'}
                </span>
                <div className="text-4xl font-black text-neutral-900 font-mono">
                  {breathCountdown}s
                </div>
                <span className="text-[11px] text-neutral-500 block">
                  {breathPhase === 'inspire' ? 'Par le ventre' : breathPhase === 'retention' ? 'Poumons pleins' : 'Par la bouche'}
                </span>
              </div>
            </div>
          </div>

          {/* Boutons de contrôle */}
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-neutral-100">
            <button
              onClick={() => {
                setIsBreathing(!isBreathing);
                if (!isBreathing) {
                  setBreathPhase('inspire');
                  setBreathCountdown(4);
                }
              }}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white shadow-xs transition-all cursor-pointer ${
                isBreathing ? 'bg-neutral-800 hover:bg-neutral-900' : 'bg-[#f2552f] hover:bg-[#d94420]'
              }`}
            >
              {isBreathing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isBreathing ? 'Suspendre' : 'Démarrer le cycle'}
            </button>
            <button
              onClick={() => {
                setIsBreathing(false);
                setBreathCountdown(4);
                setBreathPhase('inspire');
                setCyclesCompleted(0);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Réinitialiser
            </button>
          </div>
        </div>

        {/* Simulateur 2 : Défilement & Cadence de parole (Téléprompteur WPM) */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-neutral-400">RYTHME & TEMPO</span>
                <h3 className="text-xl font-bold text-neutral-900">Le Pacer de Débit (Mots / Minute)</h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                <span>Cible : {targetWpm} WPM</span>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Le bon tempo d’un conférencier se situe entre 120 et 140 mots par minute. Plus vous parlez vite, plus vous perdez en solennité.
            </p>
          </div>

          {/* Fenêtre de lecture avec défilement fluide */}
          <div className="my-6 bg-neutral-900 text-white rounded-2xl p-6 h-52 overflow-hidden relative shadow-inner flex flex-col justify-center">
            {/* Ligne repère de lecture */}
            <div className="absolute top-1/2 left-0 right-0 h-10 -translate-y-1/2 bg-white/10 pointer-events-none border-y border-white/20"></div>

            <div
              className="transition-transform duration-300 ease-linear space-y-4"
              style={{ transform: `translateY(${50 - scrollProgress * 1.5}px)` }}
            >
              <p className="text-lg sm:text-xl font-medium leading-relaxed font-serif-title text-neutral-100">
                {promptText}
              </p>
            </div>

            {/* Indicateur de barre de progression */}
            <div className="absolute bottom-2 left-4 right-4 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#f2552f] transition-all duration-200"
                style={{ width: `${scrollProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Contrôles du tempo */}
          <div className="space-y-4 pt-3 border-t border-neutral-100">
            <div className="flex items-center justify-between text-xs text-neutral-600">
              <span>Calme (110)</span>
              <input
                type="range"
                min="100"
                max="180"
                step="5"
                value={targetWpm}
                onChange={(e) => setTargetWpm(Number(e.target.value))}
                className="w-48 accent-[#f2552f] cursor-pointer"
              />
              <span>Énergique (170)</span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsPrompting(!isPrompting)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[#f2552f] hover:bg-[#d94420] shadow-xs transition-all cursor-pointer"
              >
                {isPrompting ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPrompting ? 'Pause' : scrollProgress >= 100 ? 'Recommencer' : 'S\'entraîner au débit'}
              </button>
              <button
                onClick={() => {
                  setIsPrompting(false);
                  setScrollProgress(0);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Remettre au début
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Les Virelangues d'Articulateur */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-semibold text-[#2f9e63] uppercase tracking-wider">
              Gymnastique Maxillo-Faciale
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
              Les Virelangues de l'Éloquence
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Répétez chaque phrase trois fois : d'abord lentement en sur-articulant, puis à vitesse normale, puis à pleine vélocité.
            </p>
          </div>
          <div className="text-xs text-neutral-500 font-medium">
            Progression : {virelangueDone.length}/{VIRELANGUES.length} réussis
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VIRELANGUES.map((v, idx) => {
            const isDone = virelangueDone.includes(idx);
            const isActive = activeVirelangueIndex === idx;

            return (
              <div
                key={v.id}
                onClick={() => setActiveVirelangueIndex(idx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'border-[#f2552f] bg-orange-50/50 shadow-xs'
                    : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span className="font-mono">Exercice #{idx + 1}</span>
                    <span className="text-neutral-500 font-medium">{v.target.split(' — ')[0]}</span>
                  </div>
                  <p className="text-base font-semibold text-neutral-900 leading-snug font-serif-title">
                    « {v.text} »
                  </p>
                  <p className="text-xs text-neutral-500 mt-2 italic">
                    Cible : {v.target.split(' — ')[1]}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-neutral-200/60 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setVirelangueDone((prev) =>
                        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
                      );
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      isDone
                        ? 'bg-[#2f9e63] text-white'
                        : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {isDone ? 'Maîtrisé' : 'Valider'}
                  </button>
                  <span className="text-xs text-neutral-400">3x sans bafouiller</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3 : Galerie d'analyse photographique des postures */}
      <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
            Analyse Visuelle de Scène
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-white">
            Décryptage de la Posture des Orateurs en Situation Réelle
          </h3>
          <p className="text-neutral-400 text-sm mt-2">
            Cliquez sur chaque mise en situation pour étudier les détails qui font la différence entre une intervention anodine et un triomphe scénique.
          </p>
        </div>

        {/* Sélecteur de scènes */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {photoAnalyses.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPhoto(idx)}
              className={`p-2 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-2 ${
                selectedPhoto === idx
                  ? 'border-[#f2552f] bg-neutral-800/80 ring-2 ring-[#f2552f]/40'
                  : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-neutral-800">
                <img
                  src={p.image}
                  alt={p.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-medium text-neutral-200 line-clamp-1">
                {p.title.split(' : ')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Détail de la scène sélectionnée */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-800/60 border border-neutral-700/60 rounded-2xl p-6 sm:p-8">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-2xl relative group">
            <img
              src={photoAnalyses[selectedPhoto].image}
              alt={photoAnalyses[selectedPhoto].alt}
              referrerPolicy="no-referrer"
              className="w-full aspect-16/10 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-6">
              <span className="text-xs text-neutral-300 font-medium bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-xs">
                {photoAnalyses[selectedPhoto].alt}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs text-[#f2552f] font-semibold tracking-wider uppercase">
              Observation #{selectedPhoto + 1}
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              {photoAnalyses[selectedPhoto].title}
            </h4>

            <div className="space-y-3 pt-2">
              {photoAnalyses[selectedPhoto].points.map((pt, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-[#f2552f]/20 text-[#f2552f] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    {i + 1}
                  </div>
                  <p>{pt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
