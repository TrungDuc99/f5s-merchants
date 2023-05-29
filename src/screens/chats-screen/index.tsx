import {Screen, Toolbar} from '@components/base';
import ChatRoomItem from '@components/ChatRoomItem';
import {Edit} from 'iconsax-react-native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ChatRoomsData from '../../SignalAssets/dummy-data/ChatRooms';
export default function ChatsScreen() {
  const renderItem: any = ({item}: any) => {
    return <ChatRoomItem chatRoom={item} />;
  };
  return (
    <Screen>
      <FlatList data={ChatRoomsData} renderItem={renderItem} showsVerticalScrollIndicator={false} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: {backgroundColor: 'white', flex: 1},
});
