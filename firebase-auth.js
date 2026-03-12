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
  signInWithPopup,
  updateProfile
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
  increment,
  db
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

window.updateUserProfile = async function (displayName, photoURL) {
  if (!auth.currentUser) return;
  try {
    const updateData = {};
    if (displayName) updateData.displayName = displayName;
    if (photoURL) updateData.photoURL = photoURL;

    await updateProfile(auth.currentUser, updateData);

    // Update local currentUser reference
    window.currentUser = auth.currentUser;

    // Attempt to sync to Firestore too
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      displayName: displayName || auth.currentUser.displayName,
      photoURL: photoURL || auth.currentUser.photoURL
    }, { merge: true });

    return { success: true };
  } catch (err) {
    console.error("Profile update failed:", err);
    return { success: false, error: err.message };
  }
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

    // 🔥 Real-time VIP Check: Query Firestore to see current role
    getDoc(doc(db, "users", user.uid)).then(userDoc => {
      let isVip = false;
      if (userDoc.exists()) {
        const userData = userDoc.data();
        isVip = userData.role === 'premium' || userData.isVip === true;
      }
      
      // Admin bypass
      if (user.email === "onurtosuner@gmail.com") isVip = true;
      // Local check
      if (localStorage.getItem("analyzer_access") === "true") isVip = true;

      console.log("VIP Status Check:", isVip ? "PREMIUM" : "FREE");

      if (isVip) {
        if (typeof window.unlockAnalyzerUI === "function") window.unlockAnalyzerUI();
        localStorage.setItem("analyzer_access", "true"); // Cache the success
      } else {
        if (typeof window.lockAnalyzerUI === "function") window.lockAnalyzerUI();
      }
      
      // Refresh profile view if it exists
      if (typeof window.forceProfileRender === "function") window.forceProfileRender();
    }).catch(err => console.error("VIP status check error:", err));

    if (typeof renderDashboardNotes === "function") {
      renderDashboardNotes();
    }
    if (typeof renderDashboardSavedWords === "function") {
      renderDashboardSavedWords();
    }
    if (typeof updateGamification === "function") {
      updateGamification();
    }
    if (typeof initCharts === "function") {
      setTimeout(initCharts, 1500);
    }
  } else {
    window.currentUser = null;
    if (typeof window.lockAnalyzerUI === "function") {
      window.lockAnalyzerUI();
    }

    // Force Login: Hide app, show login page
    if (appWrapper) appWrapper.classList.add("hidden");
    if (loginPage) {
      loginPage.classList.remove("hidden");
      loginPage.classList.add("flex"); // Ensure flex for centering
    }
  }

  if (typeof window.forceProfileRender === "function") {
    window.forceProfileRender();
  }

});

/* =========================================
   LOGIN BUTTON BIND
========================================= */

window.openLoginModal = function () {
  const loginPage = document.getElementById("loginPage");
  if (loginPage) {
    loginPage.classList.remove("hidden");
    loginPage.classList.add("fixed", "inset-0", "z-[300]"); // Ensure it's on top
  }
};

window.closeLoginModal = function () {
  const loginPage = document.getElementById("loginPage");
  if (loginPage) loginPage.classList.add("hidden");
};



/* =========================================
   FIRESTORE HELPERS (GLOBAL)
========================================= */

window.saveWordFirestore = async function (wordData) {
  if (!window.currentUser) return;

  const word = wordData.word;
  if (!word) return;

  // Use word as ID to prevent duplicates
  await setDoc(
    doc(db, "users", window.currentUser.uid, "savedWords", word),
    {
      ...wordData,
      savedAt: serverTimestamp()
    },
    { merge: true }
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

window.saveQuizScoreFirestore = async function (score, xp, topic) {
  if (!window.currentUser) return;

  await addDoc(
    collection(db, "users", window.currentUser.uid, "quizHistory"),
    {
      score: score, // Percentage (0-100)
      xp: xp || score, // Actual XP earned
      topic: topic || "general",
      timestamp: new Date()
    }
  );
};

window.saveWPResultFirestore = async function (word, isCorrect) {
  if (!window.currentUser) return;

  await addDoc(
    collection(db, "users", window.currentUser.uid, "wpStats"),
    {
      word: word,
      isCorrect: isCorrect,
      timestamp: serverTimestamp()
    }
  );

  // Also give some small XP for Word Practice
  if (isCorrect) {
    await addDoc(
      collection(db, "users", window.currentUser.uid, "quizHistory"),
      {
        score: 5, // Small XP for each correct word
        topic: "wordpractice",
        timestamp: new Date()
      }
    );
  }
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