export interface WeatherData {
  id: string;
  city: string;
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
}