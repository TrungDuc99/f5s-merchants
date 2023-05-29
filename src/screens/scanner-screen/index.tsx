import {MainStackParamList} from '@navigation/MainStackNavigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface ScannerScreenProps {}

const ScannerScreen = (props: ScannerScreenProps) => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  React.useEffect(() => {
    navigation.navigate('Scaner', {scanType: 1});
  }, []);

  return <View style={styles.container}></View>;
};

export default ScannerScreen;

const styles = StyleSheet.create({
  container: {},
});
