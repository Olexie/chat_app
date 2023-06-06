import { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
} from 'firebase/firestore';

const Chat = ({ db, route, navigation }) => {
  const { name, color, uid } = route.params;
  const [messages, setMessages] = useState([]);

  let unsubMessages;
  useEffect(() => {
    // Set navigation options for the title
    navigation.setOptions({ title: name });

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
      setMessages(newMessages);
    });

    // Clean up the subscription when the component unmounts
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
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
        onSend={(messages) => onSend(messages)}
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
