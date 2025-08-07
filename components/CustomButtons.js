import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, LinearGradient } from 'react-native';

export default function CustomButton({ label, onPress, primary, disabled, loading }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        primary ? styles.primary : styles.secondary,
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={primary ? '#1a2236' : '#00eaff'} />
      ) : (
        <Text style={[styles.label, primary ? styles.primaryLabel : styles.secondaryLabel]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 34,
    borderRadius: 16,
    marginHorizontal: 7,
    shadowColor: '#00eaff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.20,
    shadowRadius: 10,
    elevation: 7,
    borderWidth: 1.5,
    borderColor: 'rgba(0,234,255,0.22)',
    minWidth: 120,
    alignItems: 'center',
    marginVertical: 3,
  },
  primary: {
    backgroundColor: '#00eaff',
  },
  secondary: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  primaryLabel: {
    color: '#1a2236',
  },
  secondaryLabel: {
    color: '#00eaff',
  },
});
