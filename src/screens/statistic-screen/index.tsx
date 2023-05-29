import {useChiTietDonHang} from '@api';
import {useGetChart} from '@api/chart-api';
import {ButtonBase, Screen, Toolbar} from '@components/base';
import ArlertPopup from '@components/base/popup-arlert';
import DatePickerField from '@components/forms/date-picker-field';
import {FontFamily, ScaleSize, Spacing} from '@configs';
import {Chart} from '@models/chart';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, View} from 'react-native-ui-lib';
import {VictoryPie} from 'victory-native';

const StatisticScreen = () => {
  const navigation = useNavigation<any>();
  const [dataChart, setDataChart] = useState<any>();

  const form = useForm();
  const {watch, setValue} = form;
  const {data, isLoading} = useGetChart(
    moment(watch('fromDate') || `${moment().year()}-01-01`).format('YYYY-MM-DD'),
    watch('toDate') ? moment(watch('toDate')).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
  );

  const getDataChart = () => {
    let joinData: any[] = [];
    let chuaSuDung = 0;
    let daSuDung = 0;
    let hetHan = 0;
    let daHuy = 0;
    let total = 0;
    if (data && !isLoading) {
      data.data.map((item: Chart) => {
        total = total + item.chuaSuDung + item.daSuDung + item.hetHan + item.huy;
        if (item.chuaSuDung) {
          chuaSuDung = chuaSuDung + item.chuaSuDung;
        }
        if (item.daSuDung) {
          daSuDung = daSuDung + item.daSuDung;
        }
        if (item.hetHan) {
          hetHan = hetHan + item.hetHan;
        }
        if (item.huy) {
          daHuy = daHuy + item.huy;
        }
      });

      if (chuaSuDung === 0 && daHuy === 0 && hetHan === 0 && daSuDung === 0) {
      } else {
        const a = [
          {
            x: 1,
            y: Number(((chuaSuDung / total) * 100).toFixed(0)),
            name: 'chuaSuDung',
            z: chuaSuDung,
          },
          {x: 2, y: Number(((daSuDung / total) * 100).toFixed(0)), name: 'daSuDung', z: daSuDung},
          {x: 3, y: Number(((daHuy / total) * 100).toFixed(0)), name: 'daHuy', z: daHuy},
          {x: 4, y: Number(((hetHan / total) * 100).toFixed(0)), name: 'hetHan', z: hetHan},
        ];
        const b = a.filter(item => item.y !== 0);
        joinData = b;
      }
      setDataChart(joinData);
    }
  };
  useEffect(() => {
    setValue('fromDate', moment('2022-01-01').format('YYYY-MM-DD'));
    setValue('toDate', moment().format('YYYY-MM-DD'));
  }, []);
  useEffect(() => {
    getDataChart();
  }, [data]);

  return (
    <Screen>
      <Toolbar title="Thống kê" />
      <ScrollView>
        <View paddingH-20 row style={{justifyContent: 'space-between'}}>
          <View style={styles.statistic}>
            <Text style={styles.txtLabelDatePicker}>Từ ngày</Text>
            <DatePickerField
              onChangeDate={date => {}}
              name="fromDate"
              label="Từ ngày"
              form={form}
            />
          </View>
          <View style={styles.statistic}>
            <Text style={styles.txtLabelDatePicker}>Đến ngày</Text>
            <DatePickerField name="toDate" label="Đến ngày" form={form} />
          </View>
        </View>

        <VictoryPie
          data={dataChart}
          innerRadius={60}
          labels={({datum}) => `${datum.y}%`}
          labelRadius={({innerRadius}: any) => innerRadius + ScaleSize(35)}
          style={{labels: {fill: 'white', fontSize: 13, fontWeight: 'bold'}}}
          colorScale={['#0FB996', '#3062C8', '#FEA529', '#FF6077']}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPressIn: (event, data) => {
                  // return [
                  //   {
                  //     target: 'data',
                  //     mutation: ({style}) => {
                  //       return style.fill === '#c43a31' ? null : {style: {fill: '#c43a31'}};
                  //     },
                  //   },
                  //   {
                  //     target: 'labels',
                  //     mutation: ({style}) => {
                  //       return {text: `${data.datum.y}%`};
                  //     },
                  //   },
                  // ];
                },
                onPressOut: () => {},
              },
            },
          ]}
        />
        <View row padding-15 spread>
          <View
            style={[
              styles.coverText,
              {
                backgroundColor: '#0FB996',
              },
            ]}
          >
            <Text style={styles.text}>Chưa sử dụng</Text>
          </View>

          <View
            style={[
              styles.coverText,
              {
                backgroundColor: '#3062C8',
              },
            ]}
          >
            <Text style={styles.text}>Đã sử dụng</Text>
          </View>

          <View
            style={[
              styles.coverText,
              {
                backgroundColor: '#FEA529',
              },
            ]}
          >
            <Text marginL-5 style={styles.text}>
              Hết hạn
            </Text>
          </View>

          <View
            style={[
              styles.coverText,
              {
                backgroundColor: '#FF6077',
              },
            ]}
          >
            <Text marginL-5 style={styles.text}>
              Đã hủy
            </Text>
          </View>
        </View>
        <View margin-20 padding-16 style={{borderWidth: 1, borderColor: '#5555', borderRadius: 8}}>
          <View row marginV-5>
            <View
              style={[
                styles.coverText2,
                {
                  backgroundColor: '#0FB996',
                },
              ]}
            ></View>
            <Text marginL-5 style={styles.text2}>
              Chưa sử dụng: {dataChart?.[0]?.z || 0}
            </Text>
          </View>
          <View row marginV-5>
            <View
              style={[
                styles.coverText2,
                {
                  backgroundColor: '#3062C8',
                },
              ]}
            ></View>
            <Text marginL-5 style={styles.text2}>
              Đã sử dụng: {dataChart?.[1]?.z || 0}
            </Text>
          </View>
          <View row marginV-5>
            <View
              style={[
                styles.coverText2,
                {
                  backgroundColor: '#FEA529',
                },
              ]}
            ></View>

            <Text marginL-5 style={styles.text2}>
              Hết hạn: {dataChart?.[2]?.z || 0}
            </Text>
          </View>
          <View row centerV marginV-5>
            <View
              style={[
                styles.coverText2,
                {
                  backgroundColor: '#FF6077',
                },
              ]}
            ></View>
            <Text marginL-5 style={styles.text2}>
              Đã hủy: {dataChart?.[3]?.z || 0}
            </Text>
          </View>
        </View>
        {/* <View marginV-50 /> */}
      </ScrollView>
    </Screen>
  );
};

export default StatisticScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 12,
    textAlign: 'center',

    color: '#fff',
  },
  text2: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: Spacing(2),
    marginLeft: Spacing(3),
    color: '#000000',
  },
  txtLabelDatePicker: {
    marginBottom: 10,
    marginLeft: 5,
    fontFamily: FontFamily.Bold,
  },
  coverText: {
    paddingHorizontal: 12,
    minWidth: ScaleSize(80),
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverText2: {
    paddingHorizontal: 12,
    width: ScaleSize(30),
    height: ScaleSize(30),
    borderRadius: 100,
  },
  statistic: {
    width: '47%',
  },
});
