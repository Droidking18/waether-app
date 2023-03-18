import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

import {useQuery} from 'react-query';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  getCurrentWeather,
  getForecastWeather,
} from '../services/weather-service';

// images
const sunny = require('../assets/img/sea_sunny.png');
const cloudy = require('../assets/img/sea_cloudy.png');
const rainy = require('../assets/img/sea_rainy.png');

// icons
const sunnyIcon = require('../assets/icon/clear.png');
const cloudyIcon = require('../assets/icon/partlysunny.png');
const rainyIcon = require('../assets/icon/rain.png');

const ForcastWeatherItem = ({item}: any) => {
  return (
    <View style={styles.forcaseWeatherItem}>
      <Text style={styles.forcastTextLeft}>{item.date}</Text>
      <Image
        source={
          item.weatherType === 'Clear'
            ? sunnyIcon
            : item.weatherType === 'Clouds'
            ? cloudyIcon
            : rainyIcon
        }
      />
      <Text style={styles.forcastTextRight}>{item.temp}</Text>
    </View>
  );
};

const currentWeatherDetail = (data: any) => {
  return (
    <View style={styles.detailedWeatherContainer}>
      <View style={styles.detailedWeather}>
        <Text style={styles.detailedWeatherTop}>{data?.mintemp}</Text>
        <Text style={styles.detailedWeatherBottom}>min</Text>
      </View>
      <View style={styles.detailedWeather}>
        <Text style={styles.detailedWeatherTop}>{data?.temp}</Text>
        <Text style={styles.detailedWeatherBottom}>Current</Text>
      </View>
      <View style={styles.detailedWeather}>
        <Text style={styles.detailedWeatherTop}>{data?.maxtemp}</Text>
        <Text style={styles.detailedWeatherBottom}>max</Text>
      </View>
    </View>
  );
};

function Home(): JSX.Element {
  // get device location
  const [location, setLocation] = React.useState<any>(null);

  React.useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      setLocation(position);
    });
  }, []);

  useQuery({
    queryKey: 'weather',
    queryFn: () => getCurrentWeather(location),
    onSettled: data => {
      setData(data);
    },
    enabled: location !== null,
  });
  useQuery({
    queryKey: 'weatherForecast',
    queryFn: () => getForecastWeather(location),
    onSettled: data => {
      setForeCast(data);
    },
    enabled: location !== null,
  });

  const [foreCast, setForeCast] = React.useState<any>([]);
  const [data, setData] = React.useState<any>([]);
  const [weatherType, setWeatherType] = React.useState<string>('sunny');

  React.useEffect(() => {
    if (data?.icon === 'cloudy') {
      setWeatherType('cloudy');
    } else if (data?.icon === 'rain') {
      setWeatherType('rain');
    } else {
      setWeatherType('sunny');
    }
  }, [data]);

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
    height: '100%',
    width: '100%',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {data?.temp && foreCast?.forecast && (
        <>
          <ImageBackground
            source={
              weatherType === 'sunny'
                ? sunny
                : weatherType === 'cloudy'
                ? cloudy
                : rainy
            }
            style={styles.imageBackground}>
            {!data?.isError && (
              <Text style={styles.tempText}>{data?.temp}</Text>
            )}
            <Text style={styles.tempTypeText}>{data?.weatherType}</Text>
          </ImageBackground>
          <View
            style={[
              styles.bottomContainer,
              {
                backgroundColor: data?.color || 'green',
              },
            ]}>
            <FlatList
              ListHeaderComponent={() => currentWeatherDetail(data)}
              data={foreCast?.forecast}
              renderItem={ForcastWeatherItem}
              keyExtractor={item => item.date}
            />
          </View>
        </>
      )}

      {(!data?.temp || !foreCast?.forecast) && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  sectionContainer: {
    height: 25,
    marginVertical: 8,
    paddingHorizontal: 32,
    textAlign: 'center',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  scrollToButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    margin: 32,
    backgroundColor: 'black',
    color: 'white',
    padding: 8,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
  tempText: {
    fontSize: 50,
    color: 'white',
  },
  tempTypeText: {
    fontSize: 30,
    paddingTop: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  forcaseWeatherItem: {
    flex: 1,
    width: screenWidth,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  forcastTextLeft: {
    color: 'white',
    flex: 1,
    textAlign: 'left',
    paddingLeft: 20,
  },
  forcastTextRight: {
    color: 'white',
    flex: 1,
    textAlign: 'right',
    paddingRight: 20,
  },
  detailedWeather: {
    alignItems: 'center',
  },
  detailedWeatherTop: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  detailedWeatherBottom: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  detailedWeatherContainer: {
    flex: 1,
    paddingVertical: 15,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    width: screenWidth,
    justifyContent: 'space-between',
  },
});

export default Home;
