import {Screen, Toolbar} from '@components/base';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface EditStoreInfoProps {}

const EditStoreInfoScreen = (props: EditStoreInfoProps) => {
  return (
    <Screen>
      <Toolbar title="Cập nhật cửa hàng" />
    </Screen>
  );
};

export default EditStoreInfoScreen;

const styles = StyleSheet.create({
  container: {},
});
