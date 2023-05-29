import {Colors, FontFamily, ScaleSize, Spacing} from '@configs';
import {StyleSheet} from 'react-native';

const commonStyle = StyleSheet.create({
  errorText: {
    fontFamily: FontFamily.Regular,
    color: Colors.errorColor,
    fontSize: ScaleSize(12),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },
  paddingContainer: {
    padding: Spacing(5),
  },
});

export default commonStyle;
