import {TextBase, TouchableOpacityBase} from '@components/base';
import {Colors, FontFamily, ScaleSize, Spacing} from '@configs';
import {formatNumber} from '@utils';
import {Icon} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Controller, UseControllerProps, UseFormReturn} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {Incubator, TouchableOpacityProps} from 'react-native-ui-lib';

export type InputFieldProps = Incubator.TextFieldProps & {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  isNumber?: boolean;
  isFormatNumber?: boolean;
  disable?: boolean;
  iconLeft?: {
    iconName: Icon;
    onPress?: () => void;
    component?: React.ReactNode;
  };
  iconRight?: {
    iconName: Icon;
    hasBackground?: boolean;
    onPress?: (props?: TouchableOpacityProps | any) => void;
    component?: React.ReactNode;
  };
  onPressField?: () => void;
  rules?: UseControllerProps['rules'];
};
const InputField = ({
  form,
  name,
  label,
  isNumber = false,
  disable = false,
  isFormatNumber = false,
  iconLeft,
  iconRight,
  onPressField,
  rules,
  ...rest
}: InputFieldProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const {
    formState: {errors},
  } = form;
  return (
    <Controller
      control={form.control}
      name={name}
      rules={rules}
      render={({field}) => {
        return (
          <>
            {label ? (
              <TextBase marginB-5 fontFamily="SemiBold" color="#B4B4B4">
                {label}
                {rules?.required && <TextBase color={Colors.errorColor}> *</TextBase>}
              </TextBase>
            ) : (
              <></>
            )}
            <Incubator.TextField
              {...rest}
              {...field}
              onPressIn={() => {
                onPressField && onPressField();
              }}
              editable={disable ? false : true}
              onBlur={() => {
                setIsFocus(false);
              }}
              onFocus={() => {
                setIsFocus(true);
              }}
              value={
                field?.value &&
                (isNumber && isFormatNumber
                  ? formatNumber(field.value)
                  : field?.value?.length < 35
                  ? `${field?.value}`
                  : `${field?.value?.substring(0, 35)}...`)
              }
              onChangeText={text => {
                isNumber && isFormatNumber
                  ? field.onChange(text.split(',').join(''))
                  : field.onChange(text);
              }}
              keyboardType={isNumber ? 'number-pad' : 'default'}
              style={[
                styles.input,
                {
                  color: isFocus ? Colors.primaryColor : '#7a7a7a',
                },
              ]}
              containerStyle={{
                backgroundColor: isFocus ? '#fff' : '#f1f1f1',
                borderRadius: ScaleSize(16),
                ...(isFocus ? styles.shadowInput : {}),
              }}
              fieldStyle={{
                height: ScaleSize(60),
                paddingHorizontal: Spacing(3),
                // paddingRight: ScaleSize(80),
              }}
              labelStyle={{
                fontFamily: FontFamily.Regular,
                fontSize: ScaleSize(14),
                marginTop: Spacing(2),
              }}
              placeholderTextColor="#a5a5a5"
              selectionColor={Colors.secondaryColor}
              disableFullscreenUI={true}
              leadingAccessory={
                iconLeft ? (
                  <TouchableOpacityBase
                    onPress={iconLeft.onPress}
                    style={{marginRight: Spacing(2)}}
                  >
                    {iconLeft.component ? (
                      iconLeft.component
                    ) : (
                      <iconLeft.iconName
                        size={ScaleSize(22)}
                        color={isFocus ? Colors.primaryColor : '#9E9E9E'}
                      />
                    )}
                  </TouchableOpacityBase>
                ) : undefined
              }
              trailingAccessory={
                iconRight ? (
                  <TouchableOpacityBase
                    onPress={iconRight.onPress}
                    style={
                      iconRight.hasBackground
                        ? {
                            backgroundColor: Colors.secondaryColor,
                            borderRadius: ScaleSize(8),
                            width: ScaleSize(40),
                            height: ScaleSize(40),
                            marginLeft: Spacing(2),
                          }
                        : {}
                    }
                    center
                  >
                    {iconRight.component ? (
                      iconRight.component
                    ) : (
                      <iconRight.iconName
                        size={ScaleSize(22)}
                        color={
                          iconRight.hasBackground
                            ? '#fff'
                            : isFocus
                            ? Colors.primaryColor
                            : '#9E9E9E'
                        }
                      />
                    )}
                  </TouchableOpacityBase>
                ) : undefined
              }
            />
            {!!errors[name] && (
              <TextBase marginV-8 color={Colors.errorColor} fontSize={12}>
                {errors[name].message}
              </TextBase>
            )}
          </>
        );
      }}
    />
  );
};
export default InputField;

const styles = StyleSheet.create({
  input: {
    fontFamily: FontFamily.Bold,
    fontSize: ScaleSize(16),
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
