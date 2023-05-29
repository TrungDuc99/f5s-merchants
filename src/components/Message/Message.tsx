import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { MessageI } from "../../models/Message";

interface MessageProps {
  message: MessageI;
}

const myID = "u1";
const Message = (props: MessageProps) => {
  const { message } = props;

  const isMe = message.user.id === myID ? true : false;

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.rightContainer : styles.leftContainer,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: isMe ? "black" : "white",
          },
        ]}
      >
        {message?.content}
      </Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  text: {},
  leftContainer: {
    backgroundColor: Colors.blue_primary,
    marginRight: "auto",
    marginLeft: 10,
  },
  rightContainer: {
    backgroundColor: Colors.light_grey,
    marginRight: 10,
    marginLeft: "auto",
  },
});
