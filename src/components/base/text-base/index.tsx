import {FontFamily, ScaleSize} from '@configs';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Text, TextProps} from 'react-native-ui-lib';
export type TextBaseProps = TextProps & {
  fontSize?: number;
  fontFamily?: 'Bold' | 'SemiBold' | 'Regular' | 'ExtraLight' | 'ExtraBold' | 'Medium' | 'Light';
  theme?: 'light' | 'dark';
  color?: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
};
const TextBase: FC<TextBaseProps> = ({
  fontFamily = 'Regular',
  fontSize = 14,
  theme = 'light',
  color,
  textAlign = 'left',

  ...rest
}) => {
  const styles = StyleSheet.create({
    container: {
      fontFamily: FontFamily[fontFamily],
      fontSize: ScaleSize(fontSize),
      color: color ? color : theme === 'dark' ? '#fff' : '#555',
      textAlign,
    },
  });
  return <Text {...rest} style={styles.container} />;
};

export default TextBase;
