
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Image as ImageIcon } from 'lucide-react';

interface ThumbnailQuality {
  name: string;
  resolution: string;
  url: string;
}

interface ThumbnailCardProps {
  thumbnail: ThumbnailQuality;
  onDownload: (url: string, quality: string) => void;
}

const ThumbnailCard = ({ thumbnail, onDownload }: ThumbnailCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
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
          onClick={() => onDownload(thumbnail.url, thumbnail.name)}
          className="w-full"
          variant="outline"
        >
          <Download className="h-4 w-4 mr-2" />
          Download {thumbnail.resolution}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ThumbnailCard;
