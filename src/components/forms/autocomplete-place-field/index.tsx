import {Colors, FontFamily, ScaleSize, Spacing} from '@configs';
import {commonStyle} from '@styles';
import {Icon} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Controller, ControllerProps, UseFormReturn} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import {Text, View} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
export interface InputFieldProps {
  name: string;
  rules?: ControllerProps['rules'] | any;
  form: UseFormReturn<any>;
  placeholder?: string;
  label: any;
  disable?: boolean;
  onPress?: (event: any) => void;
  isNumber?: boolean;
  isFormatNumber?: boolean;
  LeftIcon?: Icon;
  RightIcon?: {
    isLoading?: boolean;
    Icon?: any;
    onPress?: () => void;
  };
  buttonRight?: {
    lable: string;
    bgColor: any;
    color: any;
    isLoading?: boolean;
    onPress: () => void;
  };
  secureTextEntry?: boolean;
}
const AutocompletePlaceField = (props: InputFieldProps) => {
  const {
    name,
    rules,
    form,
    label,
    isNumber = false,
    isFormatNumber = false,
    secureTextEntry = false,
    placeholder = 'Vui lòng điền thông tin',
    LeftIcon,
    RightIcon,
    disable = false,
    buttonRight,
    onPress,
    ...rest
  } = props;
  const {
    control,
    watch,
    setValue,
    formState: {errors},
  } = form;
  const [isFocus, setIsFocus] = useState(false);
  const borderBottomColor = errors?.[name] ? Colors.errorColor : '#DCE1E9';
  const handleFocus = () => setIsFocus(true);
  const handleBlur = () => setIsFocus(false);

  const styles = StyleSheet.create({
    container: {
      minHeight: ScaleSize(55),
      borderBottomWidth: ScaleSize(1),
      marginVertical: Spacing(2),
    },
    fieldStyle: {},
    txtLabel: {
      fontFamily: FontFamily.Regular,
      fontSize: ScaleSize(12),
    },
  });

  return (
    <Controller
      marginB-10
      name={name}
      control={control}
      rules={rules}
      render={({field}) => (
        <>
          <View
            style={[
              styles.container,
              {
                borderBottomColor: borderBottomColor,
              },
            ]}
          >
            <View row marginB-10>
              <Text
                style={styles.txtLabel}
                color={errors?.[name] ? Colors.errorColor : '#434343'}
                children={label}
              />
              {rules?.required && <Text color={Colors.errorColor}> *</Text>}
            </View>

            <GooglePlacesAutocomplete
              keepResultsAfterBlur
              styles={{
                textInput: {
                  color: '#5d5d5d',
                  fontSize: 16,
                },
              }}
              textInputProps={{
                value: field.value,
                onChangeText: text => {
                  field.onChange(text);
                },
              }}
              onFail={error => console.error(error)}
              fetchDetails={true}
              placeholder={placeholder}
              onPress={(data: GooglePlaceData, details: GooglePlaceDetail | null) => {
                field.onChange(data.description);
                onPress &&
                  onPress({
                    details: details?.geometry,
                    data: data.description,
                  });
              }}
              GooglePlacesDetailsQuery={{
                fields: 'geometry',
              }}
              query={{
                key: 'AIzaSyBW67GgDv4letsfeEZaXT_Y1o4A2g0Gots', //Key google maps search address
                language: 'vi',
                region: 'VN',
              }}
              minLength={4}
              listViewDisplayed="auto"
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={200}
              renderRow={rowData => {
                const title = rowData.structured_formatting.main_text;
                const address = rowData.structured_formatting.secondary_text;
                return (
                  <View>
                    <Text style={{fontSize: 14}}>{title}</Text>
                    <Text style={{fontSize: 14}}>{address}</Text>
                  </View>
                );
              }}
            ></GooglePlacesAutocomplete>
          </View>
          {!!errors?.[name] && (
            <Text
              style={[commonStyle.errorText, {marginTop: -Spacing(1), marginBottom: Spacing(2)}]}
              children={errors[name]?.message}
            />
          )}
        </>
      )}
    />
  );
};

export default AutocompletePlaceField;
