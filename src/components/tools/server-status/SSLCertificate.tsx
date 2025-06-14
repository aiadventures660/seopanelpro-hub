
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ServerStatusData } from '@/types/serverStatus';

interface SSLCertificateProps {
  statusData: ServerStatusData;
}

const SSLCertificate = ({ statusData }: SSLCertificateProps) => {
  return (
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
  );
};

export default SSLCertificate;
