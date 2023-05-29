import {Screen, Toolbar} from '@components/base';
import {InputField} from '@components/forms';
import {ScaleSize, Spacing} from '@configs';
import {useAuth} from '@core';
import {AccountDrawerParamList} from '@navigation/account-drawer';
import {MainStackParamList} from '@navigation/MainStackNavigation';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Call, Document, HomeWifi, Profile, SmsTracking, UserSquare} from 'iconsax-react-native';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView, View} from 'react-native-ui-lib';
type ProfileScreenNavigationType = DrawerNavigationProp<AccountDrawerParamList, 'Profile'>;

const DetailCustomerScreen = () => {
  const {infoUser} = useAuth();
  const form = useForm();
  const {
    params: {data},
  } = useRoute<RouteProp<MainStackParamList, 'DetailCustomer'>>();
  const {handleSubmit, setValue} = form;

  console.log(data);

  useEffect(() => {
    setValue('maHopDong', data?.maHopDong || '');
    setValue('email', data?.email || '');
    setValue('point', data?.point + '' || '');
    setValue('maKh', data?.maKh || '');
    setValue('sdtKh', data?.sdtKh || '');
    setValue('tenKh', data?.tenKh || '');
  }, []);

  return (
    <Screen>
      <Toolbar title="Thông tin chi tiết khách hàng" />
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
            name="maKh"
            label="Mã khách hàng"
            placeholder="Mã khách hàng"
            rules={{
              required: {
                value: true,
                message: 'Vui lòng điền đầy đủ họ tên',
              },
            }}
          />
          <InputField
            iconLeft={{iconName: Profile}}
            form={form}
            name="tenKh"
            label="Tên khác hàng"
            placeholder="Tên khác hàng"
            rules={{
              required: {
                value: true,
                message: 'Vui lòng điền đầy đủ số điện thoại',
              },
            }}
            marginT-20
          />
          <InputField
            iconLeft={{iconName: Document}}
            form={form}
            name="maHopDong"
            label=""
            placeholder="Mã hợp đồng"
            rules={{
              required: {
                value: true,
                message: 'Vui lòng điền đầy đủ số điện thoại',
              },
            }}
            marginT-20
          />
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
            name="sdtKh"
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
            iconLeft={{iconName: HomeWifi}}
            form={form}
            disableFullscreenUI={true}
            name="point"
            label=""
            placeholder="Điểm"
            rules={{
              required: {
                value: true,
                message: 'Vui lòng điền đầy đủ số điện thoại',
              },
            }}
            marginT-20
          />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default DetailCustomerScreen;
