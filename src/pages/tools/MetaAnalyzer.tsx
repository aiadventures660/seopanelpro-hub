
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import MetaAnalysisCard from '@/components/tools/meta-analyzer/MetaAnalysisCard';
import OpenGraphCard from '@/components/tools/meta-analyzer/OpenGraphCard';
import { allTools } from '@/data/tools';

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
    
    setTimeout(() => {
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

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Search}
        title="Meta Tag Analyzer"
        description="Analyze and optimize your website's meta tags for better SEO performance"
        gradient="bg-gradient-to-r from-blue-600 to-purple-600"
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
          <MetaAnalysisCard
            title="Title Tag Analysis"
            content={metaData.title}
            length={metaData.title.length}
            minLength={30}
            maxLength={60}
          />

          <MetaAnalysisCard
            title="Meta Description Analysis"
            content={metaData.description}
            length={metaData.description.length}
            minLength={120}
            maxLength={160}
          />

          <OpenGraphCard metaData={metaData} />
        </div>
      )}

      <RelatedTools 
        currentToolId="meta-analyzer"
        currentCategory="SEO"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default MetaAnalyzer;
