import {ButtonBase, CardBase, Screen, Toolbar} from '@components/base';
import {MainStackParamList} from '@navigation/MainStackNavigation';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Scan, ShieldTick} from 'iconsax-react-native';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, View} from 'react-native-ui-lib';
import {Colors, FontFamily, ScaleSize, Spacing} from '../../configs';

const ScanedDetailScreen = () => {
  const {
    params: {data},
  } = useRoute<RouteProp<MainStackParamList, 'ScanedDetail'>>();
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <Screen>
      <Toolbar title="Chi tiết " />

      <ScrollView
        contentContainerStyle={{
          padding: Spacing(5),
        }}
      >
        <CardBase>
          <View style={{alignItems: 'center'}} padding-10>
            <Text style={{fontFamily: FontFamily.Bold, fontSize: ScaleSize(18)}}>{data}</Text>
          </View>
        </CardBase>
      </ScrollView>
      <View
        row
        style={{
          margin: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{width: '48%'}}>
          <ButtonBase
            iconSource={() => <Scan color="#fff" style={{marginRight: Spacing(2)}} />}
            bgColor="#646465"
            label="Quét lại"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={{width: '48%'}}>
          <ButtonBase
            iconSource={() => <ShieldTick color="#fff" style={{marginRight: Spacing(2)}} />}
            label="Xác nhận"
            onPress={() => {
              navigation.navigate('CollectPoints', {code: data});
            }}
          />
        </View>
      </View>
    </Screen>
  );
};

export default ScanedDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  wrapItem: {
    // flex: 1,
    // alignItems: 'center',
    borderRadius: ScaleSize(8),
    padding: Spacing(2),
    backgroundColor: '#fff',
  },
  buttonContainer: {},
  img: {
    width: '100%',
    height: ScaleSize(200),
    resizeMode: 'contain',
    borderRadius: ScaleSize(6),
  },
  p: {
    color: Colors.textColor,
  },
  //modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: FontFamily.Medium,
    marginBottom: ScaleSize(15),
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
