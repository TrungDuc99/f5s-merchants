import {useInfoUser} from '@api';
import {Colors, FontFamily, ScaleSize, Spacing} from '@configs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import OrderScreen from '@screens/order-screen';
import ScanScreen from '@screens/scan-screen';
import StatisticScreen from '@screens/statistic-screen';
import VoucherScreen from '@screens/voucher-screen';
import {AlignBottom, ProfileCircle, Scan, Stickynote, TicketDiscount} from 'iconsax-react-native';
import React, {useRef, useState} from 'react';

import {isIphoneX} from 'react-native-iphone-x-helper';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from 'react-native-ui-lib';
import AccountDrawer from './account-drawer';
export type MainBottomTabParamList = {
  Order: undefined;
  Scan: {
    scanType: number;
  };
  Statistic: undefined;
  Voucher: undefined;
  Account: undefined;
};
import DeviceInfo from 'react-native-device-info';

const Tab = createBottomTabNavigator<MainBottomTabParamList>();
const MainBottomTab = () => {
  const insets = useSafeAreaInsets();
  let screenWidth = Dimensions.get('window').width;
  const [deviceName, setDeviceName] = useState<string>();

  DeviceInfo.getDeviceName().then(deviceName => {
    setDeviceName(deviceName);
  });
  useInfoUser();
  function getWidth() {
    let width = Dimensions.get('window').width;

    width - 60;
    return width / 6;
  }
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.primaryColor,
        tabBarLabelStyle: {
          fontFamily: FontFamily.Bold,
          fontSize: ScaleSize(10),
        },
        tabBarStyle: {
          paddingBottom: Spacing(4),
          paddingTop: Spacing(1),
          height: ScaleSize(70),
          backgroundColor: 'white',
          // position: 'absolute',
          // bottom: 35,
          // marginHorizontal: 20,
          borderRadius: 10,

          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
        },
        tabBarIconStyle: {
          marginBottom: ScaleSize(-5),
        },
      }}
    >
      <Tab.Screen
        name="Order"
        listeners={({navigation, route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: ScaleSize(getWidth() * 0),
              useNativeDriver: true,
            }).start();
          },
        })}
        component={OrderScreen}
        options={{
          title: 'Đơn hàng',
          tabBarIcon: props => {
            return <Stickynote {...props} variant="Bulk" size={ScaleSize(24)} />;
          },
        }}
      />
      <Tab.Screen
        listeners={({navigation, route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: ScaleSize(getWidth() * 1.3),
              useNativeDriver: true,
            }).start();
          },
        })}
        name="Voucher"
        component={VoucherScreen}
        options={{
          title: 'Voucher',
          tabBarIcon: props => {
            return <TicketDiscount {...props} variant="Bulk" size={ScaleSize(24)} />;
          },
        }}
      />
      <Tab.Screen
        listeners={({navigation, route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: ScaleSize(getWidth() * 2.5),
              useNativeDriver: true,
            }).start();
          },
        })}
        name="Scan"
        component={ScanScreen}
        initialParams={{scanType: 1}}
        options={{
          title: '',
          tabBarStyle: false,

          tabBarIcon: props => {
            return (
              <View style={styles.scan}>
                <Animated.View
                  style={{
                    width: getWidth() - 30,
                    borderRadius: 8,
                    height: 3,
                    backgroundColor: Colors.primaryColor,
                    position: 'absolute',
                    justifyContent: 'center',
                    bottom: ScaleSize(42),
                    left: ScaleSize(-160),
                    transform: [
                      {
                        translateX: tabOffsetValue,
                      },
                    ],
                  }}
                ></Animated.View>
                <Scan {...props} variant="Bulk" color="#fff" size={ScaleSize(32)} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        listeners={({navigation, route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: ScaleSize(getWidth() * 3.8),
              useNativeDriver: true,
            }).start();
          },
        })}
        name="Statistic"
        component={StatisticScreen}
        options={{
          title: 'Thông kê',
          tabBarIcon: props => {
            return <AlignBottom {...props} variant="Bulk" size={ScaleSize(24)} />;
          },
        }}
      />
      <Tab.Screen
        listeners={({navigation, route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: ScaleSize(
                getWidth() * (screenWidth > 400 && deviceName !== '14' ? 4.9 : 5.3)
              ),
              useNativeDriver: true,
            }).start();
          },
        })}
        name="Account"
        component={AccountDrawer}
        options={{
          title: 'Tài khoản',
          tabBarIcon: props => {
            return <ProfileCircle {...props} variant="Bulk" size={ScaleSize(24)} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainBottomTab;

const styles = StyleSheet.create({
  scan: {
    backgroundColor: Colors.primaryColor,
    padding: Spacing(3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    shadowColor: Colors.primaryColor,
    shadowOffset: {
      width: 2,
      height: 4,
    },

    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 20,
    position: 'absolute',
    bottom: 0,
  },
});
