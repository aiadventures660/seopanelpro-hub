
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Monitor, RefreshCw, Smartphone, Globe } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { toast } from 'sonner';

const UserAgentParser = () => {
  const [userAgent, setUserAgent] = useState('');
  const [parsedData, setParsedData] = useState<any>(null);
  const [isParsing, setIsParsing] = useState(false);

  useEffect(() => {
    // Set current browser's user agent as default
    setUserAgent(navigator.userAgent);
  }, []);

  const parseUserAgent = () => {
    if (!userAgent.trim()) {
      toast.error('Please enter a user agent string');
      return;
    }

    setIsParsing(true);
    
    setTimeout(() => {
      // Simple user agent parsing (in a real app, you'd use a proper UA parsing library)
      const ua = userAgent.toLowerCase();
      
      // Browser detection
      let browser = 'Unknown';
      let browserVersion = 'Unknown';
      
      if (ua.includes('chrome') && !ua.includes('edge')) {
        browser = 'Chrome';
        const match = ua.match(/chrome\/([\d.]+)/);
        browserVersion = match ? match[1] : 'Unknown';
      } else if (ua.includes('firefox')) {
        browser = 'Firefox';
        const match = ua.match(/firefox\/([\d.]+)/);
        browserVersion = match ? match[1] : 'Unknown';
      } else if (ua.includes('safari') && !ua.includes('chrome')) {
        browser = 'Safari';
        const match = ua.match(/version\/([\d.]+)/);
        browserVersion = match ? match[1] : 'Unknown';
      } else if (ua.includes('edge')) {
        browser = 'Edge';
        const match = ua.match(/edge?\/([\d.]+)/);
        browserVersion = match ? match[1] : 'Unknown';
      }
      
      // OS detection
      let os = 'Unknown';
      let osVersion = 'Unknown';
      
      if (ua.includes('windows')) {
        os = 'Windows';
        if (ua.includes('windows nt 10.0')) osVersion = '10/11';
        else if (ua.includes('windows nt 6.3')) osVersion = '8.1';
        else if (ua.includes('windows nt 6.2')) osVersion = '8';
        else if (ua.includes('windows nt 6.1')) osVersion = '7';
      } else if (ua.includes('mac os x')) {
        os = 'macOS';
        const match = ua.match(/mac os x ([\d_]+)/);
        osVersion = match ? match[1].replace(/_/g, '.') : 'Unknown';
      } else if (ua.includes('linux')) {
        os = 'Linux';
      } else if (ua.includes('android')) {
        os = 'Android';
        const match = ua.match(/android ([\d.]+)/);
        osVersion = match ? match[1] : 'Unknown';
      } else if (ua.includes('iphone') || ua.includes('ipad')) {
        os = ua.includes('ipad') ? 'iPadOS' : 'iOS';
        const match = ua.match(/os ([\d_]+)/);
        osVersion = match ? match[1].replace(/_/g, '.') : 'Unknown';
      }
      
      // Device type
      let deviceType = 'Desktop';
      if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
        deviceType = 'Mobile';
      } else if (ua.includes('tablet') || ua.includes('ipad')) {
        deviceType = 'Tablet';
      }
      
      // Engine detection
      let engine = 'Unknown';
      if (ua.includes('webkit')) engine = 'WebKit';
      if (ua.includes('gecko') && !ua.includes('webkit')) engine = 'Gecko';
      if (ua.includes('trident')) engine = 'Trident';
      
      const result = {
        browser,
        browserVersion,
        os,
        osVersion,
        deviceType,
        engine,
        isMobile: deviceType === 'Mobile',
        isTablet: deviceType === 'Tablet',
        isDesktop: deviceType === 'Desktop'
      };
      
      setParsedData(result);
      setIsParsing(false);
      toast.success('User agent parsed successfully!');
    }, 1000);
  };

  const loadCurrentUA = () => {
    setUserAgent(navigator.userAgent);
    toast.success('Current browser user agent loaded!');
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'Mobile': return Smartphone;
      case 'Tablet': return Smartphone;
      default: return Monitor;
    }
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Globe}
          title="User Agent Parser"
          description="Parse and analyze user agent strings to identify browsers and devices"
          gradient="bg-gradient-to-r from-teal-600 to-blue-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>User Agent String</CardTitle>
            <CardDescription>
              Enter a user agent string to parse and analyze
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>User Agent</Label>
              <Textarea
                value={userAgent}
                onChange={(e) => setUserAgent(e.target.value)}
                placeholder="Enter user agent string here..."
                className="min-h-[100px] mt-2 font-mono text-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={parseUserAgent} 
                className="flex-1"
                disabled={isParsing}
              >
                {isParsing ? (
                  <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Parsing...</>
                ) : (
                  'Parse User Agent'
                )}
              </Button>
              <Button 
                onClick={loadCurrentUA}
                variant="outline"
              >
                Use Current Browser
              </Button>
            </div>
          </CardContent>
        </Card>

        {parsedData && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {(() => {
                    const Icon = getDeviceIcon(parsedData.deviceType);
                    return <Icon className="h-5 w-5" />;
                  })()}
                  Device Information
                </CardTitle>
                <CardDescription>
                  Basic device and platform details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Device Type</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{parsedData.deviceType}</Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Operating System</Label>
                    <p className="text-sm">{parsedData.os} {parsedData.osVersion}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Rendering Engine</Label>
                    <p className="text-sm">{parsedData.engine}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Browser Information</CardTitle>
                <CardDescription>
                  Browser and version details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Browser</Label>
                    <p className="text-lg font-semibold">{parsedData.browser}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Version</Label>
                    <p className="text-lg font-semibold">{parsedData.browserVersion}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Capabilities</CardTitle>
                <CardDescription>
                  Device type classification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={parsedData.isDesktop ? "default" : "outline"}>
                    Desktop
                  </Badge>
                  <Badge variant={parsedData.isMobile ? "default" : "outline"}>
                    Mobile
                  </Badge>
                  <Badge variant={parsedData.isTablet ? "default" : "outline"}>
                    Tablet
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default UserAgentParser;
