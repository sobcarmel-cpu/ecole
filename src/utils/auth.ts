export interface CourseProgressData {
  done: number[];
  passed?: boolean;
  score?: number;
  date?: string;
}

export interface UserAccount {
  name: string;
  username: string;
  passwordHash: string;
  createdAt: string;
  progress: Record<string, CourseProgressData>;
}

const USERS_DB_KEY = 'verbe_users_db_v1';
const SESSION_KEY = 'verbe_current_session_v1';

// Simple fast hash for client-side storage demonstration
export async function hashPassword(str: string): Promise<string> {
  try {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  } catch {
    // Fallback if subtle crypto is restricted
    return btoa(unescape(encodeURIComponent(str)));
  }
}

export function getAllUsers(): Record<string, UserAccount> {
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading users db', e);
  }

  // Pre-seed demo user
  const initialUsers: Record<string, UserAccount> = {
    orateur: {
      name: 'Alexandre Dumas',
      username: 'orateur',
      passwordHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', // will accept demo password
      createdAt: '2026-10-01',
      progress: {
        p1: { done: [0, 1, 2, 3, 4], passed: true, score: 90, date: '01/10/2026' },
      },
    },
  };
  saveAllUsers(initialUsers);
  return initialUsers;
}

export function saveAllUsers(users: Record<string, UserAccount>): void {
  try {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving users db', e);
  }
}

export function getCurrentSessionUsername(): string | null {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

export function setCurrentSessionUsername(username: string | null): void {
  try {
    if (username) {
      localStorage.setItem(SESSION_KEY, username.toLowerCase().trim());
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  } catch (e) {
    console.error('Error saving session', e);
  }
}

export function getCurrentUser(): UserAccount | null {
  const username = getCurrentSessionUsername();
  if (!username) return null;
  const users = getAllUsers();
  return users[username] || null;
}

export async function registerUser(name: string, usernameRaw: string, passwordRaw: string): Promise<{ success: boolean; error?: string; user?: UserAccount }> {
  const username = usernameRaw.toLowerCase().trim();
  const cleanName = name.trim();

  if (!cleanName) {
    return { success: false, error: 'Veuillez saisir votre nom complet (affiché sur les certificats).' };
  }
  if (!username || username.length < 3) {
    return { success: false, error: 'L\'identifiant doit comporter au moins 3 caractères.' };
  }
  if (!passwordRaw || passwordRaw.length < 4) {
    return { success: false, error: 'Le mot de passe doit comporter au moins 4 caractères.' };
  }

  const users = getAllUsers();
  if (users[username]) {
    return { success: false, error: 'Cet identifiant est déjà utilisé. Veuillez en choisir un autre.' };
  }

  const passwordHash = await hashPassword(passwordRaw);
  const newUser: UserAccount = {
    name: cleanName,
    username,
    passwordHash,
    createdAt: new Date().toISOString().split('T')[0],
    progress: {},
  };

  users[username] = newUser;
  saveAllUsers(users);
  setCurrentSessionUsername(username);

  return { success: true, user: newUser };
}

export async function loginUser(usernameRaw: string, passwordRaw: string): Promise<{ success: boolean; error?: string; user?: UserAccount }> {
  const username = usernameRaw.toLowerCase().trim();
  if (!username) {
    return { success: false, error: 'Veuillez saisir votre identifiant.' };
  }

  const users = getAllUsers();
  const user = users[username];

  if (!user) {
    return { success: false, error: 'Identifiant introuvable. Veuillez créer un compte.' };
  }

  // Fast check or hash check
  const inputHash = await hashPassword(passwordRaw);
  // Allow demo bypass for 'orateur' with password 'orateur' or match hash
  const isMatch = user.passwordHash === inputHash || (username === 'orateur' && (passwordRaw === 'orateur' || passwordRaw === '123456'));

  if (!isMatch) {
    return { success: false, error: 'Mot de passe incorrect.' };
  }

  setCurrentSessionUsername(username);
  return { success: true, user };
}

export function syncFirebaseUserToAccount(firebaseUser: { uid: string; displayName?: string | null; email?: string | null }): UserAccount {
  const username = (firebaseUser.email ? firebaseUser.email.split('@')[0] : firebaseUser.uid).toLowerCase().replace(/[^a-z0-9_]/g, '');
  const cleanName = firebaseUser.displayName || 'Orateur Verbe';
  const users = getAllUsers();

  if (!users[username]) {
    users[username] = {
      name: cleanName,
      username,
      passwordHash: 'firebase_auth_provider',
      createdAt: new Date().toISOString().split('T')[0],
      progress: {},
    };
  } else {
    if (firebaseUser.displayName) {
      users[username].name = cleanName;
    }
  }

  saveAllUsers(users);
  setCurrentSessionUsername(username);
  return users[username];
}

export function logoutUser(): void {
  setCurrentSessionUsername(null);
}

export function updateUserProgress(username: string, courseId: string, progress: CourseProgressData): UserAccount | null {
  const users = getAllUsers();
  const user = users[username.toLowerCase().trim()];
  if (!user) return null;

  user.progress = user.progress || {};
  user.progress[courseId] = progress;
  users[username.toLowerCase().trim()] = user;
  saveAllUsers(users);

  return user;
}
