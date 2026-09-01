import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js';
import {
  getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged,
  signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';
import {
  getFirestore, doc, getDoc, setDoc, deleteDoc, onSnapshot, serverTimestamp,
  collection, addDoc, query, orderBy, limit, getDocs, where
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';

const cfg = window.TAXI_CONFIG?.firebase || {};
const configured = ['apiKey','authDomain','projectId','appId'].every(k => String(cfg[k] || '').trim());
const emit = (name, detail) => window.dispatchEvent(new CustomEvent(name, { detail }));
const sanitise = value => JSON.parse(JSON.stringify(value));
const emailKey = email => String(email||'').trim().toLowerCase();

if (!configured) {
  window.FirebaseCloud = { configured: false };
  emit('firebase-cloud-status', { configured: false, status: 'Not configured' });
} else {
  try {
    const app = initializeApp(cfg);
    const auth = getAuth(app);
    const db = getFirestore(app);
    await setPersistence(auth, browserLocalPersistence);

    const workspaceDoc = workspaceId => doc(db, 'workspaces', workspaceId, 'state', 'main');
    const workspaceMetaDoc = workspaceId => doc(db, 'workspaces', workspaceId, 'meta', 'info');
    const membershipDoc = uid => doc(db, 'memberships', uid);
    const inviteDoc = email => doc(db, 'invites', emailKey(email));

    async function resolveAccess(user){
      let snap = await getDoc(membershipDoc(user.uid));
      if(snap.exists()) return { ...snap.data(), uid:user.uid, email:user.email||'' };

      const inv = user.email ? await getDoc(inviteDoc(user.email)) : null;
      if(inv?.exists() && inv.data().active !== false){
        const data=inv.data();
        const member={workspaceId:data.workspaceId,role:data.role||'Read Only',name:data.name||user.email.split('@')[0],email:user.email||'',active:true,joinedAt:new Date().toISOString()};
        await setDoc(membershipDoc(user.uid),member);
        return {...member,uid:user.uid};
      }

      const owner={workspaceId:user.uid,role:'Administrator',name:(user.displayName||user.email?.split('@')[0]||'Administrator'),email:user.email||'',active:true,joinedAt:new Date().toISOString(),owner:true};
      await setDoc(membershipDoc(user.uid),owner);
      await setDoc(workspaceMetaDoc(user.uid),{ownerUid:user.uid,ownerEmail:user.email||'',createdAt:serverTimestamp()},{merge:true});
      return {...owner,uid:user.uid};
    }

    window.FirebaseCloud = {
      configured: true,
      auth,
      db,
      emailKey,
      signIn: (email,password) => signInWithEmailAndPassword(auth,email,password),
      createAccount: (email,password) => createUserWithEmailAndPassword(auth,email,password),
      signOut: () => signOut(auth),
      resetPassword: email => sendPasswordResetEmail(auth,email),
      resolveAccess,
      async getState(workspaceId) {
        const snap = await getDoc(workspaceDoc(workspaceId));
        return snap.exists() ? snap.data() : null;
      },
      async saveState(workspaceId,state) {
        await setDoc(workspaceDoc(workspaceId), { ...sanitise(state), updatedAt: serverTimestamp() }, { merge: true });
      },
      subscribeState(workspaceId,callback,onError) {
        return onSnapshot(workspaceDoc(workspaceId), snap => callback(snap.exists() ? snap.data() : null), onError);
      },
      async inviteStaff(workspaceId,{email,name,role}){
        const cleanEmail=String(email||'').trim().toLowerCase();
        if(!cleanEmail) throw new Error('Staff email is required.');
        await setDoc(inviteDoc(cleanEmail),{workspaceId,email:cleanEmail,name:String(name||'').trim(),role:role||'Read Only',active:true,invitedAt:serverTimestamp()},{merge:true});
      },
      async revokeInvite(email){ await deleteDoc(inviteDoc(email)); },
      async listStaff(workspaceId){
        const q=query(collection(db,'memberships'),where('workspaceId','==',workspaceId));
        const snaps=await getDocs(q); const out=[];
        snaps.forEach(s=>{const d=s.data();out.push({uid:s.id,...d})});
        return out;
      },
      async listInvites(workspaceId){
        const q=query(collection(db,'invites'),where('workspaceId','==',workspaceId));
        const snaps=await getDocs(q); const out=[];
        snaps.forEach(s=>{const d=s.data();out.push({id:s.id,...d})});
        return out;
      },
      async updateMember(uid,patch){ await setDoc(membershipDoc(uid),sanitise(patch),{merge:true}); },
      async addAuditLog(workspaceId,entry){
        await addDoc(collection(db,'workspaces',workspaceId,'logs'),{...sanitise(entry),createdAt:serverTimestamp(),clientTime:new Date().toISOString()});
      },
      subscribeLogs(workspaceId,callback,onError){
        const q=query(collection(db,'workspaces',workspaceId,'logs'),orderBy('createdAt','desc'),limit(300));
        return onSnapshot(q,s=>callback(s.docs.map(d=>({id:d.id,...d.data()}))),onError);
      }
    };

    onAuthStateChanged(auth, async user => {
      if(!user){emit('firebase-auth-change',{user:null,access:null});return;}
      try{
        const access=await resolveAccess(user);
        emit('firebase-auth-change', { user:{uid:user.uid,email:user.email||'',displayName:user.displayName||''}, access });
      }catch(error){
        console.error('Access resolution failed',error);
        emit('firebase-auth-change', { user:{uid:user.uid,email:user.email||'',displayName:user.displayName||''}, access:null, error:error.message });
      }
    });
    emit('firebase-cloud-status', { configured: true, status: 'Ready' });
  } catch (error) {
    console.error('Firebase initialization failed', error);
    window.FirebaseCloud = { configured: false, error };
    emit('firebase-cloud-status', { configured: false, status: 'Configuration error', error: error.message });
  }
}
