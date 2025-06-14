
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface MetaAnalysisCardProps {
  title: string;
  content: string;
  length: number;
  minLength: number;
  maxLength: number;
}

const MetaAnalysisCard = ({ title, content, length, minLength, maxLength }: MetaAnalysisCardProps) => {
  const getScoreColor = (length: number, min: number, max: number) => {
    if (length >= min && length <= max) return 'text-green-600';
    if (length < min || length > max) return 'text-red-600';
    return 'text-yellow-600';
  };

  const isGoodLength = length >= minLength && length <= maxLength;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current {title.split(' ')[0]}:</p>
            <p className="font-medium">{content}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={isGoodLength ? "default" : "destructive"}>
              Length: {length} characters
            </Badge>
            <span className={`text-sm ${getScoreColor(length, minLength, maxLength)}`}>
              {isGoodLength ? "✓ Good length" : `⚠ Should be ${minLength}-${maxLength} characters`}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetaAnalysisCard;
