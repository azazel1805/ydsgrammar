let authInitialized = false;

/* =========================================
   Firebase Auth + Firestore
   EMAIL + GOOGLE LOGIN SYSTEM
========================================= */

import { initializeApp }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

/* =========================================
   FIREBASE CONFIG
========================================= */

const firebaseConfig = {
  apiKey: "AIzaSyCLsO5_4YrrbLPicpQTLgMp9S-4258_kzY",
  authDomain: "ydsgrammar.firebaseapp.com",
  projectId: "ydsgrammar",
  storageBucket: "ydsgrammar.appspot.com",
  messagingSenderId: "1049391024061",
  appId: "1:1049391024061:web:8b3381de9c074af07f34d4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

window.firebaseExports = {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  increment
};

window.storageExports = {
  ref,
  uploadBytes,
  getDownloadURL
};

const googleProvider = new GoogleAuthProvider();

window.currentUser = null;
window.db = db;
window.storage = storage;

/* =========================================
   REGISTER (EMAIL)
========================================= */

window.registerUser = async function (email, password) {
  try {

    const userCredential =
      await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "free",
      provider: "email",
      createdAt: new Date()
    }, { merge: true });

    alert("Registered successfully!");

  } catch (err) {
    alert(err.message);
  }
};

/* =========================================
   LOGIN (EMAIL)
========================================= */

window.loginUser = async function (email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert(err.message);
  }
};

/* =========================================
   LOGIN (GOOGLE)
========================================= */

window.loginWithGoogle = async function () {

  try {

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "free",
      provider: "google",
      createdAt: new Date()
    }, { merge: true });

  } catch (err) {
    alert(err.message);
  }

};

/* =========================================
   LOGOUT
========================================= */

window.logoutUser = async function () {
  await signOut(auth);
};

/* =========================================
   AUTH STATE CONTROL
========================================= */

onAuthStateChanged(auth, (user) => {

  const initialLoader = document.getElementById("initialLoader");
  if (initialLoader) {
    initialLoader.classList.add("hidden");
    // Completely remove from DOM after a short fade
    setTimeout(() => initialLoader.remove(), 500);
  }

  // Fallback protection: hide loader if Firebase fails to trigger within 8s
  setTimeout(() => {
    const loader = document.getElementById("initialLoader");
    if (loader) {
      loader.classList.add("hidden");
      setTimeout(() => loader.remove(), 500);
    }
  }, 8000);

  const loginPage = document.getElementById("loginPage");
  const appWrapper = document.getElementById("appWrapper");

  if (!authInitialized) {
    authInitialized = true;
  }

  if (user) {

    window.currentUser = user;

    if (loginPage) loginPage.classList.add("hidden");
    if (appWrapper) appWrapper.classList.remove("hidden");

    if (typeof renderNotesDashboard === "function") {
      renderNotesDashboard();
    }

  } else {

    window.currentUser = null;

    if (loginPage) loginPage.classList.remove("hidden");
    if (appWrapper) appWrapper.classList.add("hidden");
  }

  if (typeof window.forceProfileRender === "function") {
    window.forceProfileRender();
  }

});

/* =========================================
   LOGIN BUTTON BIND
========================================= */

window.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {

      const email = document.getElementById("emailInput").value.trim();
      const password = document.getElementById("passwordInput").value.trim();

      if (!email || !password) {
        alert("Enter email & password");
        return;
      }

      await loginUser(email, password);
    });
  }

  if (registerBtn) {
    registerBtn.addEventListener("click", async () => {

      const email = document.getElementById("emailInput").value.trim();
      const password = document.getElementById("passwordInput").value.trim();

      if (!email || !password) {
        alert("Enter email & password");
        return;
      }

      await registerUser(email, password);
    });
  }

});


/* =========================================
   FIRESTORE HELPERS (GLOBAL)
========================================= */

window.saveWordFirestore = async function (wordData) {
  if (!window.currentUser) return;

  await addDoc(
    collection(db, "users", window.currentUser.uid, "savedWords"),
    wordData
  );
};

window.getSavedWordsFirestore = async function () {
  if (!window.currentUser) return [];

  const snapshot = await getDocs(
    collection(db, "users", window.currentUser.uid, "savedWords")
  );

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

window.saveNoteFirestore = async function (noteText) {
  if (!window.currentUser) return;

  await addDoc(
    collection(db, "users", window.currentUser.uid, "notes"),
    {
      text: noteText,
      createdAt: new Date()
    }
  );
};

/* =========================================
   QUIZ GAMIFICATION (FIRESTORE)
========================================= */

window.saveQuizScoreFirestore = async function (score) {
  if (!window.currentUser) return;

  await addDoc(
    collection(db, "users", window.currentUser.uid, "quizHistory"),
    {
      score: score,
      timestamp: new Date()
    }
  );
};

window.getQuizHistoryFirestore = async function () {
  if (!window.currentUser) return [];

  const histQuery = query(
    collection(db, "users", window.currentUser.uid, "quizHistory"),
    orderBy("timestamp", "asc")
  );

  const snapshot = await getDocs(histQuery);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

window.getNotesFirestore = async function () {
  if (!window.currentUser) return [];

  const snapshot = await getDocs(
    collection(db, "users", window.currentUser.uid, "notes")
  );

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

window.deleteWordFirestore = async function (wordId) {
  if (!window.currentUser) return;

  await deleteDoc(
    doc(db, "users", window.currentUser.uid, "savedWords", wordId)
  );
};

window.deleteNoteFirestore = async function (noteId) {
  if (!window.currentUser) return;

  await deleteDoc(
    doc(db, "users", window.currentUser.uid, "notes", noteId)
  );
};

window.updateNoteFirestore = async function (noteId, newText) {
  if (!window.currentUser) return;

  await updateDoc(
    doc(db, "users", window.currentUser.uid, "notes", noteId),
    {
      text: newText,
      updatedAt: new Date()
    }
  );
};