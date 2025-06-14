
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, RefreshCw, Hash, Check } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { toast } from 'sonner';

const HashtagGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [hashtags, setHashtags] = useState<{ tag: string; popularity: string }[]>([]);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const platforms = ['Instagram', 'TikTok', 'YouTube Shorts', 'Facebook', 'Twitter'];

  const generateHashtags = () => {
    if (!keyword.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const baseHashtags = [
        { tag: `#${keyword.toLowerCase().replace(/\s+/g, '')}`, popularity: 'High' },
        { tag: `#${keyword.toLowerCase().replace(/\s+/g, '')}daily`, popularity: 'Medium' },
        { tag: `#${keyword.toLowerCase().replace(/\s+/g, '')}life`, popularity: 'High' },
        { tag: `#${keyword.toLowerCase().replace(/\s+/g, '')}love`, popularity: 'Medium' },
        { tag: `#${keyword.toLowerCase().replace(/\s+/g, '')}gram`, popularity: 'Low' },
        { tag: `#${keyword.toLowerCase().replace(/\s+/g, '')}addict`, popularity: 'Medium' },
        { tag: `#${keyword.toLowerCase().replace(/\s+/g, '')}er`, popularity: 'Low' },
        { tag: `#${keyword.toLowerCase().replace(/\s+/g, '')}time`, popularity: 'Medium' },
        { tag: `#amazing${keyword.toLowerCase().replace(/\s+/g, '')}`, popularity: 'Low' },
        { tag: `#best${keyword.toLowerCase().replace(/\s+/g, '')}`, popularity: 'Medium' }
      ];

      const platformSpecific = platform === 'Instagram' ? [
        { tag: '#instagood', popularity: 'High' },
        { tag: '#photooftheday', popularity: 'High' },
        { tag: '#instadaily', popularity: 'High' },
        { tag: '#reels', popularity: 'High' },
        { tag: '#explore', popularity: 'Medium' }
      ] : platform === 'TikTok' ? [
        { tag: '#fyp', popularity: 'High' },
        { tag: '#viral', popularity: 'High' },
        { tag: '#trending', popularity: 'High' },
        { tag: '#foryou', popularity: 'High' },
        { tag: '#tiktok', popularity: 'Medium' }
      ] : platform === 'YouTube Shorts' ? [
        { tag: '#shorts', popularity: 'High' },
        { tag: '#youtube', popularity: 'High' },
        { tag: '#viral', popularity: 'High' },
        { tag: '#trending', popularity: 'Medium' },
        { tag: '#subscribe', popularity: 'Medium' }
      ] : [
        { tag: '#viral', popularity: 'High' },
        { tag: '#trending', popularity: 'High' },
        { tag: '#share', popularity: 'Medium' },
        { tag: '#follow', popularity: 'Medium' },
        { tag: '#like', popularity: 'Low' }
      ];

      const allHashtags = [...baseHashtags, ...platformSpecific];
      setHashtags(allHashtags);
      setSelectedHashtags([]);
      setIsGenerating(false);
    }, 1500);
  };

  const toggleHashtag = (hashtag: string) => {
    if (selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(selectedHashtags.filter(h => h !== hashtag));
    } else {
      if (selectedHashtags.length < 30) {
        setSelectedHashtags([...selectedHashtags, hashtag]);
      } else {
        toast.error('Maximum 30 hashtags recommended');
      }
    }
  };

  const copyHashtags = () => {
    const hashtagString = selectedHashtags.join(' ');
    navigator.clipboard.writeText(hashtagString);
    toast.success('Hashtags copied to clipboard!');
  };

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case 'High': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Hash}
          title="Hashtag Generator for Reels/Shorts"
          description="Generate trending hashtags to boost your content's reach and discoverability"
          gradient="bg-gradient-to-r from-indigo-600 to-purple-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate Hashtags</CardTitle>
            <CardDescription>
              Enter your content topic and platform to get relevant hashtag suggestions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="keyword">Content Topic *</Label>
              <Input
                id="keyword"
                placeholder="e.g., fitness, food, travel, fashion"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div>
              <Label>Platform</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {platforms.map((platformOption) => (
                  <Badge
                    key={platformOption}
                    variant={platform === platformOption ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setPlatform(platformOption)}
                  >
                    {platformOption}
                  </Badge>
                ))}
              </div>
            </div>
            <Button 
              onClick={generateHashtags} 
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating...</>
              ) : (
                'Generate Hashtags'
              )}
            </Button>
          </CardContent>
        </Card>

        {hashtags.length > 0 && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Suggested Hashtags for {platform}</CardTitle>
                <CardDescription>
                  Click on hashtags to select them. Colors indicate popularity levels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-green-500"></div>
                      <span>High popularity</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-yellow-500"></div>
                      <span>Medium popularity</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-blue-500"></div>
                      <span>Low competition</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((item, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer transition-all border rounded-lg p-2 ${
                        selectedHashtags.includes(item.tag)
                          ? 'bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-400'
                          : 'bg-white border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700'
                      }`}
                      onClick={() => toggleHashtag(item.tag)}
                    >
                      <div className="flex items-center gap-2">
                        {selectedHashtags.includes(item.tag) && (
                          <Check className="h-3 w-3 text-blue-600" />
                        )}
                        <span className="font-mono text-sm">{item.tag}</span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getPopularityColor(item.popularity)}`}
                        >
                          {item.popularity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedHashtags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Hashtags ({selectedHashtags.length}/30)</CardTitle>
                  <CardDescription>
                    Your selected hashtags ready to copy and paste
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-sm font-mono break-all">
                        {selectedHashtags.join(' ')}
                      </div>
                    </div>
                    <Button onClick={copyHashtags} className="w-full">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy All Hashtags
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default HashtagGenerator;
