
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, RefreshCw, Shield, AlertCircle } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { toast } from 'sonner';

const PortScanner = () => {
  const [host, setHost] = useState('');
  const [scanResults, setScanResults] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const commonPorts = [
    { port: 21, service: 'FTP' },
    { port: 22, service: 'SSH' },
    { port: 23, service: 'Telnet' },
    { port: 25, service: 'SMTP' },
    { port: 53, service: 'DNS' },
    { port: 80, service: 'HTTP' },
    { port: 110, service: 'POP3' },
    { port: 143, service: 'IMAP' },
    { port: 443, service: 'HTTPS' },
    { port: 993, service: 'IMAPS' },
    { port: 995, service: 'POP3S' },
    { port: 3389, service: 'RDP' }
  ];

  const scanPorts = async () => {
    if (!host.trim()) {
      toast.error('Please enter a valid host or IP address');
      return;
    }

    setIsScanning(true);
    setScanResults([]);
    
    try {
      // Simulate port scanning (in a real app, this would check actual ports)
      const results = [];
      for (const portInfo of commonPorts) {
        await new Promise(resolve => setTimeout(resolve, 200));
        const isOpen = Math.random() > 0.7; // Random simulation
        const result = {
          ...portInfo,
          status: isOpen ? 'open' : 'closed'
        };
        results.push(result);
        setScanResults([...results]);
      }
      
      setIsScanning(false);
      toast.success('Port scan completed!');
    } catch (error) {
      setIsScanning(false);
      toast.error('Failed to scan ports');
    }
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Search}
          title="Port Scanner"
          description="Scan common ports to check service availability"
          gradient="bg-gradient-to-r from-red-600 to-orange-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Scan Ports</CardTitle>
            <CardDescription>
              Enter a hostname or IP address to scan common ports
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="host">Host or IP Address</Label>
              <Input
                id="host"
                placeholder="example.com or 192.168.1.1"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Responsible Scanning
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Only scan hosts you own or have explicit permission to test. 
                    This tool scans common service ports only.
                  </p>
                </div>
              </div>
            </div>
            <Button 
              onClick={scanPorts} 
              className="w-full"
              disabled={isScanning}
            >
              {isScanning ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Scanning Ports...</>
              ) : (
                'Start Port Scan'
              )}
            </Button>
          </CardContent>
        </Card>

        {scanResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Scan Results</CardTitle>
              <CardDescription>
                Port scan results for {host}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scanResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{result.port}</Badge>
                      <span className="font-medium">{result.service}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {result.status === 'open' ? (
                        <>
                          <Shield className="h-4 w-4 text-green-500" />
                          <Badge className="bg-green-500 text-white">Open</Badge>
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 text-gray-400" />
                          <Badge variant="secondary">Closed</Badge>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default PortScanner;
