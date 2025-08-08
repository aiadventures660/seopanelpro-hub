
import React, { useState } from 'react';
import { Monitor } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';
import StatusCheckerForm from '@/components/tools/server-status/StatusCheckerForm';
import StatusDisplay from '@/components/tools/server-status/StatusDisplay';
import { ServerStatusData, CheckHistoryEntry } from '@/types/serverStatus';
import { mockServerStatusCheck, normalizeUrl } from '@/utils/serverStatusUtils';

const ServerStatus = () => {
  const [url, setUrl] = useState('');
  const [statusData, setStatusData] = useState<ServerStatusData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkHistory, setCheckHistory] = useState<CheckHistoryEntry[]>([]);

  const checkServerStatus = async () => {
    if (!url.trim()) {
      toast.error('Please enter a website URL');
      return;
    }

    const checkUrl = normalizeUrl(url);
    setIsLoading(true);
    
    try {
      const mockData = await mockServerStatusCheck(checkUrl);
      setStatusData(mockData);
      
      // Add to history
      const newEntry: CheckHistoryEntry = {
        time: new Date().toLocaleTimeString(),
        status: mockData.status,
        responseTime: mockData.responseTime
      };
      setCheckHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10 entries

      if (mockData.status === 'online') {
        toast.success(`Server is online! Response time: ${mockData.responseTime}ms`);
      } else if (mockData.status === 'slow') {
        toast.warning(`Server is slow. Response time: ${mockData.responseTime}ms`);
      } else {
        toast.error('Server is offline or unreachable');
      }
    } catch (error) {
      toast.error('Failed to check server status');
    } finally {
      setIsLoading(false);
    }
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
          <StatusCheckerForm
            url={url}
            setUrl={setUrl}
            onCheck={checkServerStatus}
            isLoading={isLoading}
            checkHistory={checkHistory}
          />
        </div>

        <div className="lg:col-span-2">
          <StatusDisplay statusData={statusData} isLoading={isLoading} />
        </div>
      </div>

      <RelatedTools 
        currentToolId="serverstatus"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default ServerStatus;
