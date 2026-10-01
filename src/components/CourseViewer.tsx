import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Award,
  BookOpen,
  HelpCircle,
  Sparkles,
  ChevronRight,
  Clock,
  RotateCcw,
  Check
} from 'lucide-react';
import { Course, Lesson } from '../data/courses';

interface CourseViewerProps {
  course: Course;
  userProgress: { done: number[]; passed?: boolean; score?: number; date?: string };
  onUpdateProgress: (updated: { done: number[]; passed?: boolean; score?: number; date?: string }) => void;
  onViewCertificate: (courseId: string) => void;
  onBack: () => void;
}

export const CourseViewer: React.FC<CourseViewerProps> = ({
  course,
  userProgress,
  onUpdateProgress,
  onViewCertificate,
  onBack,
}) => {
  // Find first uncompleted lesson or default to 0
  const firstUnfinished = course.lessons.findIndex((_, idx) => !userProgress.done.includes(idx));
  const [activeLessonIdx, setActiveLessonIdx] = useState(firstUnfinished >= 0 ? firstUnfinished : 0);
  const [activeTab, setActiveTab] = useState<'lesson' | 'quiz' | 'lab'>('lesson');

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(userProgress.score || 0);

  const currentLesson: Lesson = course.lessons[activeLessonIdx];
  const allLessonsDone = userProgress.done.length === course.lessons.length;
  const progressPercent = userProgress.passed
    ? 100
    : Math.round((userProgress.done.length / course.lessons.length) * 80);

  const handleCompleteLesson = (idx: number) => {
    let newDone = [...userProgress.done];
    if (!newDone.includes(idx)) {
      newDone.push(idx);
    }
    const updated = {
      ...userProgress,
      done: newDone,
    };
    onUpdateProgress(updated);

    if (idx + 1 < course.lessons.length) {
      setActiveLessonIdx(idx + 1);
    } else {
      setActiveTab('quiz');
    }
  };

  const handleValidateQuiz = () => {
    let correctCount = 0;
    course.quiz.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctIndex) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / course.quiz.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= 70) {
      const today = new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      onUpdateProgress({
        ...userProgress,
        passed: true,
        score,
        date: today,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Barre de retour et progression */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-neutral-200 rounded-2xl shadow-xs">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Retour aux cours
        </button>

        <div className="flex items-center gap-3 text-xs text-neutral-600 font-medium">
          <span>{course.number}. {course.title}</span>
          <span>·</span>
          <span>{course.level}</span>
          <span>·</span>
          <span className="font-semibold text-neutral-900">{progressPercent}% terminé</span>
        </div>
      </div>

      {/* Main Grid : Contenu de la leçon + Sidebar de navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Colonne Principale (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header visuel du cours avec photo réelle */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg bg-neutral-900 h-64 sm:h-72">
            <img
              src={currentLesson.image || course.image}
              alt={currentLesson.caption || course.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-xs uppercase tracking-widest font-bold text-[#f2552f]">
                {course.number}. {course.title} · Leçon {activeLessonIdx + 1}/{course.lessons.length}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif-title leading-tight">
                {activeTab === 'quiz' ? 'Épreuve Finale de Validation (QCM)' : currentLesson.title}
              </h1>
              {currentLesson.caption && activeTab === 'lesson' && (
                <p className="text-xs text-neutral-300 italic pt-1">
                  Photo réelle : {currentLesson.caption}
                </p>
              )}
            </div>
          </div>

          {/* Onglets Leçon / Speaking Lab / QCM */}
          <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-2">
            <button
              onClick={() => setActiveTab('lesson')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'lesson'
                  ? 'bg-[#f2552f] text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Leçon {activeLessonIdx + 1}
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'lab'
                  ? 'bg-[#f2552f] text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              🎯 Speaking Lab & Objectifs
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-[#f2552f] text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Épreuve QCM {userProgress.passed ? '✓ Validée' : ''}
            </button>
          </div>

          {/* VUE LEÇON */}
          {activeTab === 'lesson' && (
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
              {/* Corps explicatif */}
              <div className="space-y-4 text-neutral-800 leading-relaxed text-base sm:text-lg font-normal">
                {currentLesson.summary.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Citation historique & Référence académique */}
              {currentLesson.historicalQuote && (
                <div className="bg-[#fffdf8] border border-[#c9a24a]/50 rounded-2xl p-6 relative overflow-hidden shadow-xs">
                  <div className="absolute top-2 right-4 text-6xl text-[#c9a24a]/20 font-serif-title select-none pointer-events-none">
                    “
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#b8892f] block mb-2">
                    Parole de Maître Orateur & Référence Classique
                  </span>
                  <blockquote className="font-serif-title italic text-base sm:text-lg text-neutral-900 leading-relaxed">
                    {currentLesson.historicalQuote.text}
                  </blockquote>
                  <div className="mt-3 pt-3 border-t border-[#c9a24a]/30 flex flex-wrap items-center justify-between text-xs text-neutral-600">
                    <span className="font-bold text-neutral-900">{currentLesson.historicalQuote.author}</span>
                    <span className="text-neutral-500 italic">{currentLesson.historicalQuote.context}</span>
                  </div>
                </div>
              )}

              {/* Figure de style & Mécanisme rhétorique */}
              {currentLesson.rhetoricalDevice && (
                <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Figure de Style & Effet Rhétorique
                    </span>
                    <span className="text-xs font-mono font-semibold text-indigo-900 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                      {currentLesson.rhetoricalDevice.name}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    <strong className="text-neutral-900">Mécanisme :</strong> {currentLesson.rhetoricalDevice.definition}
                  </p>
                  <div className="bg-white/80 border border-indigo-100 p-3.5 rounded-xl text-xs sm:text-sm font-serif-title italic text-neutral-900">
                    « {currentLesson.rhetoricalDevice.example} »
                  </div>
                </div>
              )}

              {/* Étude de cas réelle */}
              {currentLesson.caseStudy && (
                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#f2552f]" /> Étude de Cas Réelle : {currentLesson.caseStudy.title}
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed pt-1">
                    {currentLesson.caseStudy.analysis}
                  </p>
                </div>
              )}

              {/* Encadré Points clés */}
              <div className="bg-neutral-50 border-l-4 border-[#f2552f] p-5 rounded-r-2xl space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  Points Clés à Retenir
                </span>
                <p className="text-sm font-semibold text-neutral-900 leading-relaxed">
                  {currentLesson.keyPoints}
                </p>
              </div>

              {/* Encadré Exercice Pratique */}
              <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-2xl space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Exercice d'application immédiate
                </span>
                <p className="text-sm text-amber-950 font-medium leading-relaxed">
                  {currentLesson.exercise}
                </p>
              </div>

              {/* Astuce de Maître Orateur */}
              {currentLesson.proTip && (
                <div className="bg-neutral-900 text-white p-5 rounded-2xl space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#f2552f]">
                    Secret de Tribune
                  </span>
                  <p className="text-sm text-neutral-200 italic leading-relaxed">
                    « {currentLesson.proTip} »
                  </p>
                </div>
              )}

              {/* Bouton de progression */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Leçon {activeLessonIdx + 1} sur {course.lessons.length}
                </span>

                <button
                  onClick={() => handleCompleteLesson(activeLessonIdx)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#f2552f] hover:bg-[#d94420] shadow-sm transition-all cursor-pointer"
                >
                  {userProgress.done.includes(activeLessonIdx) ? (
                    <>Leçon validée ✓ — {activeLessonIdx + 1 < course.lessons.length ? 'Suivant' : 'Passer au QCM'}</>
                  ) : (
                    <>Valider cette leçon <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* VUE SPEAKING LAB & OBJECTIFS */}
          {activeTab === 'lab' && (
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
              <div className="border-b border-neutral-100 pb-5">
                <span className="text-xs font-semibold text-[#f2552f] uppercase tracking-wider">
                  Cahier des Charges & Ateliers
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
                  Module {course.number} : {course.title}
                </h3>
                <p className="text-sm text-neutral-600 mt-1">
                  {course.subtitle}
                </p>
              </div>

              {/* Fiche pédagogique */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    🎯 Objectifs d'Apprentissage
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
                    {course.objectifs}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    ⏱️ Durée & Prérequis
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
                    <strong>{course.duration}</strong> · {course.prerequis}
                  </p>
                  <p className="text-xs text-neutral-500 pt-1">
                    Badge final : <strong className="text-neutral-900">{course.badgeUnlocked}</strong>
                  </p>
                </div>
              </div>

              {/* Speaking Lab Box */}
              <div className="p-6 rounded-3xl bg-neutral-950 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#f2552f] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Speaking Lab Pratique
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">Épreuve pratique orale</span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-bold text-white">Consigne officielle :</h4>
                  <p className="text-sm text-neutral-200 leading-relaxed font-serif italic bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800">
                    « {course.speakingLab.consigne} »
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Critères d'évaluation de la performance :
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-300">
                    {course.speakingLab.criteres.map((crit, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{crit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-xs text-neutral-400">
                    Utilisez le micro et le simulateur vocal dans l'Atelier Pratique.
                  </span>
                </div>
              </div>

              {/* Évaluation Finale Box */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" /> Protocole d'Évaluation Finale
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-amber-900">
                  {course.evaluationFinale}
                </p>
              </div>
            </div>
          )}
          {activeTab === 'quiz' && (
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
              <div>
                <span className="text-xs font-semibold text-[#f2552f] uppercase tracking-wider">
                  Évaluation Finale de Connaissances
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
                  QCM de certification du module {course.number}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Obtenez au moins 70% de bonnes réponses pour débloquer votre certificat nominatif officiel.
                </p>
              </div>

              {userProgress.passed && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#2f9e63]" />
                    <div>
                      <div className="text-sm font-bold text-emerald-900">
                        Module validé avec succès ({userProgress.score}%) !
                      </div>
                      <div className="text-xs text-emerald-700">
                        Votre certificat officiel est prêt et signé.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onViewCertificate(course.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2f9e63] hover:bg-emerald-700 rounded-full shadow-xs transition-colors cursor-pointer"
                  >
                    <Award className="w-4 h-4" /> Consulter mon certificat
                  </button>
                </div>
              )}

              {/* Questions du Quiz */}
              <div className="space-y-6">
                {course.quiz.map((q, qIndex) => {
                  const selected = selectedAnswers[qIndex];
                  const isCorrect = selected === q.correctIndex;

                  return (
                    <div
                      key={qIndex}
                      className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-3"
                    >
                      <h4 className="text-sm sm:text-base font-bold text-neutral-900 flex items-start gap-2">
                        <span className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-800 text-xs flex items-center justify-center shrink-0 font-mono">
                          {qIndex + 1}
                        </span>
                        {q.question}
                      </h4>

                      <div className="space-y-2 pt-1">
                        {q.options.map((opt, optIndex) => {
                          const isOptionSelected = selected === optIndex;
                          const showSuccess = quizSubmitted && optIndex === q.correctIndex;
                          const showError = quizSubmitted && isOptionSelected && !isCorrect;

                          return (
                            <label
                              key={optIndex}
                              className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium cursor-pointer transition-all ${
                                showSuccess
                                  ? 'border-[#2f9e63] bg-emerald-50 text-emerald-950 font-semibold'
                                  : showError
                                  ? 'border-red-400 bg-red-50 text-red-950'
                                  : isOptionSelected
                                  ? 'border-[#f2552f] bg-orange-50/60 text-neutral-900'
                                  : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`q_${qIndex}`}
                                checked={isOptionSelected}
                                onChange={() => {
                                  if (!quizSubmitted) {
                                    setSelectedAnswers((prev) => ({
                                      ...prev,
                                      [qIndex]: optIndex,
                                    }));
                                  }
                                }}
                                disabled={quizSubmitted}
                                className="accent-[#f2552f] cursor-pointer"
                              />
                              <span>{opt}</span>
                            </label>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <p className={`text-xs p-2 rounded-lg font-medium mt-2 ${isCorrect ? 'text-emerald-700 bg-emerald-100/60' : 'text-red-700 bg-red-100/60'}`}>
                          {isCorrect ? '✓ ' : '✕ '} {q.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bouton de validation */}
              <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-neutral-500">
                  {Object.keys(selectedAnswers).length}/{course.quiz.length} questions répondues
                </span>

                <div className="flex items-center gap-3">
                  {quizSubmitted ? (
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setSelectedAnswers({});
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Recommencer le test
                    </button>
                  ) : (
                    <button
                      onClick={handleValidateQuiz}
                      disabled={Object.keys(selectedAnswers).length < course.quiz.length}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[#f2552f] hover:bg-[#d94420] disabled:opacity-50 disabled:cursor-not-allowed shadow-xs transition-all cursor-pointer"
                    >
                      Valider mes réponses
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Colonne Latérale : Plan du cours & Progression (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Bloc Progression */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Progression du Cursus
                </span>
                <div className="text-xl font-bold text-neutral-900">
                  {userProgress.done.length}/{course.lessons.length} leçons
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-neutral-100 border-t-[#f2552f] flex items-center justify-center font-bold text-xs text-neutral-800">
                {progressPercent}%
              </div>
            </div>

            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#f2552f] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Liste des leçons */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
              Sommaire des Leçons
            </h3>

            <div className="space-y-1.5">
              {course.lessons.map((ls, idx) => {
                const isCurrent = activeTab === 'lesson' && activeLessonIdx === idx;
                const isCompleted = userProgress.done.includes(idx);

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveLessonIdx(idx);
                      setActiveTab('lesson');
                    }}
                    className={`w-full flex items-center justify-between gap-3 p-3 rounded-2xl text-left text-xs transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-orange-50 border border-[#f2552f]/40 font-semibold text-neutral-900'
                        : 'hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                          isCompleted
                            ? 'bg-[#2f9e63] text-white'
                            : isCurrent
                            ? 'bg-[#f2552f] text-white'
                            : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {isCompleted ? '✓' : idx + 1}
                      </div>
                      <span className="truncate">{ls.title}</span>
                    </div>
                  </button>
                );
              })}

              {/* Bouton direct vers le QCM */}
              <button
                onClick={() => setActiveTab('quiz')}
                className={`w-full flex items-center justify-between gap-3 p-3 rounded-2xl text-left text-xs transition-all cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'bg-orange-50 border border-[#f2552f]/40 font-semibold text-neutral-900'
                    : 'hover:bg-neutral-50 text-neutral-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                      userProgress.passed
                        ? 'bg-[#2f9e63] text-white'
                        : 'bg-neutral-800 text-white'
                    }`}
                  >
                    {userProgress.passed ? '✓' : 'Q'}
                  </div>
                  <span>Épreuve QCM finale</span>
                </div>
                {userProgress.passed && (
                  <span className="text-[10px] font-bold text-[#2f9e63]">Validé</span>
                )}
              </button>
            </div>
          </div>

          {/* Badge débloqué */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
                Badge officiel
              </span>
              <span className="text-sm font-bold text-neutral-900 mt-0.5 block">
                {course.badgeUnlocked}
              </span>
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                userProgress.passed
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-neutral-100 text-neutral-500'
              }`}
            >
              {userProgress.passed ? 'Obtenu ✓' : 'À débloquer'}
            </span>
          </div>

          {/* Carte Certificat */}
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white p-6 rounded-3xl shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Award className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Certificat de compétence
              </span>
            </div>
            <p className="text-xs text-neutral-300">
              Délivré avec signature cryptographique et numéro d'enregistrement officiel dès 70% de réussite au QCM.
            </p>
            <button
              onClick={() => onViewCertificate(course.id)}
              disabled={!userProgress.passed}
              className="w-full py-2.5 px-4 rounded-full text-xs font-semibold bg-white text-neutral-950 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {userProgress.passed ? 'Ouvrir mon certificat' : 'Débloquer après le QCM'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
