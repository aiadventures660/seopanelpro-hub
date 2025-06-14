
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Youtube, Download, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ThumbnailQuality {
  name: string;
  resolution: string;
  url: string;
}

const YouTubeThumbnail = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnails, setThumbnails] = useState<ThumbnailQuality[]>([]);
  const [videoTitle, setVideoTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const getThumbnails = () => {
    const videoId = extractVideoId(videoUrl);
    
    if (!videoId) {
      toast({
        title: "Error",
        description: "Please enter a valid YouTube URL or video ID",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Generate thumbnail URLs
    const thumbnailQualities: ThumbnailQuality[] = [
      {
        name: "Max Resolution",
        resolution: "1280x720",
        url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      },
      {
        name: "Standard Definition",
        resolution: "640x480",
        url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
      },
      {
        name: "High Quality",
        resolution: "480x360",
        url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      },
      {
        name: "Medium Quality",
        resolution: "320x180",
        url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
      },
      {
        name: "Default",
        resolution: "120x90",
        url: `https://img.youtube.com/vi/${videoId}/default.jpg`
      }
    ];

    setThumbnails(thumbnailQualities);
    setVideoTitle(`Video ID: ${videoId}`);
    setLoading(false);
    
    toast({
      title: "Success",
      description: "Thumbnails loaded successfully!"
    });
  };

  const downloadThumbnail = async (url: string, quality: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `youtube-thumbnail-${quality.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      link.click();
      
      window.URL.revokeObjectURL(downloadUrl);
      
      toast({
        title: "Downloaded",
        description: `${quality} thumbnail downloaded successfully!`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download thumbnail",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl mb-6">
              <Youtube className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              YouTube Thumbnail Downloader
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Download high-quality thumbnails from any YouTube video in various resolutions
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-5 w-5" />
                Enter YouTube URL or Video ID
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="https://www.youtube.com/watch?v=VIDEO_ID or just VIDEO_ID"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={getThumbnails}
                  disabled={loading}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                >
                  {loading ? "Loading..." : "Get Thumbnails"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {thumbnails.length > 0 && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Available Thumbnails
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{videoTitle}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {thumbnails.map((thumbnail, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-lg">
                        <span className="flex items-center gap-2">
                          <ImageIcon className="h-5 w-5" />
                          {thumbnail.name}
                        </span>
                        <Badge variant="secondary">{thumbnail.resolution}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <img
                          src={thumbnail.url}
                          alt={`${thumbnail.name} thumbnail`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      <Button
                        onClick={() => downloadThumbnail(thumbnail.url, thumbnail.name)}
                        className="w-full"
                        variant="outline"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download {thumbnail.resolution}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {thumbnails.length === 0 && videoUrl && (
            <Card>
              <CardContent className="py-12 text-center">
                <Youtube className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
                  No thumbnails loaded yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Enter a YouTube URL and click "Get Thumbnails" to start
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default YouTubeThumbnail;
