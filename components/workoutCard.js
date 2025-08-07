import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function WorkoutCard({ title, duration, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      <View style={styles.iconContainer}>
        <AntDesign name="heart" size={32} color="#00eaff" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.duration}>{duration} seconds</Text>
      </View>
      <AntDesign name="right" size={22} color="#00eaff" style={styles.arrow} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,41,59,0.93)',
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginVertical: 10,
    borderRadius: 18,
    shadowColor: '#00eaff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(0,234,255,0.22)',
    minHeight: 80,
  },
  iconContainer: {
    backgroundColor: 'rgba(0,234,255,0.13)',
    borderRadius: 12,
    padding: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    color: '#00eaff',
    marginBottom: 3,
    letterSpacing: 0.7,
  },
  duration: {
    fontSize: 15,
    color: '#e0e0e0',
    opacity: 0.8,
    fontWeight: '500',
  },
  arrow: {
    marginLeft: 8,
  },
});
