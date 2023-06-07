//import { useState } from 'react';
//import { StyleSheet } from 'react-native';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { getStorage } from 'firebase/storage';

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

  const connectionStatus = useNetInfo();
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    //checking the connection status and providing response accordingly
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection Lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  //return () => {
  //disableNetwork(db);
  //};
  //},

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
