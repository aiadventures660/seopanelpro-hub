
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ServerStatusData } from '@/types/serverStatus';

interface ServerInformationProps {
  statusData: ServerStatusData;
}

const ServerInformation = ({ statusData }: ServerInformationProps) => {
  return (
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
  );
};

export default ServerInformation;
