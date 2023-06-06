//import { useState } from 'react';
//import { StyleSheet } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDSx5uj0BMIo11oYzNagDd0zsVcGPgG61I',
    authDomain: 'chat-app-2b6ab.firebaseapp.com',
    projectId: 'chat-app-2b6ab',
    storageBucket: 'chat-app-2b6ab.appspot.com',
    messagingSenderId: '145317901506',
    appId: '1:145317901506:web:01b8effb39851d8410775b',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
