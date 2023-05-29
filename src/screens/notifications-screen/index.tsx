import {Screen, Toolbar} from '@components/base';
import {Colors, ScaleSize, Spacing} from '@configs';
import {MainStackParamList} from '@navigation/MainStackNavigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DiscountShape, Setting2} from 'iconsax-react-native';
import moment from 'moment';
import * as React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Drawer, Text, View} from 'react-native-ui-lib';
import NotificationItem from './notificatoin-item';

const NotificationsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const [data, setData] = React.useState([
    {
      id: '1',
      title: 'Notification 1',
      type: 1,
      state: 1,
      decription: 'Hệ thống nâng cấp vào lúc 18:30 và sẽ hoạt động lại vào lúc 18:45',
      time: moment().format('DD/MM/YYYY - HH:mm'),
    },
    {
      id: '2',
      title: 'Notification 2',
      type: 2,
      state: 2,
      decription: 'Giảm giá 10 - 30% tại Mường Thanh Hospitality chi nhánh Đà Nẵng',
      time: moment().format('DD/MM/YYYY - HH:mm'),
    },
    {
      id: '3',
      title: 'Notification 2',
      type: 1,
      state: 1,
      decription: 'Hệ thống nâng cấp vào lúc 18:30 và sẽ hoạt động lại vào lúc 18:45',
      time: moment().format('DD/MM/YYYY - HH:mm'),
    },
    {
      id: '4',
      title: 'Notification 3',
      type: 1,
      state: 1,
      decription: 'Giảm giá 10 - 30% tại Mường Thanh Hospitality chi nhánh Đà Nẵng',
      time: moment().format('DD/MM/YYYY - HH:mm'),
    },
  ]);
  const getIconType = (type: number) => {
    switch (type) {
      case 1:
        return Setting2;
      case 2:
        return DiscountShape;
    }
  };

  return (
    <Screen>
      <Toolbar title="Danh sách thông báo" />
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <NotificationItem
            icon={getIconType(item.type)}
            title={item.decription}
            state={item.state}
            onPress={() => {
              const datatest = data.map((noti, index) => {
                if (noti.id === item.id) {
                  return {
                    ...noti,
                    state: 2,
                  };
                } else return noti;
              });
              setData(datatest);
              navigation.navigate('NotificationDetail', {
                id: item.id,
              });
            }}
          />
        )}
        contentContainerStyle={{
          padding: Spacing(4),
        }}
        ItemSeparatorComponent={() => <View style={{height: Spacing(0)}} />}
      />
      {/* <View paddingH-30 paddingV-10>
        {listNotifications.map(notification => {
          return (
            <NotificationItem
              icon={getIconType(notification.type)}
              title={notification.decription}
            />
          );
        })}
      </View> */}
    </Screen>
  );
};

export default NotificationsScreen;
