import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButtons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function WorkoutDetailScreen({ route, navigation }) {
  const { title, duration } = route.params;
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    } else if (secondsLeft === 0 && isRunning) {
      saveWorkout();
      Speech.speak(`${title} complete!`);
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const saveWorkout = async () => {
    const entry = { title, completedAt: new Date().toISOString() };
    const history = await AsyncStorage.getItem('workoutHistory');
    const historyArr = history ? JSON.parse(history) : [];
    historyArr.push(entry);
    await AsyncStorage.setItem('workoutHistory', JSON.stringify(historyArr));
  };

  const progress = ((duration - secondsLeft) / duration) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.motivation}>You got this! Stay strong 💪</Text>
      <AnimatedCircularProgress
        size={180}
        width={14}
        fill={progress}
        tintColor="#00eaff"
        backgroundColor="#1a2236"
        style={styles.progress}
        rotation={0}
      >
        {() => (
          <Text style={styles.timer}>{secondsLeft}s</Text>
        )}
      </AnimatedCircularProgress>
      <View style={styles.buttonRow}>
        <CustomButton
          label={isRunning ? 'Pause' : 'Start'}
          onPress={() => {
            Speech.speak(isRunning ? 'Paused' : 'Starting workout');
            setIsRunning(!isRunning);
          }}
          primary
        />
        <CustomButton
          label="Reset"
          onPress={() => {
            setSecondsLeft(duration);
            setIsRunning(false);
            Speech.speak('Workout reset');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
    backgroundColor: '#131b2a',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#00eaff',
    marginBottom: 6,
    letterSpacing: 1.1,
    textShadowColor: 'rgba(0,234,255,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  motivation: {
    fontSize: 16,
    color: '#e0e0e0',
    opacity: 0.8,
    marginBottom: 24,
    fontWeight: '500',
  },
  progress: {
    marginBottom: 28,
  },
  timer: {
    fontSize: 48,
    color: '#00eaff',
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 20,
    justifyContent: 'center',
  },
});
