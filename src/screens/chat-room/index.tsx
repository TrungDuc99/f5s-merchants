import {View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import chatMessages from '../../SignalAssets/dummy-data/Chats';

import Message from '@components/Message';
import MessageInput from '@components/MessageInput';
import {RootStackParamList} from '@navigation';
import {MainStackParamList} from '@navigation/MainStackNavigation';
import {Toolbar} from '@components/base';
import {Edit} from 'iconsax-react-native';

export default function ChatRoomScreen() {
  const {
    params: {id, name},
  } = useRoute<RouteProp<MainStackParamList, 'ChatRoom'>>();
  const navigation = useNavigation();

  navigation.setOptions({
    title: name ? name : '',
  });
  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={chatMessages.messages}
        renderItem={({item}: any) => <Message message={item} />}
        inverted
      />
      <MessageInput />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
});
