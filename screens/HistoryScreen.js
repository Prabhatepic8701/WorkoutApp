
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const workoutIcons = {
  'Full Body': { name: 'dumbbell', color: '#4F8EF7' },
  'Upper Body': { name: 'arm-flex', color: '#E67E22' },
  'Lower Body': { name: 'run', color: '#2ECC71' },
  'default': { name: 'star-outline', color: '#888' },
};

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await AsyncStorage.getItem('workoutHistory');
      if (data) {
        setHistory(JSON.parse(data).reverse());
      }
    };
    loadHistory();
  }, []);

  const renderItem = ({ item }) => {
    const icon = workoutIcons[item.title] || workoutIcons['default'];
    return (
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <MaterialCommunityIcons
            name={icon.name}
            size={42}
            color={icon.color}
            style={styles.icon}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{new Date(item.completedAt).toLocaleString()}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Workout History</Text>
        {history.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No workouts completed yet!</Text>
          </View>
        ) : (
          <FlatList
            data={history}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 26, fontWeight: 'bold', marginBottom: 16, color: '#222' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 16 },
  title: { fontSize: 18, fontWeight: '600', color: '#333' },
  date: { fontSize: 14, color: '#888', marginTop: 4 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#aaa', marginTop: 40 },
});
