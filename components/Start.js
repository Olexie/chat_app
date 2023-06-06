import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-gifted-chat';

const Start = ({ navigation }) => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('');

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
            onChangeText={setText}
          />
          <Text>Choose Background Color</Text>
          <View style={styles.radioButtonContainer}>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: 'red' }]}
              onPress={() => setColor('red')}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: 'blue' }]}
              onPress={() => setColor('blue')}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: 'green' }]}
              onPress={() => setColor('green')}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: 'black' }]}
              onPress={() => setColor('black')}
            ></TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Chat', {
                name: text ? text : 'User',
                color: color ? color : 'white',
              })
            }
          >
            <Text>Press to Chat</Text>
          </TouchableOpacity>
        </View>
        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView behavior="padding" />
        ) : null}
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
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
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
