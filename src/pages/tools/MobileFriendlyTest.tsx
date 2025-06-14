
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

interface MobileIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
}

const MobileFriendlyTest = () => {
  const [url, setUrl] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [result, setResult] = useState<{
    isMobileFriendly: boolean;
    issues: MobileIssue[];
  } | null>(null);

  const testMobileFriendliness = async () => {
    if (!url.trim()) return;
    
    setIsTesting(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResult = {
        isMobileFriendly: Math.random() > 0.3, // 70% chance of being mobile friendly
        issues: [
          { type: 'warning' as const, message: 'Text too small to read' },
          { type: 'error' as const, message: 'Clickable elements too close together' },
          { type: 'info' as const, message: 'Content wider than screen' }
        ].slice(0, Math.floor(Math.random() * 4)) // Random number of issues
      };
      
      setResult(mockResult);
      setIsTesting(false);
    }, 2000);
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Smartphone}
          title="Mobile-Friendly Test"
          description="Test if your website is mobile-friendly and get optimization tips"
          gradient="bg-gradient-to-r from-indigo-600 to-purple-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Test Mobile Compatibility</CardTitle>
            <CardDescription>
              Enter a URL to test its mobile-friendliness
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button 
              onClick={testMobileFriendliness} 
              className="w-full"
              disabled={isTesting}
            >
              {isTesting ? 'Testing...' : 'Test Mobile-Friendliness'}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Mobile-Friendly Test Result</CardTitle>
                <CardDescription>
                  Result for {url}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="mb-4">
                    {result.isMobileFriendly ? (
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                    ) : (
                      <XCircle className="h-16 w-16 text-red-500 mx-auto" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {result.isMobileFriendly ? 'Mobile-Friendly' : 'Not Mobile-Friendly'}
                  </h3>
                  <Badge 
                    variant={result.isMobileFriendly ? 'default' : 'destructive'}
                    className="text-lg px-4 py-2"
                  >
                    {result.isMobileFriendly ? 'PASS' : 'FAIL'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {result.issues.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Issues Found</CardTitle>
                  <CardDescription>
                    Mobile usability issues that need attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.issues.map((issue, index) => (
                      <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg">
                        {getIssueIcon(issue.type)}
                        <div>
                          <div className="font-medium capitalize">{issue.type}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {issue.message}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default MobileFriendlyTest;
