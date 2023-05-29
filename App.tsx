import {Colors} from '@configs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {LogBox, Platform, StatusBar} from 'react-native';
import codePush from 'react-native-code-push';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import APIProvider from './src/api/APIProvider';
import {hydrateAuth, setI18nConfig} from './src/core';
import RootNavigation from './src/navigation';
import {ThemeProvider} from './src/ui';
import {ToastProvider, useToast} from 'react-native-toast-notifications';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {CloseCircle, ShieldCross, ShieldTick, Warning2} from 'iconsax-react-native';
import {View} from 'react-native-ui-lib';
import OneSignal from 'react-native-onesignal';
LogBox.ignoreLogs(['new NativeEventEmitter()']);
setI18nConfig();
hydrateAuth();
const App = () => {
  OneSignal.setAppId('61471916-3183-45a4-aef3-850d3e001a56');

  // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
  OneSignal.promptForPushNotificationsWithUserResponse();

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    console.log('OneSignal: notification will show in foreground:', notificationReceivedEvent);
    let notification = notificationReceivedEvent.getNotification();
    console.log('notification: ', notification);
    const data = notification.additionalData;
    console.log('additionalData: ', data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  });

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log('OneSignal: notification opened:', notification);
  });
  return (
    <ToastProvider
      animationType="zoom-in"
      placement="top"
      style={{
        marginTop: 60,
        marginBottom: 60,
      }}
      renderType={{
        danger_toast: toast => (
          <View
            centerV
            style={{
              maxWidth: '85%',
              paddingRight: 15,
              paddingHorizontal: 10,
              paddingVertical: 10,
              backgroundColor: 'red',
              marginVertical: 4,
              borderRadius: 8,
              // borderLeftWidth: 6,
              marginTop: Platform.OS === 'android' ? 0 : 50,
              justifyContent: 'center',
              paddingLeft: 6,
            }}
          >
            <View row centerV>
              <CloseCircle variant="Bold" color="#fff" />
              <View marginH-5>
                {/* <Text
                  style={{
                    fontSize: 14,
                    color: '#333',
                    fontWeight: 'bold',
                  }}
                >
                  {toast.data.title}
                </Text> */}
                <Text style={{color: 'white', marginTop: 2}}>{toast.message}</Text>
              </View>
            </View>
          </View>
        ),
        custom_toast: toast => (
          <View
            style={{
              maxWidth: '85%',
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: '#fff',
              marginVertical: 4,
              borderRadius: 8,
              borderLeftColor: '#00C851',
              borderLeftWidth: 6,
              justifyContent: 'center',
              paddingLeft: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: '#333',
                fontWeight: 'bold',
              }}
            >
              {toast.data.title}
            </Text>
            <Text style={{color: '#a3a3a3', marginTop: 2}}>{toast.message}</Text>
          </View>
        ),
        with_close_button: toast => (
          <View
            style={{
              maxWidth: '85%',
              paddingVertical: 10,
              backgroundColor: '#fff',
              marginVertical: 4,
              borderRadius: 8,
              borderLeftColor: '#00C851',
              borderLeftWidth: 6,
              justifyContent: 'center',
              paddingHorizontal: 16,
              flexDirection: 'row',
            }}
          >
            <Text style={{color: '#a3a3a3', marginRight: 16}}>{toast.message}</Text>
            <TouchableOpacity
              onPress={() => toast.onHide()}
              style={{
                marginLeft: 'auto',
                width: 25,
                height: 25,
                borderRadius: 5,
                backgroundColor: '#333',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{color: '#fff', fontWeight: '500', marginBottom: 2.5}}>x</Text>
            </TouchableOpacity>
          </View>
        ),
      }}
      dangerIcon={<CloseCircle variant="Bold" color="#fff" />}
      successIcon={<ShieldTick color="#fff" />}
      warningIcon={<Warning2 color="#fff" />}
      offset={10}

      // Custom type example https://github.com/arnnis/react-native-toast-notifications/blob/master/example/App.tsx
    >
      <APIProvider>
        <ThemeProvider>
          <NavigationContainer>
            <SafeAreaProvider>
              <StatusBar backgroundColor={Colors.primaryColor} />

              <RootNavigation />
            </SafeAreaProvider>
          </NavigationContainer>

          {/* <RootNavigator /> */}
          <FlashMessage position="top" />
        </ThemeProvider>
      </APIProvider>
    </ToastProvider>
  );
};

export default codePush(App);
