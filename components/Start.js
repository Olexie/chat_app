import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Start = ({ navigation }) => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Chat App!</Text>
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
            style={[styles.radioButton, { backgroundColor: 'yellow' }]}
            onPress={() => setColor('yellow')}
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
          <Text>Go to Chat</Text>
        </TouchableOpacity>
      </View>
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
    borderWidth: 1,
    padding: 10,
  },
});

export default Start;
