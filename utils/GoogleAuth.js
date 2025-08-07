// utils/GoogleAuth.js
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { onAuthStateChanged, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Constants from 'expo-constants';


export function useGoogleAuth(onLogin) {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: Constants.expoConfig.extra.googleExpoClientId,
    iosClientId: Constants.expoConfig.extra.googleIosClientId,
    androidClientId: Constants.expoConfig.extra.googleAndroidClientId,
    webClientId: Constants.expoConfig.extra.googleWebClientId,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(userCred => {
          if (onLogin) onLogin(userCred);
        })
        .catch(console.error);
    }
  }, [response]);

  return [request, response, promptAsync];
}
