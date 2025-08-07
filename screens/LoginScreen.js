import React, { useState, useEffect } from 'react';
import { useGoogleAuth } from '../utils/GoogleAuth';
import { View, TextInput, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import CustomButton from '../components/CustomButtons';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Save credentials for auto-login (for development only)
      await AsyncStorage.setItem('userCreds', JSON.stringify({ email, password }));
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleSignup = async () => {
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Save credentials for auto-login (for development only)
      await AsyncStorage.setItem('userCreds', JSON.stringify({ email, password }));
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const [request, response, promptAsync] = useGoogleAuth();

  // Auto-login effect for development (Expo Go workaround)
  useEffect(() => {
    let unsub = null;
    (async () => {
      // Only try if not already logged in
      if (!auth.currentUser) {
        const creds = await AsyncStorage.getItem('userCreds');
        if (creds) {
          try {
            const { email, password } = JSON.parse(creds);
            await signInWithEmailAndPassword(auth, email, password);
          } catch (e) {
            // Ignore auto-login errors
          }
        }
      }
    })();
    return () => { if (unsub) unsub(); };
  }, []);

  // Listen for logout and clear creds
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) {
        AsyncStorage.removeItem('userCreds');
      }
    });
    return () => unsub();
  }, []);

  return (
    <LinearGradient
      colors={['#0f2027', '#2c5364']}
      style={styles.gradient}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.iconRow}>
          <AntDesign name="heart" size={42} color="#00eaff" style={styles.logo} />
          <Text style={styles.brand}>FitTrack</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.heading}>Welcome Back</Text>
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholderTextColor="#00eaff"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
          </View>
          <View style={styles.inputWrap}>
            <View style={styles.passwordRow}>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={[styles.input, { flex: 1 }]}
                placeholderTextColor="#00eaff"
                textContentType="password"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
              >
                <Feather name={showPassword ? 'eye-off' : 'eye'} size={22} color="#00eaff" />
              </TouchableOpacity>
            </View>
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <CustomButton label="Login" onPress={handleLogin} primary loading={loading} disabled={loading} />
          <View style={styles.orRow}><View style={styles.line} /><Text style={styles.or}>OR</Text><View style={styles.line} /></View>
          <CustomButton label="Sign Up" onPress={handleSignup} loading={loading} disabled={loading} />
          <View style={styles.orRow}><View style={styles.line} /><Text style={styles.or}>OR</Text><View style={styles.line} /></View>
          <CustomButton
            label="Sign In with Google"
            onPress={() => promptAsync()}
            disabled={!request || loading}
            primary={false}
            style={styles.googleBtn}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    marginRight: 9,
  },
  brand: {
    fontSize: 28,
    color: '#00eaff',
    fontWeight: '800',
    letterSpacing: 1.3,
    textShadowColor: 'rgba(0,234,255,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.96)',
    borderRadius: 28,
    padding: 38,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#00eaff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.24,
    shadowRadius: 24,
    elevation: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(0,234,255,0.22)',
    overflow: 'hidden',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: '#00eaff',
    marginBottom: 26,
    letterSpacing: 1.1,
    textShadowColor: 'rgba(0,234,255,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  inputWrap: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    height: 54,
    borderWidth: 1.5,
    borderColor: '#00eaff',
    backgroundColor: 'rgba(15,32,39,0.7)',
    color: '#00eaff',
    paddingHorizontal: 18,
    borderRadius: 24,
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: 0.4,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  eyeButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: 'rgba(0,234,255,0.18)',
    marginHorizontal: 8,
    borderRadius: 2,
  },
  or: {
    color: '#e0e0e0',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.3,
    opacity: 0.7,
    marginHorizontal: 2,
  },
  error: {
    color: '#ff4d4f',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '500',
    alignSelf: 'flex-start',
  },
  googleBtn: {
    backgroundColor: '#fff',
    borderColor: '#4285F4',
    borderWidth: 1.5,
    marginTop: 2,
  },
});

// import React, { useState } from 'react';
// import { useGoogleAuth } from '../utils/GoogleAuth';
// import { View, TextInput, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebaseConfig';
// import CustomButton from '../components/CustomButtons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { AntDesign, Feather } from '@expo/vector-icons';

