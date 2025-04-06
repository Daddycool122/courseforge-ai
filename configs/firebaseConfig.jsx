
import { getStorage } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "courseforge-ai-57780.firebaseapp.com",
  projectId: "courseforge-ai-57780",
  storageBucket: "courseforge-ai-57780.firebasestorage.app",
  messagingSenderId: "350130771311",
  appId: "1:350130771311:web:9fec9ec50fb536c85b849a",
  measurementId: "G-GV5DBE3Q8P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const storage = getStorage(app);