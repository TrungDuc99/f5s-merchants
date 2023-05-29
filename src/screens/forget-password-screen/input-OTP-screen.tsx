import {useSendVerify, useSendVerifyCode} from '@api/forget-password';
import {ButtonBase, TextBase, Toolbar, TouchableOpacityBase} from '@components/base';
import {Colors, FontFamily, ScaleSize, Spacing} from '@configs';
import {RootStackParamList} from '@navigation';
import {AuthStackParamList} from '@navigation/AuthStackNavigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Login, Refresh2} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useToast} from 'react-native-toast-notifications';
import {Card, View} from 'react-native-ui-lib';
// import RNOtpVerify from 'react-native-otp-verify';
export type LoginNavigationScreenProp = StackNavigationProp<RootStackParamList>;

export const InputOtpScreen = () => {
  const {
    params: {to, originalPhoneNumber},
  } = useRoute<RouteProp<AuthStackParamList, 'InputOTP'>>();
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const form = useForm();
  const {handleSubmit, watch} = form;
  // const [otp, setOtp] = useState<any>();
  const [countdownSencond, setCountdownSencond] = useState<any>(60);
  const [countdownMinute, setCountdownMinute] = useState<any>(1);

  const [message, setMessage] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | undefined>(undefined);
  const [timeoutError, setTimeoutError] = useState<boolean>(false);
  const [hash, setHash] = useState<string[] | null>([]);
  const toast = useToast();
  const {mutate, isLoading} = useSendVerifyCode();
  const {mutate: mutateSendVerify, isLoading: isLoadingSendVerify} = useSendVerify();
  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //   }
  // }, []);
  // ('QXotUyUIr7K');
  // useEffect(() => {
  //   RNOtpVerify.getHash().then(console.log).catch(console.log);
  //   RNOtpVerify.getOtp()
  //     .then(p => RNOtpVerify.addListener(otpHandler))
  //     .catch(p => console.log);
  //   return () => RNOtpVerify.removeListener();
  // }, []);
  // const otpHandler = (message: string) => {
  //   const otp = /(\d{6})/g.exec(message)?.[1];
  //   setOtp(otp);
  //   RNOtpVerify.removeListener();
  //   Keyboard.dismiss();
  // };

  useEffect(() => {
    setTimeout(() => {
      if (countdownSencond > 0) {
        setCountdownSencond(countdownSencond - 1);
      } else if (countdownSencond === 0 && countdownMinute > 0) {
        setCountdownMinute(countdownMinute - 1);
        setCountdownSencond(60);
      }
    }, 1000);
  }, [countdownSencond]);

  const onSubmit = async (data: any) => {
    if (otp) {
      mutate(
        {
          data: {
            phone_number: to,
            otp: otp,
          },
        },
        {
          onSuccess: res => {
            setOtp('');
            setCountdownMinute(1);
            setCountdownSencond(60);
            navigation.navigate('ChangePasswordByOTP', {originalPhoneNumber: originalPhoneNumber});
          },
          onError: error => {
            setOtp(undefined);
            setCountdownMinute(0);
            setCountdownSencond(0);
          },
        }
      );
    } else {
      toast.show(`Số điện thoại không tồn tại trong hệ thống`, {
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
            <View padding-20 style={{marginTop: Spacing(15), alignItems: 'center'}} flex center>
              <View marginT-10>
                <Image
                  source={require('@assets/images/logo.png')}
                  style={{
                    width: ScaleSize(250),
                    height: ScaleSize(60),
                  }}
                />
              </View>
              <View>
                <TextBase
                  fontFamily="ExtraLight"
                  textAlign="center"
                  marginT-5
                  marginB-10
                  fontSize={17}
                >
                  Mã xác thực
                </TextBase>

                <View marginL-5 />
                <View row centerH centerV>
                  <TextBase
                    marginR-15
                    fontFamily="Bold"
                    fontSize={25}
                    color={
                      countdownMinute === 0 && countdownSencond === 0
                        ? Colors.primaryColor
                        : '#AEAEAE'
                    }
                  >
                    {`${countdownMinute > 0 ? countdownMinute : ''}${
                      countdownMinute > 0 ? ':' : ''
                    }${countdownSencond}`}
                  </TextBase>
                  <TouchableOpacityBase
                    disabled={countdownMinute === 0 && countdownSencond === 0 ? false : true}
                    centerV
                    onPress={() => {
                      setCountdownMinute(1);
                      setCountdownSencond(60);
                      mutateSendVerify(
                        {
                          data: {
                            phone_number: to,
                            channel: 'MERCHANTS',
                          },
                        },
                        {
                          onSuccess: res => {
                            setCountdownMinute(1);
                            setCountdownSencond(60);
                            // RNOtpVerify.getOtp()
                            //   .then(p => RNOtpVerify.addListener(otpHandler))
                            //   .catch(p => console.log);
                          },
                          onError(error, variables, context) {
                            setOtp(undefined);
                            setCountdownMinute(0);
                            setCountdownSencond(0);
                          },
                        }
                      );
                    }}
                  >
                    <Refresh2
                      size="20"
                      color={
                        countdownMinute === 0 && countdownSencond === 0
                          ? Colors.primaryColor
                          : '#AEAEAE'
                      }
                    />
                  </TouchableOpacityBase>
                </View>
              </View>
              <View marginT-30 marginB-10>
                <TextBase fontFamily="ExtraLight" fontSize={15}>
                  Mã xác thực OTP được gửi bằng SMS tới số
                </TextBase>
                <TextBase fontFamily="Bold" textAlign="center" marginT-5 marginB-15 fontSize={15}>
                  {originalPhoneNumber}
                </TextBase>
              </View>

              <OTPInputView
                style={{height: 110, width: '110%', marginLeft: 3}}
                pinCount={6}
                code={otp}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                  setOtp(code);
                }}
              />

              <View style={{width: '100%'}}>
                <ButtonBase
                  marginT-42
                  label="Tiếp tục"
                  loading={isLoading}
                  disabled={otp?.length === 6 ? false : true}
                  onPress={handleSubmit(onSubmit)}
                  iconSource={() => (
                    <Login color="#fff" variant="Bulk" style={{marginRight: Spacing(2)}} />
                  )}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 25,
    height: 35,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    fontSize: ScaleSize(60),
    fontFamily: FontFamily.SemiBold,
    color: '#1975EE',
    width: 50,
    height: 80,
    borderWidth: 0,
    borderBottomWidth: 2,
  },

  underlineStyleHighLighted: {},
});
export default InputOtpScreen;
