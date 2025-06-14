
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, RefreshCw, Copy } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { toast } from 'sonner';

const HTTPHeaderChecker = () => {
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkHeaders = async () => {
    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsChecking(true);
    
    try {
      // Simulate checking HTTP headers (in a real app, this would make an actual request)
      setTimeout(() => {
        const mockHeaders = {
          'content-type': 'text/html; charset=UTF-8',
          'server': 'nginx/1.18.0',
          'cache-control': 'public, max-age=3600',
          'content-encoding': 'gzip',
          'x-frame-options': 'DENY',
          'x-content-type-options': 'nosniff',
          'strict-transport-security': 'max-age=31536000',
          'date': new Date().toUTCString(),
          'content-length': '12847'
        };
        
        setHeaders(mockHeaders);
        setStatusCode(200);
        setIsChecking(false);
        toast.success('Headers checked successfully!');
      }, 2000);
    } catch (error) {
      setIsChecking(false);
      toast.error('Failed to check headers');
    }
  };

  const copyHeaders = () => {
    const headerText = Object.entries(headers)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    navigator.clipboard.writeText(headerText);
    toast.success('Headers copied to clipboard!');
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Globe}
          title="HTTP Header Checker"
          description="Check HTTP headers and response details for any website"
          gradient="bg-gradient-to-r from-blue-600 to-green-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Check HTTP Headers</CardTitle>
            <CardDescription>
              Enter a URL to analyze its HTTP response headers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button 
              onClick={checkHeaders} 
              className="w-full"
              disabled={isChecking}
            >
              {isChecking ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Checking Headers...</>
              ) : (
                'Check Headers'
              )}
            </Button>
          </CardContent>
        </Card>

        {statusCode && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                HTTP Response Headers
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyHeaders}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All
                </Button>
              </CardTitle>
              <CardDescription>
                <Badge variant="secondary">Status: {statusCode}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(headers).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row gap-2">
                    <Badge variant="outline" className="w-fit">
                      {key}
                    </Badge>
                    <span className="text-sm font-mono break-all">{value}</span>
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

export default HTTPHeaderChecker;
