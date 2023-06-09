import { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

const Chat = ({ isConnected, db, route, navigation, storage }) => {
  const { name, color, uid } = route.params;
  const [messages, setMessages] = useState([]);

  let unsubMessages;

  useEffect(() => {
    // Set navigation options for the title
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      // Create a query to fetch messages from the Firestore collection
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      // Subscribe to real-time updates using onSnapshot
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        // Process each document and create a new message object
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    // Clean up the subscription when the component unmounts
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  const renderInputToolbar = (props) => {
    if (isConnected == true) {
      return <InputToolbar {...props} />;
    } else {
      return null;
    }
  };

  // callback function to be passed in the GiftedChat custom actions prop that returns a CustomAction component with relevant prop data.
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} uid={uid} {...props} />;
  };

  // a custom view for handling messages sent explicitly with a location property, which triggers Expos MapView component in the render/return. The location object is sent in a special getLocation handler in CustomActions.js
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <View style={{ borderRadius: 13, margin: 3 }}>
          <MapView
            style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
            provider="google"
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={() => {
              if (Platform.OS === 'android') {
                Linking.openURL(
                  `geo:${currentMessage.location.latitude}, ${currentMessage.location.longitude}`
                );
              }
            }}
          />
        </View>
      );
    }
    return null;
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'black',
          },
          left: {
            color: '#24204F',
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: '#EAD1DC',
          },
          left: {
            backgroundColor: '#69cfff',
          },
        }}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        style={styles.textingBox}
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: uid,
          name: name,
        }}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textingBox: {
    flex: 1,
  },
});

export default Chat;
