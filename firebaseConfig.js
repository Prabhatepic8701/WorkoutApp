
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { Platform } from 'react-native';

import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.firebaseApiKey,
  authDomain: Constants.expoConfig.extra.firebaseAuthDomain,
  projectId: Constants.expoConfig.extra.firebaseProjectId,
  storageBucket: Constants.expoConfig.extra.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig.extra.firebaseMessagingSenderId,
  appId: Constants.expoConfig.extra.firebaseAppId,
  measurementId: Constants.expoConfig.extra.firebaseMeasurementId
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// For web, set browserLocalPersistence
if (Platform.OS === 'web') {
  setPersistence(auth, browserLocalPersistence);
}

export { auth };