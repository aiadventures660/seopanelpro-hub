
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, RefreshCw, Target, TrendingUp } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

const FacebookAdHeadlineGenerator = () => {
  const [product, setProduct] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [benefit, setBenefit] = useState('');
  const [adType, setAdType] = useState('Sales');
  const [headlines, setHeadlines] = useState<{ text: string; type: string }[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const adTypes = ['Sales', 'Lead Generation', 'Brand Awareness', 'Traffic', 'Engagement'];

  const generateHeadlines = () => {
    if (!product.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const headlineTemplates = [
        { text: `Get ${benefit || 'Amazing Results'} with ${product} - Limited Time Offer!`, type: 'Urgency' },
        { text: `${targetAudience ? `${targetAudience} Love` : 'People Love'} ${product} - See Why!`, type: 'Social Proof' },
        { text: `Discover the Secret to ${benefit || 'Success'} with ${product}`, type: 'Curiosity' },
        { text: `${product}: The #1 Choice for ${targetAudience || 'Smart Shoppers'}`, type: 'Authority' },
        { text: `Transform Your Life with ${product} - Start Today!`, type: 'Transformation' },
        { text: `Free Trial: Experience ${product} Risk-Free for 30 Days`, type: 'Risk-Free' },
        { text: `Don't Miss Out: ${product} at 50% Off This Week Only`, type: 'FOMO' },
        { text: `Join 10,000+ Happy Customers Who Love ${product}`, type: 'Numbers' },
        { text: `Why ${product} is Perfect for ${targetAudience || 'You'}`, type: 'Targeting' },
        { text: `${product} vs. Competitors: See the Difference`, type: 'Comparison' },
        { text: `The Easy Way to ${benefit || 'Get Results'} with ${product}`, type: 'Simplicity' },
        { text: `New: ${product} Makes ${benefit || 'Everything'} 10x Better`, type: 'Innovation' }
      ];
      
      setHeadlines(headlineTemplates);
      setIsGenerating(false);
    }, 2000);
  };

  const copyHeadline = (headline: string) => {
    navigator.clipboard.writeText(headline);
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Urgency': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      'Social Proof': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Curiosity': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Authority': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Transformation': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'Risk-Free': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
      'FOMO': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      'Numbers': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      'Targeting': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
      'Comparison': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'Simplicity': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
      'Innovation': 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Target}
          title="Facebook Ad Headline Generator"
          description="Create compelling and high-converting headlines for your Facebook advertising campaigns"
          gradient="bg-gradient-to-r from-blue-600 to-indigo-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ad Campaign Details</CardTitle>
            <CardDescription>
              Provide information about your product and target audience to generate effective headlines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="product">Product/Service Name *</Label>
              <Input
                id="product"
                placeholder="e.g., Fitness Course, CRM Software, Online Coaching"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                placeholder="e.g., Small Business Owners, Fitness Enthusiasts, Students"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="benefit">Main Benefit/Result</Label>
              <Input
                id="benefit"
                placeholder="e.g., Lose Weight Fast, Increase Sales, Save Time"
                value={benefit}
                onChange={(e) => setBenefit(e.target.value)}
              />
            </div>
            <div>
              <Label>Campaign Type</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {adTypes.map((type) => (
                  <Badge
                    key={type}
                    variant={adType === type ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setAdType(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
            <Button 
              onClick={generateHeadlines} 
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating Headlines...</>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Ad Headlines
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {headlines.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Headlines</CardTitle>
              <CardDescription>
                Click to copy any headline. Each headline uses different psychological triggers for maximum effectiveness.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {headlines.map((headline, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
                    onClick={() => copyHeadline(headline.text)}
                  >
                    <div className="flex-1 mr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`text-xs ${getTypeColor(headline.type)}`}>
                          {headline.type}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {headline.text}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">💡 Pro Tips for Facebook Ad Headlines:</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                  <li>• Keep headlines under 25 characters for mobile optimization</li>
                  <li>• Use numbers and specific benefits when possible</li>
                  <li>• Test multiple headlines to find your best performers</li>
                  <li>• Include emotional triggers like urgency or social proof</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default FacebookAdHeadlineGenerator;
