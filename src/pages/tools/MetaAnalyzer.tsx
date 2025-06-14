
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle, AlertCircle, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface MetaData {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
  robots: string;
}

const MetaAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const { toast } = useToast();

  const analyzeUrl = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call - in real app, this would fetch and parse the actual page
    setTimeout(() => {
      // Mock data for demonstration
      const mockData: MetaData = {
        title: "Sample Page Title - 45 characters",
        description: "This is a sample meta description that shows how the tool analyzes your page content for SEO optimization.",
        keywords: "seo, meta tags, analysis, optimization",
        ogTitle: "Sample Page Title for Social Media",
        ogDescription: "Social media optimized description for better sharing.",
        ogImage: "https://example.com/og-image.jpg",
        canonical: url,
        robots: "index, follow"
      };
      
      setMetaData(mockData);
      setLoading(false);
      
      toast({
        title: "Analysis Complete",
        description: "Meta tags have been analyzed successfully!"
      });
    }, 2000);
  };

  const getScoreColor = (length: number, min: number, max: number) => {
    if (length >= min && length <= max) return 'text-green-600';
    if (length < min || length > max) return 'text-red-600';
    return 'text-yellow-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meta Tag Analyzer
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Analyze and optimize your website's meta tags for better SEO performance
            </p>
          </div>

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
                  onClick={analyzeUrl}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {loading ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {metaData && (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Title Tag Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Title:</p>
                      <p className="font-medium">{metaData.title}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={metaData.title.length >= 30 && metaData.title.length <= 60 ? "default" : "destructive"}>
                        Length: {metaData.title.length} characters
                      </Badge>
                      <span className={`text-sm ${getScoreColor(metaData.title.length, 30, 60)}`}>
                        {metaData.title.length >= 30 && metaData.title.length <= 60 ? "✓ Good length" : "⚠ Should be 30-60 characters"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Meta Description Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Description:</p>
                      <p className="font-medium">{metaData.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={metaData.description.length >= 120 && metaData.description.length <= 160 ? "default" : "destructive"}>
                        Length: {metaData.description.length} characters
                      </Badge>
                      <span className={`text-sm ${getScoreColor(metaData.description.length, 120, 160)}`}>
                        {metaData.description.length >= 120 && metaData.description.length <= 160 ? "✓ Good length" : "⚠ Should be 120-160 characters"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Open Graph Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">OG Title:</p>
                      <p className="font-medium text-sm">{metaData.ogTitle || "Not found"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">OG Description:</p>
                      <p className="font-medium text-sm">{metaData.ogDescription || "Not found"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">OG Image:</p>
                      <p className="font-medium text-sm">{metaData.ogImage || "Not found"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Canonical URL:</p>
                      <p className="font-medium text-sm">{metaData.canonical || "Not found"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MetaAnalyzer;
