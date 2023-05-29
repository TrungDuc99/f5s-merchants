import {TextBase, TouchableOpacityBase} from '@components/base';
import {ScaleSize, Spacing} from '@configs';
import {Icon as IconSax} from 'iconsax-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacityProps} from 'react-native-ui-lib';
export type ButtonFilterProps = TouchableOpacityProps & {
  icon: IconSax;
  backgroundColor: string;
  backgroundColorInactive: string;
  title: string;
  count: number;
  active: boolean;
};
const ButtonFilter = ({
  icon: Icon,
  backgroundColor,
  backgroundColorInactive,
  active = false,
  title,
  count,
  ...rest
}: ButtonFilterProps) => {
  return (
    <TouchableOpacityBase
      {...rest}
      centerH
      backgroundColor={active ? backgroundColor : backgroundColorInactive}
      style={{borderRadius: ScaleSize(8), padding: Spacing(1), paddingVertical: Spacing(2)}}
    >
      <Icon color={active ? '#fff' : backgroundColor} size={ScaleSize(24)} />
      <TextBase fontFamily="Bold" fontSize={11} color={active ? '#fff' : backgroundColor}>
        {title}
      </TextBase>
      <View style={[styles.badge, {backgroundColor}]}>
        <TextBase fontFamily="SemiBold" fontSize={9} color="#fff">
          {count}
        </TextBase>
      </View>
    </TouchableOpacityBase>
  );
};

export default ButtonFilter;

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: Spacing(1),
    right: Spacing(1),
    width: 23,
    height: 23,
    alignItems: 'center',

    justifyContent: 'center',
    borderRadius: 50,

    paddingHorizontal: Spacing(0.5),
    // borderColor: '#fff',
    // borderWidth: ScaleSize(1),
  },
});
