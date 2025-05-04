import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {clientsApi} from '../../utils/api';
import {ApiError, Client, ClientFormData} from '../../types';
import {RootState} from '../store';

interface ClientsState {
  clients: Client[];
  selectedClient: Client | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClientsState = {
  clients: [],
  selectedClient: null,
  status: 'idle',
  error: null,
};

export const fetchClients = createAsyncThunk<Client[], void, { rejectValue: string }>(
    'clients/fetchClients',
    async (_, {rejectWithValue}) => {
      try {
        return await clientsApi.getAll();
      } catch (error) {
        const apiError = error as ApiError;
        return rejectWithValue(apiError.message || 'Failed to fetch clients');
      }
    }
);

export const fetchClientById = createAsyncThunk<Client, string, { rejectValue: string }>(
    'clients/fetchClientById',
    async (id, {rejectWithValue}) => {
      try {
        return await clientsApi.getById(id);
      } catch (error) {
        const apiError = error as ApiError;
        return rejectWithValue(apiError.message || 'Failed to fetch client');
      }
    }
);

export const createClient = createAsyncThunk<Client, ClientFormData, { rejectValue: string }>(
    'clients/createClient',
    async (clientData, {rejectWithValue}) => {
      try {
        return await clientsApi.create(clientData);
      } catch (error) {
        const apiError = error as ApiError;
        return rejectWithValue(apiError.message || 'Failed to create client');
      }
    }
);

export const deleteClient = createAsyncThunk<string, string, { rejectValue: string }>(
    'clients/deleteClient',
    async (id, {rejectWithValue}) => {
      try {
        await clientsApi.delete(id);
        return id;
      } catch (error) {
        const apiError = error as ApiError;
        return rejectWithValue(apiError.message || 'Failed to delete client');
      }
    }
);

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clearSelectedClient: (state) => {
      state.selectedClient = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
        // Fetch all clients
        .addCase(fetchClients.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchClients.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.clients = action.payload;
        })
        .addCase(fetchClients.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Unknown error';
        })

        // Fetch client by ID
        .addCase(fetchClientById.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchClientById.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.selectedClient = action.payload;
        })
        .addCase(fetchClientById.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Unknown error';
        })

        // Create client
        .addCase(createClient.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createClient.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.clients.push(action.payload);
        })
        .addCase(createClient.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Unknown error';
        })

        // Delete client
        .addCase(deleteClient.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(deleteClient.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.clients = state.clients.filter(client => client.id !== action.payload);
          if (state.selectedClient && state.selectedClient.id === action.payload) {
            state.selectedClient = null;
          }
        })
        .addCase(deleteClient.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Unknown error';
        });
  },
});
export const selectAllClients = (state: RootState) => state.clients.clients;
export const selectClientById = (state: RootState) => state.clients.selectedClient;
export const selectActiveClients = createSelector(
    [selectAllClients],
    (clients) => clients.filter(client => client.status === 'connected')
);
export const selectClientsStatus = (state: RootState) => state.clients.status;
export default clientsSlice.reducer;