// export default function LoginScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     setError('');
//     if (!email || !password) {
//       setError('Please enter both email and password.');
//       return;
//     }
//     setLoading(true);
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (error) {
//       setError(error.message);
//     }
//     setLoading(false);
//   };

//   const handleSignup = async () => {
//     setError('');
//     if (!email || !password) {
//       setError('Please enter both email and password.');
//       return;
//     }
//     setLoading(true);
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//     } catch (error) {
//       setError(error.message);
//     }
//     setLoading(false);
//   };

//   const [request, response, promptAsync] = useGoogleAuth();

//   return (
//     <LinearGradient
//       colors={['#0f2027', '#2c5364']}
//       style={styles.gradient}
//       start={{ x: 0.1, y: 0.1 }}
//       end={{ x: 1, y: 1 }}
//     >
//       <View style={styles.container}>
//         <View style={styles.iconRow}>
//           <AntDesign name="heart" size={42} color="#00eaff" style={styles.logo} />
//           <Text style={styles.brand}>FitTrack</Text>
//         </View>
//         <View style={styles.card}>
//           <Text style={styles.heading}>Welcome Back</Text>
//           <View style={styles.inputWrap}>
//             <TextInput
//               placeholder="Email"
//               value={email}
//               onChangeText={setEmail}
//               style={styles.input}
//               placeholderTextColor="#00eaff"
//               autoCapitalize="none"
//               keyboardType="email-address"
//               textContentType="emailAddress"
//             />
//           </View>
//           <View style={styles.inputWrap}>
//             <View style={styles.passwordRow}>
//               <TextInput
//                 placeholder="Password"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!showPassword}
//                 style={[styles.input, { flex: 1 }]}
//                 placeholderTextColor="#00eaff"
//                 textContentType="password"
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPassword(!showPassword)}
//                 style={styles.eyeButton}
//                 accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
//               >
//                 <Feather name={showPassword ? 'eye-off' : 'eye'} size={22} color="#00eaff" />
//               </TouchableOpacity>
//             </View>
//           </View>
//           {error ? <Text style={styles.error}>{error}</Text> : null}
//           <CustomButton label="Login" onPress={handleLogin} primary loading={loading} disabled={loading} />
//           <View style={styles.orRow}><View style={styles.line} /><Text style={styles.or}>OR</Text><View style={styles.line} /></View>
//           <CustomButton label="Sign Up" onPress={handleSignup} loading={loading} disabled={loading} />
//           <View style={styles.orRow}><View style={styles.line} /><Text style={styles.or}>OR</Text><View style={styles.line} /></View>
//           <CustomButton
//             label="Sign In with Google"
//             onPress={() => promptAsync()}
//             disabled={!request || loading}
//             primary={false}
//             style={styles.googleBtn}
//           />
//         </View>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   gradient: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 24,
//   },
//   iconRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   logo: {
//     marginRight: 9,
//   },
//   brand: {
//     fontSize: 28,
//     color: '#00eaff',
//     fontWeight: '800',
//     letterSpacing: 1.3,
//     textShadowColor: 'rgba(0,234,255,0.3)',
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 8,
//   },
//   card: {
//     backgroundColor: 'rgba(30, 41, 59, 0.96)',
//     borderRadius: 28,
//     padding: 38,
//     width: '100%',
//     maxWidth: 400,
//     shadowColor: '#00eaff',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.24,
//     shadowRadius: 24,
//     elevation: 14,
//     borderWidth: 1.5,
//     borderColor: 'rgba(0,234,255,0.22)',
//     overflow: 'hidden',
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: 30,
//     fontWeight: '800',
//     color: '#00eaff',
//     marginBottom: 26,
//     letterSpacing: 1.1,
//     textShadowColor: 'rgba(0,234,255,0.3)',
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 8,
//   },
//   inputWrap: {
//     width: '100%',
//     marginBottom: 16,
//   },
//   input: {
//     height: 54,
//     borderWidth: 1.5,
//     borderColor: '#00eaff',
//     backgroundColor: 'rgba(15,32,39,0.7)',
//     color: '#00eaff',
//     paddingHorizontal: 18,
//     borderRadius: 24,
//     fontSize: 17,
//     fontWeight: '500',
//     letterSpacing: 0.4,
//   },
//   passwordRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//   },
//   eyeButton: {
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//   },
//   orRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 8,
//     width: '100%',
//     justifyContent: 'center',
//   },
//   line: {
//     flex: 1,
//     height: 1.5,
//     backgroundColor: 'rgba(0,234,255,0.18)',
//     marginHorizontal: 8,
//     borderRadius: 2,
//   },
//   or: {
//     color: '#e0e0e0',
//     fontWeight: '600',
//     fontSize: 15,
//     letterSpacing: 0.3,
//     opacity: 0.7,
//     marginHorizontal: 2,
//   },
//   error: {
//     color: '#ff4d4f',
//     fontSize: 14,
//     marginBottom: 10,
//     fontWeight: '500',
//     alignSelf: 'flex-start',
//   },
//   googleBtn: {
//     backgroundColor: '#fff',
//     borderColor: '#4285F4',
//     borderWidth: 1.5,
//     marginTop: 2,
//   },
// });
//             label="Sign In with Google"
//             onPress={() => promptAsync()}
//             disabled={!request || loading}
//           />
//         </View>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   gradient: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 24,
//   },
//   iconRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   logo: {
//     marginRight: 9,
//   },
//   brand: {
//     fontSize: 28,
//     color: '#00eaff',
//     fontWeight: '800',
//     letterSpacing: 1.3,
//     textShadowColor: 'rgba(0,234,255,0.3)',
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 8,
//   },
//   card: {
//     backgroundColor: 'rgba(30, 41, 59, 0.96)',
//     borderRadius: 28,
//     padding: 38,
//     width: '100%',
//     maxWidth: 400,
//     shadowColor: '#00eaff',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.24,
//     shadowRadius: 24,
//     elevation: 14,
//     borderWidth: 1.5,
//     borderColor: 'rgba(0,234,255,0.22)',
//     overflow: 'hidden',
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: 30,
//     fontWeight: '800',
//     color: '#00eaff',
//     marginBottom: 26,
//     letterSpacing: 1.1,
//     textShadowColor: 'rgba(0,234,255,0.3)',
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 8,
//   },
//   input: {
//     height: 54,
//     borderWidth: 1.5,
//     borderColor: '#00eaff',
//     backgroundColor: 'rgba(15,32,39,0.7)',
//     color: '#00eaff',
//     marginBottom: 16,
//     paddingHorizontal: 18,
//     borderRadius: 14,
//     fontSize: 17,
//     fontWeight: '500',
//     letterSpacing: 0.4,
//   },
//   or: {
//     marginVertical: 10,
//     textAlign: 'center',
//     color: '#e0e0e0',
//     fontWeight: '400',
//     fontSize: 15,
//     letterSpacing: 0.3,
//     opacity: 0.7,
//   },
// });
