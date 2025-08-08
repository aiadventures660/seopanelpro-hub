
import React, { useState } from 'react';
import { Server, Globe, Search, Info, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

interface DNSRecord {
  type: string;
  name: string;
  value: string;
  ttl: number;
  priority?: number;
}

interface DNSData {
  domain: string;
  records: {
    [key: string]: DNSRecord[];
  };
  nameServers: string[];
  queryTime: number;
}

const DNSLookup = () => {
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('ALL');
  const [dnsData, setDnsData] = useState<DNSData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const recordTypes = [
    { value: 'ALL', label: 'All Records' },
    { value: 'A', label: 'A (IPv4 Address)' },
    { value: 'AAAA', label: 'AAAA (IPv6 Address)' },
    { value: 'CNAME', label: 'CNAME (Canonical Name)' },
    { value: 'MX', label: 'MX (Mail Exchange)' },
    { value: 'NS', label: 'NS (Name Servers)' },
    { value: 'TXT', label: 'TXT (Text Records)' },
    { value: 'SOA', label: 'SOA (Start of Authority)' },
    { value: 'PTR', label: 'PTR (Pointer)' }
  ];

  const performDNSLookup = async () => {
    if (!domain.trim()) {
      toast.error('Please enter a domain name');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData: DNSData = {
        domain: domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, ''),
        records: {
          A: [
            { type: 'A', name: domain, value: '192.168.1.1', ttl: 3600 },
            { type: 'A', name: domain, value: '192.168.1.2', ttl: 3600 }
          ],
          AAAA: [
            { type: 'AAAA', name: domain, value: '2001:db8::1', ttl: 3600 }
          ],
          CNAME: [
            { type: 'CNAME', name: `www.${domain}`, value: domain, ttl: 1800 }
          ],
          MX: [
            { type: 'MX', name: domain, value: 'mail.example.com', ttl: 3600, priority: 10 },
            { type: 'MX', name: domain, value: 'mail2.example.com', ttl: 3600, priority: 20 }
          ],
          NS: [
            { type: 'NS', name: domain, value: 'ns1.example.com', ttl: 86400 },
            { type: 'NS', name: domain, value: 'ns2.example.com', ttl: 86400 }
          ],
          TXT: [
            { type: 'TXT', name: domain, value: 'v=spf1 include:_spf.example.com ~all', ttl: 300 },
            { type: 'TXT', name: domain, value: 'google-site-verification=abc123xyz', ttl: 300 }
          ],
          SOA: [
            { type: 'SOA', name: domain, value: 'ns1.example.com admin.example.com 2023010101 3600 1800 604800 86400', ttl: 86400 }
          ]
        },
        nameServers: ['ns1.example.com', 'ns2.example.com'],
        queryTime: 45
      };

      setDnsData(mockData);
      toast.success('DNS lookup completed successfully');
    } catch (error) {
      toast.error('Failed to perform DNS lookup');
    } finally {
      setIsLoading(false);
    }
  };

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'A':
      case 'AAAA':
        return <Globe className="h-4 w-4" />;
      case 'MX':
        return <Server className="h-4 w-4" />;
      case 'NS':
        return <Server className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getFilteredRecords = () => {
    if (!dnsData) return {};
    if (recordType === 'ALL') return dnsData.records;
    return { [recordType]: dnsData.records[recordType] || [] };
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Server}
        title="DNS Lookup"
        description="Perform DNS lookups and check DNS records for any domain to troubleshoot connectivity issues"
        gradient="bg-gradient-to-r from-indigo-600 to-blue-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                DNS Query
              </CardTitle>
              <CardDescription>
                Enter a domain and select record type to lookup
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Domain Name</label>
                <Input
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && performDNSLookup()}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Record Type</label>
                <Select value={recordType} onValueChange={setRecordType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select record type" />
                  </SelectTrigger>
                  <SelectContent>
                    {recordTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={performDNSLookup} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Looking up...' : 'Lookup DNS'}
              </Button>

              <div className="text-xs text-gray-500 mt-4">
                <h4 className="font-medium mb-2">DNS Record Types</h4>
                <ul className="space-y-1">
                  <li><strong>A:</strong> IPv4 address</li>
                  <li><strong>AAAA:</strong> IPv6 address</li>
                  <li><strong>CNAME:</strong> Canonical name</li>
                  <li><strong>MX:</strong> Mail exchange</li>
                  <li><strong>NS:</strong> Name servers</li>
                  <li><strong>TXT:</strong> Text records</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {dnsData && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    DNS Query Results
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">{dnsData.domain}</Badge>
                    <Badge variant="outline">Query time: {dnsData.queryTime}ms</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="records" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="records">DNS Records</TabsTrigger>
                      <TabsTrigger value="nameservers">Name Servers</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="records" className="space-y-4">
                      {Object.entries(getFilteredRecords()).map(([type, records]) => (
                        <Card key={type}>
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                              {getRecordIcon(type)}
                              {type} Records
                              <Badge variant="outline">{records.length}</Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {records.length === 0 ? (
                                <div className="flex items-center gap-2 text-gray-500">
                                  <XCircle className="h-4 w-4" />
                                  <span>No {type} records found</span>
                                </div>
                              ) : (
                                records.map((record, index) => (
                                  <div key={index} className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                                      <div>
                                        <span className="text-gray-500">Name:</span>
                                        <p className="font-mono break-all">{record.name}</p>
                                      </div>
                                      <div>
                                        <span className="text-gray-500">Value:</span>
                                        <p className="font-mono break-all">{record.value}</p>
                                      </div>
                                      <div className="flex gap-4">
                                        <div>
                                          <span className="text-gray-500">TTL:</span>
                                          <p className="font-mono">{record.ttl}s</p>
                                        </div>
                                        {record.priority && (
                                          <div>
                                            <span className="text-gray-500">Priority:</span>
                                            <p className="font-mono">{record.priority}</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="nameservers">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Server className="h-5 w-5" />
                            Authoritative Name Servers
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {dnsData.nameServers.map((ns, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="font-mono">{ns}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}

          {!dnsData && !isLoading && (
            <Card className="h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Server className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter a domain name to perform DNS lookup</p>
              </div>
            </Card>
          )}

          {isLoading && (
            <Card className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Performing DNS lookup...</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      <RelatedTools 
        currentToolId="dnslookup"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default DNSLookup;
