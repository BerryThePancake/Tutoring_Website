import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, serverTimestamp, Timestamp, doc, getDoc, updateDoc, increment, setDoc, getDocs, collection, query, orderBy } from 'firebase/firestore';
import firebaseConfig from '@/firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const adminEmails = [
  'austin.riha@tarleton.edu',
  'austin.w.riha@gmail.com'
];

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

async function ensureAdminUser() {
  const currentEmail = auth.currentUser?.email;
  if (currentEmail && adminEmails.includes(currentEmail)) {
    return;
  }

  const result = await signInWithGoogle();
  if (!result.user.email || !adminEmails.includes(result.user.email)) {
    await auth.signOut();
    throw new Error('Admin access is restricted to approved accounts.');
  }
}

export async function incrementVisitorCount() {
  try {
    const statsRef = doc(db, 'stats', 'visitors');
    const snap = await getDoc(statsRef);
    
    // If doc doesn't exist, try to create it. If it does, increment it.
    if (!snap.exists()) {
      await setDoc(statsRef, { visitorCount: 1 });
    } else {
      await updateDoc(statsRef, { visitorCount: increment(1) });
    }
  } catch (err) {
    console.error('Failed to increment visitor count:', err);
    // Don't throw here to avoid crashing the whole app for a stats failure
  }
}

export async function resetVisitorCount() {
  try {
    await ensureAdminUser();
    const statsRef = doc(db, 'stats', 'visitors');
    await setDoc(statsRef, { visitorCount: 0 });
  } catch (err) {
    console.error('Failed to reset visitor count:', err);
    throw err;
  }
}

export async function exportQuestionsToCSV() {
  try {
    await ensureAdminUser();
    const q = query(collection(db, "questions"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const questions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[];

    if (questions.length === 0) {
      alert("No questions found to export.");
      return;
    }

    // Define CSV headers
    const headers = ["ID", "Student Name", "Topic", "Question", "Created At"];
    
    // Map data to rows
    const rows = questions.map(q => [
      `"${String(q.id || "").replace(/"/g, '""')}"`,
      `"${String(q.studentName || "Anonymous").replace(/"/g, '""')}"`,
      `"${String(q.topic || "N/A").replace(/"/g, '""')}"`,
      `"${String(q.question || "").replace(/"/g, '""')}"`,
      `"${q.createdAt ? new Date(q.createdAt.seconds * 1000).toLocaleString().replace(/"/g, '""') : "N/A"}"`
    ]);

    // Create CSV string
    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\n");

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `questions_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Failed to export questions:', err);
    const message = err instanceof Error ? err.message : String(err);
    alert(`Failed to export questions: ${message}`);
  }
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export { serverTimestamp };
export type { Timestamp };
