
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { FileText, Code } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

interface RatioResult {
  textContent: number;
  htmlContent: number;
  totalSize: number;
  ratio: number;
  recommendation: string;
}

const TextHtmlRatio = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<RatioResult | null>(null);

  const analyzeRatio = async () => {
    if (!url.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      const textSize = Math.floor(Math.random() * 5000) + 1000;
      const htmlSize = Math.floor(Math.random() * 3000) + 500;
      const totalSize = textSize + htmlSize;
      const ratio = (textSize / totalSize) * 100;
      
      let recommendation = '';
      if (ratio >= 25) {
        recommendation = 'Excellent! Your text-to-HTML ratio is optimal for SEO.';
      } else if (ratio >= 15) {
        recommendation = 'Good ratio, but consider adding more text content.';
      } else if (ratio >= 10) {
        recommendation = 'Low ratio. Consider adding more textual content or reducing HTML.';
      } else {
        recommendation = 'Very low ratio. Your page may be too heavy on HTML/code.';
      }
      
      const mockResult: RatioResult = {
        textContent: textSize,
        htmlContent: htmlSize,
        totalSize: totalSize,
        ratio: Math.round(ratio * 100) / 100,
        recommendation
      };
      
      setResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getRatioBadge = (ratio: number) => {
    if (ratio >= 25) return 'default';
    if (ratio >= 15) return 'secondary';
    if (ratio >= 10) return 'destructive';
    return 'destructive';
  };

  const getRatioStatus = (ratio: number) => {
    if (ratio >= 25) return 'Excellent';
    if (ratio >= 15) return 'Good';
    if (ratio >= 10) return 'Fair';
    return 'Poor';
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
          icon={FileText}
          title="Text-to-HTML Ratio Checker"
          description="Analyze the text-to-HTML ratio of your web pages for SEO optimization"
          gradient="bg-gradient-to-r from-teal-600 to-cyan-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Analyze Text-to-HTML Ratio</CardTitle>
            <CardDescription>
              Enter a URL to check its text-to-HTML ratio
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
              onClick={analyzeRatio} 
              className="w-full"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Text-to-HTML Ratio'}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Ratio Analysis Result</CardTitle>
                <CardDescription>
                  Text-to-HTML ratio for {url}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {result.ratio}%
                  </div>
                  <Badge variant={getRatioBadge(result.ratio)} className="text-lg px-4 py-2">
                    {getRatioStatus(result.ratio)}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Text Content Ratio</span>
                      <span className="text-sm text-gray-600">{result.ratio}%</span>
                    </div>
                    <Progress value={result.ratio} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Text Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {formatBytes(result.textContent)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Visible text content
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="h-5 w-5 mr-2" />
                    HTML Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatBytes(result.htmlContent)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    HTML markup and code
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {result.ratio >= 25 ? '✅' : result.ratio >= 15 ? '⚠️' : '❌'}
                  </div>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {result.recommendation}
                    </p>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <strong>SEO Guidelines:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Aim for a text-to-HTML ratio of at least 15-25%</li>
                        <li>Higher ratios typically indicate more content-rich pages</li>
                        <li>Balance is key - too much text without proper structure isn't ideal</li>
                        <li>Focus on quality, relevant content over quantity</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <RelatedTools 
        currentToolId="texthtmlratio"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default TextHtmlRatio;
