
import React, { useState } from 'react';
import { Search, Globe, Calendar, User, MapPin, Shield, Clock, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

interface WhoisData {
  domain: string;
  registrar: string;
  registrationDate: string;
  expirationDate: string;
  nameServers: string[];
  status: string;
  registrant: {
    name: string;
    organization: string;
    country: string;
    email: string;
  };
}

const WhoisLookup = () => {
  const [domain, setDomain] = useState('');
  const [whoisData, setWhoisData] = useState<WhoisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const performWhoisLookup = async () => {
    if (!domain.trim()) {
      toast.error('Please enter a domain name');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData: WhoisData = {
        domain: domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, ''),
        registrar: 'GoDaddy.com, LLC',
        registrationDate: '2010-03-15',
        expirationDate: '2026-03-15',
        nameServers: ['ns1.example.com', 'ns2.example.com', 'ns3.example.com'],
        status: 'clientTransferProhibited',
        registrant: {
          name: 'John Doe',
          organization: 'Example Corp',
          country: 'United States',
          email: 'admin@example.com'
        }
      };

      setWhoisData(mockData);
      toast.success('WHOIS lookup completed successfully');
    } catch (error) {
      toast.error('Failed to perform WHOIS lookup');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Globe}
        title="WHOIS Lookup"
        description="Get detailed information about any domain name including registration details, expiration date, and contact information"
        gradient="bg-gradient-to-r from-blue-600 to-cyan-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Domain Lookup
              </CardTitle>
              <CardDescription>
                Enter a domain name to get WHOIS information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Domain Name</label>
                <Input
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && performWhoisLookup()}
                />
              </div>
              
              <Button 
                onClick={performWhoisLookup} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Looking up...' : 'Lookup Domain'}
              </Button>

              <div className="text-xs text-gray-500 mt-4">
                <h4 className="font-medium mb-2">What is WHOIS?</h4>
                <p>WHOIS is a protocol that provides information about domain name registrations, including registrant details, registration dates, and name servers.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {whoisData && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Domain Information
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit">
                    {whoisData.domain}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Registrar</p>
                          <p className="font-medium">{whoisData.registrar}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Registration Date</p>
                          <p className="font-medium">{formatDate(whoisData.registrationDate)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Expiration Date</p>
                          <p className="font-medium">{formatDate(whoisData.expirationDate)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <Badge variant="outline">{whoisData.status}</Badge>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Name Servers</p>
                        <div className="space-y-1">
                          {whoisData.nameServers.map((ns, index) => (
                            <p key={index} className="text-sm font-mono bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
                              {ns}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Registrant Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{whoisData.registrant.name}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Organization</p>
                        <p className="font-medium">{whoisData.registrant.organization}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Country</p>
                          <p className="font-medium">{whoisData.registrant.country}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Contact Email</p>
                        <p className="font-medium">{whoisData.registrant.email}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!whoisData && !isLoading && (
            <Card className="h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter a domain name to view WHOIS information</p>
              </div>
            </Card>
          )}

          {isLoading && (
            <Card className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Looking up domain information...</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default WhoisLookup;
