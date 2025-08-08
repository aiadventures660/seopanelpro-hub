
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Copy, RefreshCw, Newspaper } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

const AIBlogTitleGenerator = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTitles = () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const titleTemplates = [
        `The Ultimate Guide to ${topic}`,
        `10 Proven Ways to Master ${topic}`,
        `How to ${topic}: A Step-by-Step Guide`,
        `${topic} Secrets That Experts Don't Want You to Know`,
        `The Complete Beginner's Guide to ${topic}`,
        `Why ${topic} is More Important Than You Think`,
        `${topic} 101: Everything You Need to Know`,
        `The Science Behind ${topic}: What Research Shows`,
        `Common ${topic} Mistakes and How to Avoid Them`,
        `${topic} Trends to Watch in 2024`
      ];
      
      setTitles(titleTemplates.slice(0, 8));
      setIsGenerating(false);
    }, 2000);
  };

  const copyTitle = (title: string) => {
    navigator.clipboard.writeText(title);
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Newspaper}
          title="AI Blog Title Generator"
          description="Generate catchy and SEO-friendly blog titles using AI"
          gradient="bg-gradient-to-r from-purple-600 to-pink-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate Blog Titles</CardTitle>
            <CardDescription>
              Enter your topic and keywords to generate engaging blog titles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topic">Blog Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., Digital Marketing, Cooking, Fitness"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="keywords">Keywords (optional)</Label>
              <Input
                id="keywords"
                placeholder="e.g., SEO, strategy, tips"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <Button 
              onClick={generateTitles} 
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating...</>
              ) : (
                'Generate Blog Titles'
              )}
            </Button>
          </CardContent>
        </Card>

        {titles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Blog Titles</CardTitle>
              <CardDescription>
                Click to copy any title to your clipboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {titles.map((title, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => copyTitle(title)}
                  >
                    <span className="flex-1 text-sm font-medium">{title}</span>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <RelatedTools 
        currentToolId="aiblogtitlegenerator"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default AIBlogTitleGenerator;
