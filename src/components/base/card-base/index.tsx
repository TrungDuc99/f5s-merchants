import {Colors, ScaleSize, Spacing} from '@configs';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacityProps} from 'react-native-ui-lib';
import TouchableOpacityBase from '../touchable-opacity-base';

export type CardBaseProps = TouchableOpacityProps & {};
const CardBase = ({...rest}: CardBaseProps) => {
  const [press, setPress] = useState(false);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: Spacing(3),
      borderRadius: ScaleSize(16),
      shadowColor: Colors.primaryColor,
      shadowOffset: {
        width: press ? 2 : 0.5,
        height: press ? 4 : 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: press ? 4 : 0,
      elevation: press ? 4 : 1,
      borderWidth: ScaleSize(1),
      borderColor: '#EDECEC',
    },
  });
  return (
    <TouchableOpacityBase
      {...rest}
      style={styles.container}
      onPressIn={() => setPress(true)}
      onPressOut={() => setPress(false)}
    />
  );
};

export default CardBase;
