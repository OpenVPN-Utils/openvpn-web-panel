import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import axios from 'axios';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
  user: localStorage.getItem('user'),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async ({username, password}: { username: string; password: string }, {rejectWithValue}) => {
      try {
        // This would be a real API call in production
        // For demo purposes, we're using a mock response
        // const response = await axios.post('/api/auth/login', { username, password });

        // Simulate API call
        if (username === 'admin' && password === 'password') {
          const user = {username, role: 'admin'};
          const token = 'mock-jwt-token';

          // Save auth data to localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          return {user, token};
        }

        return rejectWithValue('Invalid credentials');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
        return rejectWithValue('Login failed');
      }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isAuthenticated = true;
          state.user = action.payload.user.username;
          state.loading = false;
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(logout.fulfilled, (state) => {
          state.isAuthenticated = false;
          state.user = null;
        });
  },
});

export const {clearError} = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;