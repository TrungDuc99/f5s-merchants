import {CardBase, TouchableOpacityBase} from '@components/base';
import {Colors, FontFamily, ScaleSize, Spacing} from '@configs';
import * as React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Drawer, Text, View} from 'react-native-ui-lib';

interface NotificationItemProps {
  icon?: any;
  title?: string;
  description?: string;
  state?: number;
  onPress?: () => void;
}

const NotificationItem = (props: NotificationItemProps) => {
  const {icon, title, state, description, onPress} = props;
  const Icon = icon;
  const [isFocus, setIsFocus] = React.useState(false);

  const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: '#fff',
      // padding: Spacing(3),
      borderRadius: ScaleSize(16),
      shadowColor: Colors.primaryColor,
      shadowOffset: {
        width: isFocus ? 2 : 0.5,
        height: isFocus ? 4 : 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: isFocus ? 4 : 0,
      elevation: isFocus ? 4 : 1,
      borderWidth: ScaleSize(1),
      borderColor: '#EDECEC',
      marginBottom: Spacing(3),
    },
    content: {
      paddingRight: 20,
      height: ScaleSize(50),
      alignItems: 'center',
    },
    txtItemLabel: {
      color: '#555555',
      fontSize: ScaleSize(14),
      marginLeft: Spacing(2),
      FontFamily: FontFamily.Regular,
    },
  });
  return (
    <Drawer
      style={styles.cardContainer}
      rightItems={[
        {
          icon: require('@assets/icons/bag-cross.png'),
          // text: 'Xóa',
          background: Colors.errorColor,
          onPress: () => {},
        },

        // {
        //   icon: require('@assets/icons/close-circle.png'),
        //   // text: 'Xóa',
        //   background: "#999999",
        // },
      ]}
      onSwipeableWillClose={() => {}}
      onDragStart={() => {}}
    >
      <TouchableOpacityBase
        style={{backgroundColor: state === 1 ? '#999999' : '#fff', padding: Spacing(3)}}
        onPressIn={() => setIsFocus(true)}
        onPressOut={() => setIsFocus(false)}
        onPress={onPress && onPress}
      >
        <View row style={styles.content}>
          <Icon color={state === 1 ? '#fff' : '#999999'} />

          {title && (
            <Text
              style={styles.txtItemLabel}
              children={title?.length < 100 ? `${title}` : `${title.substring(0, 50)}...`}
            />
          )}
        </View>
      </TouchableOpacityBase>
    </Drawer>
  );
};

export default NotificationItem;
