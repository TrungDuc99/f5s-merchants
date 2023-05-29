import {useChangePassword} from '../../api';
import {ButtonBase, Screen, Toolbar} from '@components/base';
import {InputField} from '@components/forms';
import {Spacing} from '@configs';
import {useAuth} from '@core';
import {PasswordChangeReq} from '@models';
import {AccountDrawerParamList} from '@navigation/account-drawer';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {Eye, EyeSlash, HambergerMenu, Lock, ShieldTick} from 'iconsax-react-native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {View} from 'react-native-ui-lib';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

type ChangePasswordScreenNavigationType = DrawerNavigationProp<
  AccountDrawerParamList,
  'ChangePassword'
>;

const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('Vui lòng nhập mật khẩu cũ')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  newPassword: yup
    .string()
    .required('Vui lòng nhập mật khẩu mới')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  confirmPassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu mới')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});
const ChangePasswordScreen = () => {
  const {infoUser} = useAuth();
  const form = useForm<PasswordChangeReq>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const {handleSubmit} = form;
  const navigation = useNavigation<ChangePasswordScreenNavigationType>();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {mutate, isLoading} = useChangePassword();
  const onSubmit = (data: PasswordChangeReq) => {
    mutate({...data, email: infoUser?.email});
  };
  return (
    <Screen>
      <Toolbar
        title="Thay đổi mật khẩu"
        iconRight={{
          icon: HambergerMenu,
          onPress: () => {
            navigation.openDrawer();
          },
        }}
      />
      <ScrollView>
        <View style={{padding: Spacing(4)}}>
          <InputField
            form={form}
            name="oldPassword"
            label=""
            placeholder="Mật khẩu cũ"
            iconLeft={{iconName: Lock}}
            iconRight={{
              iconName: showPassword ? Eye : EyeSlash,
              onPress: () => setShowPassword(prev => !prev),
            }}
            secureTextEntry={!showPassword}
          />
          <InputField
            marginT-20
            form={form}
            name="newPassword"
            label=""
            placeholder="Mật khẩu mới"
            iconLeft={{iconName: Lock}}
            iconRight={{
              iconName: showNewPassword ? Eye : EyeSlash,
              onPress: () => setShowNewPassword(prev => !prev),
            }}
            secureTextEntry={!showNewPassword}
          />
          <InputField
            marginT-20
            form={form}
            name="confirmPassword"
            label=""
            placeholder="Nhập lại mật khẩu"
            iconLeft={{iconName: Lock}}
            iconRight={{
              iconName: showConfirmPassword ? Eye : EyeSlash,
              onPress: () => setShowConfirmPassword(prev => !prev),
            }}
            secureTextEntry={!showConfirmPassword}
          />

          <ButtonBase
            marginT-20
            label="Cập nhật"
            iconSource={() => <ShieldTick color="#fff" style={{marginRight: Spacing(2)}} />}
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default ChangePasswordScreen;
