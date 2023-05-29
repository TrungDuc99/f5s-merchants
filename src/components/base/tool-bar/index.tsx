import {Colors, FontFamily, ScaleSize, Spacing} from '@configs';
import {RootStackParamList} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ArrowLeft, Icon} from 'iconsax-react-native';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from 'react-native-ui-lib';
import TextBase from '../text-base';
import TouchableOpacityBase from '../touchable-opacity-base';

export interface ToolbarProps {
  title?: string;
  showBackButton?: boolean;
  iconRight?: {
    icon: Icon;
    color?: any;
    variant?: 'Linear' | 'Outline' | 'Broken' | 'Bold' | 'Bulk' | 'TwoTone';
    size?: number;
    onPress?: () => void;
  };
}

export type ToolbarProp = StackNavigationProp<RootStackParamList>;

const Toolbar = ({title, showBackButton = true, iconRight}: ToolbarProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ToolbarProp>();
  return (
    <View
      style={[
        {
          height: ScaleSize(50) + insets.top,
          paddingTop: insets.top,
          zIndex: 2,
          backgroundColor: '#fff',
        },
      ]}
    >
      {/* <StatusBar backgroundColor="#fff" barStyle="dark-content" /> */}
      <View flex row bottom spread centerV style={styles.container}>
        {showBackButton ? (
          <View row>
            <TouchableOpacityBase
              padding-10
              paddingL-0
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ArrowLeft color={Colors.textColor} size={ScaleSize(26)} />
            </TouchableOpacityBase>
            <TextBase marginT-10 marginL-5 fontFamily="Bold" fontSize={18}>
              {title}
            </TextBase>
          </View>
        ) : (
          <View width={ScaleSize(24)} />
        )}

        <TouchableOpacityBase onPress={iconRight?.onPress}>
          {/* {!!notificationCount && (
            <View style={styles.wrapBadge}>
              <Badge
                label={
                  notificationCount
                    ? notificationCount > 999
                      ? '999+'
                      : `${notificationCount}`
                    : ''
                }
                size={16}
                backgroundColor={Colors.errorColor}
                labelStyle={{fontFamily: FontFamily.Bold, fontSize: ScaleSize(10)}}
              />
            </View>
          )} */}
          {iconRight && (
            <View padding-15 centerV marginT-2 paddingR-0>
              <iconRight.icon
                color={iconRight.color ? iconRight.color : Colors.textColor}
                size={iconRight.size ? ScaleSize(iconRight.size) : ScaleSize(24)}
                variant={iconRight.variant ? iconRight.variant : 'Linear'}
              />
            </View>
          )}
        </TouchableOpacityBase>
      </View>
    </View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing(5),
  },
  wrapBadge: {
    position: 'absolute',
    top: -ScaleSize(10),
    right: -ScaleSize(15),
    width: ScaleSize(28),
    zIndex: 1,
  },
  txtTitle: {
    fontFamily: FontFamily.Medium,
    fontSize: ScaleSize(16),
    color: Colors.primaryColor,
  },
});
