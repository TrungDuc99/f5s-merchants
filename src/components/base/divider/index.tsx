import {StyleSheet} from 'react-native';
import React from 'react';
import {View, ViewProps} from 'react-native-ui-lib';
import {ScaleSize} from '@configs';

export type DividerProps = ViewProps;
const Divider = ({...rest}: DividerProps) => {
  return <View height={ScaleSize(1)} {...rest} style={styles.divider} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    height: ScaleSize(1),
    backgroundColor: '#EDECEC',
  },
});
