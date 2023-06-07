import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-gifted-chat';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  // Function to sign in the user anonymously
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        // Navigate to the Chat screen with user ID, name, and color
        navigation.navigate('Chat', {
          name: name,
          color: color ? color : 'white',
          uid: result.user.uid,
        });
        Alert.alert('Signed in successfully!');
      })
      .catch((error) => {
        Alert.alert('Unable to sign in, try again later.');
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background-image.png')}
        style={[styles.container, styles.image]}
      >
        <View style={styles.subContainer}>
          <Text style={styles.title}>Chat App</Text>
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder="Your name"
            style={styles.input}
            onChangeText={setName}
          />
          <Text>Choose Background Color</Text>
          <View style={styles.radioButtonContainer}>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: '#f287b6' }]}
              onPress={() => setColor('#f287b6')}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: '#fabda6' }]}
              onPress={() => setColor('#fabda6')}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: '#b9e5fa' }]}
              onPress={() => setColor('#b9e5fa')}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: '#00a3d4' }]}
              onPress={() => setColor('#00a3d4')}
            ></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text
              onPress={signInUser}
              style={[styles.colorSelect__text, styles.buttonText]}
            >
              Press to Chat
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '88%',
  },
  radioButtonContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    width: '100%',
    backgroundColor: '#757083',
    borderRadius: 50,
    padding: 15,
    height: 50,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  radioButton: {
    backgroundColor: 'black',
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  input: {
    height: 40,
    width: '88%',
    margin: 12,
    borderWidth: 3,
    padding: 10,
    fontWeight: '900',
  },
  image: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Start;
