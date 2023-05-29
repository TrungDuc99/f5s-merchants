import {Customer} from '@models/hop-dong';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {fetchUserDetail} from '@redux/actions/user-action';
import AddUserScreen from '@screens/add-user';
import ChatRoomScreen from '@screens/chat-room';
import ChatsScreen from '@screens/chats-screen';
import CollectPointedScreen from '@screens/collect-point-screen';
import DetailCustomerScreen from '@screens/detail-customer-screen';
import EditStoreInfoScreen from '@screens/edit-store-info-screen';
import NotificationDetailScreen from '@screens/notification-detail-screen';
import NotificationsScreen from '@screens/notifications-screen';
import {ButtonBase, TextBase, Toolbar} from '@components/base';
import OderDetailScreen from '@screens/order-detail-screen';
import ScanScreen from '@screens/scan-screen';
import ScanedDetailScreen from '@screens/scaned-detail-screen/infodetail-scaned';
import ViewImageScreen from '@screens/view-imge-screen';
import VoucherDetailScreen from '@screens/voucher-detail-screen';
import {Camera, Edit} from 'iconsax-react-native';
import React, {useLayoutEffect} from 'react';
import {Image, Platform, Text, useWindowDimensions, View} from 'react-native';
import OneSignal from 'react-native-onesignal';
import {useDispatch} from 'react-redux';
import MainBottomTab from './main-bottom-tab';

export type MainStackParamList = {
  MainBottomTab: undefined;
  Voucher: undefined;
  ScanLogin: undefined;
  VoucherDetail: {
    voucherId: number | string;
    showDecription?: boolean;
  };
  ViewImage: {
    file: any;
    productCode?: string;
    idScreen?: string;
  };
  Scaner: {
    scanType: number; // 1 is default at bottom navigate main and 2 is scan custom screen;
  };
  ScanedDetail: {
    data: any;
    email: string;
  };
  OrderDetail: {
    productCode: string;
    comformImageBill?: boolean;
    file?: any;
  };
  Notifications: undefined;
  NotificationDetail: {
    id: number | string;
  };
  CollectPoints: {
    code?: any;
    file?: any;
    routeName: 'ScanCode' | 'ImportCode';
  };
  DetailCustomer: {
    // data: KhachHang;
    data: Customer;
  };
  EditStoreInfo: undefined;
  AddUser: undefined;
  Chats: undefined;
  ChatRoom: {id: string; name: string};
};
interface ParamsNotification {
  screen: string;
  id: number | string;
}
const Stack = createStackNavigator<MainStackParamList>();
const MainStackNavigation = () => {
  const dispatchRedux = useDispatch();
  dispatchRedux(fetchUserDetail());
  const navigation = useNavigation<any>();

  const navigateToScreen = (notificationData: ParamsNotification) => {
    switch (notificationData.screen) {
      case 'OrderDetail':
        navigation.navigate('OrderDetail', notificationData.id);
        return;
      default:
        return;
    }
  };
  useLayoutEffect(() => {
    OneSignal.setNotificationOpenedHandler(notificationResponse => {
      const {notification} = notificationResponse;
      if (notification) {
        const {additionalData = null}: any = notification;
        if (additionalData) {
          navigateToScreen(additionalData);
        }
      }
    });
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="MainBottomTab" component={MainBottomTab} />
      <Stack.Screen name="OrderDetail" component={OderDetailScreen} />
      <Stack.Screen name="VoucherDetail" component={VoucherDetailScreen} />
      <Stack.Screen name="ScanedDetail" component={ScanedDetailScreen} />
      <Stack.Screen name="ViewImage" component={ViewImageScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} />
      <Stack.Screen name="Scaner" component={ScanScreen} />
      <Stack.Screen name="CollectPoints" component={CollectPointedScreen} />
      <Stack.Screen name="DetailCustomer" component={DetailCustomerScreen} />
      <Stack.Screen name="EditStoreInfo" component={EditStoreInfoScreen} />
      <Stack.Screen name="AddUser" component={AddUserScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: ChatsHeader,
        }}
        name="Chats"
        component={ChatsScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: ChatRoomHeader,
        }}
        name="ChatRoom"
        component={ChatRoomScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigation;

const ChatsHeader = (props: any) => {
  const {width} = useWindowDimensions();

  return (
    <View
      style={{
        flexDirection: 'row',
        width: width - (Platform.OS === 'android' ? 50 : 35),
        padding: 5,
        paddingTop: 6,
        marginLeft: Platform.OS === 'android' ? -20 : 0,
        alignItems: 'center',
      }}
    >
      <Image
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
        }}
        style={{
          width: 30,
          height: 30,

          borderRadius: 30,
        }}
      />
      <TextBase flex-1 fontFamily="Bold" fontSize={17} textAlign="center">
        Nhắn tin
      </TextBase>

      <Edit size={24} color="black" style={{marginHorizontal: 5}} />
    </View>
  );
};

const ChatRoomHeader = (props: any) => {
  const {width} = useWindowDimensions();

  return (
    <View
      style={{
        flexDirection: 'row',
        width: width - (Platform.OS === 'android' ? 50 : 35),
        padding: 5,
        paddingTop: 6,
        marginLeft: Platform.OS === 'android' ? -20 : 0,
        alignItems: 'center',
      }}
    >
      <Image
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
        }}
        style={{
          width: 30,
          height: 30,

          borderRadius: 30,
        }}
      />
      <Text
        style={{
          flex: 1,
          marginLeft: 10,
          fontWeight: 'bold',
        }}
      >
        {props.children}
      </Text>

      <Camera size={24} color="black" style={{marginHorizontal: 10}} />
      <Edit size={24} color="black" style={{marginHorizontal: 5}} />
    </View>
  );
};
