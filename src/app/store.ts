import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weatherSlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;