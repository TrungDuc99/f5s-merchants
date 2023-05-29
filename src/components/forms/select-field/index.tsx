import {ButtonBase, Divider, SearchBar, TextBase, TouchableOpacityBase} from '@components/base';

import {Colors, FontFamily, ScaleSize, Spacing} from '@configs';
import {commonStyle} from '@styles';
import {ArrowDown2, CloseCircle, TickCircle} from 'iconsax-react-native';
import {values} from 'lodash';
import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {Controller, ControllerProps, UseFormReturn} from 'react-hook-form';
import {Keyboard, Platform, ScrollView, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Dialog, PanningProvider, Text, View} from 'react-native-ui-lib';

export interface SelectFieldProps {
  name: string;
  rules?: ControllerProps['rules'] | any;
  form: UseFormReturn<any>;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  options?: {label: string; value: string | number}[];
  secureTextEntry?: boolean;
  mode?: 'multi' | 'single';
  RightIcon?: {
    isLoading?: boolean;
    Icon?: any;
    onPress?: () => void;
  };
  iconLeft?: {
    isLoading?: boolean;
    iconName?: any;
    onPress?: () => void;
  };
  buttonRight?: {
    Icon?: any;
    lable?: string;
    bgColor?: any;
    color: any;
    isLoading?: boolean;
    onPress: () => void;
  };
  keyboardVisible?: boolean;
}
const SelectField = (props: SelectFieldProps) => {
  const {
    form,
    name,
    rules,
    options,
    disabled = false,
    mode = 'single',
    placeholder,
    label,
    RightIcon,
    buttonRight,
    iconLeft,
    ...rest
  } = props;
  const insets = useSafeAreaInsets();
  const {
    control,
    formState: {errors},
  } = form;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  // keyboard listener is show
  useMemo(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); // or some other action
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // or some other action
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const [isFocus, setIsFocus] = useState(false);
  const borderBottomColor = errors?.[name] ? Colors.errorColor : '#DCE1E9';
  const [optionList, setOptionList] = useState(options);
  const [dataSelected, setDataSelected] = useState<any>([]);
  const handleFocus = () => setIsFocus(true);
  const handleBlur = () => setIsFocus(false);

  const dialogHeader = (props: any) => {
    const {title} = props;
    return (
      <View row spread centerV style={{paddingHorizontal: Spacing(4), paddingTop: Spacing(4)}}>
        <Text style={styles.titlePicker}>{label}</Text>
        <TouchableOpacityBase centerV onPress={handleBlur}>
          <Text
            style={{
              fontFamily: FontFamily.Medium,
              fontSize: ScaleSize(14),
              color: 'green',
            }}
            children="Đóng"
          />
        </TouchableOpacityBase>
      </View>
    );
  };
  const handleSearch = (text: any) => {
    const newList = options?.filter((item: any) =>
      item.label.toLowerCase().includes(text.toLowerCase())
    );
    setOptionList(newList);
  };

  const handlePickerItem = (item: any) => {
    if (mode === 'single') {
      setDataSelected([item]);
      form.setValue(name, [item]);
      handleBlur();
    } else {
      const pos = dataSelected.findIndex((obj: any) => obj.value === item.value);
      setDataSelected((prev: any) => {
        const res =
          pos !== -1 ? prev.filter((obj: any) => obj.value !== item.value) : [...prev, item];
        form.setValue(name, res);
        return res;
      });
    }
  };
  const handlePressDeleteItem = (item: any, index: number) => {
    const newList = dataSelected.filter((obj: any, i: any) => i !== index);
    setDataSelected(newList);
    form.setValue(name, newList);
  };
  useEffect(() => {
    setOptionList(options);
  }, [options]);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field}) => {
        return (
          <>
            <TouchableOpacityBase
              {...rest}
              style={{
                height: ScaleSize(60),
                backgroundColor: isFocus ? '#fff' : '#f1f1f1',
                borderRadius: ScaleSize(16),
                ...(isFocus ? styles.shadowInput : {}),
              }}
              spread
              onPress={() => setIsFocus(true)}
            >
              <View row centerV flex marginH-10>
                {iconLeft ? (
                  <TouchableOpacityBase
                    onPress={iconLeft.onPress}
                    style={{marginRight: Spacing(2)}}
                  >
                    <iconLeft.iconName
                      size={ScaleSize(22)}
                      color={isFocus ? Colors.primaryColor : '#9E9E9E'}
                    />
                  </TouchableOpacityBase>
                ) : undefined}

                {field?.value?.length === 0 && dataSelected?.length === 0 && (
                  <Text style={styles.placeholder} children={placeholder} />
                )}
                {mode === 'single' ? (
                  <Text
                    style={[
                      styles.input,
                      {
                        color: isFocus ? Colors.primaryColor : '#7a7a7a',
                      },
                    ]}
                    children={field?.value ? field?.value?.[0]?.label : label}
                  />
                ) : (
                  <>
                    {/* {field?.value?.map((item: any, index: number) => {
                      return (
                        <Text
                          key={index}
                          style={[
                            styles.input,
                            {
                              marginRight: Spacing(1),
                              color: isFocus ? Colors.primaryColor : '#7a7a7a',
                            },
                          ]}
                          children={`${item?.label} ${index < field?.value?.length - 1 ? ',' : ''}`}
                        />
                      );
                    })} */}
                  </>
                )}
                <TouchableOpacityBase style={{marginLeft: 'auto'}} onPress={() => setIsFocus(true)}>
                  <ArrowDown2
                    size={ScaleSize(24)}
                    color={isFocus ? Colors.primaryColor : '#9E9E9E'}
                  />
                </TouchableOpacityBase>
              </View>
            </TouchableOpacityBase>
            {!!errors?.[name] && !field.value && (
              <TextBase marginT-4 color={Colors.errorColor} fontSize={12}>
                {errors?.[name]?.message}
              </TextBase>
            )}

            <Dialog
              visible={isFocus}
              onDismiss={handleBlur}
              width="100%"
              // height={false ? '70%' : '45%'}
              bottom
              containerStyle={{
                backgroundColor: '#fff',
                borderTopLeftRadius: ScaleSize(16),
                borderTopRightRadius: ScaleSize(16),
              }}
              renderPannableHeader={dialogHeader}
              panDirection={PanningProvider.Directions.DOWN}
              pannableHeaderProps={{title: placeholder}}
            >
              <View
                style={[
                  styles.dialog,
                  {
                    marginBottom: Platform.OS === 'ios' && isKeyboardVisible ? 200 : 5,
                  },
                ]}
              >
                {/* <View margin-15>
                  <SearchBar size="large" onSubmit={handleSearch} />
                </View> */}

                <ScrollView>
                  {optionList?.map((item: any, index: number) => (
                    <Fragment key={item.value}>
                      <TouchableOpacityBase
                        row
                        spread
                        center
                        style={styles.wrapItem}
                        onPress={() => handlePickerItem(item)}
                      >
                        <Text
                          style={{
                            fontFamily: FontFamily.Medium,
                            fontSize: ScaleSize(14),
                            color: Colors.textColor,
                          }}
                          children={item.label}
                        />
                        {/* {console.log(Number(field?.value))}
                        {console.log(item.value)} */}
                        {dataSelected.findIndex((obj: any) => obj.value === item.value) !== -1 ||
                          (Number(field?.value) === Number(item.value) && (
                            <TickCircle
                              style={{marginLeft: ScaleSize(10)}}
                              size={ScaleSize(20)}
                              color={Colors.primaryColor}
                            />
                          ))}
                      </TouchableOpacityBase>
                      <Divider marginL-15 marginR-15 />
                    </Fragment>
                  ))}
                </ScrollView>
              </View>
            </Dialog>
          </>
        );
      }}
    />
  );
};

