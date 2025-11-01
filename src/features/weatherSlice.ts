import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WeatherData, Forecast, HourlyForecast } from '../types/weather';
import { fetchWeatherData } from '../services/weatherService';

interface WeatherState {
  currentWeather: Record<string, WeatherData>;
  forecasts: Record<string, Forecast[]>;
  hourlyForecasts: Record<string, HourlyForecast[]>;
  loadingCities: Record<string, boolean>;
  cityErrors: Record<string, string | null>;
}

const initialState: WeatherState = {
  currentWeather: {},
  forecasts: {},
  hourlyForecasts: {},
  loadingCities: {},
  cityErrors: {},
};

export const fetchWeatherForCity = createAsyncThunk(
  'weather/fetchWeatherForCity',
  async (city: string) => {
    const data = await fetchWeatherData(city);
    return data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    removeCity: (state, action: PayloadAction<string>) => {
      const city = action.payload;
      delete state.currentWeather[city];
      delete state.forecasts[city];
      delete state.hourlyForecasts[city];
      delete state.loadingCities[city];
      delete state.cityErrors[city];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForCity.pending, (state, action) => {
        const city = action.meta.arg;
        state.loadingCities[city] = true;
        state.cityErrors[city] = null;
      })
      .addCase(fetchWeatherForCity.fulfilled, (state, action) => {
        const { currentWeather, forecasts, hourlyForecasts } = action.payload;
        const city = currentWeather.city;
        state.loadingCities[city] = false;
        state.cityErrors[city] = null;
        state.currentWeather[city] = currentWeather;
        state.forecasts[city] = forecasts;
        state.hourlyForecasts[city] = hourlyForecasts;
      })
      .addCase(fetchWeatherForCity.rejected, (state, action) => {
        const city = action.meta.arg;
        state.loadingCities[city] = false;
        state.cityErrors[city] = action.error.message || 'Failed to fetch weather data';
      });
  },
});

export const { removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;