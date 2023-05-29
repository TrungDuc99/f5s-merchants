import {Colors, FontFamily, ScaleSize, Spacing} from '@configs';
import {commonStyle} from '@styles';
import React from 'react';
import {ActivityIndicator, Image, StyleSheet} from 'react-native';
import {Text, TouchableOpacity, TouchableOpacityProps, View} from 'react-native-ui-lib';

interface ButtonIconOnlyProps extends TouchableOpacityProps {
  onPress?: () => void;
  color?: string;
  colorIcons?: string;
  disabled?: boolean;
  width?: number;
  size?: 'small' | 'medium' | 'large';
  icon?: any;
  title?: string;
  IconImg?: any;
  borderRadius?: number;
  loading?: boolean;
}
const ButtonIconOnly = ({
  onPress,
  color,
  loading = false,
  colorIcons,
  icon,
  size = 'medium',
  width,
  IconImg,
  disabled,
  borderRadius,
  title,
  ...rest
}: ButtonIconOnlyProps) => {
  const Icon = icon;

  const styles = StyleSheet.create({
    container: {
      borderRadius: borderRadius ? ScaleSize(borderRadius) : ScaleSize(6),
      padding: IconImg ? 0 : borderRadius ? Spacing(3) : Spacing(2),
      width: width && ScaleSize(width),
      height: size === 'large' ? ScaleSize(55) : size === 'small' ? ScaleSize(36) : ScaleSize(42),
    },
    label: {
      fontSize: ScaleSize(12),

      color: Colors.whiteColor,
      fontFamily: FontFamily.Medium,
      marginTop: Spacing(1),
    },
  });
  return (
    <TouchableOpacity
      {...rest}
      centerH
      disabled={disabled}
      onPress={onPress}
      backgroundColor={
        IconImg ? '' : color ? color : disabled ? Colors.grayColor : Colors.primaryColor
      }
      style={[styles.container]}
    >
      {loading ? (
        <ActivityIndicator
          color={Colors.primaryColor}
          style={{
            width: ScaleSize(32),
            height: ScaleSize(32),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : (
        <View marginT-5 centerH centerV>
          {IconImg ? (
            <Image
              source={IconImg}
              style={{
                width: ScaleSize(57),
                height: ScaleSize(57),
              }}
            />
          ) : (
            <Icon
              color={colorIcons ? colorIcons : Colors.whiteColor}
              size={
                size === 'large' ? ScaleSize(32) : size === 'small' ? ScaleSize(24) : ScaleSize(28)
              }
            />
          )}
          <Text style={styles.label} children={title} />
        </View>
      )}
    </TouchableOpacity>
  );
};
export default ButtonIconOnly;
