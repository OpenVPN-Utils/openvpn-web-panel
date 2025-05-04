import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {networkApi} from '../../utils/api';
import {ApiError, BandwidthData, NetworkStats} from '../../types';
import {RootState} from '../store';

interface NetworkState {
  stats: NetworkStats | null;
  bandwidthHistory: BandwidthData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NetworkState = {
  stats: null,
  bandwidthHistory: [],
  status: 'idle',
  error: null,
};

export const fetchNetworkStats = createAsyncThunk<NetworkStats, void, { rejectValue: string }>(
    'network/fetchStats',
    async (_, {rejectWithValue}) => {
      try {
        return await networkApi.getStats();
      } catch (error) {
        const apiError = error as ApiError;
        return rejectWithValue(apiError.message || 'Failed to fetch network stats');
      }
    }
);

export const fetchBandwidthHistory = createAsyncThunk<BandwidthData[], void, { rejectValue: string }>(
    'network/fetchBandwidthHistory',
    async (_, {rejectWithValue}) => {
      try {
        return await networkApi.getBandwidthHistory();
      } catch (error) {
        const apiError = error as ApiError;
        return rejectWithValue(apiError.message || 'Failed to fetch bandwidth history');
      }
    }
);

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
        // Fetch network stats
        .addCase(fetchNetworkStats.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchNetworkStats.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.stats = action.payload;
        })
        .addCase(fetchNetworkStats.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Unknown error';
        })

        // Fetch bandwidth history
        .addCase(fetchBandwidthHistory.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchBandwidthHistory.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.bandwidthHistory = action.payload;
        })
        .addCase(fetchBandwidthHistory.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Unknown error';
        });
  },
});

export const {clearError} = networkSlice.actions;
export const selectNetworkStats = (state: RootState) => state.network.stats;
export const selectBandwidthHistory = (state: RootState) => state.network.bandwidthHistory;
export const selectNetworkStatus = (state: RootState) => state.network.status;
export const selectNetworkError = (state: RootState) => state.network.error;

export default networkSlice.reducer;