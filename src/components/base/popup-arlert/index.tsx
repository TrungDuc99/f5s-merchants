import {Colors} from '@configs';
import {CloseCircle, ShieldCross, ShieldTick} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable} from 'react-native';
import {View} from 'react-native-ui-lib';
import TouchableOpacityBase from '../touchable-opacity-base';

export type ArlertPopupProps = {
  visible: boolean;
  title?: string;
  message?: string;
  type: 'success' | 'warning' | 'error';
  onPress?: () => void;
  onCancel?: () => void;
};
const ArlertPopup = ({visible, message, type, title, onCancel, onPress}: ArlertPopupProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      style={{justifyContent: 'flex-end', margin: 0}}
      visible={visible}
      onRequestClose={() => {
        onCancel && onCancel();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacityBase
            onPress={() => {
              onCancel && onCancel();
            }}
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
              alignContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <CloseCircle color="#5555" />
          </TouchableOpacityBase>

          {type === 'success' ? (
            <View
              centerH
              centerV
              marginB-10
              style={{
                width: 60,
                height: 60,
                borderRadius: 1000,
                backgroundColor: '#12B996',
              }}
            >
              <ShieldTick color="white" size={40} />
            </View>
          ) : type === 'error' ? (
            <View
              centerH
              centerV
              marginB-10
              style={{
                width: 60,
                height: 60,
                borderRadius: 1000,
                backgroundColor: '#12B996',
              }}
            >
              <ShieldCross color="red" size={40} />
            </View>
          ) : (
            <View
              centerH
              centerV
              marginB-10
              style={{
                width: 60,
                height: 60,
                borderRadius: 1000,
                backgroundColor: Colors.successColor,
              }}
            >
              <ShieldCross color="red" size={40} />
            </View>
          )}
          <Text
            style={[
              styles.modalText,
              {
                color:
                  type === 'success'
                    ? Colors.successColor
                    : type === 'warning'
                    ? Colors.warnColor
                    : Colors.errorColor,
              },
            ]}
          >
            {title}
          </Text>
          {/* <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              onPress && onPress();
            }}
          >
            <Text style={styles.textStyle}>Đồng ý</Text>
          </Pressable> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 200,

    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ArlertPopup;
