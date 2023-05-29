import {useSendVerify} from '@api/forget-password';
import {ButtonBase, TextBase, Toolbar} from '@components/base';
import {InputField} from '@components/forms';
import {Colors, ScaleSize, Spacing} from '@configs';
import {RootStackParamList} from '@navigation';
import {AuthStackParamList} from '@navigation/AuthStackNavigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {checkPassword} from '@utils';

import {Call, Login} from 'iconsax-react-native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useToast} from 'react-native-toast-notifications';
import {View} from 'react-native-ui-lib';
import {useCheckPhoneNumber} from '../../api';
import CryptoJS from 'react-native-crypto-js';
export type LoginNavigationScreenProp = StackNavigationProp<RootStackParamList>;

export const ForgetPasswordScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const form = useForm();
  const {handleSubmit, watch} = form;
  const [loading, setLoading] = useState<boolean>(false);
  const [countdownSencond, setCountdownSencond] = useState<any>(60);
  const [countdownMinute, setCountdownMinute] = useState<any>(2);
  const toast = useToast();
  function is_phonenumber(phonenumber: any) {
    var phoneno = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (phonenumber.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  }

  const {mutate, isLoading} = useSendVerify();
  const {mutate: mutateCheckPhoneNumber} = useCheckPhoneNumber();
  const onSubmit = async (data: any) => {
    setLoading(true);
    const isPhone = await is_phonenumber(data.phoneNumber);
    //  navigation.navigate('ChangePasswordByOTP', {originalPhoneNumber: data.phoneNumber3});
    if (isPhone) {
      const formatPhoneNumber = data.phoneNumber.replace(/(0)/, '+84');
      if (formatPhoneNumber) {
        mutateCheckPhoneNumber(
          {
            phoneNumber: data.phoneNumber,
          },
          {
            onSuccess: res => {
              mutate(
                {
                  data: {
                    phone_number: data.phoneNumber,
                    channel: 'MERCHANTS',
                  },
                },
                {
                  onSuccess: res => {
                    setLoading(false);
                    navigation.navigate('InputOTP', {
                      to: data.phoneNumber,
                      originalPhoneNumber: data.phoneNumber,
                    });
                  },
                }
              );
            },
            onError(error, variables, context) {
              setLoading(false);
              toast.show(`Số điện thoại không tồn tại trong hệ thống`, {
                type: 'danger',
              });
            },
          }
        );
      }
      try {
      } catch (error) {
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.show(`Vui lòng đăng nhập đúng định dạng số điện thoại`, {
        type: 'danger',
      });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{backgroundColor: '#fff'}}>
        <Toolbar />
        <View flex centerV paddingH-20 backgroundColor="#fff">
          <KeyboardAvoidingView behavior="position">
            <StatusBar barStyle="dark-content" backgroundColor={Colors.primaryColor} />

            <View style={{marginTop: Spacing(40), alignItems: 'center'}}>
              <Image
                source={require('@assets/images/logo.png')}
                style={{
                  width: ScaleSize(200),
                  height: ScaleSize(44),
                }}
              />
            </View>

            <View marginT-50>
              <InputField
                iconLeft={{iconName: Call}}
                form={form}
                isNumber
                name="phoneNumber"
                label=""
                placeholder="Nhập số điện thoại xác nhận"
              />

              <ButtonBase
                marginT-30
                label="Xác nhận"
                loading={loading || isLoading}
                onPress={handleSubmit(onSubmit)}
                iconSource={() => (
                  <Login color="#fff" size={ScaleSize(22)} style={{marginRight: Spacing(1)}} />
                )}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
export default ForgetPasswordScreen;
