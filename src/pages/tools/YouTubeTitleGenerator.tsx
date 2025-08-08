
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Copy, RefreshCw, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

const YouTubeTitleGenerator = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const titleTemplates = [
    "How to {topic} in {year} (Complete Guide)",
    "{topic}: Everything You Need to Know",
    "The Ultimate {topic} Tutorial for Beginners",
    "{topic} Tips That Actually Work",
    "5 Amazing {topic} Tricks You Need to Try",
    "{topic} vs {alternative}: Which is Better?",
    "Why {topic} is Important in {year}",
    "The Best {topic} Strategy for {year}",
    "{topic} Mistakes Everyone Makes (Avoid These!)",
    "From Zero to Hero: Master {topic} Fast",
    "{topic}: The Complete Beginner's Guide",
    "10 {topic} Secrets Pros Don't Want You to Know",
    "Is {topic} Worth It? (Honest Review)",
    "{topic} Explained in 5 Minutes",
    "The Future of {topic}: What's Coming Next"
  ];

  const generateTitles = () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic to generate titles.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simulate generation delay
    setTimeout(() => {
      const keywordList = keywords.split(',').map(k => k.trim()).filter(k => k);
      const titles = titleTemplates.map(template => {
        let title = template.replace(/\{topic\}/g, topic);
        title = title.replace(/\{year\}/g, new Date().getFullYear().toString());
        
        if (template.includes('{alternative}') && keywordList.length > 0) {
          title = title.replace(/\{alternative\}/g, keywordList[Math.floor(Math.random() * keywordList.length)]);
        }
        
        return title;
      });

      // Shuffle and take 10 titles
      const shuffled = titles.sort(() => 0.5 - Math.random()).slice(0, 10);
      setGeneratedTitles(shuffled);
      setIsGenerating(false);
    }, 1000);
  };

  const copyTitle = (title: string) => {
    navigator.clipboard.writeText(title);
    toast({
      title: "Copied!",
      description: "Title copied to clipboard."
    });
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Video}
        title="YouTube Title Generator"
        description="Generate catchy and SEO-friendly YouTube video titles that drive views and engagement"
        gradient="bg-gradient-to-r from-red-500 to-red-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Generate Titles</CardTitle>
            <CardDescription>
              Enter your video topic and optional keywords to generate engaging titles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topic">Video Topic *</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., cooking pasta, guitar tutorial, productivity tips"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="keywords">Keywords (optional)</Label>
              <Input
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., easy, beginner, 2024"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate multiple keywords with commas
              </p>
            </div>

            <Button 
              onClick={generateTitles} 
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Video className="h-4 w-4 mr-2" />
                  Generate Titles
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Titles</CardTitle>
            <CardDescription>
              Click any title to copy it to your clipboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedTitles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Generated titles will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {generatedTitles.map((title, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors group"
                    onClick={() => copyTitle(title)}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium pr-2">{title}</p>
                      <Copy className="h-4 w-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {title.length} characters
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Tips for Great YouTube Titles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Length Guidelines</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Keep titles under 60 characters</li>
                <li>• Most important words should come first</li>
                <li>• Avoid clickbait that doesn't deliver</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Engagement Tips</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Use numbers and lists (Top 5, 10 Ways)</li>
                <li>• Include emotional triggers</li>
                <li>• Add brackets for context [2024]</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <RelatedTools 
        currentToolId="youtubetitlegenerator"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default YouTubeTitleGenerator;
