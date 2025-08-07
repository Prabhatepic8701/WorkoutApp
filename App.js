
import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import WorkoutDetailScreen from './screens/WorkDetailsScreen';
import HistoryScreen from './screens/HistoryScreen';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { View } from 'react-native';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const scheme = useColorScheme();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: scheme === 'dark' ? '#181c24' : '#fff' }}>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} backgroundColor={scheme === 'dark' ? '#181c24' : '#fff'} />
        <Text style={{ color: '#00eaff', fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>FitTrack</Text>
        <Text style={{ color: '#00eaff', fontSize: 16 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} backgroundColor={scheme === 'dark' ? '#181c24' : '#fff'} />
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} options={{ headerShown: false }} />
              <Stack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
