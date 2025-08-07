
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyBg-l5Yx2lwBaTftNwxi5l4aqVzwteVwmA",
  authDomain: "threescreenworkouttracker.firebaseapp.com",
  projectId: "threescreenworkouttracker",
  storageBucket: "threescreenworkouttracker.firebasestorage.app",
  messagingSenderId: "308012972238",
  appId: "1:308012972238:web:1c257e38d997983313f89f",
  measurementId: "G-K4ERYWW34J"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// For web, set browserLocalPersistence
if (Platform.OS === 'web') {
  setPersistence(auth, browserLocalPersistence);
}

export { auth };