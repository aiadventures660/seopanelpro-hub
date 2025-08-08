
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, RefreshCw, Users, Video, Eye, Calendar } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

interface ChannelData {
  name: string;
  subscribers: string;
  videos: string;
  views: string;
  joinDate: string;
  description: string;
  avgViews: string;
  uploadFrequency: string;
  topTags: string[];
}

const YouTubeChannelAnalyzer = () => {
  const [channelUrl, setChannelUrl] = useState('');
  const [channelData, setChannelData] = useState<ChannelData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeChannel = () => {
    if (!channelUrl.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate channel analysis
    setTimeout(() => {
      const mockData: ChannelData = {
        name: "Tech Channel Pro",
        subscribers: "1.2M",
        videos: "342",
        views: "45.8M",
        joinDate: "Jan 15, 2020",
        description: "Welcome to Tech Channel Pro! We create content about technology, programming, and digital innovation.",
        avgViews: "134K",
        uploadFrequency: "3-4 videos/week",
        topTags: ["technology", "programming", "tutorial", "review", "coding", "software", "tech news", "gadgets"]
      };
      
      setChannelData(mockData);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Search}
          title="YouTube Channel Analyzer"
          description="Analyze YouTube channels to get insights on performance, content strategy, and audience engagement"
          gradient="bg-gradient-to-r from-purple-600 to-indigo-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Analyze Channel</CardTitle>
            <CardDescription>
              Enter a YouTube channel URL to get detailed analytics and insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="channelUrl">YouTube Channel URL</Label>
              <Input
                id="channelUrl"
                placeholder="https://www.youtube.com/@channelname or https://www.youtube.com/c/channelname"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
              />
            </div>
            <Button 
              onClick={analyzeChannel} 
              className="w-full"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Analyzing Channel...</>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Analyze Channel
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {channelData && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  {channelData.name}
                </CardTitle>
                <CardDescription>{channelData.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">{channelData.subscribers}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Subscribers</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Video className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold">{channelData.videos}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Videos</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Eye className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold">{channelData.views}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Views</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                    <div className="text-lg font-bold">{channelData.joinDate}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Join Date</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Average Views per Video:</span>
                  <Badge variant="secondary">{channelData.avgViews}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Upload Frequency:</span>
                  <Badge variant="secondary">{channelData.uploadFrequency}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Tags & Keywords</CardTitle>
                <CardDescription>Most frequently used tags by this channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {channelData.topTags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <RelatedTools 
        currentToolId="youtubechannelanalyzer"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default YouTubeChannelAnalyzer;
