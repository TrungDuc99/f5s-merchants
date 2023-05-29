import {ButtonBase, Screen, TextBase, Toolbar} from '@components/base';
import DialogConfirm from '@components/base/dialog-confirm';
import {InputField, SelectField} from '@components/forms';
import DatePickerField from '@components/forms/date-picker-field';
import {ScaleSize, Spacing} from '@configs';
import {useAuth} from '@core';
import {InfoUserRes} from '@models';
import {AccountDrawerParamList} from '@navigation/account-drawer';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {
  Call,
  HambergerMenu,
  Lock,
  Profile2User,
  ShieldTick,
  SmsTracking,
  UserSquare,
} from 'iconsax-react-native';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import OneSignal from 'react-native-onesignal';
import {useToast} from 'react-native-toast-notifications';
import {KeyboardAwareScrollView, View} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
import {useUpdateUser} from '../../api';
import DeviceInfo from 'react-native-device-info';

type ProfileScreenNavigationType = DrawerNavigationProp<AccountDrawerParamList, 'Profile'>;

const ProfileScreen = () => {
  const {infoUser, token} = useAuth();
  const userInfo = useSelector((state: any) => state.userReducer.infoUser);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [deviceToken, setDeviceToken] = React.useState('');
  const [titleType, setTitleType] = React.useState('');
  const [contentDialog, setContentDialog] = React.useState('');
  const getDeviceToken = async () => {
    const deviceState = await OneSignal.getDeviceState();
    setDeviceToken(deviceState?.userId ?? '');
    setValue('deviceToken', deviceState?.userId ?? '');
  };

  const form = useForm<any>({
    defaultValues:
      {
        ...infoUser,
        // gioiTinh: infoUser?.gioiTinh
        //   ? [
        //       {
        //         label: infoUser?.gioiTinh,
        //         value: infoUser?.gioiTinh === 'Nam' ? '1' : '0',
        //       },
        //     ]
        //   : null,
        // ngaySinh: infoUser?.ngaySinh,
      } ?? {},
  });
  const {setValue} = form;
  useEffect(() => {
    getDeviceToken();
    setValue('token', token?.access);

    setValue(
      'gioiTinh',
      infoUser?.gioiTinh
        ? [
            {
              label: infoUser?.gioiTinh,
              value: infoUser?.gioiTinh === 'Nam' ? '1' : '0',
            },
          ]
        : null
    );
  }, [token]);
  const toast = useToast();

  const {handleSubmit} = form;
  const navigation = useNavigation<ProfileScreenNavigationType>();
  const {mutate, isLoading} = useUpdateUser();
  const onSubmit = (data: InfoUserRes) => {
    if (!data.ngaySinh) {
      toast.show(`Vui lòng chọn ngày sinh`, {
        type: 'warning',
        animationDuration: 100,
      });
    } else {
      const newData: InfoUserRes = {
        ...data,
        gioiTinh: data.gioiTinh?.[0]?.label,
      };
      if (newData) {
        mutate({
          id: data.id,
          data: newData,
        });
      }
    }
  };

  return (
    <Screen>
      <Toolbar
        title="Thông tin cá nhân"
        iconRight={{
          icon: HambergerMenu,
          onPress: () => {
            navigation.openDrawer();
          },
        }}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <View center>
          <View marginT-16 style={{position: 'relative'}}>
            <FastImage
              style={{
                width: ScaleSize(180),
                height: ScaleSize(180),
                borderRadius: ScaleSize(100),
              }}
              source={{
                uri: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg',
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            {/* <TouchableOpacityBase backgroundColor={Colors.secondaryColor} style={styles.btnEdit}>
              <Edit2 color="#fff" size={ScaleSize(18)} />
            </TouchableOpacityBase> */}
          </View>
        </View>
        <View style={{padding: Spacing(4)}}>
          <InputField
            iconLeft={{iconName: UserSquare}}
            form={form}
            name="tenNhanVien"
            label=""
            placeholder="Họ và tên"
            rules={{
              required: {
                value: true,
                message: 'Vui lòng điền đầy đủ họ tên',
              },
            }}
          />
          <SelectField
            iconLeft={{
              iconName: Profile2User,
            }}
            options={[
              {value: '0', label: 'Nữ'},
              {value: '1', label: 'Nam'},
            ]}
            form={form}
            name="gioiTinh"
            mode="single"
            label="Giới tính"
            placeholder="Giới tính"
            marginT-20
            rules={{
              required: {
                value: true,
                message: 'Vui lòng điền chọn giới tính',
              },
            }}
          />

          <DatePickerField marginT-20 form={form} name="ngaySinh" label="Ngày sinh" />
          <InputField
            iconLeft={{iconName: SmsTracking}}
            form={form}
            name="email"
            label=""
            placeholder="Email"
            marginT-20
          />
          <InputField
            iconLeft={{iconName: Call}}
            form={form}
            name="soDienThoai"
            label=""
            placeholder="Số điện thoại"
            rules={{
              required: {
                value: true,
                message: 'Vui lòng điền đầy đủ số điện thoại',
              },
            }}
            marginT-20
          />

          <InputField
            disable
            iconLeft={{iconName: Lock}}
            form={form}
            name="token"
            onPressField={() => {
              setTitleType('Authen token');
              setContentDialog(token?.access || '');
              setOpenConfirm(true);
            }}
            label=""
            placeholder="Token Authen"
            marginT-20
          />
          <InputField
            disable
            iconLeft={{iconName: Lock}}
            form={form}
            name="deviceToken"
            onPressField={() => {
              setTitleType('Device token');
              setContentDialog(deviceToken);
              setOpenConfirm(true);
            }}
            label=""
            placeholder="Device Token"
            marginT-20
          />
          <ButtonBase
            marginT-20
            label="Cập nhật"
            loading={isLoading}
            iconSource={() => <ShieldTick color="#fff" style={{marginRight: Spacing(2)}} />}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        {/* <View style={{marginBottom: Spacing(30)}} /> */}
        <DialogConfirm
          title={`${titleType} \n(nhấn giữ để sao chép)`}
          open={openConfirm}
          isShowText
          content={contentDialog}
          onClose={() => setOpenConfirm(false)}
          onAccept={() => setOpenConfirm(false)}
        />
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default ProfileScreen;
