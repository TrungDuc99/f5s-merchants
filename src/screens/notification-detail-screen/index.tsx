import {CardBase, Divider, Screen, Toolbar} from '@components/base';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';

const NotificationDetailScreen = () => {
  return (
    <Screen>
      <Toolbar title="Chi tiết thông báo" />
      <View style={styles.container}>
        <CardBase>
          <View padding-10>
            <Text style={{}}>Giảm giá 10 - 30% tại Mường Thanh Hospitality chi nhánh Đà Nẵng</Text>
            <Divider marginV-10 />
            <Text style={{fontSize: 13, color: '#555555'}} marginB-5>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
            <Text style={{fontSize: 13, color: '#555555'}}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
          </View>
        </CardBase>
      </View>
    </Screen>
  );
};

export default NotificationDetailScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
