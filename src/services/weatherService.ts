import axios from 'axios';

import { config } from '../config/env';

const API_KEY = config.openWeatherApiKey;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
  },
});

interface WeatherParams {
  city?: string;
  location?: { lat: number; lon: number };
  zipCode?: string;  // Add this new parameter
}

export const fetchWeatherData = async ({ city, location, zipCode }: WeatherParams) => {
  try {
    // First get the weather data to get coordinates
    const current = await weatherApi.get('/weather', { 
      params: { 
        ...(city ? { q: city } : null),
        ...(location ? { lat: location.lat, lon: location.lon } : null),
        ...(zipCode ? { zip: zipCode } : null),  // Add ZIP code support
        units: 'metric' 
      } 
    });
    
    // Then get forecast and air quality data using the coordinates
    const [forecast, aqi] = await Promise.all([
      weatherApi.get('/forecast', { 
        params: { 
          ...(city ? { q: city } : null),
          ...(location ? { lat: location.lat, lon: location.lon } : null),
          ...(zipCode ? { zip: zipCode } : null),  // Add ZIP code support
          units: 'metric' 
        } 
      }),
      weatherApi.get('/air_pollution', { 
        params: { 
          lat: current.data.coord.lat, 
          lon: current.data.coord.lon 
        } 
      }),
    ]);

    return {
      currentWeather: {
        id: current.data.id,
        city: current.data.name,
        location: {
          lat: current.data.coord.lat,
          lon: current.data.coord.lon,
        },
        temperature: current.data.main.temp,
        condition: current.data.weather[0].main,
        description: current.data.weather[0].description,
        humidity: current.data.main.humidity,
        windSpeed: current.data.wind.speed,
        windDirection: current.data.wind.deg,
        pressure: current.data.main.pressure,
        dewPoint: current.data.main.feels_like,
        precipitation: current.data.rain ? current.data.rain['1h'] || 0 : 0,
        uvIndex: 0, // Need to use additional API endpoint for UV index
        icon: current.data.weather[0].icon,
        sunrise: current.data.sys.sunrise,
        sunset: current.data.sys.sunset,
        airQuality: {
          aqi: aqi.data.list[0].main.aqi,
          co: aqi.data.list[0].components.co,
          no2: aqi.data.list[0].components.no2,
          o3: aqi.data.list[0].components.o3,
          pm2_5: aqi.data.list[0].components.pm2_5,
          pm10: aqi.data.list[0].components.pm10,
          so2: aqi.data.list[0].components.so2,
        },
      },
      forecasts: forecast.data.list
        .filter((_: any, index: number) => index % 8 === 0)
        .map((item: any) => ({
          date: item.dt_txt.split(' ')[0],
          temperature: item.main.temp,
          condition: item.weather[0].main,
          icon: item.weather[0].icon,
        })),
      hourlyForecasts: forecast.data.list.slice(0, 24).map((item: any) => ({
        time: item.dt_txt.split(' ')[1],
        temperature: item.main.temp,
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
      })),
    };
  } catch (error: any) {
    if (error.response) {
      // OpenWeatherMap API error
      if (error.response.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling or try another city.`);
      }
      if (error.response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API configuration.');
      }
      throw new Error(`Weather service error: ${error.response.data.message || 'Unknown error'}`);
    }
    throw new Error('Failed to connect to weather service. Please check your internet connection.');
  }
};