import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Search, Globe, Calendar, Star, AlertCircle, CheckCircle, Copy, RefreshCw } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';
import { useToast } from '@/hooks/use-toast';

interface SerpData {
  title: string;
  metaDescription: string;
  url: string;
  domain: string;
}

const SerpPreview = () => {
  const [serpData, setSerpData] = useState<SerpData>({
    title: '',
    metaDescription: '',
    url: '',
    domain: ''
  });
  const [titleLength, setTitleLength] = useState(0);
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const { toast } = useToast();

  // Optimal lengths for SEO
  const TITLE_OPTIMAL_MIN = 30;
  const TITLE_OPTIMAL_MAX = 60;
  const DESCRIPTION_OPTIMAL_MIN = 120;
  const DESCRIPTION_OPTIMAL_MAX = 160;

  useEffect(() => {
    setTitleLength(serpData.title.length);
    setDescriptionLength(serpData.metaDescription.length);
  }, [serpData.title, serpData.metaDescription]);

  useEffect(() => {
    if (serpData.url) {
      try {
        const urlObj = new URL(serpData.url.startsWith('http') ? serpData.url : `https://${serpData.url}`);
        setSerpData(prev => ({ ...prev, domain: urlObj.hostname }));
      } catch {
        setSerpData(prev => ({ ...prev, domain: serpData.url }));
      }
    }
  }, [serpData.url]);

  const getTitleStatus = () => {
    if (titleLength === 0) return { status: 'empty', color: 'text-gray-500', message: 'Enter your title' };
    if (titleLength < TITLE_OPTIMAL_MIN) return { status: 'short', color: 'text-orange-600', message: 'Too short' };
    if (titleLength <= TITLE_OPTIMAL_MAX) return { status: 'optimal', color: 'text-green-600', message: 'Perfect length' };
    return { status: 'long', color: 'text-red-600', message: 'Too long - may be truncated' };
  };

  const getDescriptionStatus = () => {
    if (descriptionLength === 0) return { status: 'empty', color: 'text-gray-500', message: 'Enter your description' };
    if (descriptionLength < DESCRIPTION_OPTIMAL_MIN) return { status: 'short', color: 'text-orange-600', message: 'Too short' };
    if (descriptionLength <= DESCRIPTION_OPTIMAL_MAX) return { status: 'optimal', color: 'text-green-600', message: 'Perfect length' };
    return { status: 'long', color: 'text-red-600', message: 'Too long - may be truncated' };
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleInputChange = (field: keyof SerpData, value: string) => {
    setSerpData(prev => ({ ...prev, [field]: value }));
  };

  const generateSampleData = () => {
    const samples = [
      {
        title: "Best SEO Tools for 2025 | Complete Guide & Reviews",
        metaDescription: "Discover the top SEO tools of 2025. Comprehensive reviews, features comparison, and expert recommendations to boost your website rankings.",
        url: "https://seopanelprostudio.com/best-seo-tools-2025"
      },
      {
        title: "Ultimate Guide to Keyword Research | Free Tools & Tips",
        metaDescription: "Master keyword research with our ultimate guide. Learn proven strategies, discover free tools, and boost your content rankings effectively.",
        url: "https://seopanelprostudio.com/keyword-research-guide"
      },
      {
        title: "Technical SEO Checklist 2025 | Step-by-Step Guide",
        metaDescription: "Complete technical SEO checklist for 2025. Optimize site speed, fix crawl errors, and improve search rankings with our detailed guide.",
        url: "https://seopanelprostudio.com/technical-seo-checklist"
      }
    ];
    
    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    setSerpData(prev => ({ ...randomSample, domain: 'seopanelprostudio.com' }));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${type} has been copied to your clipboard.`,
    });
  };

  const clearAll = () => {
    setSerpData({
      title: '',
      metaDescription: '',
      url: '',
      domain: ''
    });
  };

  const titleStatus = getTitleStatus();
  const descriptionStatus = getDescriptionStatus();

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Eye}
        title="SERP Snippet Preview"
        description="Preview how your page will appear in Google search results and optimize for better click-through rates"
        gradient="bg-gradient-to-r from-blue-600 to-purple-600"
      />

      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">🎯 Search Engine Results Preview</h3>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          Optimize your title tags and meta descriptions to improve click-through rates and search rankings. 
          See exactly how your page will appear in Google search results.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                SEO Meta Information
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateSampleData}
                    className="text-xs"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Sample
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAll}
                    className="text-xs"
                  >
                    Clear
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* URL Input */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Globe className="inline h-4 w-4 mr-1" />
                  Page URL
                </label>
                <Input
                  placeholder="https://yourwebsite.com/page"
                  value={serpData.url}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  The URL of the page you want to preview
                </p>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title Tag
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 text-xs ${titleStatus.color}`}
                  >
                    {titleLength}/{TITLE_OPTIMAL_MAX}
                  </Badge>
                </label>
                <Input
                  placeholder="Enter your page title..."
                  value={serpData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-blue-500"
                  maxLength={80}
                />
                <div className="flex items-center justify-between mt-2">
                  <p className={`text-xs ${titleStatus.color}`}>
                    {titleStatus.status === 'optimal' ? (
                      <CheckCircle className="inline h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="inline h-3 w-3 mr-1" />
                    )}
                    {titleStatus.message}
                  </p>
                  {serpData.title && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(serpData.title, 'Title')}
                      className="text-xs h-6"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-2">
                  <div 
                    className={`h-1 rounded-full transition-all ${
                      titleStatus.status === 'optimal' ? 'bg-green-500' :
                      titleStatus.status === 'short' ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((titleLength / TITLE_OPTIMAL_MAX) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Meta Description Input */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Meta Description
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 text-xs ${descriptionStatus.color}`}
                  >
                    {descriptionLength}/{DESCRIPTION_OPTIMAL_MAX}
                  </Badge>
                </label>
                <Textarea
                  placeholder="Enter your meta description..."
                  value={serpData.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  className="min-h-[100px] transition-all focus:ring-2 focus:ring-blue-500"
                  maxLength={200}
                />
                <div className="flex items-center justify-between mt-2">
                  <p className={`text-xs ${descriptionStatus.color}`}>
                    {descriptionStatus.status === 'optimal' ? (
                      <CheckCircle className="inline h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="inline h-3 w-3 mr-1" />
                    )}
                    {descriptionStatus.message}
                  </p>
                  {serpData.metaDescription && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(serpData.metaDescription, 'Meta Description')}
                      className="text-xs h-6"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-2">
                  <div 
                    className={`h-1 rounded-full transition-all ${
                      descriptionStatus.status === 'optimal' ? 'bg-green-500' :
                      descriptionStatus.status === 'short' ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((descriptionLength / DESCRIPTION_OPTIMAL_MAX) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                SEO Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">Title Optimization</p>
                    <p className="text-green-700 dark:text-green-300 text-xs">
                      Keep titles between {TITLE_OPTIMAL_MIN}-{TITLE_OPTIMAL_MAX} characters. Include your main keyword near the beginning.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-200">Description Tips</p>
                    <p className="text-blue-700 dark:text-blue-300 text-xs">
                      Write compelling descriptions between {DESCRIPTION_OPTIMAL_MIN}-{DESCRIPTION_OPTIMAL_MAX} characters. Include a call-to-action.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-purple-800 dark:text-purple-200">Click-Through Rate</p>
                    <p className="text-purple-700 dark:text-purple-300 text-xs">
                      Use emotional triggers, numbers, and power words to increase CTR.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Google SERP Preview
                </span>
                <div className="flex gap-2">
                  <Button
                    variant={previewMode === 'desktop' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('desktop')}
                    className="text-xs"
                  >
                    Desktop
                  </Button>
                  <Button
                    variant={previewMode === 'mobile' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('mobile')}
                    className="text-xs"
                  >
                    Mobile
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Google Search Interface */}
              <div className="border rounded-lg p-4 bg-white dark:bg-gray-900">
                {/* Search Bar Mockup */}
                <div className="flex items-center gap-3 mb-6 pb-3 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
                      <Search className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-600">Google</span>
                  </div>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm text-gray-600">
                    {serpData.title || 'your search query'}
                  </div>
                </div>

                {/* SERP Result */}
                <div className={`${previewMode === 'mobile' ? 'max-w-sm' : 'max-w-2xl'} space-y-2`}>
                  {/* URL */}
                  <div className="flex items-center gap-2 text-xs">
                    <Globe className="h-3 w-3 text-gray-500" />
                    <span className="text-green-700 dark:text-green-400">
                      {serpData.domain || 'yourwebsite.com'}
                    </span>
                    <span className="text-gray-500">
                      {serpData.url ? ` › ${serpData.url.split('/').pop() || 'page'}` : ''}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer text-lg leading-snug">
                      {serpData.title ? 
                        truncateText(serpData.title, previewMode === 'mobile' ? 50 : 60) : 
                        'Your Page Title Will Appear Here | Brand Name'
                      }
                    </h3>
                  </div>

                  {/* Meta Description */}
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {serpData.metaDescription ? 
                        truncateText(serpData.metaDescription, previewMode === 'mobile' ? 120 : 160) : 
                        'Your meta description will appear here. This text should be compelling and include your target keywords to encourage users to click through to your website.'
                      }
                    </p>
                  </div>

                  {/* Additional Elements */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>2 days ago</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>4.8 rating</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Stats */}
              <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-lg font-bold text-blue-600">
                    {titleLength > 0 ? Math.round((titleLength / TITLE_OPTIMAL_MAX) * 100) : 0}%
                  </p>
                  <p className="text-xs text-blue-800 dark:text-blue-200">Title Usage</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <p className="text-lg font-bold text-purple-600">
                    {descriptionLength > 0 ? Math.round((descriptionLength / DESCRIPTION_OPTIMAL_MAX) * 100) : 0}%
                  </p>
                  <p className="text-xs text-purple-800 dark:text-purple-200">Description Usage</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Character Count Details */}
          <Card>
            <CardHeader>
              <CardTitle>Character Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Title Length</span>
                    <span className={titleStatus.color}>{titleLength} characters</span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>• Optimal: {TITLE_OPTIMAL_MIN}-{TITLE_OPTIMAL_MAX} characters</p>
                    <p>• Current status: {titleStatus.message}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Description Length</span>
                    <span className={descriptionStatus.color}>{descriptionLength} characters</span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>• Optimal: {DESCRIPTION_OPTIMAL_MIN}-{DESCRIPTION_OPTIMAL_MAX} characters</p>
                    <p>• Current status: {descriptionStatus.message}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <RelatedTools 
        currentToolId="serp-preview"
        currentCategory="SEO"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default SerpPreview;
