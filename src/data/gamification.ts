export interface OratorLevel {
  level: number;
  title: string;
  xpRequired: number;
  description: string;
  badge: string;
}

export const ORATOR_LEVELS: OratorLevel[] = [
  { level: 1, title: 'Murmureur', xpRequired: 0, description: "Premier pas sur l'application.", badge: '🌱' },
  { level: 2, title: 'Apprenti Déclamateur', xpRequired: 500, description: 'A complété son premier exercice vocal.', badge: '🎙️' },
  { level: 3, title: 'Voix Affirmée', xpRequired: 1200, description: 'Maîtrise des silences et du rythme.', badge: '⚡' },
  { level: 4, title: "Raconteur d'Histoires", xpRequired: 2500, description: 'Finalisation du module Storytelling.', badge: '📖' },
  { level: 5, title: 'Tribun de Tribune', xpRequired: 4500, description: 'Régularité de 7 jours consécutifs.', badge: '🏛️' },
  { level: 6, title: 'Capitaine de Débat', xpRequired: 7500, description: 'A réussi 10 simulations de questions difficiles.', badge: '🛡️' },
  { level: 7, title: 'Stratège Rhétorique', xpRequired: 12000, description: 'Module Persuasion accompli avec félicitations.', badge: '📐' },
  { level: 8, title: 'Orateur Charismatique', xpRequired: 18000, description: 'Score moyen vidéo > 85/100 sur 5 essais.', badge: '✨' },
  { level: 9, title: 'Conférencier Émérite', xpRequired: 25000, description: 'Membre du Top 5% de la communauté.', badge: '💎' },
  { level: 10, title: 'Maître Orateur Verbe', xpRequired: 35000, description: 'Obtention du grand certificat final.', badge: '🏆' },
];

export interface BadgeItem {
  id: string;
  name: string;
  category: 'Assiduité' | 'Performance' | 'Communauté' | 'Créativité';
  description: string;
  condition: string;
  icon: string;
  xpReward: number;
  unlockedAt?: string;
}

