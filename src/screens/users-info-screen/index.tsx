import {
  ButtonBase,
  Divider,
  Screen,
  TextBase,
  Toolbar,
  TouchableOpacityBase,
} from '@components/base';
import {InputField} from '@components/forms';
import {ScaleSize} from '@configs';
import {MainStackParamList} from '@navigation/MainStackNavigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AddCircle, BagCross, SearchStatus} from 'iconsax-react-native';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Card, View} from 'react-native-ui-lib';

interface UsersInfoProps {}

const UsersInfoScreen = (props: UsersInfoProps) => {
  const form = useForm();
  const navigition = useNavigation<StackNavigationProp<MainStackParamList>>();
  return (
    <Screen>
      <Toolbar
        title="Người dùng"
        iconRight={{
          icon: AddCircle,
          color: '#219653',
          variant: 'Bulk',
          size: 40,
          onPress: () => {
            navigition.navigate('AddUser');
          },
        }}
      />
      <Divider />
      <ScrollView style={styles.container}>
        <View margin-15>
          <InputField
            placeholder="Nhập thông tin cần tìm"
            label=""
            name="search"
            form={form}
            iconRight={{
              iconName: SearchStatus,
            }}
          />
          <View marginV-10 />
          <Card
            elevation={20}
            padding-15
            // style={{
            //   borderWidth: 0.3,
            //   borderColor: 'red',
            // }}
          >
            <View style={styles.itemInfo}>
              <TextBase>Username</TextBase>
              <TextBase fontFamily="SemiBold">nguyenanhtu</TextBase>
            </View>
            <Divider />
            <View style={styles.itemInfo}>
              <TextBase>Số điện thoại</TextBase>
              <TextBase fontFamily="SemiBold">0912314569</TextBase>
            </View>
            <Divider />
            <View style={styles.itemInfo}>
              <TextBase>Email</TextBase>
              <TextBase fontFamily="SemiBold">nguyenanhtu@gmail.com</TextBase>
            </View>
          </Card>
          <View marginV-10 />
          <Card
            padding-15
            elevation={20}
            style={{
              borderWidth: 1,
              borderColor: 'red',
            }}
          >
            <View style={styles.iconDelete}>
              <TouchableOpacityBase onPress={() => {}}>
                <BagCross size={ScaleSize(35)} color="white" />
              </TouchableOpacityBase>
            </View>
            <View style={styles.itemInfo}>
              <TextBase>Username</TextBase>
              <TextBase fontFamily="SemiBold">nguyenanhtu</TextBase>
            </View>
            <Divider />
            <View style={styles.itemInfo}>
              <TextBase>Số điện thoại</TextBase>
              <TextBase fontFamily="SemiBold">0912314569</TextBase>
            </View>
            <Divider />
            <View style={styles.itemInfo}>
              <TextBase>Email</TextBase>
              <TextBase fontFamily="SemiBold">nguyenanhtu@gmail.com</TextBase>
            </View>
          </Card>
          <View marginV-10 />
          <Card
            elevation={20}
            padding-15
            // style={{
            //   borderWidth: 0.3,
            //   borderColor: 'red',
            // }}
          >
            <View style={styles.itemInfo}>
              <TextBase>Username</TextBase>
              <TextBase fontFamily="SemiBold">nguyenanhtu</TextBase>
            </View>
            <Divider />
            <View style={styles.itemInfo}>
              <TextBase>Số điện thoại</TextBase>
              <TextBase fontFamily="SemiBold">0912314569</TextBase>
            </View>
            <Divider />
            <View style={styles.itemInfo}>
              <TextBase>Email</TextBase>
              <TextBase fontFamily="SemiBold">nguyenanhtu@gmail.com</TextBase>
            </View>
          </Card>
          <View marginV-20 />
        </View>
        <View marginV-50 />
      </ScrollView>
    </Screen>
  );
};

export default UsersInfoScreen;

const styles = StyleSheet.create({
  container: {},
  itemInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: ScaleSize(10),
  },
  iconDelete: {
    padding: 10,
    backgroundColor: '#FF6077',
    zIndex: 10,
    borderRadius: 1000,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 50,
    left: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
});
