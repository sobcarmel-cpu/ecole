import React from 'react';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthButton: React.FC = () => {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-neutral-100 animate-pulse border border-neutral-200" />
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-neutral-100 border border-neutral-200 pl-2 pr-3 py-1 rounded-full text-xs font-medium text-neutral-800">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'Utilisateur'}
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-[#f2552f] text-white flex items-center justify-center text-[10px] font-bold">
              {user.displayName?.[0] || 'O'}
            </div>
          )}
          <span className="max-w-[120px] truncate">{user.displayName || 'Orateur'}</span>
        </div>

        <button
          onClick={signOut}
          title="Se déconnecter"
          className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={signIn}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-neutral-800 bg-white border border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400 shadow-xs transition-all cursor-pointer"
    >
      <LogIn className="w-3.5 h-3.5 text-[#f2552f]" />
      <span>Connexion</span>
    </button>
  );
};
