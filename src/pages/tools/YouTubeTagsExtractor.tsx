
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Search, Tag, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

const YouTubeTagsExtractor = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [extractedTags, setExtractedTags] = useState<string[]>([]);
  const [videoTitle, setVideoTitle] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const { toast } = useToast();

  // Sample tags for demonstration (in a real app, this would call YouTube API)
  const sampleTags = [
    'tutorial', 'how to', 'beginner guide', 'step by step', 'tips and tricks',
    'best practices', 'complete guide', 'easy tutorial', 'for beginners',
    'advanced tips', 'pro tips', 'must know', 'essential', 'ultimate guide',
    'quick tips', 'explained', 'demonstration', 'walkthrough', 'mastery',
    'secrets', 'hacks', 'strategies', 'techniques', 'methods'
  ];

  const extractTags = () => {
    if (!videoUrl.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a YouTube video URL.",
        variant: "destructive"
      });
      return;
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (!youtubeRegex.test(videoUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube video URL.",
        variant: "destructive"
      });
      return;
    }

    setIsExtracting(true);

    // Simulate extraction process
    setTimeout(() => {
      // In a real implementation, this would extract actual tags from the video
      const randomTags = sampleTags
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 15) + 8);
      
      setExtractedTags(randomTags);
      setVideoTitle("Sample Video Title - Tutorial & Guide");
      setIsExtracting(false);
      
      toast({
        title: "Tags Extracted!",
        description: `Found ${randomTags.length} tags from the video.`
      });
    }, 1500);
  };

  const copyTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
    toast({
      title: "Copied!",
      description: `Tag "${tag}" copied to clipboard.`
    });
  };

  const copyAllTags = () => {
    const allTags = extractedTags.join(', ');
    navigator.clipboard.writeText(allTags);
    toast({
      title: "All Tags Copied!",
      description: `${extractedTags.length} tags copied to clipboard.`
    });
  };

  const getVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Tag}
        title="YouTube Tags Extractor"
        description="Extract tags from any YouTube video to analyze content strategy and discover trending keywords"
        gradient="bg-gradient-to-r from-blue-500 to-blue-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Extract Tags</CardTitle>
            <CardDescription>
              Enter a YouTube video URL to extract its tags and keywords
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="videoUrl">YouTube Video URL *</Label>
              <Input
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Paste the full URL of any YouTube video
              </p>
            </div>

            <Button 
              onClick={extractTags} 
              className="w-full"
              disabled={isExtracting}
            >
              {isExtracting ? (
                <>
                  <Search className="h-4 w-4 mr-2 animate-pulse" />
                  Extracting Tags...
                </>
              ) : (
                <>
                  <Tag className="h-4 w-4 mr-2" />
                  Extract Tags
                </>
              )}
            </Button>

            {videoTitle && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Video Title:
                </p>
                <p className="text-sm">{videoTitle}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Extracted Tags</CardTitle>
                <CardDescription>
                  Click any tag to copy it individually
                </CardDescription>
              </div>
              {extractedTags.length > 0 && (
                <Button variant="outline" size="sm" onClick={copyAllTags}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {extractedTags.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Tag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Extracted tags will appear here</p>
                <p className="text-sm mt-2">Enter a YouTube URL and click "Extract Tags"</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    {extractedTags.length} tags found
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {extractedTags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                      onClick={() => copyTag(tag)}
                    >
                      {tag}
                      <Copy className="h-3 w-3 ml-1 opacity-50" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How to Use YouTube Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Research Strategy
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Analyze competitor videos</li>
                <li>• Find trending keywords</li>
                <li>• Discover content gaps</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                Tag Optimization
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Use 10-15 relevant tags</li>
                <li>• Mix broad and specific terms</li>
                <li>• Include your brand name</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                Best Practices
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Research before creating content</li>
                <li>• Update tags based on performance</li>
                <li>• Monitor trending topics</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolPageLayout>
  );
};

export default YouTubeTagsExtractor;
