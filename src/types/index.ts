// Client types
export interface Client {
  id: string;
  name: string;
  realIp: string;
  virtualIp: string;
  status: 'connected' | 'disconnected';
  bytesReceived: number;
  bytesSent: number;
  connectedSince: string | null;
  lastConnection: string | null;
  createdAt: string;
}

export interface ClientFormData {
  name: string;
}

// Network statistics types
export interface NetworkStats {
  bandwidth: {
    download: number;
    upload: number;
  };
  connections: {
    total: number;
    active: number;
  };
  loadAverage: number[];
  uptime: number;
}

export interface BandwidthData {
  time: string;
  download: number;
  upload: number;
}

export interface TrafficData {
  name: string;
  data: number[];
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
}