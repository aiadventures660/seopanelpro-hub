
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, RefreshCw, Tag, Check } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';
import { toast } from 'sonner';

const YouTubeTagsSuggestion = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTags = () => {
    if (!keyword.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const baseTags = [
        keyword.toLowerCase(),
        `${keyword.toLowerCase()} tutorial`,
        `${keyword.toLowerCase()} guide`,
        `${keyword.toLowerCase()} tips`,
        `how to ${keyword.toLowerCase()}`,
        `${keyword.toLowerCase()} 2024`,
        `${keyword.toLowerCase()} beginner`,
        `${keyword.toLowerCase()} advanced`,
        `${keyword.toLowerCase()} review`,
        `${keyword.toLowerCase()} explained`,
        `best ${keyword.toLowerCase()}`,
        `${keyword.toLowerCase()} course`,
        `learn ${keyword.toLowerCase()}`,
        `${keyword.toLowerCase()} examples`,
        `${keyword.toLowerCase()} step by step`
      ];

      const categoryTags = category ? [
        category.toLowerCase(),
        `${category.toLowerCase()} content`,
        `${category.toLowerCase()} channel`
      ] : [];

      const allTags = [...baseTags, ...categoryTags];
      setTags(allTags.slice(0, 20));
      setSelectedTags([]);
      setIsGenerating(false);
    }, 1500);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 15) {
        setSelectedTags([...selectedTags, tag]);
      } else {
        toast.error('Maximum 15 tags allowed');
      }
    }
  };

  const copyTags = () => {
    const tagString = selectedTags.join(', ');
    navigator.clipboard.writeText(tagString);
    toast.success('Tags copied to clipboard!');
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Tag}
          title="YouTube Tags Suggestion Tool"
          description="Generate relevant and trending tags for better video discoverability"
          gradient="bg-gradient-to-r from-blue-600 to-cyan-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate YouTube Tags</CardTitle>
            <CardDescription>
              Enter your main keyword to get tag suggestions that can improve your video's reach
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="keyword">Main Keyword *</Label>
              <Input
                id="keyword"
                placeholder="e.g., web development, cooking, fitness"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Video Category (optional)</Label>
              <Input
                id="category"
                placeholder="e.g., education, entertainment, technology"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <Button 
              onClick={generateTags} 
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating Tags...</>
              ) : (
                'Generate Tags'
              )}
            </Button>
          </CardContent>
        </Card>

        {tags.length > 0 && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Suggested Tags</CardTitle>
                <CardDescription>
                  Click on tags to select them. Maximum 15 tags recommended for optimal performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                      onClick={() => toggleTag(tag)}
                    >
                      {selectedTags.includes(tag) && <Check className="h-3 w-3 mr-1" />}
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedTags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Tags ({selectedTags.length}/15)</CardTitle>
                  <CardDescription>
                    Your selected tags ready to use in your YouTube video
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-sm font-mono break-all">
                        {selectedTags.join(', ')}
                      </div>
                    </div>
                    <Button onClick={copyTags} className="w-full">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Selected Tags
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      <RelatedTools 
        currentToolId="youtubetagssuggestion"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default YouTubeTagsSuggestion;
