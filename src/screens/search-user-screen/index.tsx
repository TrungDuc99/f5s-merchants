import {ButtonBase, Screen, Toolbar} from '@components/base';
import {InputField} from '@components/forms';
import {Spacing} from '@configs';
import {AccountDrawerParamList} from '@navigation/account-drawer';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {
  CardEdit,
  HambergerMenu,
  Location,
  SearchStatus,
  ShieldTick,
  UserSquare,
  WalletMinus,
} from 'iconsax-react-native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {View} from 'react-native-ui-lib';
type SearchUserScreenNavigationType = DrawerNavigationProp<AccountDrawerParamList, 'SearchUser'>;

const SearchUserScreen = () => {
  const form = useForm<any>({});
  const navigation = useNavigation<SearchUserScreenNavigationType>();

  return (
    <Screen>
      <Toolbar
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
            form={form}
            name="name"
            label=""
            placeholder="Tìm kiếm"
            iconRight={{iconName: SearchStatus, hasBackground: true}}
          />
          <InputField
            iconLeft={{iconName: UserSquare}}
            form={form}
            name="name"
            label=""
            placeholder="Họ và tên"
            marginT-20
          />
          <InputField
            iconLeft={{iconName: WalletMinus}}
            form={form}
            name="date"
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

export default SearchUserScreen;
