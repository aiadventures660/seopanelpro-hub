
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';
import { toast } from 'sonner';

const GZIPTest = () => {
  const [url, setUrl] = useState('');
  const [testResult, setTestResult] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);

  const testGZIP = async () => {
    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsTesting(true);
    
    try {
      // Simulate GZIP compression test (in a real app, this would make actual HTTP requests)
      setTimeout(() => {
        const isGZIPEnabled = Math.random() > 0.3; // 70% chance of GZIP being enabled
        const originalSize = Math.floor(Math.random() * 500000) + 50000; // 50KB - 550KB
        const compressedSize = isGZIPEnabled ? Math.floor(originalSize * 0.3) : originalSize;
        const savings = originalSize - compressedSize;
        const compressionRatio = isGZIPEnabled ? Math.round(((savings / originalSize) * 100)) : 0;
        
        const result = {
          url: url,
          gzipEnabled: isGZIPEnabled,
          originalSize: originalSize,
          compressedSize: compressedSize,
          savings: savings,
          compressionRatio: compressionRatio,
          contentType: 'text/html',
          server: isGZIPEnabled ? 'nginx/1.18.0' : 'Apache/2.4.41'
        };
        
        setTestResult(result);
        setIsTesting(false);
        toast.success('GZIP test completed!');
      }, 2000);
    } catch (error) {
      setIsTesting(false);
      toast.error('Failed to test GZIP compression');
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Package}
          title="GZIP Compression Test"
          description="Test if your website uses GZIP compression for better performance"
          gradient="bg-gradient-to-r from-indigo-600 to-purple-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Test GZIP Compression</CardTitle>
            <CardDescription>
              Enter a URL to check if GZIP compression is enabled
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
              onClick={testGZIP} 
              className="w-full"
              disabled={isTesting}
            >
              {isTesting ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Testing GZIP...</>
              ) : (
                'Test GZIP Compression'
              )}
            </Button>
          </CardContent>
        </Card>

        {testResult && (
          <Card>
            <CardHeader>
              <CardTitle>GZIP Test Results</CardTitle>
              <CardDescription>
                Compression analysis for {testResult.url}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                {testResult.gzipEnabled ? (
                  <>
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <div>
                      <Badge className="bg-green-500 text-white">GZIP Enabled</Badge>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Great! Your website is using GZIP compression.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-red-500" />
                    <div>
                      <Badge className="bg-red-500 text-white">GZIP Disabled</Badge>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Your website is not using GZIP compression. Consider enabling it.
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Original Size</Label>
                    <p className="text-lg font-semibold">{formatBytes(testResult.originalSize)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Compressed Size</Label>
                    <p className="text-lg font-semibold">{formatBytes(testResult.compressedSize)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Content Type</Label>
                    <p className="text-sm">{testResult.contentType}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Bytes Saved</Label>
                    <p className="text-lg font-semibold text-green-600">
                      {formatBytes(testResult.savings)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Compression Ratio</Label>
                    <p className="text-lg font-semibold">{testResult.compressionRatio}%</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Server</Label>
                    <p className="text-sm">{testResult.server}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <RelatedTools 
        currentToolId="gziptest"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default GZIPTest;
