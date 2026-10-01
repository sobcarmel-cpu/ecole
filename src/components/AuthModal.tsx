import React, { useState } from 'react';
import { X, Lock, User, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { registerUser, loginUser, UserAccount, syncFirebaseUserToAccount } from '../utils/auth';
import { signInWithGoogle } from '../services/firebase';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (user: UserAccount) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  mode: initialMode,
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    try {
      const fbUser = await signInWithGoogle();
      if (fbUser) {
        const syncedAccount = syncFirebaseUserToAccount(fbUser);
        onSuccess(syncedAccount);
        onClose();
      }
    } catch (err) {
      setError('Erreur lors de la connexion Google Firebase.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        const res = await registerUser(name, username, password);
        if (!res.success) {
          setError(res.error || 'Erreur lors de l\'inscription');
          setIsLoading(false);
          return;
        }
        if (res.user) {
          onSuccess(res.user);
          onClose();
        }
      } else {
        const res = await loginUser(username, password);
        if (!res.success) {
          setError(res.error || 'Erreur lors de la connexion');
          setIsLoading(false);
          return;
        }
        if (res.user) {
          onSuccess(res.user);
          onClose();
        }
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setIsLoading(true);
    const res = await loginUser('orateur', 'orateur');
    setIsLoading(false);
    if (res.success && res.user) {
      onSuccess(res.user);
      onClose();
    } else {
      // Fallback: register test user
      const reg = await registerUser('Alexandre Dumas', 'orateur', 'orateur');
      if (reg.user) {
        onSuccess(reg.user);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-neutral-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#f2552f] text-white flex items-center justify-center font-bold text-base mb-3 shadow-xs">
            V
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
            {mode === 'signup' ? 'Créer un compte stagiaire' : 'Connexion à votre espace'}
          </h2>
          <p className="text-xs text-neutral-500">
            {mode === 'signup'
              ? 'Créez votre profil pour suivre les cours, passer les QCM et générer vos certificats officiels.'
              : 'Accédez à votre progression, vos cours et vos diplômes enregistrés.'}
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Nom et Prénom complets (pour les certificats)
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex : Camille Tépone"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-[#f2552f] transition-all text-neutral-900"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Nom d'utilisateur / Identifiant
            </label>
            <input
              type="text"
              required
              autoCapitalize="none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ex : stagiaire2026"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-[#f2552f] transition-all text-neutral-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-[#f2552f] transition-all text-neutral-900"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-full text-sm font-semibold text-white bg-[#f2552f] hover:bg-[#d94420] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer mt-2"
          >
            {isLoading
              ? 'Traitement en cours…'
              : mode === 'signup'
              ? 'Créer mon compte et commencer'
              : 'Se connecter à l\'Académie'}
          </button>
        </form>

        {/* Google Firebase Login */}
        <div className="mt-4">
          <div className="relative flex py-1 items-center mb-3">
            <div className="grow border-t border-neutral-200"></div>
            <span className="shrink mx-3 text-[11px] text-neutral-400 font-medium">OU</span>
            <div className="grow border-t border-neutral-200"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-full border border-neutral-300 hover:border-neutral-400 bg-white text-xs font-semibold text-neutral-800 shadow-xs hover:bg-neutral-50 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continuer avec Google (Firebase)</span>
          </button>
        </div>

        {/* Demo Fast Login */}
        <div className="mt-5 pt-4 border-t border-neutral-100">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
            Accès d'essai rapide
          </span>
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full py-2 px-3 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>👤 Connexion automatique (Compte démo)</span>
            <span className="font-mono text-neutral-400">orateur / orateur</span>
          </button>
        </div>

        <div className="mt-4 text-center">
          {mode === 'signup' ? (
            <p className="text-xs text-neutral-500">
              Vous avez déjà un compte ?{' '}
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setMode('login');
                }}
                className="text-[#f2552f] font-semibold hover:underline cursor-pointer"
              >
                Se connecter
              </button>
            </p>
          ) : (
            <p className="text-xs text-neutral-500">
              Nouveau stagiaire ?{' '}
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setMode('signup');
                }}
                className="text-[#f2552f] font-semibold hover:underline cursor-pointer"
              >
                Créer un compte gratuitement
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
