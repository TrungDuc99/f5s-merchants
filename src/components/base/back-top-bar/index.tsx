import {TouchableOpacityBase} from '@components/base';
import {Colors, FontFamily, ScaleSize, Spacing} from '@configs';
import {useNavigation} from '@react-navigation/native';
import {ArrowCircleLeft, ArrowLeft} from 'iconsax-react-native';
import React from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {Text, View, ViewProps} from 'react-native-ui-lib';
interface BackTopBarProps {
  title?: string;
}
const BackTopBar = ({title}: BackTopBarProps) => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    btnBackNavigator: {
      position: 'absolute',
      top:
        Platform.OS === 'ios' && isIphoneX()
          ? ScaleSize(45)
          : Platform.OS === 'android'
          ? ScaleSize(15)
          : ScaleSize(35),
      left: 15,
      zIndex: 99,
      alignItems: 'flex-end',
    },
    container: {
      justifyContent: 'center',
      backgroundColor: '#fff',
      padding: Spacing(1.2),
      marginTop:
        Platform.OS === 'ios' && isIphoneX()
          ? Spacing(9)
          : Platform.OS === 'android'
          ? Spacing(0)
          : Spacing(5),
    },
    title: {
      fontSize: Platform.OS === 'ios' ? ScaleSize(18) : ScaleSize(20),
      fontFamily: FontFamily.Bold,
      color: Colors.textColor,
    },
  });
  const IconBack =
    Platform.select({
      ios: ArrowCircleLeft,
      android: ArrowLeft,
    }) || ArrowLeft;

  const handlePressBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <>
      {!title ? (
        <TouchableOpacityBase marginL-5 style={styles.btnBackNavigator} onPress={handlePressBack}>
          <IconBack color={Colors.primaryColor} size={ScaleSize(35)} style={{marginRight: 5}} />
        </TouchableOpacityBase>
      ) : (
        <View style={styles.container}>
          <TouchableOpacityBase marginL-5 onPress={handlePressBack}>
            <View row centerV>
              <IconBack color={Colors.textColor} size={ScaleSize(35)} style={{marginRight: 5}} />
              <Text style={styles.title} children={title} />
            </View>
          </TouchableOpacityBase>
        </View>
      )}
    </>
  );
};

export default BackTopBar;
