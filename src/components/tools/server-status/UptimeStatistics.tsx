
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ServerStatusData } from '@/types/serverStatus';

interface UptimeStatisticsProps {
  statusData: ServerStatusData;
}

const UptimeStatistics = ({ statusData }: UptimeStatisticsProps) => {
  return (
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
  );
};

export default UptimeStatistics;
