import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import preferencesReducer from './preferencesSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    preferences: preferencesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;