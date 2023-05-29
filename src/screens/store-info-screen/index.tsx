import {ButtonBase, Divider, Screen, TextBase, Toolbar} from '@components/base';
import {InputField} from '@components/forms';
import {Colors, ScaleSize, Spacing} from '@configs';
import {AuthStackParamList} from '@navigation/AuthStackNavigation';
import {MainBottomTabParamList} from '@navigation/main-bottom-tab';
import {MainStackParamList} from '@navigation/MainStackNavigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Switch, View} from 'react-native-ui-lib';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {GeocodingAPI} from '@constants';
import AutocompletePlaceField from '@components/forms/autocomplete-place-field';
import ButtonIconOnly from '@components/base/button-icon-only';
import {SearchZoomIn1, SearchZoomOut} from 'iconsax-react-native';
interface StoreInfoProps {}
let longitude = '';
let latitude = '';
let address = '';

const StoreInfoScreen = (props: StoreInfoProps) => {
  const form = useForm();
  const [regionValue, setRegionValue] = React.useState({
    latitude: 10.774959284350336,
    longitude: 106.68819912491863,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [zoomMap, setZoomMap] = useState<boolean>(false);
  const [pickOnMap, setPickOnMap] = useState<boolean>(false);
  const {height} = Dimensions.get('window');
  const [isEdit, setIsEdit] = React.useState(true);
  const navigition = useNavigation<StackNavigationProp<MainStackParamList>>();
  const {handleSubmit, watch, setValue} = form;

  const styles = StyleSheet.create({
    container: {padding: 20},
    map: {
      ...StyleSheet.absoluteFillObject,
      borderTopLeftRadius: 10,
    },
    scrollViewContenCard: {
      marginBottom: Spacing(18),
    },
    containerMap: {
      height: zoomMap ? height - 230 : 300,
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },

    boxInfo: {
      position: 'absolute',
      bottom: 10,
      left: 5,
      width: '97%',
      backgroundColor: 'gray',
      opacity: 0.5,
      borderRadius: 10,
      padding: 5,
    },
    textColor: {
      color: 'white',
    },
  });
  React.useEffect(() => {
    setValue('storeName', 'Garage Hòa Bình Quận 3');
    setValue('rolePlay', 'Nguyễn Trọng Hùng');
    setValue('phone', '09770123456');
    setValue('brand', 'Hòa Bình');
    setValue('address', '82 Khúc Thừa Dụ, Phường Dịch Vọng, Quận Cầu Giấy, Thành phố Hà Nội');
    setValue('Service', 'Rửa xe, Độ xe, Đánh bóng');
    setValue('longitude', '106.68819912491863');
    setValue('latitude', '10.774959284350336');
    setValue(
      'description',
      'Cung cấp dịch vụ: sửa chữa ô tô, làm máy ô tô, phục hồi xe tai nạn, làm gầm bệ, dịch vụ sơn xe ô tô, sửa điều hoà, sơn lazang ô tô…'
    );
  }, []);
  useEffect(() => {
    if (longitude && latitude && address) {
      setRegionValue(prev => ({
        ...prev,
        latitude: Number(latitude),
        longitude: Number(longitude),
      }));
      getCoordinatesToAddress(latitude, longitude);
    } else {
      _getInfoCurrentPosition();
    }
  }, [pickOnMap]);
  const onChangValue = (region: any, details: boolean) => {
    setRegionValue(prev => ({
      ...prev,
      latitude: details ? Number(region.latitude) : regionValue.latitude,
      longitude: details ? Number(region.longitude) : regionValue.longitude,
      latitudeDelta: details ? Number(region.latitudeDelta) : regionValue.latitudeDelta,
      longitudeDelta: details ? Number(region.longitudeDelta) : regionValue.longitudeDelta,
    }));
    setValue('latitude', String(region.latitude));
    setValue('longitude', String(region.longitude));
    Geocoder.init('AIzaSyALo0L9xLVbAE2Te2MG12ClKvaAlz04UMk');
    Geocoder.from(String(region.latitude), String(region.longitude))
      .then(json => {
        setValue('address', json.results[0].formatted_address);
      })
      .catch(error => {});
  };
  const getCoordinatesToAddress = (latitude: any, longitude: any) => {
    Geocoder.init('AIzaSyALo0L9xLVbAE2Te2MG12ClKvaAlz04UMk');
    Geocoder.from(Number(latitude), Number(longitude))
      .then(json => {
        setValue('address', json.results[0].formatted_address);
      })
      .catch(error => {});
  };

  const _getInfoCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      info => {
        setRegionValue({
          ...regionValue,
          latitude: Number(info?.coords?.latitude),
          longitude: Number(info?.coords?.longitude),
        });
        setValue('latitude', String(info?.coords?.latitude));
        setValue('longitude', String(info?.coords?.longitude));
        onChangValue(
          {
            ...regionValue,
            latitude: Number(info?.coords?.latitude),
            longitude: Number(info?.coords?.longitude),
          },
          true
        );
        Geocoder.init(GeocodingAPI);
        Geocoder.from(info?.coords?.latitude, info?.coords?.longitude)
          .then(json => {
            setValue('address', `${json.results[0].formatted_address}`);
          })
          .catch(error => {});
      },
      (error: any) => {}
    );
  };
  let coordinate = {latitudeDelta: 0.005, longitudeDelta: 0.005};
  return (
    <Screen>
      <Toolbar title={`${!isEdit ? 'Chỉnh sửa thông' : 'Thông'} tin cửa hàng`} />
      <Divider />
      <ScrollView>
        <View padding-20>
          <View marginV-5 />
          <InputField label="Tên cửa hàng" name="storeName" disable={isEdit} form={form} />
          <View marginV-5 />
          <InputField label="Người đại diện" name="rolePlay" form={form} disable={isEdit} />
          <View marginV-5 />
          <InputField label="Điện thoại" name="phone" form={form} disable={isEdit} />
          <View marginV-5 />
          <InputField label="Thương hiệu" name="brand" form={form} disable={isEdit} />
          <View marginV-5 />
          <InputField label="Địa chỉ" name="address" form={form} disable={isEdit} />
          <View marginV-5 />
          <InputField label="Dịch vụ" name="Service" form={form} disable={isEdit} />
          {/* <SelectField
            mode="multi"
            options={[
              {value: '1', label: 'Rửa xe'},
              {value: '1', label: 'Độ xe'},
            ]}
            label="Dịch vụ"
            name="Service"
            form={form}
          /> */}
          <View marginV-5 />
          <View row centerV marginV-10>
            <Switch value={false} onValueChange={() => console.log('value changed')} />
            <TextBase marginL-10 fontFamily="SemiBold" color="#535353">
              Cho phép lấy vị trí cửa hàng
            </TextBase>
          </View>
          <View marginV-5 />
          <InputField label="Kinh độ" name="longitude" form={form} disable={isEdit} />
          <View marginV-5 />
          <InputField label="Vĩ độ" name="latitude" form={form} disable={isEdit} />
          <View marginV-5 />
          <View flex style={styles.containerMap}>
            <View
              marginB-5
              marginH-15
              style={{
                top: 10,
                left: 5,
                zIndex: 99,
                position: 'absolute',
              }}
            >
              <ButtonIconOnly
                borderRadius={100}
                icon={!zoomMap ? SearchZoomIn1 : SearchZoomOut}
                size="large"
                onPress={() => {
                  setZoomMap(!zoomMap);
                }}
              />
            </View>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              showsUserLocation={true}
              followsUserLocation={true}
              showsCompass
              onRegionChangeComplete={(region, details) => {
                if (details?.isGesture && pickOnMap) {
                  onChangValue(region, true);
                } else if (details?.isGesture && !pickOnMap) {
                  coordinate = {
                    latitudeDelta: region.latitudeDelta,
                    longitudeDelta: region.longitudeDelta,
                  };
                }
              }}
              onPress={e => {
                onChangValue({...coordinate, ...e.nativeEvent.coordinate}, true);
              }}
              region={regionValue}
            >
              <Callout>
                <Marker key={1} coordinate={regionValue} />
              </Callout>
            </MapView>
            <View style={styles.boxInfo}>
              <TextBase color="white" fontFamily="SemiBold">
                Lat:{watch('latitude')}
              </TextBase>
              <TextBase color="white" fontFamily="SemiBold">
                Long: {watch('longitude')}
              </TextBase>
              <TextBase color="white" fontFamily="SemiBold">
                Địa chỉ: {watch('address')}
              </TextBase>
            </View>
          </View>
          <AutocompletePlaceField
            rules={{
              required: {
                value: true,
                message: 'Vui lòng điền đầy đủ thông tin',
              },
            }}
            onPress={(value: any) => {
              getCoordinatesToAddress(
                String(value.details.location.lat),
                String(value.details.location.lng)
              );
              setValue('latitude', String(value.details.location.lat));
              setValue('longitude', String(value.details.location.lng));
              setRegionValue({
                ...regionValue,
                latitude: Number(value.details.location.lat),
                longitude: Number(value.details.location.lng),
              });
            }}
            name="address"
            form={form}
            label="Tìm kiếm theo địa chỉ"
          />
          {/* <InputField label="Mô tả" name="description" form={form} /> */}
          <TextBase color="#B4B4B4" fontFamily="SemiBold" marginB-5>
            Mô tả
          </TextBase>
          <View padding-10 centerH centerV style={{borderRadius: 16}} backgroundColor="#F1F1F1">
            <TextBase fontFamily="Bold">
              Cung cấp dịch vụ: sửa chữa ô tô, làm máy ô tô, phục hồi xe tai nạn, làm gầm bệ, dịch
              vụ sơn xe ô tô, sửa điều hoà, sơn lazang ô tô…
            </TextBase>
          </View>
          <View marginV-5 />
          <TextBase color="#B4B4B4" fontFamily="SemiBold" marginB-5>
            Hình ảnh
          </TextBase>
          <Image
            style={{width: '100%', height: ScaleSize(200), borderRadius: 8}}
            source={require('@assets/images/store_modal.png')}
          />
          <View marginV-10 />
          <ButtonBase
            label={isEdit ? 'CHỈNH SỬA' : 'XÁC NHẬN'}
            onPress={() => {
              setIsEdit(false);
              // navigition.navigate('EditStoreInfo');
            }}
          />
          <View marginV-5 />
          {!isEdit && (
            <ButtonBase
              label={'Hủy'}
              bgColor={'#b7b7b7'}
              onPress={() => {
                setIsEdit(true);
                // navigition.navigate('EditStoreInfo');
              }}
            />
          )}
        </View>
        <View marginV-50 />
      </ScrollView>
    </Screen>
  );
};

export default StoreInfoScreen;
