// utils/GoogleAuth.js
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { onAuthStateChanged, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';


export function useGoogleAuth(onLogin) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '685383029858-mmli6mv2m51ejao2j96rfr7hadjm2pei.apps.googleusercontent.com',
    iosClientId: '685383029858-5o13bj1ug88bp05tud1eqesgq15ka480.apps.googleusercontent.com',
    androidClientId: '685383029858-l0c7n16h0bdblo815ve90qv2o2c6j41f.apps.googleusercontent.com',
    webClientId: '685383029858-mmli6mv2m51ejao2j96rfr7hadjm2pei.apps.googleusercontent.com',
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
