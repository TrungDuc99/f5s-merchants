import {ButtonBase, TextBase, Toolbar} from '@components/base';
import {InputField} from '@components/forms';
import {Colors, ScaleSize, Spacing} from '@configs';
import {useAuth} from '@core';
import {yupResolver} from '@hookform/resolvers/yup';
import {RootStackParamList} from '@navigation';
import {AuthStackParamList} from '@navigation/AuthStackNavigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {showSuccessMessage} from '@utils';
import {Eye, EyeSlash, Lock, Login} from 'iconsax-react-native';
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
import * as yup from 'yup';
import {useChangePasswordForget} from '../../api';
export type LoginNavigationScreenProp = StackNavigationProp<RootStackParamList>;
const schema = yup.object().shape({
  // newPassword: yup
  //   .string()
  //   .required('Vui lòng nhập mật khẩu')
  //   .min(6, 'Mật khẩu tối thiểu 6 ký tự')
  //   .max(16, 'Không quá 16 ký tự')
  //   .uppercase('Có ít nhất 1 ký tự biết hoa')
  //   .lowercase('Có ít nhất 1 ký tự viết thường'),
  newPassword: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Có ít nhất 8 ký tự, 1 viết hoa, 1 viết thường, 1 số và 1 ký tự đặc biệt'
    ),
  againPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Nhập lại mật khẩu không trùng với mật khẩu'),
});
type FormData = {
  newPassword: string;
  againPassword: string;
};
export const ChangePasswordByOTPScreen = () => {
  const {
    params: {originalPhoneNumber},
  } = useRoute<RouteProp<AuthStackParamList, 'ChangePasswordByOTP'>>();
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const form = useForm<FormData>({
    defaultValues: {
      newPassword: '',
      againPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showAgainPassword, setShowAgainPassword] = useState(false);
  const {signOut} = useAuth();
  const {handleSubmit, watch} = form;
  const toast = useToast();
  const {mutate, isLoading} = useChangePasswordForget();

  const onSubmit = async (data: any) => {
    if (data.newPassword && data.againPassword) {
      mutate(
        {
          confirmNewPassword: data.newPassword,
          confirmPassword: data.againPassword,
          phone: originalPhoneNumber,
        },
        {
          onSuccess(data, variables, context) {
            showSuccessMessage('Mật khẩu mới đã được thay đổi');
            navigation.navigate('Login');
          },
          onError(error, variables, context) {},
        }
      );
    } else {
      toast.show(`Vui lòng đăng nhập đúng định dạng số điện thoại`, {
        type: 'danger',
      });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{backgroundColor: '#fff'}}>
        <Toolbar />
        <View flex paddingH-20 backgroundColor="#fff">
          <KeyboardAvoidingView behavior="position">
            <StatusBar barStyle="dark-content" backgroundColor={Colors.primaryColor} />

            <View style={{marginTop: ScaleSize(100), alignItems: 'center'}}>
              <Image
                source={require('@assets/images/logo.png')}
                style={{
                  width: ScaleSize(200),
                  height: ScaleSize(44),
                }}
              />
            </View>
            <View style={{alignItems: 'center', marginTop: ScaleSize(60)}}>
              <TextBase fontFamily="SemiBold" fontSize={24} color="#555">
                Đổi mật khẩu
              </TextBase>
            </View>
            <View marginT-40>
              <InputField
                form={form}
                name="newPassword"
                label=""
                placeholder="Mật khẩu mới"
                iconLeft={{iconName: Lock}}
                iconRight={{
                  iconName: showPassword ? Eye : EyeSlash,
                  onPress: () => setShowPassword((prev: boolean) => !prev),
                }}
                secureTextEntry={!showPassword}
              />
              <View marginV-10 />
              <InputField
                form={form}
                name="againPassword"
                label=""
                placeholder="Nhập lại mật khẩu"
                iconLeft={{iconName: Lock}}
                iconRight={{
                  iconName: showAgainPassword ? Eye : EyeSlash,
                  onPress: () => setShowAgainPassword((prev: boolean) => !prev),
                }}
                secureTextEntry={!showAgainPassword}
              />
              <ButtonBase
                marginT-52
                label="Xác nhận"
                loading={isLoading}
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
export default ChangePasswordByOTPScreen;
