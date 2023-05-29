import {Screen, Toolbar} from '@components/base';
import {AccountDrawerParamList} from '@navigation/account-drawer';
import TopTabsNavigatorCollectPoint from '@navigation/TopTabsNavigatorCollectPoint';
import {RouteProp, useRoute} from '@react-navigation/native';
import {HambergerMenu} from 'iconsax-react-native';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import ScanCodeScreen from './scan-code';

const CollectPointedScreen = () => {
  const {params} = useRoute<RouteProp<AccountDrawerParamList, 'collectPoints'>>();

  return (
    <Screen>
      <Toolbar title="Tích điểm" />
      <TopTabsNavigatorCollectPoint
        routeName={params?.routeName}
        file={params?.file}
        code={params?.code}
      />
      {/* <ScanCodeScreen file={params?.file} code={params?.code} /> */}
    </Screen>
  );
};

export default CollectPointedScreen;

const styles = StyleSheet.create({
  container: {},
});
