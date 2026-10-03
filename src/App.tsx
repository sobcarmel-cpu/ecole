import React, { useState, useEffect } from 'react';
import {
  Mic,
  Award,
  BookOpen,
  Radio,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  User,
  LogOut,
  LogIn,
  Layers,
  Flame,
  ArrowRight,
  TrendingUp,
  Volume2,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { COURSES, Course, HERO_IMAGE } from './data/courses';
import { WebinarLivePlayer } from './components/WebinarLivePlayer';
import { CourseViewer } from './components/CourseViewer';
import { CertificateView } from './components/CertificateView';
import { SpeakingLab } from './components/SpeakingLab';
import { ProgressDashboard } from './components/ProgressDashboard';
import { AuthModal } from './components/AuthModal';
import { CampaignView } from './components/CampaignView';
import {
  getCurrentUser,
  logoutUser,
  updateUserProgress,
  UserAccount,
  CourseProgressData
} from './utils/auth';

export default function App() {
  if (window.location.pathname === '/campaign' || window.location.pathname === '/campaign/') return <CampaignView />;
  // Current active view
  const [currentTab, setCurrentTab] = useState<'webinar' | 'courses' | 'lab' | 'certificates' | 'progression'>('courses');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedCertCourseId, setSelectedCertCourseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Auth state
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => getCurrentUser());
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  // Pending action after auth
  const [pendingCourseAction, setPendingCourseAction] = useState<string | null>(null);

  // Sync session on mount
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleUpdateCourseProgress = (
    courseId: string,
    updated: CourseProgressData
  ) => {
    if (!currentUser) {
      setPendingCourseAction(courseId);
      setAuthMode('signup');
      setIsAuthOpen(true);
      return;
    }

    const updatedUser = updateUserProgress(currentUser.username, courseId, updated);
    if (updatedUser) {
      setCurrentUser({ ...updatedUser });
    }
  };

  const getCourseProgress = (courseId: string): CourseProgressData => {
    return currentUser?.progress?.[courseId] || { done: [] };
  };

  const calculateTotalProgress = () => {
    if (!currentUser) return 0;
    const totalCourses = COURSES.length;
    let sum = 0;
    COURSES.forEach((c) => {
      const p = getCourseProgress(c.id);
      if (p.passed) sum += 100;
      else sum += Math.round((p.done.length / c.lessons.length) * 80);
    });
    return Math.round(sum / totalCourses);
  };

  const passedCoursesCount = COURSES.filter((c) => getCourseProgress(c.id).passed).length;
  const isAllPassed = passedCoursesCount === COURSES.length && COURSES.length > 0;

  const filteredCourses = COURSES.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.level.toLowerCase().includes(q)
    );
  });

  const handleSelectCourse = (courseId: string) => {
    if (!currentUser) {
      setPendingCourseAction(courseId);
      setAuthMode('signup');
      setIsAuthOpen(true);
      return;
    }
    setSelectedCourseId(courseId);
  };

  const handleOpenCertificate = (courseId: string) => {
    setSelectedCertCourseId(courseId);
    setCurrentTab('certificates');
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setSelectedCourseId(null);
    setSelectedCertCourseId(null);
  };

  const handleAuthSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    setIsAuthOpen(false);
    if (pendingCourseAction) {
      setSelectedCourseId(pendingCourseAction);
      setPendingCourseAction(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#1b1b1f] flex flex-col">
      {/* Barre de navigation supérieure */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo marque */}
          <div
            onClick={() => {
              setSelectedCourseId(null);
              setSelectedCertCourseId(null);
              setCurrentTab('courses');
            }}
            className="flex items-center gap-3 cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#f2552f] text-white flex items-center justify-center font-bold text-lg shadow-xs">
              V
            </div>
            <div>
              <div className="font-bold text-base sm:text-lg tracking-tight text-neutral-900 leading-none">
                Verbe
              </div>
              <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
                École d'art oratoire
              </div>
            </div>
          </div>

          {/* Navigation centrale */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-100/80 p-1 rounded-full border border-neutral-200/80">
            <button
              onClick={() => {
                setSelectedCourseId(null);
                setCurrentTab('courses');
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'courses' && !selectedCourseId
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#f2552f]" />
              Catalogue des cours
            </button>

            <button
              onClick={() => {
                setSelectedCourseId(null);
                setCurrentTab('webinar');
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'webinar'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              Webinaire direct
            </button>

            <button
              onClick={() => {
                setSelectedCourseId(null);
                setCurrentTab('lab');
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'lab'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Atelier pratique
            </button>

            <button
              onClick={() => {
                setSelectedCourseId(null);
                setSelectedCertCourseId(null);
                setCurrentTab('certificates');
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'certificates'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              Mes certificats
              {passedCoursesCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#2f9e63] text-white text-[10px] flex items-center justify-center font-bold">
                  {passedCoursesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setSelectedCourseId(null);
                setSelectedCertCourseId(null);
                setCurrentTab('progression');
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'progression'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#f2552f]" />
              Progression
              <span className="flex items-center text-[10px] font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-full">
                🔥 14j
              </span>
            </button>
          </nav>

          {/* Recherche & Compte utilisateur */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block w-40 lg:w-52">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentTab !== 'courses') setCurrentTab('courses');
                }}
                placeholder="Rechercher un cours…"
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-100 border border-neutral-200 rounded-full focus:outline-none focus:border-[#f2552f] transition-all"
              />
            </div>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-neutral-100 pl-2 pr-3 py-1 rounded-full border border-neutral-200">
                  <div className="w-6 h-6 rounded-full bg-[#f2552f] text-white text-xs font-bold flex items-center justify-center">
                    {currentUser.name[0].toUpperCase()}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-neutral-800 max-w-[110px] truncate leading-none">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      @{currentUser.username}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  title="Se déconnecter"
                  className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setIsAuthOpen(true);
                  }}
                  className="text-xs font-semibold text-neutral-700 hover:text-neutral-900 px-3 py-1.5 rounded-full cursor-pointer"
                >
                  Connexion
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setIsAuthOpen(true);
                  }}
                  className="text-xs font-semibold text-white bg-[#f2552f] hover:bg-[#d94420] px-4 py-1.5 rounded-full shadow-xs transition-colors cursor-pointer"
                >
                  Créer un compte
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-around border-t border-neutral-200 bg-white px-2 py-1.5 text-[11px] font-semibold">
          <button
            onClick={() => {
              setSelectedCourseId(null);
              setCurrentTab('courses');
            }}
            className={`flex flex-col items-center gap-1 p-1 ${currentTab === 'courses' ? 'text-[#f2552f]' : 'text-neutral-600'}`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Cours</span>
          </button>
          <button
            onClick={() => {
              setSelectedCourseId(null);
              setCurrentTab('webinar');
            }}
            className={`flex flex-col items-center gap-1 p-1 ${currentTab === 'webinar' ? 'text-[#f2552f]' : 'text-neutral-600'}`}
          >
            <Radio className="w-4 h-4" />
            <span>Webinaire</span>
          </button>
          <button
            onClick={() => {
              setSelectedCourseId(null);
              setCurrentTab('lab');
            }}
            className={`flex flex-col items-center gap-1 p-1 ${currentTab === 'lab' ? 'text-[#f2552f]' : 'text-neutral-600'}`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Atelier</span>
          </button>
          <button
            onClick={() => {
              setSelectedCourseId(null);
              setSelectedCertCourseId(null);
              setCurrentTab('certificates');
            }}
            className={`flex flex-col items-center gap-1 p-1 ${currentTab === 'certificates' ? 'text-[#f2552f]' : 'text-neutral-600'}`}
          >
            <Award className="w-4 h-4" />
            <span>Certificats</span>
          </button>
          <button
            onClick={() => {
              setSelectedCourseId(null);
              setSelectedCertCourseId(null);
              setCurrentTab('progression');
            }}
            className={`flex flex-col items-center gap-1 p-1 ${currentTab === 'progression' ? 'text-[#f2552f]' : 'text-neutral-600'}`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Progression</span>
          </button>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* VUE 1 : COURS ACTIF DÉTAILLÉ */}
        {selectedCourseId ? (
          (() => {
            const course = COURSES.find((c) => c.id === selectedCourseId);
            if (!course) return null;
            return (
              <CourseViewer
                course={course}
                userProgress={getCourseProgress(course.id)}
                onUpdateProgress={(updated) => handleUpdateCourseProgress(course.id, updated)}
                onViewCertificate={handleOpenCertificate}
                onBack={() => setSelectedCourseId(null)}
              />
            );
          })()
        ) : currentTab === 'courses' ? (
          /* VUE 2 : CATALOGUE COMPLET DES COURS */
          <div className="space-y-10">
            {/* Bannière de Bienvenue Personnalisée si connecté */}
            {currentUser ? (
              <div className="bg-gradient-to-r from-orange-50 via-white to-amber-50 border border-orange-200/70 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-wrap items-center justify-between gap-6">
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#f2552f] flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" /> Espace Stagiaire Connecté
                    </span>
                    <span className="text-neutral-300">·</span>
                    <span className="text-xs text-neutral-500 font-mono">@{currentUser.username}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 font-serif-title">
                    Bonjour {currentUser.name} 👋
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    Terminez les leçons de chaque cours, validez le QCM avec au moins 70% et téléchargez vos certificats nominatifs officiels.
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-white/80 p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
                  <div className="w-14 h-14 rounded-full border-4 border-neutral-100 border-t-[#f2552f] flex items-center justify-center font-bold text-sm text-neutral-900 font-mono">
                    {calculateTotalProgress()}%
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Progression globale
                    </div>
                    <div className="text-sm font-bold text-neutral-900">
                      {passedCoursesCount} sur {COURSES.length} modules validés
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Bannière d'invitation pour visiteurs non-connectés */
              <div className="relative rounded-3xl overflow-hidden shadow-md bg-neutral-900 text-white">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-7 p-6 sm:p-10 space-y-4 z-10">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#f2552f] inline-flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Formation Pratique à l'Art Oratoire
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-bold font-serif-title leading-tight">
                      Maîtrisez la parole, captivez chaque auditoire.
                    </h1>
                    <p className="text-sm text-neutral-300 leading-relaxed max-w-xl">
                      Créez un compte pour suivre les 5 cursus complets, passer les épreuves QCM et recevoir vos certificats nominatifs officiels.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          setAuthMode('signup');
                          setIsAuthOpen(true);
                        }}
                        className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#f2552f] hover:bg-[#d94420] shadow-sm transition-all cursor-pointer"
                      >
                        Créer un compte gratuitement
                      </button>
                      <button
                        onClick={() => {
                          setAuthMode('login');
                          setIsAuthOpen(true);
                        }}
                        className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-200 bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                      >
                        Se connecter
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden">
                    <img
                      src={HERO_IMAGE}
                      alt="Conférencier en pleine prise de parole sur scène"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-900 via-neutral-900/40 to-transparent"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid des 5 Modules avec vraies photos */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                    Les 5 Modules de Formation
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Cliquez sur un cours pour démarrer les leçons et passer le QCM.
                  </p>
                </div>
                <span className="text-xs text-neutral-500 font-medium">
                  {filteredCourses.length} cours disponibles
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => {
                  const p = getCourseProgress(course.id);
                  const pct = p.passed ? 100 : Math.round((p.done.length / course.lessons.length) * 80);

                  return (
                    <div
                      key={course.id}
                      onClick={() => handleSelectCourse(course.id)}
                      className="bg-white border border-neutral-200 hover:border-neutral-300 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col group"
                    >
                      {/* Photo réelle de scène */}
                      <div className="relative aspect-16/10 overflow-hidden bg-neutral-900">
                        <img
                          src={course.image}
                          alt={course.imageAlt}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent"></div>

                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                          Module {course.number}
                        </div>

                        {p.passed && (
                          <div className="absolute top-3 right-3 bg-[#2f9e63] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Certifié ({p.score}%)
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                            <span>{course.level}</span>
                            <span>·</span>
                            <span>{course.duration}</span>
                            <span>·</span>
                            <span>{course.lessons.length} leçons</span>
                          </div>

                          <h3 className="text-base font-bold text-neutral-900 mt-1.5 group-hover:text-[#f2552f] transition-colors leading-snug">
                            {course.title}
                          </h3>

                          <p className="text-xs text-neutral-600 line-clamp-2 mt-1 leading-relaxed">
                            {course.subtitle}
                          </p>
                        </div>

                        {/* Progression de ce cours */}
                        <div className="space-y-2 pt-2 border-t border-neutral-100">
                          {currentUser ? (
                            <>
                              <div className="flex items-center justify-between text-xs text-neutral-500">
                                <span>{p.done.length}/{course.lessons.length} leçons terminées</span>
                                <span className="font-semibold text-neutral-900">{pct}%</span>
                              </div>

                              <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#f2552f] rounded-full transition-all duration-300"
                                  style={{ width: `${pct}%` }}
                                ></div>
                              </div>
                            </>
                          ) : (
                            <div className="text-xs text-neutral-500 font-medium">
                              🔒 Inscription requise pour enregistrer votre progression
                            </div>
                          )}

                          <div className="pt-2 flex items-center justify-between">
                            <span className="text-xs text-neutral-400 font-medium">
                              {p.passed ? 'Certificat débloqué' : 'QCM final inclus'}
                            </span>
                            <button className="text-xs font-bold text-[#f2552f] flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer">
                              {currentUser ? (pct > 0 ? 'Continuer' : 'Commencer') : 'Suivre ce cours'} <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : currentTab === 'webinar' ? (
          /* VUE 3 : WEBINAIRE DIRECT & REPLAY */
          <div className="space-y-12">
            <WebinarLivePlayer
              onGoToCourse={(id) => handleSelectCourse(id)}
              onGoToLab={() => setCurrentTab('lab')}
            />
          </div>
        ) : currentTab === 'lab' ? (
          /* VUE 4 : ATELIER PRATIQUE DE L'ORATEUR */
          <SpeakingLab />
        ) : currentTab === 'progression' ? (
          /* VUE 5 : MA PROGRESSION & GAMIFICATION */
          <ProgressDashboard
            userName={currentUser?.name || 'Camille Tépone'}
            onGoToCourse={(id) => handleSelectCourse(id)}
            onGoToLab={() => setCurrentTab('lab')}
          />
        ) : (
          /* VUE 6 : MES CERTIFICATS OFFICIELS */
          (() => {
            if (!currentUser) {
              return (
                <div className="bg-white border border-neutral-200 rounded-3xl p-10 text-center space-y-4 max-w-xl mx-auto shadow-xs">
                  <Award className="w-14 h-14 text-[#f2552f] mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-neutral-900">
                      Connectez-vous pour voir vos certificats
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      Créez un compte ou connectez-vous avec votre identifiant pour consulter, imprimer et télécharger vos attestations de réussite.
                    </p>
                  </div>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setAuthMode('login');
                        setIsAuthOpen(true);
                      }}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
                    >
                      Connexion
                    </button>
                    <button
                      onClick={() => {
                        setAuthMode('signup');
                        setIsAuthOpen(true);
                      }}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#f2552f] hover:bg-[#d94420] cursor-pointer shadow-xs"
                    >
                      Créer un compte
                    </button>
                  </div>
                </div>
              );
            }

            if (selectedCertCourseId) {
              const isMaster = selectedCertCourseId === 'all';
              const course = isMaster ? null : COURSES.find((c) => c.id === selectedCertCourseId);
              const p = course ? getCourseProgress(course.id) : null;
              const dateStr = isMaster
                ? new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
                : p?.date || 'Octobre 2026';
              const score = isMaster
                ? Math.round(
                    COURSES.reduce((acc, c) => acc + (getCourseProgress(c.id).score || 85), 0) / COURSES.length
                  )
                : p?.score || 85;

              return (
                <CertificateView
                  user={{
                    name: currentUser.name,
                    username: currentUser.username,
                  }}
                  course={course}
                  isGrandGrandCertification={isMaster}
                  score={score}
                  dateStr={dateStr}
                  onBack={() => setSelectedCertCourseId(null)}
                />
              );
            }

            const validatedCourses = COURSES.filter((c) => getCourseProgress(c.id).passed);

            return (
              <div className="space-y-8">
                <div>
                  <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                    Certifications Académiques de {currentUser.name}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
                    Mes Diplômes & Attestations
                  </h2>
                  <p className="text-neutral-600 text-sm mt-1 max-w-2xl">
                    Chaque certificat est délivré sous sceau officiel avec référence unique vérifiable après validation du QCM à 70%.
                  </p>
                </div>

                {/* Grand Diplôme d'Orateur si tous les cours sont réussis */}
                {isAllPassed ? (
                  <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white shadow-xl flex flex-wrap items-center justify-between gap-6">
                    <div className="space-y-2 max-w-xl">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                        ★ Titre Suprême d'Excellence
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold font-serif-title">
                        Grand Diplôme : « Orateur Certifié & Conférencier »
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-100">
                        Félicitations {currentUser.name} ! Vous avez réussi l'intégralité des 5 modules d'art oratoire. Votre titre suprême est généré et prêt à être imprimé.
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenCertificate('all')}
                      className="px-6 py-3 bg-white text-neutral-900 rounded-full font-bold text-sm shadow-md hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                      Afficher le Grand Diplôme
                    </button>
                  </div>
                ) : (
                  <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                        ★
                      </div>
                      <div>
                        <div className="text-sm font-bold text-neutral-900">
                          Grand Diplôme « Orateur Certifié »
                        </div>
                        <div className="text-xs text-neutral-500">
                          {validatedCourses.length}/5 modules validés ({5 - validatedCourses.length} restant{5 - validatedCourses.length > 1 ? 's' : ''})
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentTab('courses')}
                      className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors cursor-pointer"
                    >
                      Compléter mes cours
                    </button>
                  </div>
                )}

                {/* Liste des certificats par module */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-neutral-900">
                    Certificats par module
                  </h3>

                  {validatedCourses.length === 0 ? (
                    <div className="bg-white border border-neutral-200 rounded-3xl p-10 text-center space-y-4">
                      <Award className="w-12 h-12 text-neutral-300 mx-auto" />
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-neutral-800">
                          Aucun certificat débloqué pour le moment
                        </h4>
                        <p className="text-xs text-neutral-500 max-w-md mx-auto">
                          Terminez les leçons d'un cours puis réussissez son QCM final avec 70% minimum pour éditer votre premier certificat nominatif officiel.
                        </p>
                      </div>
                      <button
                        onClick={() => handleSelectCourse('p1')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#f2552f] hover:bg-[#d94420] shadow-xs transition-colors cursor-pointer"
                      >
                        Commencer le Module I : Fondements de la parole
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {validatedCourses.map((c) => {
                        const p = getCourseProgress(c.id);

                        return (
                          <div
                            key={c.id}
                            className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs text-neutral-400">
                                <span>Module {c.number}</span>
                                <span className="text-[#2f9e63] font-semibold">Score : {p.score}%</span>
                              </div>
                              <h4 className="text-base font-bold text-neutral-900 leading-snug">
                                {c.title}
                              </h4>
                              <p className="text-xs text-neutral-500">
                                Délivré le {p.date || 'Octobre 2026'}
                              </p>
                            </div>

                            <button
                              onClick={() => handleOpenCertificate(c.id)}
                              className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-black text-white rounded-full text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Award className="w-4 h-4 text-amber-400" />
                              Ouvrir le certificat officiel
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })()
        )}
      </main>

      {/* Footer minimaliste et propre */}
      <footer className="mt-16 border-t border-neutral-200 bg-white py-8 text-neutral-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-[#f2552f] text-white flex items-center justify-center font-bold text-xs">
              V
            </span>
            <span className="font-semibold text-neutral-800">Verbe</span>
            <span>·</span>
            <span>École d'art oratoire & Webinaire interactif</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-500">
            <span>Prise de parole en public</span>
            <span>·</span>
            <span>Éloquence & Scène</span>
            <span>·</span>
            <span>Certifications A4 exportables</span>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        mode={authMode}
        onClose={() => {
          setIsAuthOpen(false);
          setPendingCourseAction(null);
        }}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
