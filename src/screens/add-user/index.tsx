import {ButtonBase, Divider, Screen, Toolbar} from '@components/base';
import {InputField} from '@components/forms';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {View} from 'react-native-ui-lib';

interface AddUserProps {}

const AddUserScreen = (props: AddUserProps) => {
  const form = useForm();
  const {handleSubmit, setValue} = form;
  React.useEffect(() => {
    setValue('userName', 'Trần Thanh Tuấn');
    setValue('phone', '091284712');
    setValue('email', 'dotrungduc.@gmail,com');
  }, []);
  const submit = () => {};
  return (
    <Screen>
      <Toolbar title="Thêm người dùng" />
      <Divider />
      <ScrollView style={styles.container}>
        <InputField
          form={form}
          label="Username"
          name="userName"
          rules={{
            required: {
              value: true,
              message: 'Vui lòng điền đầy đủ username',
            },
          }}
        />
        <View marginV-10 />
        <InputField
          form={form}
          label="Số điện thoại"
          name="phone"
          rules={{
            required: {
              value: true,
              message: 'Vui lòng điền đầy đủ số điện thoại',
            },
          }}
        />
        <View marginV-10 />
        <InputField
          form={form}
          label="Email"
          name="email"
          rules={{
            required: {
              value: true,
              message: 'Vui lòng điền đầy đủ email',
            },
          }}
        />
        <View marginV-10 />
        <ButtonBase label="XÁC NHẬN" onPress={handleSubmit(submit)} />
        <View marginV-50 />
      </ScrollView>
    </Screen>
  );
};

export default AddUserScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
