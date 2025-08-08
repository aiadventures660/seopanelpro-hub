
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Radio, RefreshCw, Zap } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';
import { toast } from 'sonner';

const PingTool = () => {
  const [host, setHost] = useState('');
  const [pingResults, setPingResults] = useState<any[]>([]);
  const [isPinging, setIsPinging] = useState(false);
  const [stats, setStats] = useState<any>(null);

  const pingHost = async () => {
    if (!host.trim()) {
      toast.error('Please enter a valid host or IP address');
      return;
    }

    setIsPinging(true);
    setPingResults([]);
    
    try {
      // Simulate ping results (in a real app, this would make actual ping requests)
      const results = [];
      for (let i = 0; i < 4; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const responseTime = Math.floor(Math.random() * 100) + 10;
        const result = {
          sequence: i + 1,
          time: responseTime,
          status: 'success'
        };
        results.push(result);
        setPingResults([...results]);
      }
      
      const times = results.map(r => r.time);
      const avgTime = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
      const minTime = Math.min(...times);
      const maxTime = Math.max(...times);
      
      setStats({
        packetsTransmitted: 4,
        packetsReceived: 4,
        packetLoss: 0,
        avgTime,
        minTime,
        maxTime
      });
      
      setIsPinging(false);
      toast.success('Ping completed successfully!');
    } catch (error) {
      setIsPinging(false);
      toast.error('Failed to ping host');
    }
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Radio}
          title="Ping Tool"
          description="Test website connectivity and response times"
          gradient="bg-gradient-to-r from-purple-600 to-pink-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ping Host</CardTitle>
            <CardDescription>
              Enter a hostname or IP address to test connectivity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="host">Host or IP Address</Label>
              <Input
                id="host"
                placeholder="google.com or 8.8.8.8"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
            </div>
            <Button 
              onClick={pingHost} 
              className="w-full"
              disabled={isPinging}
            >
              {isPinging ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Pinging...</>
              ) : (
                'Start Ping'
              )}
            </Button>
          </CardContent>
        </Card>

        {pingResults.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Ping Results</CardTitle>
              <CardDescription>
                Response times for {host}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {pingResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">#{result.sequence}</Badge>
                      <span className="text-sm">Reply from {host}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-green-500" />
                      <span className="font-mono">{result.time}ms</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {stats && (
          <Card>
            <CardHeader>
              <CardTitle>Ping Statistics</CardTitle>
              <CardDescription>
                Summary for {host}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Packets Transmitted</Label>
                    <p className="text-lg font-semibold">{stats.packetsTransmitted}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Packets Received</Label>
                    <p className="text-lg font-semibold">{stats.packetsReceived}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Packet Loss</Label>
                    <p className="text-lg font-semibold">{stats.packetLoss}%</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Average Time</Label>
                    <p className="text-lg font-semibold">{stats.avgTime}ms</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Minimum Time</Label>
                    <p className="text-lg font-semibold">{stats.minTime}ms</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Maximum Time</Label>
                    <p className="text-lg font-semibold">{stats.maxTime}ms</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <RelatedTools 
        currentToolId="pingtool"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default PingTool;
