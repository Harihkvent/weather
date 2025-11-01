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

interface FetchWeatherParams {
  city?: string;
  location?: { lat: number; lon: number };
}

export const fetchWeatherForCity = createAsyncThunk(
  'weather/fetchWeatherForCity',
  async (params: FetchWeatherParams) => {
    const data = await fetchWeatherData(params);
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
        const params = action.meta.arg;
        const key = params.city || `${params.location?.lat},${params.location?.lon}`;
        state.loadingCities[key] = true;
        state.cityErrors[key] = null;
      })
      .addCase(fetchWeatherForCity.fulfilled, (state, action) => {
        const { currentWeather, forecasts, hourlyForecasts } = action.payload;
        const city = currentWeather.city;
        const key = city;
        state.loadingCities[key] = false;
        state.cityErrors[key] = null;
        state.currentWeather[key] = currentWeather;
        state.forecasts[key] = forecasts;
        state.hourlyForecasts[key] = hourlyForecasts;
      })
      .addCase(fetchWeatherForCity.rejected, (state, action) => {
        const params = action.meta.arg;
        const key = params.city || `${params.location?.lat},${params.location?.lon}`;
        state.loadingCities[key] = false;
        state.cityErrors[key] = action.error.message || 'Failed to fetch weather data';
      });
  },
});

export const { removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;