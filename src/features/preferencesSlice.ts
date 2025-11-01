import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPreferences, TemperatureUnit } from '../types/weather';

// Load saved favorites from localStorage
const savedFavorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');

const initialState: UserPreferences = {
  temperatureUnit: 'celsius',
  favoriteCities: savedFavorites,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.temperatureUnit = action.payload;
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

export const { setTemperatureUnit, addFavoriteCity, removeFavoriteCity } =
  preferencesSlice.actions;
export default preferencesSlice.reducer;