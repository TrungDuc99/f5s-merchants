import {useAuthenticateQR, useAuthenticateQRConfirm} from '@api';
import {ButtonBase, Screen, TextBase, Toolbar, TouchableOpacityBase} from '@components/base';
import DialogConfirm from '@components/base/dialog-confirm';
import {ScaleSize} from '@configs';
import {useAuth} from '@core';
import {MainStackParamList} from '@navigation/MainStackNavigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Add, Flash, FlashSlash} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useToast} from 'react-native-toast-notifications';
import {View} from 'react-native-ui-lib';

const ScanLoginScreen = () => {
  const [isTop, setIsTop] = useState(true);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [onFlash, setOnFlash] = useState(false);
  const {infoUser} = useAuth();
  const navigation = useNavigation<StackNavigationProp<MainStackParamList, 'ScanedDetail'>>();
  const scannerRef = useRef<any>(undefined);
  const {mutate, isLoading} = useAuthenticateQR();
  const [connectionId, setConnectionId] = useState('');
  const {mutate: mutateLoginQR, isLoading: isLoadingConfirmQR} = useAuthenticateQRConfirm();
  const onSuccess = async (e: any) => {
    mutate(
      {
        code: e.data,
      },
      {
        onSuccess: res => {
          setOpenConfirm(true);
          setConnectionId(res.data.connectionId);
          toast.show(`Xác thực mã thành công`, {
            type: 'success',
          });
        },
      }
    );
  };
  const topMotion = useRef(new Animated.Value(0)).current;

  const translateY = topMotion.interpolate({
    inputRange: [0, 1],
    outputRange: [0, ScaleSize(200)],
    extrapolate: 'clamp',
  });
  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      scannerRef.current.reactivate();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    Animated.timing(topMotion, {
      toValue: isTop ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setIsTop(!isTop);
    });
  }, [isTop, topMotion]);

  return (
    <Screen>
      <Toolbar title="Quét QR" />
      <QRCodeScanner
        ref={scannerRef}
        cameraStyle={styles.cameraContainer}
        // reactivate={hasScanned}
        customMarker={
          <View
            style={{
              width: ScaleSize(200),
              height: ScaleSize(200),
            }}
          >
            <Animated.View style={[styles.lineAnimateScand, {transform: [{translateY}]}]} />
            <View style={styles.topLeft} />
            <View style={styles.topRight} />
            <View style={styles.bottomLeft} />
            <View style={styles.bottomRight} />
          </View>
        }
        showMarker
        vibrate
        onRead={onSuccess}
        flashMode={onFlash ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
      />

      <View row center padding-8>
        <TouchableOpacityBase center style={styles.flash} onPress={() => setOnFlash(prev => !prev)}>
          {!onFlash ? (
            <Flash color="#999" variant="Bold" />
          ) : (
            <FlashSlash color="#999" variant="Bold" />
          )}
        </TouchableOpacityBase>
        <TextBase marginL-12 color="rgba(238,238,238,0.8)">
          {!onFlash ? 'Nhấn để bật Flash' : 'Nhấn để tắt Flash'}
        </TextBase>
      </View>
      <View marginB-10 centerH>
        <ButtonBase
          loading={isLoading || loading}
          marginT-20
          label="Rescan"
          onPress={() => {
            setLoading(true);
            try {
              scannerRef.current.reactivate();
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            } catch (error) {
              setLoading(false);
            }
          }}
        />
      </View>
      <View marginV-10 />
      <DialogConfirm
        open={openConfirm}
        loading={isLoading || isLoadingConfirmQR}
        content="Bạn có chắc chắn muốn đăng nhập trên thiết bị khác?"
        onClose={() => {
          if (connectionId) {
            mutateLoginQR(
              {
                connectionId: connectionId,
                status: false,
              },
              {
                onSuccess: res => {
                  toast.show(`Đã huỷ đăng nhập trên thiết bị khác`, {
                    type: 'warning',
                  });
                },
              }
            );
          } else {
            toast.show(`Không tìm thấy connection ID`, {
              type: 'danger',
            });
          }
          setOpenConfirm(false);
          navigation.goBack();
        }}
        onAccept={() => {
          if (connectionId) {
            setOpenConfirm(false);
            mutateLoginQR(
              {
                connectionId: connectionId,
                status: true,
              },
              {
                onSuccess: res => {
                  toast.show(`Thiết bị đã được đăng nhập thành công`, {
                    type: 'success',
                  });

                  navigation.goBack();
                },
              }
            );
          } else {
            toast.show(`Không tìm thấy connection ID`, {
              type: 'danger',
            });
            navigation.goBack();
          }
        }}
      />
    </Screen>
  );
};

export default ScanLoginScreen;

const styles = StyleSheet.create({
  lineAnimateScand: {
    height: ScaleSize(2),
    width: '100%',
    backgroundColor: '#fff',
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
  },
  topLeft: {
    width: ScaleSize(40),
    height: ScaleSize(40),
    borderTopWidth: ScaleSize(2),
    borderLeftWidth: ScaleSize(2),
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 0,
    width: ScaleSize(40),
    height: ScaleSize(40),
    borderBottomWidth: ScaleSize(2),
    borderLeftWidth: ScaleSize(2),
    borderBottomColor: '#fff',
    borderLeftColor: '#fff',
  },
  topRight: {
    position: 'absolute',
    right: 0,
    width: ScaleSize(40),
    height: ScaleSize(40),
    borderTopWidth: ScaleSize(2),
    borderRightWidth: ScaleSize(2),
    borderTopColor: '#fff',
    borderRightColor: '#fff',
  },
  bottomRight: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: ScaleSize(40),
    height: ScaleSize(40),
    borderBottomWidth: ScaleSize(2),
    borderRightWidth: ScaleSize(2),
    borderBottomColor: '#fff',
    borderRightColor: '#fff',
  },
  flash: {
    backgroundColor: 'rgba(238,238,238,0.8)',
    width: ScaleSize(50),
    height: ScaleSize(50),
    borderRadius: 50,
  },
});
