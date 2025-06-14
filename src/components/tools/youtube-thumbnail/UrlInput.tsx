
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Youtube } from 'lucide-react';

interface UrlInputProps {
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  onGetThumbnails: () => void;
  loading: boolean;
}

const UrlInput = ({ videoUrl, setVideoUrl, onGetThumbnails, loading }: UrlInputProps) => {
  return (
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
            onClick={onGetThumbnails}
            disabled={loading}
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
          >
            {loading ? "Loading..." : "Get Thumbnails"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UrlInput;
