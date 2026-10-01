import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Users,
  MessageSquare,
  FileText,
  Sparkles,
  Send,
  ThumbsUp,
  Clock,
  Radio,
  BookOpen,
  Share2,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import {
  HERO_IMAGE,
  WEBINAR_CHAPTERS,
  INITIAL_CHAT,
  WebinarChapter,
  ChatMessage
} from '../data/courses';

interface WebinarLivePlayerProps {
  onGoToCourse?: (courseId: string) => void;
  onGoToLab?: () => void;
}

export const WebinarLivePlayer: React.FC<WebinarLivePlayerProps> = ({
  onGoToCourse,
  onGoToLab,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(420); // 7m00s into the masterclass
  const totalDurationSec = 3200; // ~53 mins
  const [activeTab, setActiveTab] = useState<'chat' | 'slides' | 'notes'>('chat');
  const [chatFilter, setChatFilter] = useState<'all' | 'top' | 'summary'>('all');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [newComment, setNewComment] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [viewerCount, setViewerCount] = useState(1420);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Synchronize chapter with current time
  useEffect(() => {
    let currentIdx = 0;
    for (let i = WEBINAR_CHAPTERS.length - 1; i >= 0; i--) {
      if (currentTimeSec >= WEBINAR_CHAPTERS[i].seconds) {
        currentIdx = i;
        break;
      }
    }
    setActiveChapterIndex(currentIdx);
  }, [currentTimeSec]);

  // Simulate playback time progression
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTimeSec((t) => {
        if (t >= totalDurationSec) {
          setIsPlaying(false);
          return totalDurationSec;
        }
        return t + 1 * playbackSpeed;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Subtle viewer count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((v) => v + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentChapter = WEBINAR_CHAPTERS[activeChapterIndex];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'Vous',
      avatarBg: '#f2552f',
      message: newComment.trim(),
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      likes: 1,
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setNewComment('');

    // Simulate an answer after 3 seconds
    setTimeout(() => {
      const responseMsg: ChatMessage = {
        id: 'reply_' + Date.now(),
        sender: 'Sarah Danis (Co-formatrice)',
        avatarBg: '#1d2430',
        message: 'Excellente remarque posée en direct ! Nous l\'abordons justement dans le chapitre 4.',
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        likes: 5,
      };
      setChatMessages((prev) => [...prev, responseMsg]);
    }, 2800);
  };

  return (
    <div className="space-y-6">
      {/* En-tête Webinaire */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-600"></span> DIRECT HD
            </span>
            <span className="text-xs text-neutral-500 font-medium flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {viewerCount.toLocaleString('fr-FR')} participants connectés
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
            Grande Masterclass : L'Art de Dompter la Scène
          </h1>
          <p className="text-neutral-500 text-xs sm:text-sm mt-0.5">
            Intervenants : Marc-Aurèle Valvert & Sarah Danis · En direct du Grand Amphithéâtre
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onGoToLab && (
            <button
              onClick={onGoToLab}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-full transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#f2552f]" />
              Atelier d'exercices
            </button>
          )}
          {onGoToCourse && (
            <button
              onClick={() => onGoToCourse('p1')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#f2552f] hover:bg-[#d94420] rounded-full transition-colors cursor-pointer shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Cursus complet 5 modules
            </button>
          )}
        </div>
      </div>

      {/* Main Grid : Vidéo Scénique HD + Panneau Latéral Interactif */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Colonne Lecteur Vidéo (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-3xl overflow-hidden shadow-xl bg-neutral-950 aspect-16/9 group">
            {/* Image réelle de l'orateur en scène */}
            <img
              src={HERO_IMAGE}
              alt="Orateur en scène durant le webinaire face à l'amphithéâtre"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-101' : 'scale-100 brightness-90'}`}
            />

            {/* Overlay Gradient pour la lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/30 pointer-events-none"></div>

            {/* Badge haut gauche : Chapitre actif */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-neutral-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white text-xs">
              <Radio className="w-3 h-3 text-[#f2552f] animate-pulse" />
              <span className="font-semibold">{currentChapter.timeStr}</span>
              <span className="text-neutral-400">·</span>
              <span className="text-neutral-200 truncate max-w-xs">{currentChapter.title}</span>
            </div>

            {/* En direct / Son indicateur */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-8 h-8 rounded-full bg-neutral-950/70 backdrop-blur-md text-white flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer border border-white/10"
                aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Centre : Bouton Play/Pause flottant si survol */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#f2552f]/90 hover:bg-[#f2552f] text-white flex items-center justify-center shadow-2xl transition-all scale-95 group-hover:scale-100 cursor-pointer backdrop-blur-xs"
              aria-label={isPlaying ? 'Pause' : 'Reprendre'}
            >
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 translate-x-0.5" />}
            </button>

            {/* Barre de contrôle basse */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10 space-y-2">
              {/* Timeline scrubber */}
              <div
                className="relative h-2 bg-white/20 hover:h-2.5 rounded-full cursor-pointer transition-all overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  setCurrentTimeSec(Math.floor(pos * totalDurationSec));
                }}
              >
                <div
                  className="h-full bg-[#f2552f] rounded-full transition-all"
                  style={{ width: `${(currentTimeSec / totalDurationSec) * 100}%` }}
                ></div>
              </div>

              {/* Ligne boutons bas */}
              <div className="flex items-center justify-between text-white text-xs pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-[#f2552f] transition-colors cursor-pointer font-medium"
                  >
                    {isPlaying ? 'Pause' : 'Lecture'}
                  </button>
                  <span className="font-mono text-neutral-300">
                    {formatTime(currentTimeSec)} / {formatTime(totalDurationSec)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Vitesse */}
                  <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md">
                    {[1, 1.25, 1.5].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setPlaybackSpeed(speed)}
                        className={`px-1.5 py-0.5 rounded text-[11px] font-mono cursor-pointer ${
                          playbackSpeed === speed ? 'bg-[#f2552f] text-white font-bold' : 'text-neutral-300 hover:text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400 hidden sm:inline">1080p 60fps</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sommaire & Chapitres du Webinaire */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs">
            <h3 className="text-base font-bold text-neutral-900 mb-3 flex items-center justify-between">
              <span>Chapitres & Temps forts du discours</span>
              <span className="text-xs font-normal text-neutral-400">
                {WEBINAR_CHAPTERS.length} parties
              </span>
            </h3>

            <div className="space-y-2">
              {WEBINAR_CHAPTERS.map((ch, idx) => {
                const isSelected = activeChapterIndex === idx;
                return (
                  <div
                    key={ch.id}
                    onClick={() => {
                      setCurrentTimeSec(ch.seconds);
                      setActiveChapterIndex(idx);
                      setIsPlaying(true);
                    }}
                    className={`flex items-start justify-between gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-orange-50/80 border border-[#f2552f]/30'
                        : 'hover:bg-neutral-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-1 rounded-lg ${
                          isSelected ? 'bg-[#f2552f] text-white' : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {ch.timeStr}
                      </span>
                      <div>
                        <div className={`text-sm font-semibold ${isSelected ? 'text-[#f2552f]' : 'text-neutral-900'}`}>
                          {ch.title}
                        </div>
                        <div className="text-xs text-neutral-500 mt-0.5">
                          {ch.keyTakeaway}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-neutral-400 font-medium shrink-0 pt-1">
                      {ch.speaker.split(' & ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Colonne Droite : Onglets Chat / Diapositive synchronisée / Fiche synthétique (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-neutral-200 rounded-3xl shadow-xs overflow-hidden flex flex-col h-[640px]">
          {/* En-tête des onglets */}
          <div className="flex border-b border-neutral-100 bg-neutral-50/60 p-2 gap-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Chat & Q&R
            </button>
            <button
              onClick={() => setActiveTab('slides')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'slides'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Diapositive
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'notes'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Fiche clé
            </button>
          </div>

          {/* Contenu onglet : CHAT EN DIRECT Q&R INTELLIGENT */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden p-4">
              {/* Filtre intelligent Q&R */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100 gap-1">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setChatFilter('all')}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                      chatFilter === 'all'
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    Flux direct
                  </button>
                  <button
                    onClick={() => setChatFilter('top')}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                      chatFilter === 'top'
                        ? 'bg-[#f2552f] text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    🔥 Top Questions
                  </button>
                  <button
                    onClick={() => setChatFilter('summary')}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                      chatFilter === 'summary'
                        ? 'bg-purple-600 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    ✨ Synthèse IA
                  </button>
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold hidden sm:inline">
                  🛡️ Modération active
                </span>
              </div>

              {chatFilter === 'summary' ? (
                <div className="overflow-y-auto space-y-3 pr-1 text-xs">
                  <div className="p-3 bg-purple-50 border border-purple-200/80 rounded-2xl text-purple-950 space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-purple-900">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      Synthèse Sémantique Gemini (1 420 participants)
                    </div>
                    <p className="text-[11px] text-purple-800 leading-relaxed">
                      L'IA regroupe en direct les questions récurrentes posées par l'auditoire :
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-neutral-800">
                      <span>1. Tremblement de voix & Trac (42%)</span>
                      <span className="text-orange-600">38 questions</span>
                    </div>
                    <p className="text-[11px] text-neutral-600">
                      <strong>Réponse de Marc-Aurèle :</strong> Les mains et la voix tremblent par manque de CO2 alvéolaire. Pratiquez 3 cycles de respiration 4-2-6 juste avant l'entrée.
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-neutral-800">
                      <span>2. Gestion du Silence (31%)</span>
                      <span className="text-orange-600">26 questions</span>
                    </div>
                    <p className="text-[11px] text-neutral-600">
                      <strong>Réponse de Dr. Sophie :</strong> Le silence semble durer 10 secondes pour l'orateur, mais 2 secondes pour l'auditoire. Comptez jusqu'à 3 en respirant.
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-neutral-800">
                      <span>3. Élimination des "Euh" (27%)</span>
                      <span className="text-orange-600">19 questions</span>
                    </div>
                    <p className="text-[11px] text-neutral-600">
                      <strong>Réponse de Marcus :</strong> Fermez les lèvres dès que vous cherchez vos mots. Remplacez le tic par un regard balayant le public.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="overflow-y-auto space-y-3 pr-1 text-xs">
                  {(chatFilter === 'top'
                    ? [...chatMessages].sort((a, b) => b.likes - a.likes)
                    : chatMessages
                  ).map((msg) => (
                    <div key={msg.id} className="p-3 bg-neutral-50 hover:bg-neutral-100/70 rounded-2xl transition-colors">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-neutral-900 flex items-center gap-1.5">
                          <span
                            className="w-4 h-4 rounded-full text-[9px] text-white flex items-center justify-center font-bold"
                            style={{ backgroundColor: msg.avatarBg }}
                          >
                            {msg.sender[0]}
                          </span>
                          {msg.sender}
                        </span>
                        <span className="text-neutral-400">{msg.timestamp}</span>
                      </div>
                      <p className="text-neutral-700 text-xs mt-1 leading-relaxed">{msg.message}</p>
                      <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-2">
                        <button
                          onClick={() => {
                            setChatMessages((prev) =>
                              prev.map((m) => (m.id === msg.id ? { ...m, likes: m.likes + 1 } : m))
                            );
                          }}
                          className="inline-flex items-center gap-1 hover:text-[#f2552f] cursor-pointer"
                        >
                          <ThumbsUp className="w-3 h-3" /> {msg.likes}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Formulaire envoi message */}
              <form onSubmit={handleSendChat} className="pt-3 border-t border-neutral-100 mt-2 flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Posez votre question aux orateurs…"
                  className="flex-1 px-3.5 py-2 text-xs bg-neutral-100 border border-neutral-200 rounded-full focus:outline-none focus:border-[#f2552f] transition-all"
                />
                <button
                  type="submit"
                  className="w-8 h-8 rounded-full bg-[#f2552f] hover:bg-[#d94420] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {/* Contenu onglet : DIAPOSITIVE SYNCHRONISÉE */}
          {activeTab === 'slides' && (
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              <div className="bg-[#1d2430] text-white rounded-2xl p-6 shadow-inner min-h-[260px] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#f2552f] font-bold">
                    Diapositive #{activeChapterIndex + 1}
                  </span>
                  <h4 className="text-lg font-bold mt-1 text-white leading-snug">
                    {currentChapter.slideTitle}
                  </h4>
                  <div className="w-12 h-0.5 bg-[#f2552f] my-3"></div>
                  <p className="text-xs text-neutral-300 whitespace-pre-line leading-relaxed">
                    {currentChapter.slideBody}
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-800 flex justify-between items-center text-[10px] text-neutral-400">
                  <span>Verbe Masterclass · Octobre 2026</span>
                  <span>Synchronisé en direct</span>
                </div>
              </div>

              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/70 text-xs space-y-2">
                <span className="font-semibold text-neutral-900 block">Conseil de diffusion :</span>
                <p className="text-neutral-600">
                  Ne lisez jamais mot pour mot le contenu de votre diapositive. Le slide renforce visuellement ce que votre verbe développe.
                </p>
              </div>
            </div>
          )}

          {/* Contenu onglet : FICHE CLÉ */}
          {activeTab === 'notes' && (
            <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
              <div className="border border-neutral-200 rounded-2xl p-4 space-y-3 bg-neutral-50/50">
                <div className="font-bold text-neutral-900 text-sm">
                  {currentChapter.title}
                </div>
                <div className="text-neutral-600 leading-relaxed">
                  {currentChapter.keyTakeaway}
                </div>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200/60 rounded-2xl space-y-2">
                <span className="font-semibold text-orange-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#f2552f]" /> Règle d'or à mémoriser
                </span>
                <p className="text-orange-900 leading-relaxed text-[11px]">
                  « Une seconde de silence avant de répondre vaut dix minutes d'explications embrouillées. »
                </p>
              </div>

              {onGoToCourse && (
                <button
                  onClick={() => onGoToCourse('p1')}
                  className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-black text-white rounded-full font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Approfondir dans le cours dédié <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
