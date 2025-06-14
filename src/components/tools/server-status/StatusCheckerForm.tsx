
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckHistoryEntry } from '@/types/serverStatus';
import { getStatusBadge, getResponseTimeColor } from '@/utils/serverStatusUtils';

interface StatusCheckerFormProps {
  url: string;
  setUrl: (url: string) => void;
  onCheck: () => void;
  isLoading: boolean;
  checkHistory: CheckHistoryEntry[];
}

const StatusCheckerForm = ({ url, setUrl, onCheck, isLoading, checkHistory }: StatusCheckerFormProps) => {
  return (
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
            onKeyPress={(e) => e.key === 'Enter' && onCheck()}
          />
        </div>
        
        <Button 
          onClick={onCheck} 
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
                    <Badge className={getStatusBadge(entry.status)}>
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
            <li>• <span className="text-yellow-600">Slow:</span> Response time &gt;1s</li>
            <li>• <span className="text-red-600">Offline:</span> Server is unreachable</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCheckerForm;
