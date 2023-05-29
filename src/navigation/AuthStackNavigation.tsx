import {createStackNavigator} from '@react-navigation/stack';
import ChangePasswordScreen from '@screens/change-password-screen';
import ChangePasswordByOTPScreen from '@screens/forget-password-screen/change-password-screen';
import ForgetPasswordScreen from '@screens/forget-password-screen/confirm-sdt-screen';
import InputOtpScreen from '@screens/forget-password-screen/input-OTP-screen';
import LoginScreen from '@screens/login-screen';
import React from 'react';

export type AuthStackParamList = {
  Login: undefined;
  ForgetPassword: undefined;
  InputOTP: {
    to: string;
    originalPhoneNumber: number;
  };
  ChangePasswordByOTP: {
    originalPhoneNumber: number;
  };
};
const Stack = createStackNavigator<AuthStackParamList>();
const AuthStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ForgetPassword"
        component={ForgetPasswordScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="InputOTP"
        component={InputOtpScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ChangePasswordByOTP"
        component={ChangePasswordByOTPScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;
