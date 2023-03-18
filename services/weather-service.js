import {colors} from '../ui/const';

const KelvinToCelsius = kelvin => {
  let celsius = (kelvin || 0) - 273.15;

  celsius = celsius.toFixed(1);

  return `${celsius}°`;
};

export const getCurrentWeather = coords => {
  const {latitude, longitude} = coords?.coords;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}1&appid=93b3e322155ab4ae40daa0e3baa2b455`;

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      const processedData = {
        temp: KelvinToCelsius(data?.main?.temp),
        maxtemp: KelvinToCelsius(data?.main?.temp_max),
        mintemp: KelvinToCelsius(data?.main?.temp_min),
        weatherType: data?.weather?.[0]?.main || 'Error',
        isError: !data?.main?.temp && typeof data?.main?.temp !== 'number',
        icon: '',
        color: '',
      };

      if (typeof processedData.weatherType === 'string') {
        processedData.weatherType = processedData.weatherType.toUpperCase();
      }

      let icon = '';
      let color = '';

      switch (processedData.weatherType) {
        case 'Rain':
          icon = 'rain';
          color = colors.gray_rainy;
          break;
        case 'Clouds':
          icon = 'cloudy';
          color = colors.blue_cloudy;
          break;
        case 'Clear':
          icon = 'sunny';
          color = colors.green_sunny;
          break;
        default:
          icon = 'sunny';
          color = colors.green_sunny;
          break;
      }

      processedData.color = color;
      processedData.icon = icon;

      return processedData;
    });
};

export const getForecastWeather = coords => {
  const {latitude, longitude} = coords?.coords;

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=93b3e322155ab4ae40daa0e3baa2b455`;

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      const processedData = {
        forecast: [],
        isError: !data?.list?.length,
      };

      // We only want the forecast for 12:00
      data.list = data.list.filter(item => item.dt_txt.includes('12:00:00'));

      data.list.forEach(item => {
        const date = new Date(item.dt_txt);
        const dayOfWeek = days[date.getDay()];

        let icon = '';

        switch (item?.weather?.[0]?.main) {
          case 'Rain':
            icon = 'rain';
            break;
          case 'Clouds':
            icon = 'cloudy';
            break;
          case 'Clear':
            icon = 'sunny';
            break;
          default:
            icon = 'sunny';
            break;
        }

        processedData.forecast.push({
          temp: KelvinToCelsius(item?.main?.temp),
          weatherType: item?.weather?.[0]?.main || 'Error',
          icon: icon,
          date: dayOfWeek,
        });
      });

      return processedData;
    })
    .catch(error => Promise.reject(error));
};
