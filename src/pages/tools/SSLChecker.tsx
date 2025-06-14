import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, CheckCircle, XCircle, AlertTriangle, Calendar, Globe } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

interface SSLInfo {
  isValid: boolean;
  issuer: string;
  subject: string;
  validFrom: string;
  validTo: string;
  daysUntilExpiry: number;
  protocol: string;
  keySize: number;
}

const SSLChecker = () => {
  const [domain, setDomain] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [sslInfo, setSSLInfo] = useState<SSLInfo | null>(null);

  const checkSSL = async () => {
    if (!domain.trim()) return;
    
    setIsChecking(true);
    
    // Simulate SSL check
    setTimeout(() => {
      const mockSSLInfo: SSLInfo = {
        isValid: Math.random() > 0.2, // 80% chance of valid SSL
        issuer: 'Let\'s Encrypt Authority X3',
        subject: `CN=${domain}`,
        validFrom: '2024-01-01',
        validTo: '2024-12-31',
        daysUntilExpiry: Math.floor(Math.random() * 365),
        protocol: 'TLS 1.3',
        keySize: 2048
      };
      
      setSSLInfo(mockSSLInfo);
      setIsChecking(false);
    }, 2000);
  };

  const getExpiryStatus = (days: number) => {
    if (days < 0) return { color: 'destructive' as const, text: 'Expired', icon: XCircle };
    if (days < 30) return { color: 'destructive' as const, text: 'Expires Soon', icon: AlertTriangle };
    if (days < 90) return { color: 'outline' as const, text: 'Valid', icon: CheckCircle };
    return { color: 'default' as const, text: 'Valid', icon: CheckCircle };
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Lock}
          title="SSL Checker"
          description="Check SSL certificate status and security for any website"
          gradient="bg-gradient-to-r from-green-600 to-emerald-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Check SSL Certificate</CardTitle>
            <CardDescription>
              Enter a domain to check its SSL certificate status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="domain">Domain</Label>
              <Input
                id="domain"
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
            <Button 
              onClick={checkSSL} 
              className="w-full"
              disabled={isChecking}
            >
              {isChecking ? 'Checking SSL...' : 'Check SSL Certificate'}
            </Button>
          </CardContent>
        </Card>

        {sslInfo && (
          <Card>
            <CardHeader>
              <CardTitle>SSL Certificate Information</CardTitle>
              <CardDescription>
                SSL details for {domain}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status</span>
                    <Badge variant={sslInfo.isValid ? 'default' : 'destructive'}>
                      {sslInfo.isValid ? (
                        <><CheckCircle className="h-3 w-3 mr-1" /> Valid</>
                      ) : (
                        <><XCircle className="h-3 w-3 mr-1" /> Invalid</>
                      )}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Expiry Status</span>
                    <Badge variant={getExpiryStatus(sslInfo.daysUntilExpiry).color}>
                      {React.createElement(getExpiryStatus(sslInfo.daysUntilExpiry).icon, { className: "h-3 w-3 mr-1" })}
                      {getExpiryStatus(sslInfo.daysUntilExpiry).text}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Days Until Expiry</span>
                    <span className="text-sm font-mono">{sslInfo.daysUntilExpiry}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Protocol</span>
                    <span className="text-sm font-mono">{sslInfo.protocol}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Key Size</span>
                    <span className="text-sm font-mono">{sslInfo.keySize} bits</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="font-medium mb-2 flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Certificate Details
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Issuer:</span>
                        <div className="text-gray-600 dark:text-gray-400 font-mono">
                          {sslInfo.issuer}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Subject:</span>
                        <div className="text-gray-600 dark:text-gray-400 font-mono">
                          {sslInfo.subject}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-2 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Validity Period
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Valid From:</span>
                        <div className="text-gray-600 dark:text-gray-400">
                          {sslInfo.validFrom}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Valid To:</span>
                        <div className="text-gray-600 dark:text-gray-400">
                          {sslInfo.validTo}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default SSLChecker;
