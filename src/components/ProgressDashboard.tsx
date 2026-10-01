import React, { useState } from 'react';
import {
  Flame,
  Award,
  Clock,
  Mic,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Shield,
  Zap,
  Target,
  Trophy,
  Filter,
  ArrowUpRight,
  Calendar,
  Lock
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  ORATOR_LEVELS,
  ALL_30_BADGES,
  CURRENT_CHALLENGES,
  VOCAL_SCORE_HISTORY,
  MODULE_TIME_DISTRIBUTION,
  LEAGUE_ORATORS,
  BadgeItem
} from '../data/gamification';

interface ProgressDashboardProps {
  userName?: string;
  onGoToCourse?: (courseId: string) => void;
  onGoToLab?: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  userName = 'Camille Tépone',
  onGoToCourse,
  onGoToLab,
}) => {
  const [selectedBadgeCategory, setSelectedBadgeCategory] = useState<string>('Tous');

  // Gamification state mocks
  const currentXp = 19850;
  const currentLevel = ORATOR_LEVELS[4]; // Level 5: Tribun de Tribune
  const nextLevel = ORATOR_LEVELS[5]; // Level 6
  const xpInCurrentLevel = currentXp - currentLevel.xpRequired;
  const xpNeededForNext = nextLevel.xpRequired - currentLevel.xpRequired;
  const levelProgressPct = Math.min(100, Math.round((xpInCurrentLevel / xpNeededForNext) * 100));

  const streakDays = 14;
  const streakFreezes = 2;

  // Unlocked badges (first 14 unlocked as demo)
  const unlockedBadgeIds = new Set(['b1', 'b2', 'b3', 'b5', 'b9', 'b10', 'b11', 'b12', 'b17', 'b18', 'b24', 'b25', 'b27', 'b28']);

  const filteredBadges = selectedBadgeCategory === 'Tous'
    ? ALL_30_BADGES
    : ALL_30_BADGES.filter((b) => b.category === selectedBadgeCategory);

  // Generate 35 days heatmap activity mock
  const heatmapDays = Array.from({ length: 35 }, (_, idx) => {
    const dayNum = 35 - idx;
    const count = [0, 1, 2, 3, 2, 1, 3, 0, 2, 3, 1, 2, 3, 3, 2, 1, 0, 2, 3, 2, 1, 3, 2, 3, 3, 2, 1, 3, 2, 3, 1, 2, 3, 3, 2][idx % 35];
    return { dayNum, count };
  }).reverse();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* 1. HEADER DU PROFIL : AVATAR, NIVEAU, XP & STREAK */}
      <div className="relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#f2552f]/20 via-orange-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#f2552f] to-[#f59e0b] p-1 shadow-lg flex items-center justify-center font-bold text-2xl text-white">
                {userName.charAt(0)}
              </div>
              <span className="absolute -bottom-1 -right-1 text-2xl" title="Badge de niveau">
                {currentLevel.badge}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold font-serif-title">{userName}</h1>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-950/80 text-[#f2552f] border border-orange-800/80">
                  Niveau {currentLevel.level} · {currentLevel.title}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400">
                {currentLevel.description} · Objectif : <strong className="text-white">{nextLevel.title}</strong>
              </p>
            </div>
          </div>

          {/* Widget Streak & Jokers */}
          <div className="flex items-center gap-3 bg-neutral-950/70 border border-neutral-800 p-3 sm:p-4 rounded-2xl w-fit">
            <div className="flex items-center gap-2 pr-3 border-r border-neutral-800">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-[#f2552f] flex items-center justify-center">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-white leading-tight">
                  {streakDays} jours
                </div>
                <div className="text-[10px] text-neutral-400 font-semibold uppercase">
                  Série d'assiduité
                </div>
              </div>
            </div>

            <div className="pl-1 text-left">
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                <Shield className="w-3.5 h-3.5" /> {streakFreezes} Jokers
              </div>
              <div className="text-[10px] text-neutral-400">Protections de streak</div>
            </div>
          </div>
        </div>

        {/* Barre de progression XP */}
        <div className="relative z-10 mt-6 pt-6 border-t border-neutral-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400 flex items-center gap-1.5 font-medium">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <strong className="text-white font-mono">{currentXp.toLocaleString()} XP</strong> total cumulés
            </span>
            <span className="text-neutral-400 font-mono">
              Encore <strong>{(nextLevel.xpRequired - currentXp).toLocaleString()} XP</strong> pour {nextLevel.title} ({levelProgressPct}%)
            </span>
          </div>

          <div className="h-3 bg-neutral-950 rounded-full overflow-hidden p-0.5 border border-neutral-800">
            <div
              className="h-full bg-gradient-to-r from-[#f2552f] via-orange-500 to-amber-400 rounded-full transition-all duration-700"
              style={{ width: `${levelProgressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. STATS CARDS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white border border-neutral-200 rounded-3xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Pratique</span>
            <Clock className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-neutral-900">12h 45m</div>
          <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +2h30 cette semaine
          </p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-3xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Discours</span>
            <Mic className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-neutral-900">18 sessions</div>
          <p className="text-[11px] text-neutral-500">Enregistrements analysés</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-3xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Score Vocal</span>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-neutral-900">89 / 100</div>
          <p className="text-[11px] text-emerald-600 font-medium">+15 pts en 30 jours</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-3xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Badges</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-neutral-900">14 / 30</div>
          <p className="text-[11px] text-amber-600 font-medium">47% de la collection</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-3xl p-5 shadow-xs space-y-2 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Ligue Or</span>
            <Target className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-neutral-900">3e / 1 419</div>
          <p className="text-[11px] text-purple-600 font-medium">Promotion Platine imminente</p>
        </div>
      </div>

      {/* 3. GRAPHIQUES RECHARTS & HEATMAP D'ACTIVITÉ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Évolution Score Vocal (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-neutral-900">Évolution de l'Éloquence & Débit Vocal</h3>
              <p className="text-xs text-neutral-500">
                Progression du score de présence vocale et régulation du débit (WPM)
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-[#f2552f]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f2552f]" /> Score Éloquence (/100)
              </span>
              <span className="flex items-center gap-1.5 text-blue-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Débit (Mots/Min)
              </span>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={VOCAL_SCORE_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f2552f" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f2552f" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="wpmGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#a3a3a3" fontSize={11} tickLine={false} />
                <YAxis stroke="#a3a3a3" fontSize={11} tickLine={false} domain={[50, 200]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#171717',
                    borderColor: '#262626',
                    borderRadius: '16px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="scoreVocal" stroke="#f2552f" strokeWidth={3} fillOpacity={1} fill="url(#scoreGradient)" name="Score Éloquence" />
                <Area type="monotone" dataKey="wpm" stroke="#2563eb" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#wpmGradient)" name="Débit WPM" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Heatmap d'activité façon GitHub */}
          <div className="pt-4 border-t border-neutral-100 space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span className="font-semibold text-neutral-700">Régularité des 35 derniers jours</span>
              <div className="flex items-center gap-1.5 text-[10px]">
                <span>Moins</span>
                <span className="w-3 h-3 rounded-xs bg-neutral-100" />
                <span className="w-3 h-3 rounded-xs bg-orange-200" />
                <span className="w-3 h-3 rounded-xs bg-orange-400" />
                <span className="w-3 h-3 rounded-xs bg-[#f2552f]" />
                <span>Plus</span>
              </div>
            </div>

            <div className="grid grid-cols-7 sm:grid-cols-12 md:grid-cols-18 gap-1.5">
              {heatmapDays.map((d, i) => {
                const color =
                  d.count === 0
                    ? 'bg-neutral-100'
                    : d.count === 1
                    ? 'bg-orange-200'
                    : d.count === 2
                    ? 'bg-orange-400'
                    : 'bg-[#f2552f]';
                return (
                  <div
                    key={i}
                    title={`Jour ${d.dayNum} : ${d.count} session(s)`}
                    className={`h-4 rounded-xs ${color} transition-transform hover:scale-125 cursor-pointer`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Répartition du temps par module (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900">Temps par Module</h3>
            <p className="text-xs text-neutral-500">Répartition des heures de formation</p>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MODULE_TIME_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="hours"
                >
                  {MODULE_TIME_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val} heures`, 'Temps passé']}
                  contentStyle={{
                    backgroundColor: '#171717',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-neutral-100 text-xs">
            {MODULE_TIME_DISTRIBUTION.map((m, idx) => (
              <div key={idx} className="flex items-center justify-between text-neutral-600">
                <span className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                  <span className="truncate">{m.name}</span>
                </span>
                <span className="font-mono font-bold text-neutral-900 shrink-0">{m.hours} h</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. OBJECTIFS EN COURS & RECOMMANDATIONS IA GEMINI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Défis & Quêtes en cours (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#f2552f]">
                Défis & Quêtes Actives
              </span>
              <h3 className="text-lg font-bold text-neutral-900 mt-0.5">
                Défis du Jour & de la Semaine
              </h3>
            </div>
            <span className="text-xs text-neutral-400 font-mono">3 / 5 complétés</span>
          </div>

          <div className="space-y-3">
            {CURRENT_CHALLENGES.map((ch) => (
              <div
                key={ch.id}
                className={`p-4 rounded-2xl border transition-all ${
                  ch.completed
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-neutral-50/70 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          ch.type === 'daily'
                            ? 'bg-orange-100 text-orange-800'
                            : ch.type === 'weekly'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {ch.type === 'daily' ? 'Quotidien' : ch.type === 'weekly' ? 'Hebdomadaire' : 'Mensuel'}
                      </span>
                      <h4 className="text-sm font-bold text-neutral-900">{ch.title}</h4>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">{ch.description}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-lg">
                      +{ch.xpReward} XP
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-1 font-mono">{ch.duration}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${ch.completed ? 'bg-emerald-500' : 'bg-[#f2552f]'}`}
                      style={{ width: `${ch.progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-neutral-600">
                    {ch.completed ? 'Validé ✓' : `${ch.progress}%`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommandations IA Gemini & Prochaine Étape (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#f2552f] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Recommandations Gemini
              </span>
              <span className="text-[10px] font-mono text-neutral-400">Diagnostic temps réel</span>
            </div>

            <h3 className="text-xl font-bold leading-snug">
              Ce que Marcus & l'IA vous suggèrent aujourd'hui
            </h3>

            <div className="space-y-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-400">
                  <span>1. Dompter le débit initial</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Votre débit moyen est monté à 168 WPM lors de vos 20 premières secondes hier. Marquez 3 secondes de silence pur avant d'ouvrir la bouche.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                  <span>2. Tester l'anaphore au Speaking Lab</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Entraînez-vous à répéter votre accroche 3 fois pour débloquer le badge <strong>Hommage à Churchill</strong> (+250 XP).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <span>3. Relever le défi vidéo de posture</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Votre score de stabilité physique est de 72/100. Enregistrez un test de 60 secondes en position du Trépied dans le Vidéo Lab.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onGoToLab}
            className="w-full py-3 px-4 rounded-full bg-[#f2552f] hover:bg-[#d94420] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            Lancer l'entraînement conseillé <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. COLLECTION COMPLÈTE DES 30 BADGES */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#f2552f]">
              Collection Académique
            </span>
            <h3 className="text-xl font-bold text-neutral-900 mt-0.5">
              Les 30 Badges d'Éloquence (14 / 30 Débloqués)
            </h3>
          </div>

          {/* Filtres de catégorie */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {['Tous', 'Assiduité', 'Performance', 'Communauté', 'Créativité'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedBadgeCategory(cat)}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedBadgeCategory === cat
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {filteredBadges.map((badge) => {
            const isUnlocked = unlockedBadgeIds.has(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-white border-orange-200/80 shadow-xs hover:border-[#f2552f]'
                    : 'bg-neutral-50/70 border-neutral-200 opacity-60'
                }`}
              >
                <div>
                  <div className="text-3xl mb-2 relative inline-block">
                    {badge.icon}
                    {!isUnlocked && (
                      <span className="absolute -bottom-1 -right-1 text-xs">🔒</span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900 leading-tight">
                    {badge.name}
                  </h4>
                  <p className="text-[10px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px]">
                  <span className="font-mono text-amber-600 font-bold">+{badge.xpReward} XP</span>
                  <span
                    className={`font-semibold ${
                      isUnlocked ? 'text-emerald-600' : 'text-neutral-400'
                    }`}
                  >
                    {isUnlocked ? 'Obtenu ✓' : 'Verrouillé'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. CLASSEMENT DE LA LIGUE MENSUELLE */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#f2552f]">
              Compétition & Émulation
            </span>
            <h3 className="text-xl font-bold text-neutral-900 mt-0.5">
              Ligue Or des Orateurs — Saison Mensuelle
            </h3>
          </div>
          <span className="text-xs text-neutral-500 hidden sm:inline">
            Clôture dans 6 jours · Top 3 promu en Ligue Platine
          </span>
        </div>

        <div className="divide-y divide-neutral-100">
          {LEAGUE_ORATORS.map((orator) => (
            <div
              key={orator.rank}
              className={`py-3.5 px-4 rounded-2xl flex items-center justify-between gap-4 transition-colors ${
                orator.isCurrentUser
                  ? 'bg-orange-50 border border-orange-200/80 font-semibold'
                  : 'hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                    orator.rank === 1
                      ? 'bg-amber-400 text-neutral-950 shadow-xs'
                      : orator.rank === 2
                      ? 'bg-neutral-300 text-neutral-900'
                      : orator.rank === 3
                      ? 'bg-orange-400 text-white'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {orator.rank}
                </span>

                <span className="text-xl">{orator.avatar}</span>

                <div>
                  <div className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                    {orator.name}
                    {orator.isCurrentUser && (
                      <span className="text-[10px] bg-[#f2552f] text-white px-2 py-0.5 rounded-full font-bold">
                        Vous
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-neutral-500">{orator.title}</div>
                </div>
              </div>

              <div className="font-mono text-sm font-bold text-neutral-900">
                {orator.xp.toLocaleString()} XP
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
