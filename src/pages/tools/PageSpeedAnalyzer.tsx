
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, Globe, Clock, Target, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

interface SpeedMetrics {
  performanceScore: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  speedIndex: number;
  timeToInteractive: number;
  totalBlockingTime: number;
}

interface SpeedAnalysis {
  url: string;
  metrics: SpeedMetrics;
  suggestions: string[];
}

const PageSpeedAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SpeedAnalysis | null>(null);
  const { toast } = useToast();

  const analyzePageSpeed = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockAnalysis: SpeedAnalysis = {
        url,
        metrics: {
          performanceScore: Math.floor(Math.random() * 40) + 60,
          firstContentfulPaint: Math.random() * 2 + 1,
          largestContentfulPaint: Math.random() * 3 + 2,
          speedIndex: Math.random() * 4 + 2,
          timeToInteractive: Math.random() * 5 + 3,
          totalBlockingTime: Math.random() * 300 + 100
        },
        suggestions: [
          "Optimize images and use modern formats like WebP",
          "Minimize unused JavaScript and CSS",
          "Use a Content Delivery Network (CDN)",
          "Enable text compression (gzip/brotli)",
          "Reduce server response times",
          "Eliminate render-blocking resources"
        ]
      };
      
      setAnalysis(mockAnalysis);
      setLoading(false);
      
      toast({
        title: "Analysis Complete",
        description: "Page speed analysis has been completed!"
      });
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Zap}
        title="PageSpeed Analyzer"
        description="Analyze your website's loading speed and get optimization recommendations"
        gradient="bg-gradient-to-r from-green-600 to-blue-600"
      />

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Enter URL to Analyze
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={analyzePageSpeed}
              disabled={loading}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              {loading ? "Analyzing..." : "Analyze Speed"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBg(analysis.metrics.performanceScore)} mb-4`}>
                <span className={`text-2xl font-bold ${getScoreColor(analysis.metrics.performanceScore)}`}>
                  {analysis.metrics.performanceScore}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {analysis.metrics.performanceScore >= 90 ? "Excellent" : 
                 analysis.metrics.performanceScore >= 50 ? "Needs Improvement" : "Poor"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Core Web Vitals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">First Contentful Paint</p>
                  <p className="text-xl font-bold">{analysis.metrics.firstContentfulPaint.toFixed(1)}s</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Largest Contentful Paint</p>
                  <p className="text-xl font-bold">{analysis.metrics.largestContentfulPaint.toFixed(1)}s</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Zap className="h-6 w-6 text-green-600 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Speed Index</p>
                  <p className="text-xl font-bold">{analysis.metrics.speedIndex.toFixed(1)}s</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Optimization Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </ToolPageLayout>
  );
};

export default PageSpeedAnalyzer;
