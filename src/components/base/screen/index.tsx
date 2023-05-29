import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {View, ViewProps} from 'react-native-ui-lib';
import {Keyboard} from 'react-native-ui-lib';
export type ScreenProps = ViewProps & {
  useKeyBoardTrackingView?: boolean;
};
const Screen = ({useKeyBoardTrackingView = false, ...rest}: ScreenProps) => {
  const KeyBoardView = useKeyBoardTrackingView
    ? Keyboard.KeyboardTrackingView
    : KeyboardAvoidingView;
  return (
    <KeyBoardView
      style={{flex: 1}}
      {...(Platform.OS === 'ios'
        ? {
            behavior: 'padding',
          }
        : {})}
    >
      <View {...rest} flex backgroundColor="#fff" />
    </KeyBoardView>
  );
};

export default Screen;
