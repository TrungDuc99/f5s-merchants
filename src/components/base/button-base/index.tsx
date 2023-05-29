import {Colors, FontFamily, ScaleSize, Spacing} from '@configs';
import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Button, ButtonProps, TouchableOpacityProps} from 'react-native-ui-lib';

export type ButtonBaseProps = ButtonProps & {
  label?: string;
  bgColor?: string;
  loading?: boolean;
  onPress: (props?: TouchableOpacityProps | any) => void;
};
const ButtonBase = ({
  onPress,
  label,
  bgColor,
  loading = false,
  iconSource,
  ...rest
}: ButtonBaseProps) => {
  return (
    <Button
      {...rest}
      labelStyle={styles.label}
      size={Button.sizes.large}
      backgroundColor={bgColor ? bgColor : Colors.secondaryColor}
      borderRadius={ScaleSize(30)}
      // style={{width: '100%'}}
      label={label}
      onPress={onPress}
      disabled={loading || rest.disabled}
      iconSource={
        loading
          ? () => <ActivityIndicator style={{marginRight: Spacing(1)}} color="#fff" />
          : iconSource
      }
    />
  );
};

export default ButtonBase;

const styles = StyleSheet.create({
  label: {
    fontFamily: FontFamily.Bold,
    textTransform: 'uppercase',
    fontSize: ScaleSize(14),
    fontWeight: 'bold',
    paddingVertical: Spacing(1),
  },
});
