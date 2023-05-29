import {ChatRoom} from '@models/ChatRoom';
import {MainStackParamList} from '@navigation/MainStackNavigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import moment from 'moment';
import * as React from 'react';
import {Image, Pressable, Text, View} from 'react-native';

import styles from './styles';

interface ChatRoomItemProps {
  chatRoom: ChatRoom;
  onPress?: (event: any) => void;
}

const ChatRoomItem = (props: ChatRoomItemProps) => {
  const {chatRoom, onPress} = props;
  const user = chatRoom.users[1];
  const navigation = useNavigation<StackNavigationProp<MainStackParamList, 'ChatRoom'>>();

  const onPressNavigate = (event: any) => {
    navigation.navigate('ChatRoom', {id: chatRoom.id, name: user.name});
  };

  return (
    <Pressable
      // style={({ pressed }) => ({
      //   opacity: pressed ? 0.5 : 1,
      // })}
      onPress={onPressNavigate}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: user.imageUri,
          }}
          style={styles.image}
        />
        {chatRoom.newMessages && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
          </View>
        )}

        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.text}>
              {moment(chatRoom.lastMessage.createdAt).format('hh:mm a')}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.text}>
            {chatRoom.lastMessage.content}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatRoomItem;
