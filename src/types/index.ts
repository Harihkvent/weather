export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  dewPoint: number;
  uvIndex: number;
  precipitation: number;
  condition: string;
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