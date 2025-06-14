
export interface ServerStatusData {
  url: string;
  status: 'online' | 'offline' | 'slow';
  statusCode: number;
  responseTime: number;
  lastChecked: string;
  serverInfo: {
    server: string;
    contentType: string;
    contentLength: number;
    lastModified: string;
  };
  uptime: {
    percentage: number;
    lastDowntime: string;
  };
  location: string;
  ssl: {
    valid: boolean;
    expires: string;
    issuer: string;
  };
}

export interface CheckHistoryEntry {
  time: string;
  status: string;
  responseTime: number;
}
