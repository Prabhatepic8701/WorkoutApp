
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import WorkoutCard from '../components/workoutCard';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import CustomButton from '../components/CustomButtons';
import { Text } from 'react-native';

const workouts = [
  { id: '1', title: 'Push Workout', duration: 30 },
  { id: '2', title: 'Pull Workout', duration: 45 },
  { id: '3', title: 'Leg Workout', duration: 60 },
];

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userCreds');
      await signOut(auth);
    } catch (e) {
      console.error('Logout error:', e);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Text style={styles.heading}>Choose Your Workout</Text>
      <View style={styles.card}>
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WorkoutCard
              title={item.title}
              duration={item.duration}
              onPress={() => navigation.navigate('WorkoutDetail', item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.buttonRow}>
        <CustomButton label="View History" onPress={() => navigation.navigate('History')} />
        <CustomButton label="Logout" onPress={handleLogout} />
      </View>
    </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)', // for web, ignored on native
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#00eaff',
    marginBottom: 18,
    letterSpacing: 1.1,
    textShadowColor: 'rgba(0,234,255,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 24,
    padding: 18,
    width: '100%',
    maxWidth: 420,
    shadowColor: '#00eaff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(0,234,255,0.22)',
    overflow: 'hidden',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 10,
    justifyContent: 'center',
  },
});
