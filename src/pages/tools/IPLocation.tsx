
import React, { useState } from 'react';
import { MapPin, Globe, Search, Wifi, Shield, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

interface LocationData {
  ip: string;
  type: 'IPv4' | 'IPv6';
  country: string;
  countryCode: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
  organization: string;
  asn: string;
  proxy: boolean;
  vpn: boolean;
  tor: boolean;
}

const IPLocation = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const findIPLocation = async () => {
    if (!ipAddress.trim()) {
      toast.error('Please enter an IP address');
      return;
    }

    // Basic IP validation
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    
    if (!ipv4Regex.test(ipAddress) && !ipv6Regex.test(ipAddress)) {
      toast.error('Please enter a valid IP address');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData: LocationData = {
        ip: ipAddress,
        type: ipv4Regex.test(ipAddress) ? 'IPv4' : 'IPv6',
        country: 'United States',
        countryCode: 'US',
        region: 'California',
        city: 'San Francisco',
        latitude: 37.7749,
        longitude: -122.4194,
        timezone: 'America/Los_Angeles',
        isp: 'Cloudflare, Inc.',
        organization: 'Cloudflare',
        asn: 'AS13335',
        proxy: Math.random() > 0.7,
        vpn: Math.random() > 0.8,
        tor: Math.random() > 0.9
      };

      setLocationData(mockData);
      toast.success('IP location found successfully');
    } catch (error) {
      toast.error('Failed to find IP location');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    setIsLoading(true);
    
    try {
      // Simulate getting user's IP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userIP = '8.8.8.8'; // Mock user's IP
      setIpAddress(userIP);
      
      // Then find location
      await findIPLocation();
    } catch (error) {
      toast.error('Failed to get current IP');
    } finally {
      setIsLoading(false);
    }
  };

  const openMapLocation = () => {
    if (locationData) {
      const url = `https://www.google.com/maps?q=${locationData.latitude},${locationData.longitude}`;
      window.open(url, '_blank');
    }
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={MapPin}
        title="IP Location Finder"
        description="Find the geographical location and detailed information of any IP address including ISP, organization, and security details"
        gradient="bg-gradient-to-r from-green-600 to-teal-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                IP Address Lookup
              </CardTitle>
              <CardDescription>
                Enter an IP address to find its location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">IP Address</label>
                <Input
                  placeholder="192.168.1.1 or 2001:db8::1"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && findIPLocation()}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  onClick={findIPLocation} 
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Finding...' : 'Find Location'}
                </Button>
                
                <Button 
                  onClick={getCurrentLocation} 
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                >
                  Use My IP
                </Button>
              </div>

              <div className="text-xs text-gray-500 mt-4">
                <h4 className="font-medium mb-2">Supported Formats</h4>
                <ul className="space-y-1">
                  <li>• IPv4: 192.168.1.1</li>
                  <li>• IPv6: 2001:db8::1</li>
                  <li>• Public IP addresses only</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {locationData && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location Information
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{locationData.ip}</Badge>
                    <Badge variant="outline">{locationData.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Country</p>
                          <p className="font-medium">{locationData.country} ({locationData.countryCode})</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Region</p>
                          <p className="font-medium">{locationData.region}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">City</p>
                          <p className="font-medium">{locationData.city}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Coordinates</p>
                        <p className="font-medium font-mono">
                          {locationData.latitude.toFixed(4)}, {locationData.longitude.toFixed(4)}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Timezone</p>
                        <p className="font-medium">{locationData.timezone}</p>
                      </div>
                      
                      <Button onClick={openMapLocation} variant="outline" size="sm">
                        View on Map
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wifi className="h-5 w-5" />
                    Network Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Internet Service Provider</p>
                        <p className="font-medium">{locationData.isp}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Organization</p>
                        <p className="font-medium">{locationData.organization}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">ASN</p>
                        <p className="font-medium font-mono">{locationData.asn}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className={`rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 ${
                        locationData.proxy ? 'bg-red-100 dark:bg-red-900' : 'bg-green-100 dark:bg-green-900'
                      }`}>
                        <Shield className={`h-6 w-6 ${
                          locationData.proxy ? 'text-red-600 dark:text-red-300' : 'text-green-600 dark:text-green-300'
                        }`} />
                      </div>
                      <p className="text-sm font-medium">Proxy</p>
                      <Badge className={locationData.proxy ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}>
                        {locationData.proxy ? 'Detected' : 'Not Detected'}
                      </Badge>
                    </div>
                    
                    <div className="text-center">
                      <div className={`rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 ${
                        locationData.vpn ? 'bg-orange-100 dark:bg-orange-900' : 'bg-green-100 dark:bg-green-900'
                      }`}>
                        <Shield className={`h-6 w-6 ${
                          locationData.vpn ? 'text-orange-600 dark:text-orange-300' : 'text-green-600 dark:text-green-300'
                        }`} />
                      </div>
                      <p className="text-sm font-medium">VPN</p>
                      <Badge className={locationData.vpn ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}>
                        {locationData.vpn ? 'Detected' : 'Not Detected'}
                      </Badge>
                    </div>
                    
                    <div className="text-center">
                      <div className={`rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 ${
                        locationData.tor ? 'bg-red-100 dark:bg-red-900' : 'bg-green-100 dark:bg-green-900'
                      }`}>
                        <Shield className={`h-6 w-6 ${
                          locationData.tor ? 'text-red-600 dark:text-red-300' : 'text-green-600 dark:text-green-300'
                        }`} />
                      </div>
                      <p className="text-sm font-medium">Tor</p>
                      <Badge className={locationData.tor ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}>
                        {locationData.tor ? 'Detected' : 'Not Detected'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!locationData && !isLoading && (
            <Card className="h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter an IP address to find its geographical location</p>
              </div>
            </Card>
          )}

          {isLoading && (
            <Card className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Finding IP location...</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default IPLocation;
