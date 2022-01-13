import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/main.context';
import {
  Button,
  Card,
  CheckBox,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import axios from 'axios';

// @ts-ignore
const Header = ({ethAccount, ...props}) => (
  <View {...props}>
    <Text category="h6">You're using eth address:</Text>
    <Text category="s1">{ethAccount}</Text>
  </View>
);

export const SettingsPage = () => {
  const {
    ethAccount,

    sentPackets,
    setPackets,

    canShare,
    setCanShare,

    carBrand,
    setCarBrand,
    carType,
    setCarType,
    canShareGeo,
    setCanShareGeo,
    canShareWeather,
    setCanShareWeather,
  } = useContext(MainContext);

  const [selectedIndex, setSelecedIndex] = useState(0);

  const carTypes = ['Passenger', 'Lorry'];

  const handleSelect = selectedIndex => {
    setSelecedIndex(selectedIndex);
    setCarType(carTypes[selectedIndex.row]);
  };

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    console.log(canShare);
  }, [saved]);

  useEffect(() => {
    if (canShare) {
      const interval = setInterval(async () => {
        try {
          setPackets(sentPackets + 1);
          await axios.post('http://192.168.0.228:3000/eth-data', {
            ethAccount,
            carBrand,
            carType,
            position: {
              latitude: 52.237049,
              longitude: 21.017532,
            },
            timestamp: new Date().toISOString(),
            speed: 50,
          });
        } catch (err) {
          console.log(err);
        }
      }, 1 * 1000);
      return () => clearInterval(interval);
    }
  }, [sentPackets, saved]);

  return (
    <Layout style={styles.topContainer} level="1">
      <Card style={styles.card} header={<Header ethAccount={ethAccount} />}>
        <Text style={styles.elements}>Sent packets {sentPackets}</Text>
      </Card>
      <View style={styles.centerView}>
        <CheckBox
          style={styles.elements}
          checked={canShare}
          onChange={() => setCanShare(!canShare)}>
          Do you want to share your car data?
        </CheckBox>

        <Input
          style={styles.elements}
          value={carBrand}
          onChangeText={setCarBrand}
          label={evaProps => <Text {...evaProps}>Car Brand</Text>}
        />
        <Select
          style={styles.elements}
          //@ts-ignore
          selectedIndex={selectedIndex}
          value={carType}
          onSelect={handleSelect}
          label={evaProps => <Text {...evaProps}>Car Type</Text>}>
          {carTypes.map((localCarType, index) => (
            <SelectItem title={localCarType} key={index} />
          ))}
        </Select>
        <CheckBox
          checked={canShareGeo}
          onChange={() => setCanShareGeo(!canShareGeo)}
          style={styles.elements}>
          Share geolocation data?
        </CheckBox>
        <CheckBox
          checked={canShareWeather}
          onChange={() => setCanShareWeather(!canShareWeather)}
          disabled={true}
          style={styles.elements}>
          Share weather data?
        </CheckBox>
        <Button style={styles.elements} onPress={() => setSaved(!saved)}>
          Save
        </Button>
      </View>
      <View style={styles.bottomView}>
        <Text category="label" appearance="hint">
          App version: 0.0.1
        </Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    alignContent: 'space-between',
  },
  centerView: {
    alignContent: 'center',
    margin: 6,
    flexGrow: 2,
  },
  bottomView: {
    alignSelf: 'flex-end',
    margin: 6,
  },
  card: {
    margin: 6,
    alignContent: 'center',
  },
  elements: {
    margin: 10,
  },
});
