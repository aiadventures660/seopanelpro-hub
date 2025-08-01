import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, Info, AlertCircle } from 'lucide-react';

// This component would be for admin use only - currently just displays mock data
// In a real implementation, this would connect to the security_logs table
const SecurityDashboard = () => {
  const [securityEvents] = useState([
    {
      id: '1',
      type: 'contact_form_submitted',
      severity: 'low',
      timestamp: new Date().toISOString(),
      details: { message_length: 150 }
    },
    {
      id: '2', 
      type: 'rate_limit_exceeded',
      severity: 'medium',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      details: { endpoint: '/api/contact' }
    },
    {
      id: '3',
      type: 'suspicious_input_detected',
      severity: 'high',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      details: { field: 'message', pattern: 'script_injection' }
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertCircle className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'low': return <Info className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold">Security Dashboard</h1>
          <p className="text-gray-600">Monitor security events and system health</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">System Status</p>
                <p className="text-lg font-semibold text-green-600">Secure</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-lg font-semibold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Today's Events</p>
                <p className="text-lg font-semibold">15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Critical Events</p>
                <p className="text-lg font-semibold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
          <CardDescription>Latest security events and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className={`p-1 rounded ${getSeverityColor(event.severity)}`}>
                  {getSeverityIcon(event.severity)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{event.type.replace(/_/g, ' ')}</p>
                    <Badge variant={getSeverityColor(event.severity) as any}>
                      {event.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                  {event.details && (
                    <p className="text-xs text-gray-500 mt-1">
                      {JSON.stringify(event.details)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          This security dashboard shows system security events. In production, this would be restricted to admin users only.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SecurityDashboard;