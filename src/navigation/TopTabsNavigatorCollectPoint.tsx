import {Spacing} from '@configs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ImportCodeScreen from '@screens/collect-point-screen/import-code';
import ScanCodeScreen from '@screens/collect-point-screen/scan-code';
import React from 'react';
export type CollectPointTopTabParamList = {
  LichSuTichDiem: {};
  ScanCode: {
    code?: any;
    file?: any;
  };
};
const Tab = createMaterialTopTabNavigator<CollectPointTopTabParamList>();

const TopTabsNavigatorCollectPoint = ({
  code,
  file,
  routeName = 'LichSuTichDiem',
}: {
  code?: string;
  file?: string;
  routeName: string;
}) => {
  return (
    <Tab.Navigator
      style={{marginHorizontal: Spacing(4)}}
      // initialRouteName={routeName === 'ScanCode' ? 'ScanCode' : 'ScanCode'}
    >
      <Tab.Screen
        name="ScanCode"
        initialParams={{code: code, file: file}}
        options={{
          title: 'Tích điểm',
        }}
        children={() => <ScanCodeScreen file={file} code={code} />}
      />
      <Tab.Screen
        name="LichSuTichDiem"
        options={{
          title: 'Lịch sử',
        }}
        // initialParams={{code: code, file: file}}
        component={ImportCodeScreen}
      />
    </Tab.Navigator>
  );
};
export default TopTabsNavigatorCollectPoint;
