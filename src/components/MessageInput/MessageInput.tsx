import {Add, AddCircle, Camera, Gallery, Happyemoji, Microphone, Send} from 'iconsax-react-native';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Pressable, KeyboardAvoidingView, Platform} from 'react-native';
import Colors from '../../constants/Colors';
//import AntDesign from 'react-native-vector-icons/AntDesign';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
//import Feather from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';

interface MessageInputProps {}

const MessageInput = (props: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const sendMessage = () => {
    console.warn('sending: ', message);
    setMessage('');
  };
  const onPlusClicked = () => {
    console.warn('On plus clicked');
  };
  const onPress = () => {
    1;
    if (message) {
      sendMessage();
    } else {
      onPlusClicked();
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={110}
    >
      <View style={styles.inputContainer}>
        <Gallery size={24} color={'#595959'} style={styles.icon} />
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={styles.input}
          placeholder="Signal message..."
        />
        <Camera size={24} color={'#595959'} style={styles.icon} />
        <Microphone size={24} color={'#595959'} />
      </View>
      <Pressable onPress={onPress} style={styles.buttonContainer}>
        {message ? <Send size={25} color={'white'} /> : <Add size={33} color={'white'} />}
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    padding: 5,
    paddingVertical: Platform.OS === 'ios' ? 5 : 0,
  },
  input: {flex: 1, marginHorizontal: 5},
  icon: {marginHorizontal: 5},
  buttonContainer: {
    display: 'flex',
    width: 40,
    height: 40,
    backgroundColor: Colors.blue_primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
  },
});
