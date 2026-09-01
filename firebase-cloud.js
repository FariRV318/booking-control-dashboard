import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js';
import {
  getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged,
  signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';
import {
  getFirestore, doc, getDoc, setDoc, onSnapshot, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';

const cfg = window.TAXI_CONFIG?.firebase || {};
const configured = ['apiKey','authDomain','projectId','appId'].every(k => String(cfg[k] || '').trim());
const emit = (name, detail) => window.dispatchEvent(new CustomEvent(name, { detail }));

if (!configured) {
  window.FirebaseCloud = { configured: false };
  emit('firebase-cloud-status', { configured: false, status: 'Not configured' });
} else {
  try {
    const app = initializeApp(cfg);
    const auth = getAuth(app);
    const db = getFirestore(app);
    await setPersistence(auth, browserLocalPersistence);

    const workspaceDoc = uid => doc(db, 'workspaces', uid, 'state', 'main');
    const sanitise = value => JSON.parse(JSON.stringify(value));

    window.FirebaseCloud = {
      configured: true,
      auth,
      db,
      signIn: (email,password) => signInWithEmailAndPassword(auth,email,password),
      createAccount: (email,password) => createUserWithEmailAndPassword(auth,email,password),
      signOut: () => signOut(auth),
      resetPassword: email => sendPasswordResetEmail(auth,email),
      async getState(uid) {
        const snap = await getDoc(workspaceDoc(uid));
        return snap.exists() ? snap.data() : null;
      },
      async saveState(uid,state) {
        await setDoc(workspaceDoc(uid), { ...sanitise(state), updatedAt: serverTimestamp() }, { merge: true });
      },
      subscribeState(uid,callback,onError) {
        return onSnapshot(workspaceDoc(uid), snap => callback(snap.exists() ? snap.data() : null), onError);
      }
    };

    onAuthStateChanged(auth, user => {
      emit('firebase-auth-change', {
        user: user ? { uid:user.uid, email:user.email || '', displayName:user.displayName || '' } : null
      });
    });
    emit('firebase-cloud-status', { configured: true, status: 'Ready' });
  } catch (error) {
    console.error('Firebase initialization failed', error);
    window.FirebaseCloud = { configured: false, error };
    emit('firebase-cloud-status', { configured: false, status: 'Configuration error', error: error.message });
  }
}
