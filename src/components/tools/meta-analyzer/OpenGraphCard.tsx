
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface MetaData {
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
}

interface OpenGraphCardProps {
  metaData: MetaData;
}

const OpenGraphCard = ({ metaData }: OpenGraphCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Open Graph Tags
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">OG Title:</p>
            <p className="font-medium text-sm">{metaData.ogTitle || "Not found"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">OG Description:</p>
            <p className="font-medium text-sm">{metaData.ogDescription || "Not found"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">OG Image:</p>
            <p className="font-medium text-sm">{metaData.ogImage || "Not found"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Canonical URL:</p>
            <p className="font-medium text-sm">{metaData.canonical || "Not found"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenGraphCard;
