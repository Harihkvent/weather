import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPreferences, TemperatureUnit } from '../types/weather';

// Load saved preferences from localStorage
const loadSavedPreferences = (): UserPreferences => {
  try {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    const savedTemperatureUnit = localStorage.getItem('temperatureUnit') as TemperatureUnit || 'celsius';
    
    return {
      temperatureUnit: savedTemperatureUnit,
      favoriteCities: savedFavorites,
      theme: savedTheme
    };
  } catch (e) {
    console.warn('Failed to load saved preferences', e);
    return {
      temperatureUnit: 'celsius',
      favoriteCities: [],
      theme: 'light'
    };
  }
};

const initialState: UserPreferences = loadSavedPreferences();

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.temperatureUnit = action.payload;
      localStorage.setItem('temperatureUnit', action.payload);
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    addFavoriteCity: (state, action: PayloadAction<string>) => {
      if (!state.favoriteCities.includes(action.payload)) {
        state.favoriteCities.push(action.payload);
        localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities));
      }
    },
    removeFavoriteCity: (state, action: PayloadAction<string>) => {
      state.favoriteCities = state.favoriteCities.filter(
        (city) => city !== action.payload
      );
      localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities));
    },
  },
});

export const { setTemperatureUnit, setTheme, addFavoriteCity, removeFavoriteCity } =
  preferencesSlice.actions;
export default preferencesSlice.reducer;