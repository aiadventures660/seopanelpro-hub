
import { ServerStatusData } from '@/types/serverStatus';

export const mockServerStatusCheck = async (url: string): Promise<ServerStatusData> => {
  // Simulate API call with mock data
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const responseTime = Math.floor(Math.random() * 2000) + 100;
  const isOnline = Math.random() > 0.2; // 80% chance of being online
  
  return {
    url,
    status: isOnline ? (responseTime > 1000 ? 'slow' : 'online') : 'offline',
    statusCode: isOnline ? 200 : 503,
    responseTime,
    lastChecked: new Date().toISOString(),
    serverInfo: {
      server: 'nginx/1.18.0',
      contentType: 'text/html; charset=UTF-8',
      contentLength: 15420,
      lastModified: '2024-01-15T10:30:00Z'
    },
    uptime: {
      percentage: Math.floor(Math.random() * 10) + 90, // 90-99% uptime
      lastDowntime: '2024-01-10T14:22:00Z'
    },
    location: 'United States (US-East)',
    ssl: {
      valid: Math.random() > 0.1, // 90% chance of valid SSL
      expires: '2025-06-15T23:59:59Z',
      issuer: "Let's Encrypt Authority X3"
    }
  };
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'text-green-600';
    case 'slow': return 'text-yellow-600';
    case 'offline': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'online': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'slow': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'offline': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

export const getResponseTimeColor = (time: number) => {
  if (time < 500) return 'text-green-600';
  if (time < 1000) return 'text-yellow-600';
  return 'text-red-600';
};

export const normalizeUrl = (url: string): string => {
  let checkUrl = url.trim();
  if (!checkUrl.startsWith('http://') && !checkUrl.startsWith('https://')) {
    checkUrl = 'https://' + checkUrl;
  }
  return checkUrl;
};
