
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Twitter, Hash } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

const AITweetGenerator = () => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [tweets, setTweets] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTweets = () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const tweetTemplates = {
        professional: [
          `Just learned something valuable about ${topic}. The key insight? [insight here]. What's your experience been?`,
          `${topic} is evolving rapidly. Here are 3 trends to watch: 1) [trend], 2) [trend], 3) [trend]. Thoughts?`,
          `Quick tip for ${topic}: [specific actionable advice]. Have you tried this approach?`
        ],
        casual: [
          `Okay, can we talk about ${topic}? Because I just had a revelation 🤯`,
          `Me trying to understand ${topic}: 📚➡️🤔➡️💡➡️😅 Anyone else relate?`,
          `${topic} hits different when you finally get it. What was your aha moment?`
        ],
        inspirational: [
          `${topic} taught me that growth happens outside your comfort zone. What challenge are you embracing today?`,
          `Every expert in ${topic} was once a beginner. Your journey starts with the first step. 💪`,
          `The beauty of ${topic} isn't just in the outcome—it's in who you become along the way. ✨`
        ]
      };
      
      const selectedTemplates = tweetTemplates[tone as keyof typeof tweetTemplates];
      const hashtags = includeHashtags ? ` #${topic.replace(/\s+/g, '')} #motivation #growth` : '';
      
      const generatedTweets = selectedTemplates.map(template => template + hashtags);
      
      setTweets(generatedTweets);
      setIsGenerating(false);
    }, 1500);
  };

  const copyTweet = (tweet: string) => {
    navigator.clipboard.writeText(tweet);
  };

  const getCharacterCount = (tweet: string) => {
    return tweet.length;
  };

  const getCharacterCountColor = (count: number) => {
    if (count <= 240) return 'text-green-600';
    if (count <= 270) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Twitter}
          title="AI Tweet Generator"
          description="Generate engaging tweets and social media posts with AI"
          gradient="bg-gradient-to-r from-sky-600 to-blue-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate Tweets</CardTitle>
            <CardDescription>
              Enter your topic and preferences to generate engaging tweets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., artificial intelligence, productivity, startups"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="inspirational">Inspirational</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="hashtags"
                checked={includeHashtags}
                onChange={(e) => setIncludeHashtags(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="hashtags">Include hashtags</Label>
            </div>
            <Button 
              onClick={generateTweets} 
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating Tweets...</>
              ) : (
                'Generate Tweets'
              )}
            </Button>
          </CardContent>
        </Card>

        {tweets.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Tweets</CardTitle>
              <CardDescription>
                Click to copy any tweet to your clipboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tweets.map((tweet, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => copyTweet(tweet)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Twitter className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Tweet {index + 1}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs ${getCharacterCountColor(getCharacterCount(tweet))}`}>
                          {getCharacterCount(tweet)}/280
                        </span>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">{tweet}</p>
                    {includeHashtags && (
                      <div className="flex items-center mt-2 text-blue-600">
                        <Hash className="h-3 w-3 mr-1" />
                        <span className="text-xs">Hashtags included</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <RelatedTools 
        currentToolId="aitweetgenerator"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default AITweetGenerator;
