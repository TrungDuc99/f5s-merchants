import {TextBase, TouchableOpacityBase} from '@components/base';
import {Colors, FontFamily, ScaleSize, Spacing} from '@configs';
import {Calendar} from 'iconsax-react-native';
import moment from 'moment';
import React, {useState} from 'react';
import {Controller, ControllerProps, UseFormReturn} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Incubator, Text, View} from 'react-native-ui-lib';
export type DatePickerFieldProps = Incubator.TouchableOpacityProps & {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  rules?: ControllerProps['rules'] | any;
  onChangeDate?: (value: any) => void;
};
const DatePickerField = ({
  form,
  name,
  label,
  rules,
  onChangeDate,
  ...rest
}: DatePickerFieldProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState(new Date());

  const {
    formState: {errors},
  } = form;

  return (
    <Controller
      control={form.control}
      name={name}
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
                <TouchableOpacityBase onPress={() => setIsFocus(true)}>
                  <Calendar
                    size={ScaleSize(24)}
                    color={isFocus ? Colors.primaryColor : '#9E9E9E'}
                  />
                </TouchableOpacityBase>
                <Text
                  style={[
                    styles.input,
                    {
                      color: isFocus ? Colors.primaryColor : '#7a7a7a',
                    },
                  ]}
                  children={field.value ? moment(field.value).format('DD/MM/YYYY') : label}
                />
              </View>
            </TouchableOpacityBase>
            {!!errors[name] && (
              <TextBase marginT-4 color={Colors.errorColor} fontSize={12}>
                {errors[name].message}
              </TextBase>
            )}
            <DatePicker
              modal
              mode="date"
              title="Chọn ngày"
              cancelText="Hủy"
              confirmText="Chọn"
              androidVariant="iosClone"
              textColor={Colors.textColor}
              open={isFocus}
              date={date}
              onConfirm={(date: any) => {
                setDate(date);
                field.onChange(date);
                onChangeDate && onChangeDate(date);
                setIsFocus(false);
              }}
              onCancel={() => {
                setIsFocus(false);
              }}
            />
          </>
        );
      }}
    />
  );
};
export default DatePickerField;

const styles = StyleSheet.create({
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
  txtLabel: {
    fontFamily: FontFamily.Regular,
    fontSize: ScaleSize(14),
    marginTop: Spacing(2),
  },
});
