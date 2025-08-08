
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, RefreshCw, Youtube } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

const YouTubeDescriptionGenerator = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [channelName, setChannelName] = useState('');
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDescriptions = () => {
    if (!videoTitle.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const descriptionTemplates = [
        `🎯 In this video, we dive deep into ${videoTitle}! \n\n${keywords ? `🔑 Key topics covered:\n• ${keywords.split(',').map(k => k.trim()).join('\n• ')}\n\n` : ''}📱 Don't forget to LIKE and SUBSCRIBE for more content!\n\n#${videoTitle.replace(/\s+/g, '')} #YouTube #${channelName || 'Channel'}`,
        
        `Welcome back to ${channelName || 'our channel'}! 👋\n\nToday's video is all about ${videoTitle}. ${keywords ? `We'll be covering ${keywords.split(',').slice(0, 3).join(', ')} and more!` : ''}\n\n⏰ Timestamps:\n0:00 Introduction\n2:30 Main content\n8:45 Conclusion\n\n💬 Let us know what you think in the comments below!\n\n🔔 Subscribe for weekly uploads!`,
        
        `🚀 ${videoTitle} - Everything you need to know!\n\n${keywords ? `In this comprehensive guide, we explore:\n${keywords.split(',').map((k, i) => `${i + 1}. ${k.trim()}`).join('\n')}\n\n` : ''}👍 If this video helped you, please give it a thumbs up!\n\n📢 Follow us for more:\n• Website: [Your Website]\n• Instagram: @${channelName || 'yourchannel'}\n• Twitter: @${channelName || 'yourchannel'}`
      ];
      
      setDescriptions(descriptionTemplates);
      setIsGenerating(false);
    }, 2000);
  };

  const copyDescription = (description: string) => {
    navigator.clipboard.writeText(description);
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Youtube}
          title="YouTube Description Generator"
          description="Generate engaging and SEO-optimized descriptions for your YouTube videos"
          gradient="bg-gradient-to-r from-red-600 to-red-500"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Video Information</CardTitle>
            <CardDescription>
              Enter your video details to generate optimized descriptions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="videoTitle">Video Title *</Label>
              <Input
                id="videoTitle"
                placeholder="e.g., How to Create Amazing YouTube Content"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input
                id="keywords"
                placeholder="e.g., YouTube tips, content creation, video editing"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="channelName">Channel Name</Label>
              <Input
                id="channelName"
                placeholder="Your channel name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />
            </div>
            <Button 
              onClick={generateDescriptions} 
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating...</>
              ) : (
                'Generate Descriptions'
              )}
            </Button>
          </CardContent>
        </Card>

        {descriptions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Descriptions</CardTitle>
              <CardDescription>
                Choose the description that best fits your video style
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {descriptions.map((description, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">Template {index + 1}</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyDescription(description)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <Textarea
                      value={description}
                      readOnly
                      rows={8}
                      className="text-sm"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <RelatedTools 
        currentToolId="youtubedescriptiongenerator"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default YouTubeDescriptionGenerator;