export const ALL_30_BADGES: BadgeItem[] = [
  // 1. Assiduité (8 badges)
  { id: 'b1', name: 'Premier Accord', category: 'Assiduité', description: 'Premier exercice vocal complété', condition: 'Terminer 1 exercice', icon: '🎵', xpReward: 50 },
  { id: 'b2', name: 'Flamme Naissante', category: 'Assiduité', description: 'Série de 3 jours consécutifs', condition: 'Streak de 3 jours', icon: '🔥', xpReward: 100 },
  { id: 'b3', name: 'Habitude de Fer', category: 'Assiduité', description: 'Série de 7 jours consécutifs', condition: 'Streak de 7 jours', icon: '⚔️', xpReward: 250 },
  { id: 'b4', name: 'Légende du Streak', category: 'Assiduité', description: 'Série ininterrompue de 30 jours', condition: 'Streak de 30 jours', icon: '👑', xpReward: 1000 },
  { id: 'b5', name: 'Voix du Matin', category: 'Assiduité', description: 'Session d’échauffement avant 8h00', condition: 'Pratique matinale', icon: '🌅', xpReward: 75 },
  { id: 'b6', name: 'Nocturne Oratoire', category: 'Assiduité', description: 'Répétition après 22h00', condition: 'Pratique tardive', icon: '🌙', xpReward: 75 },
  { id: 'b7', name: 'Weekend Warrior', category: 'Assiduité', description: 'Deux heures de pratique le samedi/dimanche', condition: 'Pratique intensive weekend', icon: '🛡️', xpReward: 150 },
  { id: 'b8', name: 'Fidèle des Plénières', category: 'Assiduité', description: 'Présence à 3 masterclasses live d’affilée', condition: 'Participer à 3 directs', icon: '📺', xpReward: 200 },

  // 2. Performance (8 badges)
  { id: 'b9', name: 'Zéro Tic', category: 'Performance', description: 'Prise de parole > 2 min sans aucun mot parasite', condition: '0 filler word sur 2 min', icon: '🎯', xpReward: 200 },
  { id: 'b10', name: 'Cadence d’Or', category: 'Performance', description: 'Débit calibré exactement entre 130 et 145 WPM', condition: 'Débit idéal maintenu', icon: '⏱️', xpReward: 150 },
  { id: 'b11', name: 'Maître du Silence', category: 'Performance', description: 'Intégration d’au moins 4 silences de 3 secondes', condition: '4 silences respectés', icon: '🤫', xpReward: 150 },
  { id: 'b12', name: 'Score Parfait', category: 'Performance', description: 'Obtenir 100% à un QCM de certification', condition: '100% au quiz d’un module', icon: '💯', xpReward: 300 },
  { id: 'b13', name: 'Punchline Master', category: 'Performance', description: 'Chute de discours validée avec note > 90 par l’IA', condition: 'Note de conclusion > 90', icon: '⚡', xpReward: 250 },
  { id: 'b14', name: 'Voix Olympique', category: 'Performance', description: 'Projection vocale sans saturation pendant 5 min', condition: 'Volume stable > 65dB', icon: '📢', xpReward: 200 },
  { id: 'b15', name: 'Postural sans Faille', category: 'Performance', description: 'Stabilité corporelle évaluée à 95% par la vision IA', condition: 'Analyse vidéo posture > 95', icon: '🗿', xpReward: 300 },
  { id: 'b16', name: 'Rhéteur Implacable', category: 'Performance', description: 'Réfutation de 5 objections sans dire "Mais"', condition: 'Débat contre l’IA réussi', icon: '🗡️', xpReward: 350 },

  // 3. Communauté (7 badges)
  { id: 'b17', name: 'Première Voix', category: 'Communauté', description: 'Première question posée dans le chat en direct', condition: '1er message au webinaire', icon: '💬', xpReward: 50 },
  { id: 'b18', name: 'Jury Populaire', category: 'Communauté', description: '50 upvotes cumulés sur vos interventions', condition: '50 likes reçus', icon: '👍', xpReward: 200 },
  { id: 'b19', name: 'Mentor Oratoire', category: 'Communauté', description: 'A apporté un feedback constructif à 5 stagiaires', condition: '5 retours d’entraide', icon: '🤝', xpReward: 250 },
  { id: 'b20', name: 'Question Clé', category: 'Communauté', description: 'Question sélectionnée par l’intervenant en direct', condition: 'Passage en live', icon: '🌟', xpReward: 300 },
  { id: 'b21', name: 'Top Contributeur', category: 'Communauté', description: 'Classé parmi les 10 orateurs les plus actifs du mois', condition: 'Top 10 mensuel', icon: '🏅', xpReward: 500 },
  { id: 'b22', name: 'Duo d’Éloquence', category: 'Communauté', description: 'Simulation en tandem avec un autre élève', condition: 'Pratique partagée', icon: '👥', xpReward: 150 },
  { id: 'b23', name: 'Ambassadeur Verbe', category: 'Communauté', description: 'Partage de votre certificat de réussite sur LinkedIn', condition: 'Partage officiel vérifié', icon: '🚀', xpReward: 200 },

  // 4. Créativité (7 badges)
  { id: 'b24', name: 'Improvisateur', category: 'Créativité', description: 'Discours improvisé de 3 min sur un sujet tiré au sort', condition: 'Improvisation réussie', icon: '🎭', xpReward: 200 },
  { id: 'b25', name: 'Hommage à Churchill', category: 'Créativité', description: 'Discours intégrant 3 anaphores solennelles', condition: '3 anaphores détectées', icon: '🏛️', xpReward: 250 },
  { id: 'b26', name: 'Le Voyageur du Héros', category: 'Créativité', description: 'Récit d’entreprise structuré selon le Monomythe', condition: 'Storytelling complet', icon: '🗺️', xpReward: 300 },
  { id: 'b27', name: 'Métaphore Vivante', category: 'Créativité', description: 'Explication d’un sujet complexe par une allégorie poétique', condition: 'Métaphore saluée par l’IA', icon: '🎨', xpReward: 200 },
  { id: 'b28', name: 'Aïkido Parfait', category: 'Créativité', description: 'Renversement total d’une critique avec le sourire', condition: 'Technique d’évitement validée', icon: '🥋', xpReward: 250 },
  { id: 'b29', name: 'Keynote Visionnaire', category: 'Créativité', description: 'Démonstration de 5 min avec rupture visuelle à la Jobs', condition: 'Keynote simulée', icon: '💡', xpReward: 350 },
  { id: 'b30', name: 'Le Grand Discours', category: 'Créativité', description: 'Intervention finale du Cursus Master approuvée', condition: 'Diplôme Grand Orateur', icon: '🎓', xpReward: 1000 },
];

