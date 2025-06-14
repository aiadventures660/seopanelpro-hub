
import React, { useState } from 'react';
import { Monitor, Globe, Search, CheckCircle, XCircle, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/sonner';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

interface ServerStatusData {
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

const ServerStatus = () => {
  const [url, setUrl] = useState('');
  const [statusData, setStatusData] = useState<ServerStatusData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkHistory, setCheckHistory] = useState<Array<{time: string, status: string, responseTime: number}>>([]);

  const checkServerStatus = async () => {
    if (!url.trim()) {
      toast.error('Please enter a website URL');
      return;
    }

    // Basic URL validation
    let checkUrl = url.trim();
    if (!checkUrl.startsWith('http://') && !checkUrl.startsWith('https://')) {
      checkUrl = 'https://' + checkUrl;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const responseTime = Math.floor(Math.random() * 2000) + 100;
      const isOnline = Math.random() > 0.2; // 80% chance of being online
      
      const mockData: ServerStatusData = {
        url: checkUrl,
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

      setStatusData(mockData);
      
      // Add to history
      const newEntry = {
        time: new Date().toLocaleTimeString(),
        status: mockData.status,
        responseTime: mockData.responseTime
      };
      setCheckHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10 entries

      if (mockData.status === 'online') {
        toast.success(`Server is online! Response time: ${responseTime}ms`);
      } else if (mockData.status === 'slow') {
        toast.warning(`Server is slow. Response time: ${responseTime}ms`);
      } else {
        toast.error('Server is offline or unreachable');
      }
    } catch (error) {
      toast.error('Failed to check server status');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600';
      case 'slow': return 'text-yellow-600';
      case 'offline': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'slow': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'offline': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getResponseTimeColor = (time: number) => {
    if (time < 500) return 'text-green-600';
    if (time < 1000) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Monitor}
        title="Server Status Checker"
        description="Check if a website or server is online, monitor response times, and get detailed server information"
        gradient="bg-gradient-to-r from-red-600 to-orange-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Check Server Status
              </CardTitle>
              <CardDescription>
                Enter a website URL to check if it's online
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Website URL</label>
                <Input
                  placeholder="example.com or https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkServerStatus()}
                />
              </div>
              
              <Button 
                onClick={checkServerStatus} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Checking...' : 'Check Status'}
              </Button>

              {checkHistory.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-3">Recent Checks</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {checkHistory.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between text-xs p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <span>{entry.time}</span>
                        <div className="flex items-center gap-2">
                          <Badge size="sm" className={getStatusBadge(entry.status)}>
                            {entry.status}
                          </Badge>
                          <span className={getResponseTimeColor(entry.responseTime)}>
                            {entry.responseTime}ms
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-xs text-gray-500 mt-4">
                <h4 className="font-medium mb-2">Status Information</h4>
                <ul className="space-y-1">
                  <li>• <span className="text-green-600">Online:</span> Server is responding</li>
                  <li>• <span className="text-yellow-600">Slow:</span> Response time > 1s</li>
                  <li>• <span className="text-red-600">Offline:</span> Server is unreachable</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {statusData && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Server Status Overview
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{statusData.url}</Badge>
                    <Badge className={getStatusBadge(statusData.status)}>
                      {statusData.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 ${
                        statusData.status === 'online' ? 'bg-green-100 dark:bg-green-900' : 
                        statusData.status === 'slow' ? 'bg-yellow-100 dark:bg-yellow-900' : 
                        'bg-red-100 dark:bg-red-900'
                      }`}>
                        {statusData.status === 'online' ? (
                          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-300" />
                        ) : statusData.status === 'slow' ? (
                          <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-300" />
                        ) : (
                          <XCircle className="h-8 w-8 text-red-600 dark:text-red-300" />
                        )}
                      </div>
                      <p className="text-2xl font-bold">{statusData.statusCode}</p>
                      <p className="text-sm text-gray-500">HTTP Status</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <Zap className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                      </div>
                      <p className={`text-2xl font-bold ${getResponseTimeColor(statusData.responseTime)}`}>
                        {statusData.responseTime}ms
                      </p>
                      <p className="text-sm text-gray-500">Response Time</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <Globe className="h-8 w-8 text-purple-600 dark:text-purple-300" />
                      </div>
                      <p className="text-2xl font-bold">{statusData.uptime.percentage}%</p>
                      <p className="text-sm text-gray-500">Uptime</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Server Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Server</p>
                      <p className="font-medium font-mono">{statusData.serverInfo.server}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Content Type</p>
                      <p className="font-medium">{statusData.serverInfo.contentType}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Content Length</p>
                      <p className="font-medium">{statusData.serverInfo.contentLength.toLocaleString()} bytes</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{statusData.location}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">SSL Certificate</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      {statusData.ssl.valid ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span className={statusData.ssl.valid ? 'text-green-600' : 'text-red-600'}>
                        {statusData.ssl.valid ? 'Valid SSL Certificate' : 'Invalid SSL Certificate'}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Issuer</p>
                      <p className="font-medium">{statusData.ssl.issuer}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Expires</p>
                      <p className="font-medium">
                        {new Date(statusData.ssl.expires).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Uptime Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Uptime Percentage</span>
                        <span className="text-sm font-medium">{statusData.uptime.percentage}%</span>
                      </div>
                      <Progress value={statusData.uptime.percentage} className="w-full" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Last Checked</p>
                        <p className="font-medium">
                          {new Date(statusData.lastChecked).toLocaleString()}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-gray-500">Last Downtime</p>
                        <p className="font-medium">
                          {new Date(statusData.uptime.lastDowntime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!statusData && !isLoading && (
            <Card className="h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Monitor className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter a website URL to check its server status</p>
              </div>
            </Card>
          )}

          {isLoading && (
            <Card className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Checking server status...</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default ServerStatus;
