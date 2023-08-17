import {Colors, ScaleSize} from '@configs';
import {MainStackParamList} from '@navigation/MainStackNavigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Message, Scan, WalletAdd} from 'iconsax-react-native';
import React from 'react';
import {StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
import TextBase from '../text-base';
import TouchableOpacityBase from '../touchable-opacity-base';
export type HeaderProps = {
  name: string;
};
const Header = ({name}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<MainStackParamList, 'CollectPoints'>>();
  const infoUser = useSelector((state: any) => state.userReducer.infoUser);
  return (
    <View
      row
      height={ScaleSize(80) + insets.top}
      backgroundColor={Colors.primaryColor}
      paddingH-20
      centerV
      style={{paddingTop: insets.top}}
    >
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View flex marginR-8>
        <TextBase color="#cbd8f1" fontSize={14}>
          {`${infoUser?.tenNhanVien ? 'Xin chào  ' : ''}${
            infoUser?.tenNhanVien ? infoUser?.tenNhanVien : 'Chưa cập nhật tên'
          }`}
        </TextBase>
        {/* <TextBase numberOfLines={1} marginT-4 fontFamily="Bold" color="#fff" fontSize={14}>
          {infoUser?.email || 'Lỗi đăng nhập, vui lòng đăng nhập lại!'}
        </TextBase> */}
        <TextBase numberOfLines={1} marginT-4 fontFamily="Bold" color="#fff" fontSize={14}>
          Xin chào
        </TextBase>
      </View>

      {/* <TouchableOpacityBase
        marginH-10
        onPress={() => {
          navigation.navigate('ScanLogin');
        }}
      >
        <Scan color="#fff" />
      </TouchableOpacityBase> */}
      {/* <TouchableOpacityBase
        marginH-12
        marginT-8
        onPress={() => {
          navigation.navigate('Chats');
        }}
      >
        <Message color="#fff" />
      </TouchableOpacityBase> */}
      {/* <TouchableOpacityBase
        onPress={() => {
          navigation.navigate('CollectPoints', {routeName: 'ScanCode'});
        }}
      >
        <WalletAdd color="#fff" />
      </TouchableOpacityBase> */}
    </View>
  );
};

export default Header;
