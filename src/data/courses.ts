export interface Lesson {
  title: string;
  summary: string;
  keyPoints: string;
  exercise: string;
  image?: string;
  caption?: string;
  proTip?: string;
  historicalQuote?: {
    text: string;
    author: string;
    context: string;
  };
  rhetoricalDevice?: {
    name: string;
    definition: string;
    example: string;
  };
  caseStudy?: {
    title: string;
    analysis: string;
  };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SpeakingLabSpec {
  consigne: string;
  criteres: string[];
}

export interface Course {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  objectifs: string;
  prerequis: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration: string;
  badgeColor: string;
  accentBg: string;
  image: string;
  imageAlt: string;
  description: string;
  speakingLab: SpeakingLabSpec;
  evaluationFinale: string;
  badgeUnlocked: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

export const HERO_IMAGE = '/src/assets/images/hero_black_speaker_1790879377283.jpg';

export const COURSES: Course[] = [
  // ==========================================
  // MODULE 1 : FONDATIONS
  // ==========================================
  {
    id: 'p1',
    number: '1',
    title: 'FONDATIONS — Vaincre le trac & dompter sa voix',
    subtitle: "Convertir l'anxiété en énergie scénique et poser sa présence physique.",
    objectifs: 'Maîtriser la respiration ventrale, ancrer sa posture au sol, éliminer les tics physiques.',
    prerequis: 'Aucun prérequis.',
    level: 'Débutant',
    duration: '2h30',
    badgeColor: '#f2552f',
    accentBg: 'from-orange-600/90 to-neutral-900',
    image: '/src/assets/images/speaker_voice_stage_1790876969606.jpg',
    imageAlt: "Orateur travaillant son ancrage et sa voix sur scène à l'École Verbe",
    description: "Le trac n'est pas votre ennemi : c'est un flux d'adrénaline brute qui ne demande qu'à être canalisé. Dans ce module inaugural, vous apprendrez la physiologie de la peur, le trépied postural pour libérer vos poumons et la maîtrise des 3 silences souverains.",
    speakingLab: {
      consigne: 'Présentez-vous en 60 secondes en intégrant au moins 2 silences de 3 secondes.',
      criteres: [
        'Contact visuel direct et ininterrompu',
        '0 tic verbal (aucun "euh", "donc", "voilà")',
        'Inspiration diaphragmatique visible et posée avant la première phrase'
      ]
    },
    evaluationFinale: "QCM technique de 10 questions + Enregistrement vocal d'un texte classique imposé.",
    badgeUnlocked: '🏅 Orateur Ancré',
    lessons: [
      {
        title: 'La chimie du trac : Convertir le cortisol en adrénaline positive',
        summary: "Le trac résulte de la réaction ancestrale de fuite ou de combat (fight-or-flight). L'adrénaline accélère le pouls et raccourcit la respiration. Plutôt que de vouloir l'éteindre, nous la recadrons cognitivement : le trac prouve que l'enjeu compte.",
        keyPoints: "1. Le corps confond la scène avec un danger mortel : réactivation vagale obligatoire.\n2. Le recadrage émotionnel : transformer 'J'ai peur' en 'Je suis prêt et enthousiaste'.\n3. L'oxygénation cellulaire préalable dissipe l'excès de cortisol en moins de 90 secondes.",
        exercise: "Exécutez 3 cycles de respiration 4-2-6 (4s inspiration ventrale, 2s rétention, 6s expiration soufflée comme à travers une paille). Constatez la baisse instantanée du rythme cardiaque.",
        historicalQuote: {
          text: "Le courage n'est pas l'absence de peur, mais la capacité de vaincre ce qui fait peur.",
          author: 'Nelson Mandela',
          context: 'Devant ses militants à Soweto'
        },
        proTip: "Ne dites jamais au public que vous avez le trac. Le public ne voit que 20% de vos tremblements intérieurs : gardez le secret et souriez."
      },
      {
        title: "L'ancrage physique (Le Trépied) : Posture des épaules et pieds pour libérer le diaphragme",
        summary: "Votre voix est un instrument à vent qui repose sur vos pieds. Un orateur instable sur ses appuis balance son buste et trahit son anxiété. Le trépied d'ancrage stabilise le bassin, aligne la colonne vertébrale et ouvre la cage thoracique.",
        keyPoints: "1. Pieds écartés de la largeur du bassin, poids réparti entre talon, petit orteil et gros orteil.\n2. Genoux légèrement déverrouillés pour éviter les syncopes vagales.\n3. Épaules basses et omoplates relâchées pour faire descendre le centre de gravité.",
        exercise: "Debout face au miroir, visualisez des racines de 2 mètres plongeant sous vos talons. Balancez-vous doucement d'avant en arrière jusqu'à trouver le point de gravité immobile où vos bras pendent naturellement.",
        caseStudy: {
          title: "L'ancrage olympique de Martin Luther King",
          analysis: "Sur les marches du Lincoln Memorial en 1963, MLK ne bouge pas les pieds d'un centimètre durant 17 minutes. Cet ancrage statique confère à son buste l'autorité d'une statue de marbre."
        }
      },
      {
        title: 'La voix augmentée : Timbre, projection et articulation sans forcer sur les cordes vocales',
        summary: "Projeter ne signifie pas crier. La puissance vocale provient de la résonance des cavités buccales, nasales et thoraciques. Vous apprendrez à faire résonner votre voix dans le masque facial pour remplir une salle sans fatigue.",
        keyPoints: "1. L'attaque du son se fait par le bas ventre (sangle abdominale) et non par la gorge.\n2. Les voyelles portent l'émotion et le volume ; les consonnes tranchent le sens et sculptent la diction.\n3. L'ouverture de la mâchoire d'au moins 2 doigts supprime l'effet 'voix de nez'.",
        exercise: "Prononcez le son 'Mmmmm' bouche fermée en recherchant la vibration sur vos lèvres. Ouvrez progressivement sur un 'Maaaaah' ample en projetant vers le fond de votre pièce.",
        proTip: "Buvez de l'eau tiède ou à température ambiante. L'eau glacée tétanise les muscles du larynx juste avant un discours."
      },
      {
        title: 'La règle des 3 silences : Apprivoiser les pauses stratégiques pour captiver',
        summary: "Le silence est le vêtement de la parole. L'amateur comble chaque seconde par des 'euh', 'donc', 'en fait'. Le grand orateur utilise les trois silences : le silence d'ouverture, le silence d'annonce et le silence de retombée.",
        keyPoints: "1. Le silence d'entrée (3 à 5 secondes) : installe l'autorité avant même le premier mot.\n2. Le silence de suspens : placé juste avant l'annonce du mot clé pour aiguiser l'ouïe.\n3. Le silence d'absorption : accordé à l'auditoire après une phrase forte pour lui laisser le temps d'assimiler.",
        exercise: "Prenez un extrait du discours de Churchill : récitez-le à voix haute en vous obligeant à poser 3 secondes de silence chronométré après chaque proposition principale.",
        historicalQuote: {
          text: "Un discours improvisé a été réécrit trois fois. Et ses silences ont été pesés au milligramme.",
          author: 'Winston Churchill',
          context: 'À la Chambre des Communes'
        }
      }
    ],
    quiz: [
      {
        question: "Quel est l'effet physiologique immédiat d'une expiration de 6 secondes contre une inspiration de 4 secondes ?",
        options: [
          'Elle déclenche une tachycardie réflexe',
          'Elle stimule le nerf vague et ralentit le rythme cardiaque',
          'Elle bloque totalement la production de salive',
          'Elle contracte les cordes vocales'
        ],
        correctIndex: 1,
        explanation: "L'expiration prolongée active le système nerveux parasympathique via le nerf vague, diminuant mécaniquement la fréquence cardiaque et l'angoisse."
      },
      {
        question: "Comment doit être positionné le poids du corps dans 'Le Trépied' postural ?",
        options: [
          'Exclusivement sur les pointes de pieds pour paraître plus grand',
          'Sur un seul pied en croisant les jambes pour décontracter',
          'Réparti équitablement entre les deux pieds, genoux souples et épaules relâchées',
          'En appui sur les talons avec le buste penché en arrière'
        ],
        correctIndex: 2,
        explanation: "La stabilité provient d'une assise bipédale égale, genoux déverrouillés, offrant au diaphragme l'amplitude maximale."
      },
      {
        question: "Quand doit intervenir le premier silence stratégique d'un orateur ?",
        options: [
          'Au milieu du discours, lorsqu’il a oublié ses notes',
          'Dès son arrivée sur scène, pendant 3 à 5 secondes avant de prononcer le premier mot',
          'Seulement à la fin du discours pour attendre les applaudissements',
          'Après avoir dit bonjour et s’être excusé du retard'
        ],
        correctIndex: 1,
        explanation: "Le silence d'entrée capte l'attention, pose l'autorité et permet au public de calibrer son écoute avant la première phrase."
      },
      {
        question: "Quelle partie du visage sert d'amplificateur naturel du son (résonateur) sans forcer sur les cordes vocales ?",
        options: [
          'Le lobe des oreilles',
          'Le masque facial (cavités sinusales, palais dur et fosse nasale)',
          'La glotte inférieure',
          'Le muscle trapèze'
        ],
        correctIndex: 1,
        explanation: "Les cavités osseuses du masque facial fonctionnent comme la caisse de résonance d'une guitare, décuplant la projection sans forcer sur le larynx."
      },
      {
        question: "Pour quelle raison fondamentale les orateurs débutants utilisent-ils des 'euh' parasites ?",
        options: [
          'Pour signaler qu’ils vont faire une citation',
          'Par peur du silence et pour meubler le temps que le cerveau formule l’idée suivante',
          'Pour tester le microphone de la salle',
          'Par politesse envers les personnes du premier rang'
        ],
        correctIndex: 1,
        explanation: "Le 'euh' est un réflexe de remplissage de vide : l'orateur a peur que le silence soit interprété comme une perte de contrôle, alors qu'il est perçu comme une marque de maîtrise."
      }
    ]
  },

  // ==========================================
  // MODULE 2 : STRUCTURE
  // ==========================================
  {
    id: 'p2',
    number: '2',
    title: "STRUCTURE — L'art de la clarté et de l'impact",
    subtitle: "Organiser ses idées pour captiver l'attention dès la 5e seconde.",
    objectifs: "Maîtriser le framework de l'Accroche-Corps-Chute, appliquer la règle de 3.",
    prerequis: 'Avoir validé le Module 1.',
    level: 'Intermédiaire',
    duration: '3h00',
    badgeColor: '#2563eb',
    accentBg: 'from-blue-600/90 to-neutral-900',
    image: '/src/assets/images/speaker_keynote_gesture_1790876980916.jpg',
    imageAlt: "Orateur structurant sa pensée avec clarté lors d'une présentation percutante",
    description: "Une idée confuse est inaudible. Les orateurs d'élite ne parlent pas au hasard : ils construisent une cathédrale invisible avec une accroche magnétique, une architecture ternaire et une chute qui pousse à l'action.",
    speakingLab: {
      consigne: 'Pitchez une idée ou un projet en 3 minutes chrono selon la structure imposée (Accroche < 10s, 3 arguments distincts, Chute CTA).',
      criteres: [
        'Accroche validée en moins de 10 secondes sans formule de politesse banale',
        '3 piliers distincts annoncés et développés de façon équilibrée',
        'Chute percutante avec un appel à l’action précis et mémorable'
      ]
    },
    evaluationFinale: "Rédaction du plan détaillé d'une présentation de 10 minutes + restitution audio.",
    badgeUnlocked: '📐 Architecte du Discours',
    lessons: [
      {
        title: "L'accroche choc (The Hook) : Démarrer par une question, un fait ou une rupture",
        summary: "Les 15 premières secondes scellent le sort d'un discours. Si vous commencez par 'Bonjour, je suis ravi d'être avec vous ce matin pour vous présenter...', l'auditoire sort déjà son smartphone. L'accroche doit créer un choc cognitif immédiat.",
        keyPoints: "1. La question provocatrice : engage directement la réflexion de l'auditoire.\n2. Le fait sidérant : un chiffre ou un constat contre-intuitif qui renverse une croyance.\n3. L'anecdote in media res : plonger au cœur d'une action dramatique dès la première seconde.",
        exercise: "Rédigez 3 accroches différentes pour votre projet : l'une basée sur un chiffre alarmant, la seconde sur une question provocante, la troisième sur une micro-histoire de 15 secondes.",
        caseStudy: {
          title: "L'ouverture mythique de Steve Jobs (2007)",
          analysis: "Jobs ne dit pas 'Bonjour'. Il commence par : 'De temps en temps, un produit révolutionnaire arrive et change tout.' En 8 secondes, la salle retient son souffle pour 2 heures."
        },
        proTip: "Bannissez 'Bonjour à tous, j'espère que vous allez bien'. Commencez directement par votre crochet, dites bonjour après avoir capturé leur regard."
      },
      {
        title: 'La règle de 3 (Rule of Three) : Structurer ses arguments en triplets mémorables',
        summary: "Le cerveau humain est génétiquement programmé pour retenir les groupes de trois. Deux points paraissent incomplets ; quatre points fatiguent la mémoire de travail. De Jules César à la Constitution française, le triptyque crée le rythme parfait.",
        keyPoints: "1. Veni, Vidi, Vici : le rythme ternaire sonne comme une évidence mathématique.\n2. La structure Problème - Solution - Impact : la colonne vertébrale de tout pitch commercial.\n3. La gradation ternaire : du fait anecdotique vers l'enjeu universel.",
        exercise: "Prenez votre discours actuel : élaguez impitoyablement tous les arguments secondaires pour ne garder que 3 piliers maîtres. Donnez à chacun un titre d'action percutant.",
        rhetoricalDevice: {
          name: 'Tricolon (Rythme ternaire)',
          definition: "Série de trois membres de phrase parallèles de même longueur ou d'énergie croissante.",
          example: 'Liberté, Égalité, Fraternité.'
        }
      },
      {
        title: 'Transitions fluides : Lier ses idées sans dire "alors" ni "ensuite"',
        summary: "Les chevilles de liaison maladroites ('du coup', 'voilà voilà', 'passons maintenant au point 2') cassent la tension dramatique. Une grande transition est un pont invisible qui donne l'impression que la suite est inévitable.",
        keyPoints: "1. La transition en pivot : 'Maintenant que le problème est posé, une question s'impose : pourquoi personne ne l'a résolu avant ?'\n2. La transition en silence : marquer une pause nette de 3 secondes, changer de pied et aborder le point suivant.\n3. Le rappel-écho : réutiliser le dernier mot de la section précédente pour ouvrir la suivante.",
        exercise: "Enregistrez 2 minutes d'exposé sans avoir le droit d'utiliser les mots : 'donc', 'alors', 'ensuite', 'en fait'. Si vous en prononcez un, recommencez à zéro.",
        historicalQuote: {
          text: "Ce qui se conçoit bien s'énonce clairement, et les mots pour le dire arrivent aisément.",
          author: 'Nicolas Boileau',
          context: "L'Art poétique (1674)"
        }
      },
      {
        title: "La chute mémorable : Terminer par un appel à l'action précis (Call To Action)",
        summary: "La loi de récence stipule que le public se souvient principalement des 30 dernières secondes. Ne terminez jamais par 'Voilà, j'ai fini' ou 'Avez-vous des questions ?'. La chute doit résonner dans les esprits comme le point d'orgue d'une symphonie.",
        keyPoints: "1. La boucle narrative : répondre à la question posée dans l'accroche pour fermer le cercle.\n2. Le Call to Action univoque : une action simple, urgente et concrète à accomplir dès aujourd'hui.\n3. La formule finale mémorable : une phrase ciselée que le public répétera à la machine à café.",
        exercise: "Écrivez votre phrase de conclusion au mot près. Apprenez-la par cœur afin de regarder le public droit dans les yeux sans regarder vos notes au moment de conclure.",
        proTip: "Après votre dernière phrase, ne bougez pas pendant 3 secondes. Laissez le public comprendre que c'est fini et amorcer les applaudissements."
      }
    ],
    quiz: [
      {
        question: "Pourquoi la règle de 3 est-elle si puissante dans la mémoire de l'auditoire ?",
        options: [
          'Parce que les présentations Powerpoint ont 3 lignes par diapositive',
          'Parce que c’est le nombre minimal d’éléments pour créer un schéma reconnaissable et mémorisable sans surcharge cognitive',
          'Parce que le code civil l’impose pour les plaidoiries',
          'Pour pouvoir parler exactement 33 minutes'
        ],
        correctIndex: 1,
        explanation: "Le chiffre 3 offre la balance idéale entre simplicité mémorielle et complétude argumentative pour le cerveau humain."
      },
      {
        question: "Quelle est la pire façon de conclure une intervention publique ?",
        options: [
          'Par une citation inspirante en regardant le public',
          'Par un appel à l’action précis',
          'Par une formule d’échappatoire comme \'Voilà, j’ai fait le tour, je sais pas si vous avez des questions...\'',
          'Par un silence habité suivi d’un salut'
        ],
        correctIndex: 2,
        explanation: "S'excuser ou signaler mollement la fin dissipe instantanément toute l'autorité accumulée au cours du discours."
      },
      {
        question: "Quelle technique d'accroche plonge l'auditoire directement au cœur de l'événement sans introduction préalable ?",
        options: [
          'La lecture intégrale des remerciements',
          'L\'accroche in media res',
          'La définition du dictionnaire Larousse',
          'Le rappel de la date du jour'
        ],
        correctIndex: 1,
        explanation: "'In media res' (au milieu des choses) commence par l'action ou le point critique, captivant l'imagination sans temps mort."
      },
      {
        question: "Comment éliminer les tics de liaison oratoire ('du coup', 'alors', 'en fait') entre deux arguments ?",
        options: [
          'En parlant le plus vite possible sans respirer',
          'En remplaçant la conjonction parasite par un silence net de deux secondes',
          'En s’excusant à chaque répétition',
          'En buvant une gorgée d’eau à chaque mot'
        ],
        correctIndex: 1,
        explanation: "Le silence est le connecteur le plus noble : il permet de changer de registre et donne du poids à la proposition suivante."
      },
      {
        question: "Dans le framework 'Accroche - Corps - Chute', quel pourcentage du temps total doit occuper l'accroche ?",
        options: [
          'Environ 50%',
          'Moins de 10% (idéalement les 15 à 30 premières secondes)',
          'Exactement 25%',
          '40% pour bien poser le contexte'
        ],
        correctIndex: 1,
        explanation: "L'accroche doit être un déclencheur fulgurant (moins de 10% du temps) pour laisser le champ libre au déploiement des arguments et de la chute."
      }
    ]
  },

  // ==========================================
  // MODULE 3 : STORYTELLING
  // ==========================================
  {
    id: 'p3',
    number: '3',
    title: "STORYTELLING — Captiver par l'émotion",
    subtitle: 'Transformer un exposé froid en une histoire captivante.',
    objectifs: 'Maîtriser le Monomythe (Le voyage du héros), incarner des personnages, manier le suspense.',
    prerequis: 'Avoir validé les Modules 1 & 2.',
    level: 'Intermédiaire',
    duration: '3h30',
    badgeColor: '#10b981',
    accentBg: 'from-emerald-600/90 to-neutral-900',
    image: '/src/assets/images/speaker_black_woman_stage_1790879390986.jpg',
    imageAlt: "Oratrice captivant son auditoire par le storytelling et l'émotion vivante",
    description: "Les chiffres informent, mais seules les histoires font bouger les lignes. Ce module vous apprend à structurer vos discours autour du voyage du héros, à stimuler l'empathie neuronale par les détails sensoriels et à faire de votre vulnérabilité une arme de persuasion massive.",
    speakingLab: {
      consigne: 'Racontez votre plus grand échec professionnel ou personnel et la leçon retenue (2 minutes).',
      criteres: [
        'Connexion émotionnelle sincère sans complaisance',
        'Présence de détails visuels et sensoriels précis (cadre, bruits, sentiments)',
        'Maîtrise des modulations de voix et du tempo (ralentissement au point culminant)'
      ]
    },
    evaluationFinale: "Analyse de la structure narrative du discours I Have a Dream + vidéo de 3 min.",
    badgeUnlocked: '📖 Conteur d’Élite',
    lessons: [
      {
        title: "L'arc narratif oratoire : Du problème initial au dénouement inspirant",
        summary: "Toute histoire captivante obéit au monomythe de Joseph Campbell : un état initial ordinaire, un élément perturbateur, une traversée des épreuves au fond du gouffre, et enfin l'illumination qui transforme le héros et le ramène victorieux.",
        keyPoints: "1. Sans conflit, il n'y a pas d'histoire : dramatisez le problème dès l'amorce.\n2. Le creux de la vague (The Dark Night of the Soul) : partagez le moment exact où tout semblait perdu.\n3. L'élixir partagé : la leçon finale ne doit pas vous glorifier, mais profiter à l'auditoire.",
        exercise: "Dessinez sur une feuille la courbe en cloche de votre histoire : identifiez précisément l'élément déclencheur, le point bas émotionnel et la clé de transformation.",
        historicalQuote: {
          text: "Ceux qui racontent les histoires gouvernent le monde.",
          author: 'Platon',
          context: 'La République'
        }
      },
      {
        title: 'Incarner plutôt que raconter : Utiliser les détails sensoriels (vue, son, émotion)',
        summary: "Ne dites pas 'Il faisait froid ce matin-là'. Dites : 'Mes doigts étaient engourdis contre le volant gelé et la buée s'échappait de ma bouche à chaque mot.' Les détails sensoriels activent le cortex sensoriel des auditeurs comme s'ils y étaient.",
        keyPoints: "1. La règle 'Show, Don't Tell' : montrer la scène par des images concrètes plutôt que d'énoncer un jugement abstrait.\n2. Le dialogue au présent : reproduisez les répliques mot à mot avec la voix des protagonistes.\n3. Les 5 sens : convoquez les odeurs, les sons métalliques, les couleurs vives.",
        exercise: "Prenez un événement marquant de votre semaine et racontez-le en 90 secondes en convoquant au moins trois sens différents (l'ouïe, l'odorat et le toucher).",
        rhetoricalDevice: {
          name: 'Hypotypose',
          definition: 'Description vive et animée d’une scène, la mettant pour ainsi dire sous les yeux de l’auditoire.',
          example: 'Je le vois encore, le dos courbé sur sa vieille machine à écrire, la lampe à huile vacillante éclairant ses yeux rougis par trois nuits blanches.'
        }
      },
      {
        title: "Le rythme et le tempo : Varier la vitesse d'élocution pour créer de la tension",
        summary: "Un récit délivré à un débit constant de 140 mots par minute berce l'auditoire jusqu'à l'endormissement. L'art de raconter repose sur des accélérations brutales dans les scènes d'action et des décélérations chuchotées dans les révélations intimes.",
        keyPoints: "1. Accélération : phrases courtes, verbes de mouvement, débit rapide pour simuler la panique ou la course.\n2. Ralentissement : voyelles étirées, pauses longues pour les prises de conscience graves.\n3. Le murmure puissant : baisser d'un coup le volume force 500 personnes à tendre l'oreille dans un silence religieux.",
        exercise: "Lisez un texte dramatique en alternant 10 secondes à débit très rapide (180 WPM) et 15 secondes à débit très lent (90 WPM) avec voix chuchotée mais projetée.",
        proTip: "Quand vous voulez dire la chose la plus importante de votre intervention, ne criez pas : chuchotez avec intensité."
      },
      {
        title: 'Le vulnérable power : Utiliser son expérience personnelle pour établir la confiance',
        summary: "Les auditoires n'aiment pas les héros infaillibles : ils aiment les êtres humains faillibles qui ont surmonté l'épreuve. Raconter une erreur ou un doute désarme l'hostilité et crée un lien d'empathie indéfectible.",
        keyPoints: "1. Vulnérabilité n'est pas apitoiement : partagez une cicatrice guérie, pas une plaie ouverte.\n2. La chute du piédestal : avouer son incompétence initiale valorise l'expertise acquise par l'effort.\n3. Le miroir de l'élève : l'auditoire doit se dire 'S'il a réussi en partant de si bas, je le peux aussi'.",
        exercise: "Écrivez le récit d'une honte professionnelle passée (un bide en réunion, un licenciement, un projet avorté) et tirez-en une maxime universelle applicable par vos collègues.",
        caseStudy: {
          title: "Le discours de Stanford de Steve Jobs (2005)",
          analysis: "Jobs raconte son abandon de l'université, son éviction humiliante d'Apple à 30 ans et son diagnostic de cancer. En livrant ses failles, il prononce le discours le plus universel du XXIe siècle."
        }
      }
    ],
    quiz: [
      {
        question: "Quelle figure de style consiste à peindre une scène de manière si vive qu'elle semble se dérouler sous les yeux du public ?",
        options: ['L’allitération', 'L’hypotypose', 'L’oxymore', 'L’euphémisme'],
        correctIndex: 1,
        explanation: "L'hypotypose fait d'un auditoire passif un témoin oculaire de la scène grâce aux détails sensoriels."
      },
      {
        question: "Dans le Monomythe, quelle étape clé précède immédiatement la transformation du protagoniste ?",
        options: [
          'Le retour triomphal au village',
          'La traversée de l’épreuve suprême au fond du gouffre',
          'La signature du contrat commercial',
          'Le refus de répondre au téléphone'
        ],
        correctIndex: 1,
        explanation: "C'est dans l'épreuve suprême que le héros abandonne ses illusions passées pour acquérir la sagesse salvatrice."
      },
      {
        question: "Quelle est la condition sine qua non pour partager une vulnérabilité personnelle sans mettre le public mal à l'aise ?",
        options: [
          'Fondre en larmes dès la deuxième phrase',
          'Partager une cicatrice guérie dont la leçon est claire, et non une blessure brute non résolue',
          'Accuser autrui de son échec',
          'Ne jamais regarder personne dans les yeux'
        ],
        correctIndex: 1,
        explanation: "Le public cherche un guide inspirant, non un défouloir : la vulnérabilité doit être métabolisée en enseignement."
      },
      {
        question: "Quel effet physique produit une baisse soudaine du volume de voix (le murmure théâtral) chez les auditeurs ?",
        options: [
          'Ils quittent la salle',
          'Ils cessent tout mouvement et tendent l’oreille dans une concentration maximale',
          'Ils allument leur smartphone',
          'Ils se mettent à applaudir par erreur'
        ],
        correctIndex: 1,
        explanation: "Le murmure brise la routine sonore : l'auditoire retient son souffle pour ne pas manquer la confidence."
      },
      {
        question: "Que préconise le principe 'Show, Don't Tell' ?",
        options: [
          'Projeter uniquement des diapositives sans parler',
          'Montrer les détails sensoriels concrets plutôt que d’énoncer des adjectifs abstraits',
          'Jouer une pièce de théâtre costumée',
          'Parler en langue étrangère'
        ],
        correctIndex: 1,
        explanation: "Montrer par les images et les actions permet à l'auditeur d'éprouver l'émotion par lui-même au lieu de se la faire dicter."
      }
    ]
  },

  // ==========================================
  // MODULE 4 : PERSUASION
  // ==========================================
  {
    id: 'p4',
    number: '4',
    title: 'PERSUASION — Rhétorique & Argumentation',
    subtitle: 'Convaincre les esprits les plus sceptiques.',
    objectifs: 'Employer Ethos, Pathos, Logos ; utiliser les figures de style majeures (Anaphores, Métaphores).',
    prerequis: 'Avoir validé les Modules 1 à 3.',
    level: 'Avancé',
    duration: '4h00',
    badgeColor: '#8b5cf6',
    accentBg: 'from-purple-600/90 to-neutral-900',
    image: '/src/assets/images/speaker_grand_orator_1790876995112.jpg',
    imageAlt: "Maître orateur déployant la rhétorique classique aristotélicienne avec majesté",
    description: "La persuasion est une science millénaire perfectionnée par Aristote, Cicéron et les plus grands tribuns du barreau. Apprenez à combiner la crédibilité morale (Ethos), l'argumentation irréfutable (Logos) et la corde sensible de l'âme (Pathos) pour désarmer n'importe quel contradicteur.",
    speakingLab: {
      consigne: 'Défendez une position impopulaire en 2 minutes en utilisant au moins une anaphore appuyée.',
      criteres: [
        'Rigueur logique implacable et sans sophisme évident',
        'Force argumentative soutenue par un triptyque Ethos / Pathos / Logos',
        'Élégance verbale et anaphore scandée avec autorité'
      ]
    },
    evaluationFinale: 'Débat simulé en temps réel contre le Coach Gemini 2.5 (5 relances d’interruption contradictoires).',
    badgeUnlocked: '🏛️ Maître Rhéteur',
    lessons: [
      {
        title: 'Le Triptyque Aristotélicien : Démontrer sa crédibilité (Ethos) et la logique (Logos)',
        summary: "Pour emporter l'adhésion, la vérité ne suffit pas. Le public doit d'abord croire en l'orateur (Ethos : légitimité, bienveillance, autorité), puis comprendre la démonstration rationnelle (Logos : faits, syllogismes, chiffres) avant de vibrer (Pathos).",
        keyPoints: "1. L'Ethos préalable : qui parle et au nom de quoi ? La posture d'humilité et d'autorité conjointe.\n2. Le Logos chirurgical : le syllogisme majeur (Tous les hommes sont mortels -> or Socrate est un homme -> donc Socrate est mortel).\n3. L'équilibre : trop de Logos assomme, trop de Pathos manipule, trop d'Ethos gonfle l'ego.",
        exercise: "Analysez votre pitch : surlignez en bleu les preuves d'Ethos, en vert les démonstrations de Logos, en rouge les appels au Pathos. Vérifiez qu'aucune couleur ne manque.",
        historicalQuote: {
          text: "La rhétorique est la faculté de découvrir spéculativement ce qui, dans chaque cas, est propre à persuader.",
          author: 'Aristote',
          context: 'Rhétorique, Livre I'
        }
      },
      {
        title: "Figures de style percutantes : Intégrer l'anaphore, l'oxymore et l'antithèse naturellement",
        summary: "Les figures de rhétorique ne sont pas des ornements poétiques désuets : ce sont des accélérateurs de persuasion. L'anaphore matèle une conviction, l'antithèse clarifie les choix cruciaux, la métaphore rend le complexe limpide.",
        keyPoints: "1. L'anaphore : répétition d'un même mot en tête de phrase pour créer une houle incantatoire.\n2. L'antithèse : juxtaposition de deux réalités opposées pour forcer une décision morale.\n3. La métaphore conceptuelle : comparer l'inconnu à ce que l'auditoire maîtrise déjà.",
        exercise: "Composez un couplet de 4 phrases commençant toutes par la même anaphore ('Nous refusons de...', 'Nous voulons...', 'Il est temps de...'). Clamez-le avec intensité croissante.",
        caseStudy: {
          title: "L'anaphore 'Moi président de la République' (François Hollande, 2012)",
          analysis: "Répétée 15 fois en 3 minutes lors du débat d'entre-deux-tours, cette anaphore a fixé l'image présidentielle dans l'imaginaire collectif en imposant son propre tempo au contradicteur."
        }
      },
      {
        title: "Réfuter sans affronter : La technique de l'Aïkido verbal face aux critiques",
        summary: "Contredire brutalement un opposant ('Vous avez tort !') braque son ego et renforce sa résistance cognitive. L'Aïkido verbal consiste à absorber son élan, valider son intention bienveillante, puis rediriger son argument vers votre conclusion.",
        keyPoints: "1. L'accusé de réception bienveillant : 'Vous soulevez une inquiétude totalement légitime que nous avons également partagée.'\n2. Le pivot de cadrage : 'La vraie question n'est pas de savoir si c'est cher, mais combien nous coûte notre inaction.'\n3. L'inclusion : 'C'est précisément pour répondre à votre remarque que nous avons conçu cette étape.'",
        exercise: "Faites-vous lancer l'objection la plus agressive possible par un partenaire. Répondez en 3 étapes sans jamais prononcer les mots 'Non', 'Mais' ou 'Vous vous trompez'.",
        proTip: "Remplacez systématiquement le mot 'Mais' par 'Et c'est précisément pourquoi...'. Le mot 'Mais' efface tout ce qui précède."
      },
      {
        title: 'Maniement des données : Rendre un chiffre abstrait concret et marquant',
        summary: "Le cerveau humain ne se représente pas 4,5 milliards d'euros ni 150 gigawatts. Énoncer des chiffres bruts anesthésie l'écoute. Le rôle du rhéteur est d'humaniser la statistique par des équivalences du quotidien.",
        keyPoints: "1. L'échelle humaine : convertir un chiffre global en impact par habitant, par jour ou par seconde.\n2. La comparaison spatiale : 'Cette surface représente l'équivalent de deux terrains de football chaque minute.'\n3. L'objet physique : Steve Jobs présentant l'iPod : '1 000 chansons dans votre poche' plutôt que 'disque dur de 5 Go'.",
        exercise: "Prenez le chiffre clé de votre métier (ex: budget, gain de temps, émissions de CO2) et trouvez 3 métaphores visuelles immédiates pour le rendre palpable.",
        historicalQuote: {
          text: "Un million de morts est une statistique ; un seul mort est une tragédie.",
          author: 'Erich Maria Remarque',
          context: 'Devant la désensibilisation par les chiffres'
        }
      }
    ],
    quiz: [
      {
        question: "Lequel des trois piliers aristotéliciens renvoie à la légitimité morale, l'intégrité et la crédibilité de l'orateur ?",
        options: ['Logos', 'Ethos', 'Pathos', 'Chronos'],
        correctIndex: 1,
        explanation: "L'Ethos représente l'autorité morale et l'image que l'orateur projette de lui-même pour inspirer confiance."
      },
      {
        question: "Quelle figure de style Martin Luther King a-t-il immortalisée en répétant 'I have a dream' au début de huit paragraphes successifs ?",
        options: ['L’allégorie', 'L’anaphore', 'La métonymie', 'Le pléonasme'],
        correctIndex: 1,
        explanation: "L'anaphore est la répétition délibérée d'un même terme en tête de phrase pour créer un rythme incantatoire inoubliable."
      },
      {
        question: "Dans la technique de l'Aïkido verbal face à une objection, que doit-on faire en premier lieu ?",
        options: [
          'Couper la parole à l’interlocuteur pour montrer sa force',
          'Accuser réception de l’inquiétude et valider sa légitimité apparente sans agressivité',
          'Quitter la tribune en signe de protestation',
          'Rire de la question'
        ],
        correctIndex: 1,
        explanation: "Valider l'intention apaise l'ego du contradicteur et permet de rediriger son énergie vers votre solution."
      },
      {
        question: "Comment Steve Jobs a-t-il traduit la caractéristique technique abstraite 'disque dur de 5 Go' en 2001 ?",
        options: [
          'En montrant le schéma du microprocesseur',
          'Par la formule universelle : \'1 000 chansons dans votre poche\'',
          'En comparant la vitesse de rotation en tours par minute',
          'En lisant le brevet américain'
        ],
        correctIndex: 1,
        explanation: "La traduction en bénéfice sensoriel ('dans votre poche') rend la technologie immédiatement désirable."
      },
      {
        question: "Quel mot magique permet de désamorcer une contradiction en remplaçant avantageusement le mot clivant 'Mais' ?",
        options: [
          '\'Cependant...\'',
          '\'Et c’est précisément pourquoi...\'',
          '\'Vous avez tort parce que...\'',
          '\'Bref...\''
        ],
        correctIndex: 1,
        explanation: "'Et c'est précisément pourquoi...' crée une continuité logique et transforme l'objection en argument pour votre cause."
      }
    ]
  },

  // ==========================================
  // MODULE 5 : EXCELLENCE
  // ==========================================
  {
    id: 'p5',
    number: '5',
    title: 'EXCELLENCE — Grandes scènes & Conférences',
    subtitle: 'Dominer le plateau, les médias et les débats à haut risque.',
    objectifs: 'Gérer un grand espace scénique, maîtriser le micro et le prompteur, gérer les questions de presse.',
    prerequis: 'Avoir validé les Modules 1 à 4.',
    level: 'Avancé',
    duration: '5h00',
    badgeColor: '#e11d48',
    accentBg: 'from-rose-600/90 to-neutral-900',
    image: '/src/assets/images/speaker_black_keynote_hall_1790879414109.jpg',
    imageAlt: "Grand orateur dominant une immense salle de conférence plénière avec maestria",
    description: "Le sommet de l'art oratoire. Parler devant 10 personnes en salle de réunion ne ressemble en rien à dominer un amphi de 2 000 places, un plateau télé en direct ou une conférence TED. Découvrez la gestion de l'espace tridimensionnel, la symbiose avec le prompteur et l'art des punchlines imparables.",
    speakingLab: {
      consigne: 'Présentez une Keynote d’inauguration de 5 minutes avec support vidéo simulé.',
      criteres: [
        'Charisme scénique et présence irradiante sur l’ensemble du plateau',
        'Gestuelle ample, ouverte et synchronisée avec le propos',
        'Maîtrise absolue du timing (pile 5 minutes sans dépasser d’une seconde)'
      ]
    },
    evaluationFinale: 'Examen du Cursus Master — Analyse multimodale Gemini (Voix + Vidéo) d’un discours de 7 minutes.',
    badgeUnlocked: '🏆 Grand Orateur Verbe',
    lessons: [
      {
        title: "Occupation de l'espace scénique : La méthode des 3 zones de scène",
        summary: "Sur une grande scène, rester figé derrière un pupitre vous transforme en buste parlant inerte. Courir sans cesse de gauche à droite donne le tournis. La méthode des 3 zones découpe le plateau en : Zone Présent (centre), Zone Passé (cour) et Zone Futur (jardin).",
        keyPoints: "1. Le centre géométrique : réservé à l'accroche, aux révélations majeures et à la chute.\n2. Les déplacements délibérés : on ne marche que PENDANT une transition, jamais au milieu d'un argument clé.\n3. L'arrêt ancré : dès qu'une idée forte est prononcée, les pieds se figent dans le sol pour focaliser le regard.",
        exercise: "Balisiez 3 zones dans votre pièce. Exposez votre problème dans la zone A, votre solution dans la zone B, et votre vision d'avenir dans la zone C en marquant des pas lents et assurés.",
        caseStudy: {
          title: "La chorégraphie scénique des conférences TED",
          analysis: "Le fameux rond rouge de 2 mètres des conférences TED oblige l'orateur à maximiser sa gestuelle du haut du corps et à focaliser 100% de son énergie dans l'intensité de son regard."
        }
      },
      {
        title: 'Techniques Keynote & TED : Aligner son corps avec ses supports visuels',
        summary: "Le public ne peut pas lire vos slides et écouter votre voix en même temps : c'est l'effet de redondance cognitive. Vos diapositives doivent être des toiles de fond émotionnelles (une photo plein écran, un chiffre géant) et jamais des béquilles de lecture.",
        keyPoints: "1. La règle du 'Regard-Slide-Public' : jeter un coup d'œil d'un quart de seconde, puis tourner entièrement le corps vers l'auditoire avant d'ouvrir la bouche.\n2. La touche noire (Touche 'B') : masquer l'écran pour ramener 100% de la lumière et de l'attention sur vous lors des moments intimes.\n3. Zéro texte superflu : si votre slide se comprend sans vous, vous êtes inutile.",
        exercise: "Prenez votre jeu de diapositives actuel : supprimez 80% des mots écrits. Remplacez les listes à puces par une seule image haute résolution ou un mot unique.",
        proTip: "Ne pointez jamais l'écran du doigt avec un laser tremblotant. Vos yeux et votre main ouverte suffisent à guider le regard du public."
      },
      {
        title: 'Média training & Punchlines : Répondre aux interviews télé et podcasts sous pression',
        summary: "En interview médiatique, le journaliste cherche le 'soundbite' (la phrase choc de 10 secondes réutilisable au montage). Si vous répondez par un développement de 4 minutes, vous serez coupé au montage. Apprenez la technique du 'Bridging' et le ciselage des punchlines.",
        keyPoints: "1. La technique du 'Bridging' (Le Pont) : Accuser réception de la question piège et bifurquer vers votre message clé ('C'est un aspect, mais le véritable enjeu ce soir est...').\n2. La structure de la punchline : courte (< 12 mots), imagée, formulée avec un contraste ou un rythme asymétrique.\n3. La maîtrise du silence hostile : ne jamais combler un silence tendu tendu par le journaliste avec des bavardages improvisés.",
        exercise: "Répondez à une question d'actualité polémique en exactement 15 secondes chronométrées, en terminant par une formule que tout le monde retiendra.",
        historicalQuote: {
          text: "Si vous voulez que je parle 10 minutes, il me faut deux semaines de préparation. Si vous voulez que je parle 2 heures, je suis prêt tout de suite.",
          author: 'Woodrow Wilson',
          context: "Sur la difficulté suprême de la concision"
        }
      },
      {
        title: 'La masterclass vivante : Conserver une énergie haute pendant plus de 45 minutes',
        summary: "Tenir une salle de 1 000 personnes en haleine pendant une heure exige la gestion de l'endurance d'un athlète de haut niveau. Vous apprendrez à gérer les vagues d'attention (courbe de 12 minutes), à faire participer le public et à réveiller une salle anesthésiée.",
        keyPoints: "1. La relance des 10 minutes : introduire une rupture (sondage à main levée, vidéo, question à son voisin) avant le décrochage de l'attention.\n2. La modulation énergétique : alterner séquences explosives d'enthousiasme et respirations calmes d'introspection.\n3. Le rituel physique d'après-scène : décharger le trop-plein d'adrénaline et analyser lucidement sa performance à froid.",
        exercise: "Élaborez le conducteur d'une conférence de 45 minutes en prévoyant 4 ruptures interactives précises pour relancer l'attention du public.",
        caseStudy: {
          title: "Les keynotes marathons de Barack Obama",
          analysis: "Obama utilise le principe de la basse continue : un tempo lent, des pauses amples, puis une montée en puissance lyrique (le crescendo oratoire) qui culmine dans les 5 dernières minutes."
        }
      }
    ],
    quiz: [
      {
        question: "Sur une grande scène, à quel moment précis l'orateur doit-il effectuer ses déplacements ?",
        options: [
          'En courant tout le temps pour montrer son dynamisme',
          'Pendant les transitions verbales entre deux idées, en restant parfaitement ancré et immobile lors des phrases clés',
          'Uniquement en reculant pour s’éloigner du public',
          'Quand le public applaudit'
        ],
        correctIndex: 1,
        explanation: "Marcher pendant l'énoncé d'un argument dilue la force du message. On bouge pour faire la transition, on s'ancre pour frapper."
      },
      {
        question: "Quelle touche du clavier permet instantanément de couper l'affichage de sa présentation pour recentrer l'attention sur soi ?",
        options: ['La touche Échap', 'La touche B (Blackout) ou W (White)', 'La barre d’espace', 'La touche F5'],
        correctIndex: 1,
        explanation: "La touche B (Blackout) éteint l'écran : le public n'a plus d'autre choix que de vous regarder dans les yeux."
      },
      {
        question: "En média training, qu'appelle-t-on la technique du 'Bridging' ?",
        options: [
          'Construire un pont au sens propre avec les journalistes',
          'Une méthode permettant d’accuser réception d’une question difficile pour bifurquer élégamment vers son message essentiel',
          'Parler en boucle sans s’arrêter jusqu’à la fin du temps imparti',
          'Ignorer totalement le journaliste en regardant ailleurs'
        ],
        correctIndex: 1,
        explanation: "Le bridging relie la question du journaliste à votre message clé sans paraître fuyant ni agressif."
      },
      {
        question: "Au bout de combien de minutes d'exposé magistral continu l'attention naturelle du cerveau humain chute-t-elle drastiquement ?",
        options: ['Environ 45 minutes', 'Environ 10 à 12 minutes', 'Moins de 2 minutes', 'Après 2 heures'],
        correctIndex: 1,
        explanation: "Les études en neuro-ergonomie montrent un pic de décrochage attentionnel toutes les 10 à 12 minutes en l'absence de rupture."
      },
      {
        question: "Quel badge suprême vient couronner la validation intégrale du Cursus de l'École Verbe ?",
        options: [
          'Orateur Débutant',
          'Diplôme d’honneur',
          '🏆 Grand Orateur Verbe',
          'Certificat de participation'
        ],
        correctIndex: 2,
        explanation: "Le badge 🏆 Grand Orateur Verbe récompense les orateurs ayant validé l'intégralité des 5 modules d'excellence oratoire."
      }
    ]
  }
];

export interface WebinarChapter {
  id: string;
  seconds: number;
  timeStr: string;
  title: string;
  description: string;
  speaker: string;
  keyTakeaway: string;
  slideTitle: string;
  slideBody: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatarBg: string;
  message: string;
  timestamp: string;
  likes: number;
}

export const WEBINAR_CHAPTERS: WebinarChapter[] = [
  {
    id: 'c1',
    seconds: 0,
    timeStr: '00:00',
    title: "Ouverture & Silence d'entrée (5 secondes)",
    description: "Posture d'ancrage sans parole : capter le regard avant le premier mot.",
    speaker: "Marc-Aurèle V.",
    keyTakeaway: "Ne jamais parler avant que le silence complet ne soit installé dans la salle.",
    slideTitle: "Chapitre 1 : L'Ancrage Silencieux",
    slideBody: "Le public teste votre solidité dans les 5 premières secondes. Respirez, regardez le fond de salle et souriez."
  },
  {
    id: 'c2',
    seconds: 420,
    timeStr: '07:00',
    title: 'La chimie du trac : cortisol vs adrénaline',
    description: 'Comprendre et maîtriser la physiologie de la peur devant 500 personnes.',
    speaker: "Dr. Sophie M.",
    keyTakeaway: "Le trac n'est pas un ennemi : c'est un flux d'énergie à réorienter.",
    slideTitle: "Chapitre 2 : La Biologie de l'Éloquence",
    slideBody: "L'expiration 4-2-6 stimule le nerf vague et divise par deux la sensation d'étouffement en 90 secondes."
  },
  {
    id: 'c3',
    seconds: 1100,
    timeStr: '18:20',
    title: 'La règle des 3 silences de Churchill',
    description: 'Comment peser ses silences pour décupler son autorité oratoire.',
    speaker: "Marc-Aurèle V.",
    keyTakeaway: "Le silence est le vêtement de la parole : il oblige l'auditoire à boire vos mots.",
    slideTitle: "Chapitre 3 : Les Silences Souverains",
    slideBody: "Silence d'entrée, silence de suspens avant le mot-clé, silence d'absorption après la punchline."
  },
  {
    id: 'c4',
    seconds: 1950,
    timeStr: '32:30',
    title: 'L\'accroche choc et le rythme ternaire',
    description: 'La structure des discours de Steve Jobs et Barack Obama décortiquée.',
    speaker: "Alexandre Dumas",
    keyTakeaway: "Le rythme ternaire (Tricolon) résonne comme une évidence mathématique dans l'esprit.",
    slideTitle: "Chapitre 4 : La Règle de Trois",
    slideBody: "Veni, Vidi, Vici. Problème, Solution, Impact. Ne présentez jamais plus de 3 points cardinaux."
  },
  {
    id: 'c5',
    seconds: 2800,
    timeStr: '46:40',
    title: 'La chute mémorable et le Call to Action',
    description: 'Fermer la boucle narrative et déclencher l\'applaudissement unanime.',
    speaker: "Marc-Aurèle V.",
    keyTakeaway: "La dernière phrase doit être susurrée ou clamée avec une certitude absolue, sans notes.",
    slideTitle: "Chapitre 5 : Le Point d'Orgue",
    slideBody: "Reliez votre chute à la question de départ pour refermer la boucle d'or avec panache."
  }
];

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'Camille T.',
    avatarBg: '#f2552f',
    message: "L'ancrage au sol a transformé ma prise de parole devant le conseil d'administration ce matin !",
    timestamp: '14:21',
    likes: 12
  },
  {
    id: 'm2',
    sender: 'Alexandre B.',
    avatarBg: '#7b5cff',
    message: 'La règle des 3 secondes de silence au démarrage change absolument tout. Testé en réunion ce matin !',
    timestamp: '14:23',
    likes: 19
  },
  {
    id: 'm3',
    sender: 'Dr. Sophie M.',
    avatarBg: '#2f9e63',
    message: "L'hypotypose de Victor Hugo et le discours de Badinter sont des exemples magistraux pour illustrer le Pathos.",
    timestamp: '14:25',
    likes: 24
  },
  {
    id: 'm4',
    sender: 'Thierry L.',
    avatarBg: '#3b2fb5',
    message: "Comment gérer le trac quand on voit que quelqu'un au premier rang regarde sa montre ?",
    timestamp: '14:27',
    likes: 8
  }
];

export const WEBINAR_COMMENTS = INITIAL_CHAT;

export const VIRELANGUES = [
  {
    id: 'v1',
    text: 'Un chasseur sachant chasser sans son chien est un sacré chasseur.',
    target: 'Ch / S — Dégagement des sifflantes et chuintantes'
  },
  {
    id: 'v2',
    text: "Les chaussettes de l'archiduchesse sont-elles sèches ou archi-sèches ?",
    target: 'Ch / S — Articulation labiale tonique'
  },
  {
    id: 'v3',
    text: 'Seize jacinthes sèchent dans seize sachets secs.',
    target: 'J / S / Z — Précision de la pointe de la langue'
  },
  {
    id: 'v4',
    text: 'Cinq gros rats grillent dans la grosse graisse grasse.',
    target: 'R / G — Projection palatale et soutien du diaphragme'
  },
  {
    id: 'v5',
    text: 'Trois tortues trottaient sur trois toits très étroits.',
    target: 'T / R — Agilité des alvéoles dentaires'
  },
  {
    id: 'v6',
    text: 'Si six scies scient six cyprès, six cents scies scient six cents cyprès.',
    target: 'S / C — Vélocité et tranchant des consonnes'
  }
];
