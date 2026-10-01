import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  deleteDoc
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CRITICAL: Initialize Firestore with firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Test connection on startup as mandated by Firestore guidelines
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or connection not ready.');
    }
  }
}
testFirestoreConnection();

// Structured Firestore error handler
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Authentication Helpers
export async function signInWithGoogle(): Promise<FirebaseUser | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Create or update user profile document in /users/{userId}
    const userRef = doc(db, 'users', user.uid);
    await setDoc(
      userRef,
      {
        displayName: user.displayName || 'Orateur Verbe',
        email: user.email || '',
        photoURL: user.photoURL || '',
        oratoryLevel: 'intermediaire',
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );

    return user;
  } catch (error) {
    console.error('Erreur de connexion Google:', error);
    return null;
  }
}

export async function signOutUser(): Promise<void> {
  await firebaseSignOut(auth);
}

// Saved Speech Recording Data Type
export interface SavedSpeechRecord {
  id: string;
  userId: string;
  title: string;
  transcript: string;
  durationSeconds: number;
  wordsPerMinute: number;
  pausesCount: number;
  averageVolumeDb: number;
  pitchVariation: number;
  score: number;
  createdAt: any;
}

// Save speech to Firestore
export async function saveSpeechRecord(speech: {
  title: string;
  transcript: string;
  durationSeconds: number;
  wordsPerMinute: number;
  pausesCount: number;
  averageVolumeDb: number;
  pitchVariation: number;
  score: number;
}): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;

  const speechesCol = collection(db, 'speeches');
  const newDocRef = doc(speechesCol);
  const path = `speeches/${newDocRef.id}`;

  try {
    await setDoc(newDocRef, {
      userId: user.uid,
      title: speech.title || 'Prise de parole',
      transcript: speech.transcript.slice(0, 9999),
      durationSeconds: speech.durationSeconds,
      wordsPerMinute: speech.wordsPerMinute,
      pausesCount: speech.pausesCount,
      averageVolumeDb: speech.averageVolumeDb,
      pitchVariation: speech.pitchVariation,
      score: speech.score,
      createdAt: serverTimestamp(),
    });
    return newDocRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// Fetch user's saved speeches
export async function fetchUserSpeeches(): Promise<SavedSpeechRecord[]> {
  const user = auth.currentUser;
  if (!user) return [];

  const path = 'speeches';
  try {
    const q = query(
      collection(db, path),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<SavedSpeechRecord, 'id'>),
    }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

// Delete a speech recording
export async function deleteSpeechRecord(speechId: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) return;

  const path = `speeches/${speechId}`;
  try {
    await deleteDoc(doc(db, 'speeches', speechId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
