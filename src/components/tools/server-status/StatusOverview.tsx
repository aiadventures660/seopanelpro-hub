
import React from 'react';
import { Monitor, CheckCircle, XCircle, Clock, Zap, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ServerStatusData } from '@/types/serverStatus';
import { getStatusBadge, getResponseTimeColor } from '@/utils/serverStatusUtils';

interface StatusOverviewProps {
  statusData: ServerStatusData;
}

const StatusOverview = ({ statusData }: StatusOverviewProps) => {
  return (
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
  );
};

export default StatusOverview;
