import axios from 'axios';
import {Client} from "../types";

// In a real application, this would point to your actual API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);


// For demo purposes, we'll use mock data
// In a real application, remove the mock data and use the API

// Mock clients data
const mockClients: Client[] = [
  {
    id: '1',
    name: 'laptop-user1',
    realIp: '203.0.113.10',
    virtualIp: '10.8.0.2',
    status: 'connected',
    bytesReceived: 1024000,
    bytesSent: 512000,
    connectedSince: '2025-06-15T10:30:00Z',
    lastConnection: '2025-06-15T10:30:00Z',
    createdAt: '2025-05-20T14:20:00Z',
  },
  {
    id: '2',
    name: 'phone-user1',
    realIp: '198.51.100.25',
    virtualIp: '10.8.0.3',
    status: 'disconnected',
    bytesReceived: 256000,
    bytesSent: 128000,
    connectedSince: null,
    lastConnection: '2025-06-14T17:45:00Z',
    createdAt: '2025-05-22T09:15:00Z',
  },
  {
    id: '3',
    name: 'office-desktop',
    realIp: '192.0.2.38',
    virtualIp: '10.8.0.4',
    status: 'connected',
    bytesReceived: 5120000,
    bytesSent: 2048000,
    connectedSince: '2025-06-15T08:10:00Z',
    lastConnection: '2025-06-15T08:10:00Z',
    createdAt: '2025-04-10T11:30:00Z',
  },
  {
    id: '4',
    name: 'remote-server',
    realIp: '198.51.100.58',
    virtualIp: '10.8.0.5',
    status: 'connected',
    bytesReceived: 10240000,
    bytesSent: 5120000,
    connectedSince: '2025-06-10T00:05:00Z',
    lastConnection: '2025-06-10T00:05:00Z',
    createdAt: '2025-03-15T16:45:00Z',
  },
];

// Mock network stats
const mockNetworkStats = {
  bandwidth: {
    download: 1024 * 1024 * 10, // 10 MB/s
    upload: 1024 * 1024 * 2,    // 2 MB/s
  },
  connections: {
    total: 15,
    active: 8,
  },
  loadAverage: [0.45, 0.52, 0.63],
  uptime: 2592000, // 30 days in seconds
};

// Mock bandwidth history (last 24 hours with hourly data)
const generateBandwidthHistory = () => {
  const now = new Date();
  const data = [];

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(now.getHours() - i);

    data.push({
      time: time.toISOString(),
      download: Math.floor(Math.random() * 15 * 1024 * 1024) + 5 * 1024 * 1024, // 5-20 MB/s
      upload: Math.floor(Math.random() * 5 * 1024 * 1024) + 1 * 1024 * 1024,    // 1-6 MB/s
    });
  }

  return data;
};

// API functions
export const clientsApi = {
  getAll: async () => {
    try {
      // In a real app: const response = await api.get('/clients');
      // return response.data;
      return mockClients;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      // In a real app: const response = await api.get(`/clients/${id}`);
      // return response.data;
      const client = mockClients.find(c => c.id === id);
      if (!client) throw new Error('Client not found');
      return client;
    } catch (error) {
      throw error;
    }
  },

  create: async (clientData: { name: string }) => {
    try {
      // In a real app: const response = await api.post('/clients', clientData);
      // return response.data;
      const newClient: Client = {
        id: Math.random().toString(36).substring(7),
        name: clientData.name,
        realIp: '192.168.1.' + Math.floor(Math.random() * 254 + 1),
        virtualIp: '10.8.0.' + Math.floor(Math.random() * 254 + 1),
        status: 'disconnected' as const,
        bytesReceived: 0,
        bytesSent: 0,
        connectedSince: null,
        lastConnection: null,
        createdAt: new Date().toISOString(),
      };
      mockClients.push(newClient);
      return newClient;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      // In a real app: await api.delete(`/clients/${id}`);
      const index = mockClients.findIndex(c => c.id === id);
      if (index !== -1) {
        mockClients.splice(index, 1);
      }
      return true;
    } catch (error) {
      throw error;
    }
  },
};

export const networkApi = {
  getStats: async () => {
    try {
      // In a real app: const response = await api.get('/network/stats');
      // return response.data;
      return mockNetworkStats;
    } catch (error) {
      throw error;
    }
  },

  getBandwidthHistory: async () => {
    try {
      // In a real app: const response = await api.get('/network/bandwidth/history');
      // return response.data;
      return generateBandwidthHistory();
    } catch (error) {
      throw error;
    }
  },
};

export default api;