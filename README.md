# Three-Screen Workout Tracker

## Tech Stack
- **React Native (Expo)**
- **Firebase Auth** (Email/Password, optionally Google OAuth)
- **AsyncStorage** (Local Storage)
- **Expo Speech** (Text-to-Speech)
- **Expo Secure Store** (for secure credential storage)
- **(Optional) Google OAuth**

## Features
- User authentication (email/password, secure storage, Firebase Auth, optional Google OAuth)
- Home screen with three pre-defined workouts
- Workout detail screen with timer and text-to-speech
- Workout history screen (locally stored)
- (Optional) Dark mode support

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Prabhatepic8701/WorkoutApp.git
cd WorkoutApp
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure Firebase
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable Email/Password Authentication
- (Optional) Enable Google Authentication


### 4. Run the App
```bash
npx expo start
```
- Scan the QR code with Expo Go (iOS/Android) or run on an emulator.

### 5. (Optional) Google OAuth
- Follow Expo/Firebase docs to set up Google OAuth if desired.

## Folder Structure
```
WorkoutApp/
├── App.js
├── firebaseConfig.js
├── components/
├── screens/
├── utils/
└── ...
```

## Time Spent
- **Project setup & core implementation:** ~3 hours
- **Authentication integration:** ~1 hour
- **Workout logic & timer:** ~1 hour
- **History & storage:** ~45 minutes
- **TTS & optional features:** ~30 minutes
- **Testing & polish:** ~45 minutes
- **Total:** ~7 hours

---
Feel free to reach out for questions or contributions!
