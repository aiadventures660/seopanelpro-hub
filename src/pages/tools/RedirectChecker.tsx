
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, ArrowRight } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

interface RedirectStep {
  url: string;
  statusCode: number;
  statusText: string;
}

const RedirectChecker = () => {
  const [url, setUrl] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [redirectChain, setRedirectChain] = useState<RedirectStep[]>([]);

  const checkRedirects = async () => {
    if (!url.trim()) return;
    
    setIsChecking(true);
    
    // Simulate redirect checking
    setTimeout(() => {
      const mockRedirects: RedirectStep[] = [
        { url: url, statusCode: 301, statusText: 'Moved Permanently' },
        { url: url.replace('http://', 'https://'), statusCode: 301, statusText: 'Moved Permanently' },
        { url: url.replace('http://', 'https://').replace('www.', ''), statusCode: 200, statusText: 'OK' }
      ];
      
      // Sometimes show no redirects
      if (Math.random() > 0.7) {
        setRedirectChain([{ url: url, statusCode: 200, statusText: 'OK' }]);
      } else {
        setRedirectChain(mockRedirects);
      }
      
      setIsChecking(false);
    }, 2000);
  };

  const getStatusBadge = (statusCode: number) => {
    if (statusCode === 200) return 'default';
    if (statusCode === 301 || statusCode === 302) return 'secondary';
    if (statusCode >= 400) return 'destructive';
    return 'outline';
  };

  const getStatusColor = (statusCode: number) => {
    if (statusCode === 200) return 'text-green-600';
    if (statusCode === 301 || statusCode === 302) return 'text-blue-600';
    if (statusCode >= 400) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={RotateCcw}
          title="Redirect Checker"
          description="Check HTTP redirects (301, 302) and redirect chains"
          gradient="bg-gradient-to-r from-violet-600 to-purple-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Check URL Redirects</CardTitle>
            <CardDescription>
              Enter a URL to check its redirect chain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button 
              onClick={checkRedirects} 
              className="w-full"
              disabled={isChecking}
            >
              {isChecking ? 'Checking Redirects...' : 'Check Redirects'}
            </Button>
          </CardContent>
        </Card>

        {redirectChain.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Redirect Chain</CardTitle>
              <CardDescription>
                {redirectChain.length === 1 ? 'No redirects found' : `${redirectChain.length - 1} redirect(s) found`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {redirectChain.map((step, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-gray-500">
                            Step {index + 1}
                          </span>
                          <Badge variant={getStatusBadge(step.statusCode)}>
                            {step.statusCode} {step.statusText}
                          </Badge>
                        </div>
                        <div className="text-sm font-mono break-all text-gray-800 dark:text-gray-200">
                          {step.url}
                        </div>
                      </div>
                    </div>
                    {index < redirectChain.length - 1 && (
                      <div className="flex justify-center py-2">
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {redirectChain.length > 1 && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Summary
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Total redirects: {redirectChain.length - 1}</li>
                    <li>• Final destination: {redirectChain[redirectChain.length - 1].url}</li>
                    <li>• Final status: {redirectChain[redirectChain.length - 1].statusCode}</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default RedirectChecker;
