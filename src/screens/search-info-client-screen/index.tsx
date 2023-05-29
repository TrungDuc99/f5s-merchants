import {ButtonBase, Screen, Toolbar, TouchableOpacityBase} from '@components/base';
import {InputField} from '@components/forms';
import {Colors, ScaleSize, Spacing} from '@configs';
import {AccountDrawerParamList} from '@navigation/account-drawer';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {
  Call,
  CardEdit,
  Edit2,
  HambergerMenu,
  Location,
  LocationAdd,
  SearchNormal,
  SearchStatus,
  ShieldTick,
  SmsTracking,
  UserSquare,
  VideoTime,
  WalletMinus,
} from 'iconsax-react-native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {View} from 'react-native-ui-lib';
type ProfileScreenNavigationType = DrawerNavigationProp<AccountDrawerParamList, 'Profile'>;

const SearchInfoClient = () => {
  const form = useForm<any>({});
  const navigation = useNavigation<ProfileScreenNavigationType>();

  return (
    <Screen>
      <Toolbar
        showBackButton={true}
        title="Tìm kiếm thông tin khách hàng"
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
            iconLeft={{iconName: CardEdit}}
            iconRight={{iconName: SearchStatus}}
            form={form}
            name="phone"
            label=""
            placeholder="Số điện thoại"
          />
          <InputField
            iconLeft={{iconName: UserSquare}}
            form={form}
            name="fullName"
            label=""
            placeholder="Họ và tên"
            marginT-20
          />
          <InputField
            iconLeft={{iconName: WalletMinus}}
            form={form}
            name="cif"
            label=""
            placeholder="Số CIF"
            marginT-20
          />
          <InputField
            iconLeft={{iconName: Location}}
            form={form}
            name="address"
            label=""
            placeholder="Địa chỉ"
            marginT-20
          />
          <ButtonBase
            marginT-20
            label="Cập nhật"
            iconSource={() => <ShieldTick color="#fff" style={{marginRight: Spacing(2)}} />}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default SearchInfoClient;
