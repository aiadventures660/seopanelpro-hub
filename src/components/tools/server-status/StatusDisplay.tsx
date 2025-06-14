
import React from 'react';
import { Monitor } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ServerStatusData } from '@/types/serverStatus';
import StatusOverview from './StatusOverview';
import ServerInformation from './ServerInformation';
import SSLCertificate from './SSLCertificate';
import UptimeStatistics from './UptimeStatistics';

interface StatusDisplayProps {
  statusData: ServerStatusData | null;
  isLoading: boolean;
}

const StatusDisplay = ({ statusData, isLoading }: StatusDisplayProps) => {
  if (isLoading) {
    return (
      <Card className="h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Checking server status...</p>
        </div>
      </Card>
    );
  }

  if (!statusData) {
    return (
      <Card className="h-64 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Monitor className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Enter a website URL to check its server status</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <StatusOverview statusData={statusData} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServerInformation statusData={statusData} />
        <SSLCertificate statusData={statusData} />
      </div>
      
      <UptimeStatistics statusData={statusData} />
    </div>
  );
};

export default StatusDisplay;
