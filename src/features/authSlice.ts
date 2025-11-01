import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
  email: string;
  name: string;
  picture: string;
}

interface AuthState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
}

// Try to rehydrate user from localStorage so refresh keeps the user logged in
const loadPersistedUser = (): UserData | null => {
  try {
    const raw = localStorage.getItem('authUser');
    if (!raw) return null;
    return JSON.parse(raw) as UserData;
  } catch (e) {
    console.warn('Failed to parse persisted user', e);
    return null;
  }
};

const initialState: AuthState = {
  user: loadPersistedUser(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      try {
        if (action.payload) {
          localStorage.setItem('authUser', JSON.stringify(action.payload));
        } else {
          localStorage.removeItem('authUser');
        }
      } catch (e) {
        console.warn('Failed to persist user to localStorage', e);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
      try {
        localStorage.removeItem('authUser');
      } catch (e) {
        console.warn('Failed to remove persisted user', e);
      }
    },
  },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;