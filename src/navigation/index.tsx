import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import ScanLoginScreen from '@screens/scan-login-screen';
import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {useAuth} from '../core';
import AuthStackNavigation from './AuthStackNavigation';
import MainStackNavigation from './MainStackNavigation';

export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
  ScanLogin: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();
const RootNavigation = () => {
  const {status} = useAuth();
  useEffect(() => {
    if (status !== 'idle') {
      RNBootSplash.hide({fade: true});
    }
  }, [status]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      {status === 'signIn' ? (
        <>
          <Stack.Screen name="Main" component={MainStackNavigation} />
          <Stack.Screen name="ScanLogin" component={ScanLoginScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthStackNavigation} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigation;