export default SelectField;

const styles = StyleSheet.create({
  container: {
    minHeight: ScaleSize(44),
    borderBottomWidth: ScaleSize(1),
    marginVertical: Spacing(2),
  },
  txtLabel: {
    fontFamily: FontFamily.Regular,
    fontSize: ScaleSize(12),
    marginBottom: Spacing(2),
  },
  contentPicker: {
    // marginTop: Spacing(4.6),
    // marginBottom: Spacing(2),
  },
  dialog: {
    backgroundColor: Colors.whiteColor,
    height: 400,
  },
  //item
  wrapItemPicker: {
    borderRadius: ScaleSize(30),
    paddingHorizontal: Spacing(2),
    paddingVertical: Spacing(1),
    marginBottom: Spacing(1),
    height: ScaleSize(28),
  },
  txtItemLabel: {
    fontFamily: FontFamily.Regular,
    fontSize: ScaleSize(12),
    color: Colors.textColor,
    marginRight: Spacing(1),
  },

  wrapItem: {
    height: ScaleSize(44),
    paddingHorizontal: Spacing(4),
  },
  titlePicker: {
    fontFamily: FontFamily.Bold,
    fontSize: ScaleSize(14),
    color: Colors.primaryColor,
  },

  placeholder: {
    fontFamily: FontFamily.Regular,
    fontSize: ScaleSize(11),
    color: '#A7A7A7',
  },
  input: {
    fontFamily: FontFamily.Regular,
    fontSize: ScaleSize(16),
    marginLeft: Spacing(2),
  },
  shadowInput: {
    shadowColor: Colors.primaryColor,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});
