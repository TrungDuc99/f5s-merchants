import {ButtonBase, CardBase, Screen, Toolbar} from '@components/base';
import {Colors, ScaleSize, Spacing} from '@configs';
import {MainStackParamList} from '@navigation/MainStackNavigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Repeat, ShieldTick} from 'iconsax-react-native';
import * as React from 'react';
import {Image, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from 'react-native-ui-lib';
interface ViewImgeScreenProps {}

const ViewImageScreen = (props: ViewImgeScreenProps) => {
  const {
    params: {file, productCode, idScreen},
  } = useRoute<RouteProp<MainStackParamList, 'ViewImage'>>();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [emptFile, setEmptFile] = React.useState<any>();
  const imageFromCameraToMarker = async () => {
    try {
      const res = await ImagePicker.openCamera({
        // compressImageMaxWidth: 720,
        // compressImageMaxHeight: 1080,
        // cropping: true,
        compressImageQuality: 0.3,
      });
      console.log(res);

      const arr = res.path.split('/');
      const fileEmpty = {
        //  uri: Platform.OS === 'ios' ? res.path : `file://${res.path}`,
        uri: res.path,
        path: Platform.OS === 'ios' ? res.path : `${res.path}`,
        name: arr[arr.length - 1],
        type: res.mime,
        size: res.size,
        width: res.width,
        height: res.height,
      };
      if (fileEmpty.uri) {
        setEmptFile(fileEmpty);
      }
    } catch (error) {}
  };
  const insets = useSafeAreaInsets();
  return (
    <Screen>
      <Toolbar title="Chi tiết" />
      <View paddingT-8 flex paddingH-20>
        <CardBase>
          <Image
            source={{uri: emptFile ? emptFile.uri : file.uri}}
            resizeMode="center"
            style={{
              width: '100%',
              height: ScaleSize(500),
            }}
          />
        </CardBase>

        <View
          row
          style={{
            // justifyContent: 'space-between',
            // padding: Spacing(4),
            paddingBottom: isIphoneX() ? insets.bottom : Spacing(4),
          }}
        >
          <View flex marginR-8>
            <ButtonBase
              marginT-20
              label="Chụp lại"
              onPress={imageFromCameraToMarker}
              iconSource={() => <Repeat color="#fff" style={{marginRight: Spacing(2)}} />}
            />
          </View>
          <View flex marginL-8>
            <ButtonBase
              marginT-20
              label="Xác nhận"
              iconSource={() => <ShieldTick color="#fff" style={{marginRight: Spacing(2)}} />}
              bgColor={Colors.successColor}
              onPress={() => {
                if (idScreen === '1') {
                  {
                    navigation.navigate('CollectPoints', {file: emptFile});
                  }
                } else if (productCode) {
                  navigation.navigate({
                    name: 'OrderDetail',
                    params: {productCode: productCode, file: emptFile},
                    merge: true,
                  });
                }
              }}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default ViewImageScreen;
