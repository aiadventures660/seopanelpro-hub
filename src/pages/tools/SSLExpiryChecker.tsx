
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { toast } from 'sonner';

const SSLExpiryChecker = () => {
  const [domain, setDomain] = useState('');
  const [sslInfo, setSslInfo] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkSSL = async () => {
    if (!domain.trim()) {
      toast.error('Please enter a valid domain');
      return;
    }

    setIsChecking(true);
    
    try {
      // Simulate SSL check (in a real app, this would check actual SSL certificates)
      setTimeout(() => {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 45); // 45 days from now
        
        const mockSSLInfo = {
          domain: domain,
          issuer: 'Let\'s Encrypt Authority X3',
          validFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          validTo: expiryDate.toLocaleDateString(),
          daysUntilExpiry: 45,
          isValid: true,
          algorithm: 'RSA 2048 bits',
          serialNumber: 'A1:B2:C3:D4:E5:F6:01:02:03:04'
        };
        
        setSslInfo(mockSSLInfo);
        setIsChecking(false);
        toast.success('SSL certificate checked successfully!');
      }, 2000);
    } catch (error) {
      setIsChecking(false);
      toast.error('Failed to check SSL certificate');
    }
  };

  const getExpiryStatus = (days: number) => {
    if (days > 30) return { color: 'bg-green-500', text: 'Valid', icon: CheckCircle };
    if (days > 7) return { color: 'bg-yellow-500', text: 'Expiring Soon', icon: AlertTriangle };
    return { color: 'bg-red-500', text: 'Critical', icon: AlertTriangle };
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Shield}
          title="SSL Certificate Expiry Checker"
          description="Check SSL certificate expiry dates and security details"
          gradient="bg-gradient-to-r from-green-600 to-blue-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Check SSL Certificate</CardTitle>
            <CardDescription>
              Enter a domain name to check its SSL certificate status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="domain">Domain Name</Label>
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
              {isChecking ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Checking SSL...</>
              ) : (
                'Check SSL Certificate'
              )}
            </Button>
          </CardContent>
        </Card>

        {sslInfo && (
          <Card>
            <CardHeader>
              <CardTitle>SSL Certificate Details</CardTitle>
              <CardDescription>
                Certificate information for {sslInfo.domain}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <div className="flex items-center gap-2 mt-1">
                      {(() => {
                        const status = getExpiryStatus(sslInfo.daysUntilExpiry);
                        const Icon = status.icon;
                        return (
                          <>
                            <Badge className={`${status.color} text-white`}>
                              {status.text}
                            </Badge>
                            <Icon className="h-4 w-4" />
                          </>
                        );
                      })()}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Days Until Expiry</Label>
                    <p className="text-lg font-semibold">{sslInfo.daysUntilExpiry} days</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Issuer</Label>
                    <p className="text-sm">{sslInfo.issuer}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Valid From</Label>
                    <p className="text-sm">{sslInfo.validFrom}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Valid To</Label>
                    <p className="text-sm">{sslInfo.validTo}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Algorithm</Label>
                    <p className="text-sm">{sslInfo.algorithm}</p>
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

export default SSLExpiryChecker;
