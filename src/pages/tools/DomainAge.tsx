
import React, { useState } from 'react';
import { Calendar, Globe, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/sonner';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

interface DomainAgeData {
  domain: string;
  registrationDate: string;
  expirationDate: string;
  ageInYears: number;
  ageInDays: number;
  daysUntilExpiration: number;
  status: 'active' | 'expiring-soon' | 'expired';
  registrar: string;
}

const DomainAge = () => {
  const [domain, setDomain] = useState('');
  const [domainData, setDomainData] = useState<DomainAgeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkDomainAge = async () => {
    if (!domain.trim()) {
      toast.error('Please enter a domain name');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const registrationDate = new Date('2015-06-20');
      const expirationDate = new Date('2025-06-20');
      const now = new Date();
      
      const ageInDays = Math.floor((now.getTime() - registrationDate.getTime()) / (1000 * 60 * 60 * 24));
      const ageInYears = Math.floor(ageInDays / 365);
      const daysUntilExpiration = Math.floor((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      let status: 'active' | 'expiring-soon' | 'expired' = 'active';
      if (daysUntilExpiration < 0) status = 'expired';
      else if (daysUntilExpiration < 30) status = 'expiring-soon';

      const mockData: DomainAgeData = {
        domain: domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, ''),
        registrationDate: registrationDate.toISOString().split('T')[0],
        expirationDate: expirationDate.toISOString().split('T')[0],
        ageInYears,
        ageInDays,
        daysUntilExpiration,
        status,
        registrar: 'Namecheap, Inc.'
      };

      setDomainData(mockData);
      toast.success('Domain age check completed');
    } catch (error) {
      toast.error('Failed to check domain age');
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'expiring-soon': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getExpirationProgress = () => {
    if (!domainData) return 0;
    const totalDays = 365; // Assume 1 year registration
    const remainingDays = Math.max(0, domainData.daysUntilExpiration);
    return Math.max(0, Math.min(100, (remainingDays / totalDays) * 100));
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Calendar}
        title="Domain Age Checker"
        description="Check the age and registration date of any domain name to understand its history and credibility"
        gradient="bg-gradient-to-r from-purple-600 to-pink-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Check Domain Age
              </CardTitle>
              <CardDescription>
                Enter a domain to check its registration date and age
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Domain Name</label>
                <Input
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkDomainAge()}
                />
              </div>
              
              <Button 
                onClick={checkDomainAge} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Checking...' : 'Check Domain Age'}
              </Button>

              <div className="text-xs text-gray-500 mt-4">
                <h4 className="font-medium mb-2">Why Check Domain Age?</h4>
                <ul className="space-y-1">
                  <li>• Older domains are often more trusted by search engines</li>
                  <li>• Age indicates stability and credibility</li>
                  <li>• Important for SEO and domain valuation</li>
                  <li>• Helps identify potential scam sites</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {domainData && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Domain Age Overview
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{domainData.domain}</Badge>
                    <Badge className={getStatusColor(domainData.status)}>
                      {domainData.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <Clock className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{domainData.ageInYears}</p>
                      <p className="text-sm text-gray-500">Years Old</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-300" />
                      </div>
                      <p className="text-2xl font-bold text-green-600">{domainData.ageInDays}</p>
                      <p className="text-sm text-gray-500">Total Days</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <AlertCircle className="h-8 w-8 text-purple-600 dark:text-purple-300" />
                      </div>
                      <p className="text-2xl font-bold text-purple-600">{Math.max(0, domainData.daysUntilExpiration)}</p>
                      <p className="text-sm text-gray-500">Days Until Expiry</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Registration Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Registration Date</p>
                        <p className="font-medium">{formatDate(domainData.registrationDate)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Expiration Date</p>
                        <p className="font-medium">{formatDate(domainData.expirationDate)}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Registrar</p>
                        <p className="font-medium">{domainData.registrar}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Time Until Expiration</p>
                        <Progress value={getExpirationProgress()} className="w-full" />
                        <p className="text-xs text-gray-500 mt-1">
                          {domainData.daysUntilExpiration > 0 
                            ? `${domainData.daysUntilExpiration} days remaining` 
                            : 'Domain has expired'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Domain Age Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {domainData.ageInYears >= 5 && (
                      <div className="flex items-center gap-2 text-green-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm">Excellent: Very established domain with strong age credibility</span>
                      </div>
                    )}
                    {domainData.ageInYears >= 2 && domainData.ageInYears < 5 && (
                      <div className="flex items-center gap-2 text-blue-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm">Good: Mature domain with decent age for SEO benefits</span>
                      </div>
                    )}
                    {domainData.ageInYears < 2 && (
                      <div className="flex items-center gap-2 text-yellow-600">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                        <span className="text-sm">Young: Relatively new domain, building credibility over time</span>
                      </div>
                    )}
                    {domainData.daysUntilExpiration < 30 && domainData.daysUntilExpiration > 0 && (
                      <div className="flex items-center gap-2 text-orange-600">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                        <span className="text-sm">Warning: Domain expiring soon, consider renewal</span>
                      </div>
                    )}
                    {domainData.daysUntilExpiration <= 0 && (
                      <div className="flex items-center gap-2 text-red-600">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="text-sm">Alert: Domain has expired and may be available for registration</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!domainData && !isLoading && (
            <Card className="h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter a domain name to check its age and registration details</p>
              </div>
            </Card>
          )}

          {isLoading && (
            <Card className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Checking domain age...</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default DomainAge;
