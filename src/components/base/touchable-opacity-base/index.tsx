import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native-ui-lib';

const TouchableOpacityBase = React.forwardRef(
  ({onPress, ...rest}: TouchableOpacityProps, ref: any) => {
    return (
      <TouchableOpacity ref={ref} activeOpacity={onPress ? 0.5 : 1} {...rest} onPress={onPress} />
    );
  }
);

export default TouchableOpacityBase;
