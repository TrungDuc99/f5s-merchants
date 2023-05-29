import {StyleSheet} from 'react-native';
import React from 'react';
import {Dialog, PanningProvider, Text, View} from 'react-native-ui-lib';
import {Colors, FontFamily, ScaleSize, Spacing} from '@configs';
import ButtonBase from '../button-base';
import {ShieldCross, ShieldTick} from 'iconsax-react-native';
import TouchableOpacityBase from '../touchable-opacity-base';
import Clipboard from '@react-native-clipboard/clipboard';
import {showSuccessMessage} from '@utils';

export type DialogConfirmProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  content?: string;
  onAccept: () => void;
  loading?: boolean;
  isShowText?: boolean;
};
const DialogConfirm = ({
  open,
  content = '',
  title = 'XÁC NHẬN',
  isShowText = false,
  loading = false,
  onClose,
  onAccept,
}: DialogConfirmProps) => {
  return (
    <Dialog visible={open} onDismiss={onClose} panDirection={PanningProvider.Directions.DOWN}>
      <View backgroundColor="#fff" style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacityBase
          marginL-8
          onLongPress={() => {
            Clipboard.setString(content ?? '');
            showSuccessMessage('Đã sao chép');
          }}
        >
          <Text style={styles.content}>{content}</Text>
        </TouchableOpacityBase>

        <View row marginT-20>
          {!isShowText && (
            <View flex marginR-8>
              <ButtonBase
                label="Hủy bỏ"
                onPress={onClose}
                bgColor={Colors.grayColor}
                outlineColor={Colors.grayColor}
                loading={loading}
                iconSource={() => <ShieldCross color="#fff" style={{marginRight: Spacing(1)}} />}
              />
            </View>
          )}
          <View flex marginL-8>
            <ButtonBase
              label="Đồng ý"
              onPress={onAccept}
              loading={loading}
              iconSource={() => <ShieldTick color="#fff" style={{marginRight: Spacing(1)}} />}
            />
          </View>
        </View>
      </View>
    </Dialog>
  );
};

export default DialogConfirm;

const styles = StyleSheet.create({
  container: {
    borderRadius: ScaleSize(16),
    alignItems: 'center',
    padding: Spacing(5),
  },
  title: {
    fontSize: ScaleSize(16),
    fontFamily: FontFamily.Bold,
    color: Colors.textColor,
    textAlign: 'center',
  },
  content: {
    fontSize: ScaleSize(14),
    fontFamily: FontFamily.Medium,
    color: Colors.textColor,
    marginTop: Spacing(5),
    textAlign: 'center',
  },
});
