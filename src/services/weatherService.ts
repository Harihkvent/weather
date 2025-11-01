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

export const fetchWeatherData = async (city: string) => {
  try {
    const [current, forecast] = await Promise.all([
      weatherApi.get('/weather', { params: { q: city, units: 'metric' } }),
      weatherApi.get('/forecast', { params: { q: city, units: 'metric' } }),
    ]);

    return {
      currentWeather: {
        id: current.data.id,
        city: current.data.name,
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