import {StyleSheet, useColorScheme} from 'react-native';
import React, {useState} from 'react';
import {ExpandableSection, Text, View, ViewProps} from 'react-native-ui-lib';
import {Colors, FontFamily} from '@configs';
import {ArrowDown2, ArrowUp2} from 'iconsax-react-native';

interface ExpandableBaseProps extends ViewProps {
  children?: React.ReactNode;
}
const ExpandableBase = ({children, ...rest}: ExpandableBaseProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <View {...rest}>
      <ExpandableSection
        expanded={expanded}
        sectionHeader={
          <View row centerH marginB-20>
            <Text marginR-10 style={{fontSize: 12, color: Colors.primaryColor}}>
              {expanded ? 'Thu gọn' : 'Xem thêm'}
            </Text>
            {expanded ? (
              <ArrowUp2 size={17} color={Colors.primaryColor} />
            ) : (
              <ArrowDown2 size={17} color={Colors.primaryColor} />
            )}
          </View>
        }
        onPress={() => setExpanded(!expanded)}
      >
        {children}
      </ExpandableSection>
    </View>
  );
};

export default ExpandableBase;

const styles = StyleSheet.create({});