export interface ChallengeItem {
  id: string;
  type: 'daily' | 'weekly' | 'monthly';
  title: string;
  description: string;
  duration: string;
  xpReward: number;
  completed: boolean;
  progress: number; // 0 to 100
}

export const CURRENT_CHALLENGES: ChallengeItem[] = [
  {
    id: 'ch-d1',
    type: 'daily',
    title: 'Échauffement vocal du matin',
    description: '3 minutes de virelangues et respiration 4-2-6 pour réveiller les résonateurs.',
    duration: '3 min',
    xpReward: 50,
    completed: true,
    progress: 100,
  },
  {
    id: 'ch-d2',
    type: 'daily',
    title: 'Le Défi des 3 Silences',
    description: 'Enregistrez une accroche de 60 secondes en intégrant au moins 2 silences purs de 3 secondes.',
    duration: '2 min',
    xpReward: 75,
    completed: false,
    progress: 40,
  },
  {
    id: 'ch-w1',
    type: 'weekly',
    title: 'Pitch Zéro Tic Verbal',
    description: 'Présentez votre projet en 2 minutes chrono sans prononcer un seul "euh", "donc" ou "en fait".',
    duration: '15 min',
    xpReward: 250,
    completed: false,
    progress: 60,
  },
  {
    id: 'ch-w2',
    type: 'weekly',
    title: 'Sparring Objections avec Marcus',
    description: 'Affrontez le Coach IA sur 5 relances agressives consécutives en gardant l’ancre vocale.',
    duration: '20 min',
    xpReward: 300,
    completed: false,
    progress: 20,
  },
  {
    id: 'ch-m1',
    type: 'monthly',
    title: 'Le Grand Débat Contre l’IA',
    description: 'Soutenez une thèse polémique pendant 5 minutes face aux interruptions directes de Gemini 2.5 Flash.',
    duration: '45 min',
    xpReward: 1000,
    completed: false,
    progress: 15,
  },
];

export interface WeeklyScoreHistory {
  date: string;
  scoreVocal: number;
  wpm: number;
  posture: number;
}

export const VOCAL_SCORE_HISTORY: WeeklyScoreHistory[] = [
  { date: '21 Sep', scoreVocal: 62, wpm: 175, posture: 60 },
  { date: '23 Sep', scoreVocal: 68, wpm: 165, posture: 66 },
  { date: '25 Sep', scoreVocal: 74, wpm: 155, posture: 72 },
  { date: '27 Sep', scoreVocal: 71, wpm: 160, posture: 70 },
  { date: '29 Sep', scoreVocal: 83, wpm: 142, posture: 85 },
  { date: '01 Oct', scoreVocal: 89, wpm: 138, posture: 91 },
];

export interface ModuleTimeDistribution {
  name: string;
  hours: number;
  color: string;
}

export const MODULE_TIME_DISTRIBUTION: ModuleTimeDistribution[] = [
  { name: 'Fondations (Trac & Voix)', hours: 4.5, color: '#f2552f' },
  { name: 'Structure (Accroche & Règle 3)', hours: 3.0, color: '#2563eb' },
  { name: 'Storytelling (Monomythe)', hours: 2.5, color: '#10b981' },
  { name: 'Persuasion (Ethos & Débat)', hours: 1.5, color: '#8b5cf6' },
  { name: 'Excellence (Keynote & Scène)', hours: 1.0, color: '#e11d48' },
];

export interface LeagueRanking {
  rank: number;
  name: string;
  avatar: string;
  title: string;
  xp: number;
  isCurrentUser?: boolean;
}

export const LEAGUE_ORATORS: LeagueRanking[] = [
  { rank: 1, name: 'Éléonore de V.', avatar: '👑', title: 'Conférencière Émérite', xp: 26400 },
  { rank: 2, name: 'Julien S.', avatar: '⚡', title: 'Orateur Charismatique', xp: 21300 },
  { rank: 3, name: 'Camille T.', avatar: '🔥', title: 'Tribun de Tribune', xp: 19850, isCurrentUser: true },
  { rank: 4, name: 'Dr. Sophie M.', avatar: '🏛️', title: 'Capitaine de Débat', xp: 17200 },
  { rank: 5, name: 'Thierry L.', avatar: '🎙️', title: 'Raconteur d’Histoires', xp: 14900 },
  { rank: 6, name: 'Alexandre B.', avatar: '🌱', title: 'Voix Affirmée', xp: 12450 },
];
