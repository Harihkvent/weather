export interface AirQualityData {
  aqi: number;
  co: number;
  no2: number;
  o3: number;
  pm2_5: number;
  pm10: number;
  so2: number;
}

export interface Location {
  lat: number;
  lon: number;
}

export interface WeatherData {
  id: string;
  city: string;
  location: Location;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  dewPoint: number;
  precipitation: number;
  uvIndex: number;
  icon: string;
  airQuality?: AirQualityData;
  sunrise?: number;
  sunset?: number;
}

export interface Forecast {
  date: string;
  temperature: number;
  condition: string;
  icon: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface UserPreferences {
  temperatureUnit: TemperatureUnit;
  favoriteCities: string[];
  theme: 'light' | 'dark';
}