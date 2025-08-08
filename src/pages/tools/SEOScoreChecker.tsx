
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

interface SEOCheck {
  name: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
}

const SEOScoreChecker = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [checks, setChecks] = useState<SEOCheck[]>([]);

  const analyzeURL = async () => {
    if (!url.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      const mockChecks: SEOCheck[] = [
        { name: 'Title Tag', status: 'pass', message: 'Title tag is present and optimized' },
        { name: 'Meta Description', status: 'pass', message: 'Meta description is present' },
        { name: 'H1 Tag', status: 'warning', message: 'Multiple H1 tags found' },
        { name: 'Images Alt Text', status: 'fail', message: 'Some images missing alt text' },
        { name: 'Page Load Speed', status: 'pass', message: 'Good loading speed' },
        { name: 'Mobile Friendly', status: 'pass', message: 'Page is mobile responsive' },
        { name: 'SSL Certificate', status: 'pass', message: 'HTTPS is enabled' },
        { name: 'Internal Links', status: 'warning', message: 'Could use more internal links' }
      ];
      
      const passCount = mockChecks.filter(check => check.status === 'pass').length;
      const calculatedScore = Math.round((passCount / mockChecks.length) * 100);
      
      setChecks(mockChecks);
      setScore(calculatedScore);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={TrendingUp}
          title="SEO Score Checker"
          description="Analyze your website's SEO score and get improvement recommendations"
          gradient="bg-gradient-to-r from-green-600 to-teal-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Analyze Website SEO</CardTitle>
            <CardDescription>
              Enter a URL to check its SEO performance
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
              onClick={analyzeURL} 
              className="w-full"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze SEO Score'}
            </Button>
          </CardContent>
        </Card>

        {score !== null && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>SEO Score</CardTitle>
                <CardDescription>
                  Overall SEO performance for {url}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
                    {score}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">out of 100</div>
                </div>
                <Progress value={score} className="mb-4" />
                <div className="text-center">
                  <Badge variant={score >= 80 ? 'default' : score >= 60 ? 'secondary' : 'destructive'}>
                    {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Improvement'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Analysis Details</CardTitle>
                <CardDescription>
                  Detailed breakdown of SEO factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {checks.map((check, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(check.status)}
                        <div>
                          <div className="font-medium">{check.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {check.message}
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          check.status === 'pass' ? 'default' : 
                          check.status === 'warning' ? 'secondary' : 'destructive'
                        }
                      >
                        {check.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        <RelatedTools 
          currentToolId="seo-score-checker"
          currentCategory="SEO"
          allTools={allTools}
        />
      </div>
    </ToolPageLayout>
  );
};

export default SEOScoreChecker;
