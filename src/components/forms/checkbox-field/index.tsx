import {Colors, FontFamily, ScaleSize} from '@configs';
import React from 'react';
import {Controller, ControllerProps, UseFormReturn} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {Checkbox, CheckboxProps, View} from 'react-native-ui-lib';

interface CheckBoxFiled extends CheckboxProps {
  name: string;
  label: string;
  rules?: ControllerProps['rules'] | any;
  form: UseFormReturn<any>;
  style?: any;
}
const CheckboxField = (props: CheckBoxFiled) => {
  const {name, label, rules, form, style, ...rest} = props;
  const {control} = form;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field}) => (
        <View height={ScaleSize(28)} centerV>
          <Checkbox
            {...field}
            {...rest}
            size={ScaleSize(24)}
            borderRadius={ScaleSize(6)}
            onValueChange={field.onChange}
            label={label}
            labelStyle={[style, styles.label]}
            color={Colors.secondaryColor}
            style={[style, styles.checkbox]}
          />
        </View>
      )}
    />
  );
};

export default CheckboxField;
const styles = StyleSheet.create({
  label: {
    fontFamily: FontFamily.Regular,
    fontSize: ScaleSize(14),
    color: Colors.textColor,
  },
  checkbox: {
    alignItems: 'center',
    // height: ScaleSize(44),
  },
});
