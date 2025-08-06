
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import UrlInput from '@/components/tools/youtube-thumbnail/UrlInput';
import ThumbnailCard from '@/components/tools/youtube-thumbnail/ThumbnailCard';
import { allTools } from '@/data/tools';

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
    <ToolPageLayout>
      <ToolHeader
        icon={Youtube}
        title="YouTube Thumbnail Downloader"
        description="Download high-quality thumbnails from any YouTube video in various resolutions"
        gradient="bg-gradient-to-r from-red-600 to-pink-600"
      />

      <UrlInput
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        onGetThumbnails={getThumbnails}
        loading={loading}
      />

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
              <ThumbnailCard
                key={index}
                thumbnail={thumbnail}
                onDownload={downloadThumbnail}
              />
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

      <RelatedTools 
        currentToolId="youtube-thumbnail"
        currentCategory="Social Media"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default YouTubeThumbnail;
