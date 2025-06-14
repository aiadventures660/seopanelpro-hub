
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, RefreshCw, List } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

const BulletPointConverter = () => {
  const [bulletPoints, setBulletPoints] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  const convertBulletPoints = () => {
    if (!bulletPoints.trim()) return;
    
    setIsConverting(true);
    
    setTimeout(() => {
      const points = bulletPoints
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^[-•*]\s*/, '').trim());
      
      const convertedParagraph = points.join('. ') + '.';
      const polishedParagraph = convertedParagraph
        .replace(/\.\./g, '.')
        .replace(/([.!?])\s*([a-z])/g, (match, p1, p2) => p1 + ' ' + p2.toUpperCase());
      
      setParagraph(polishedParagraph);
      setIsConverting(false);
    }, 1000);
  };

  const copyParagraph = () => {
    navigator.clipboard.writeText(paragraph);
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={List}
          title="Bullet Point to Paragraph Converter"
          description="Convert bullet points into well-structured, flowing paragraphs"
          gradient="bg-gradient-to-r from-green-600 to-teal-600"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Bullet Points</CardTitle>
              <CardDescription>
                Enter your bullet points (one per line)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bulletPoints">Bullet Points</Label>
                <Textarea
                  id="bulletPoints"
                  placeholder="• First point&#10;• Second point&#10;• Third point"
                  value={bulletPoints}
                  onChange={(e) => setBulletPoints(e.target.value)}
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
              <Button 
                onClick={convertBulletPoints} 
                className="w-full"
                disabled={isConverting}
              >
                {isConverting ? (
                  <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Converting...</>
                ) : (
                  'Convert to Paragraph'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Converted Paragraph</CardTitle>
              <CardDescription>
                Your bullet points converted into flowing text
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="paragraph">Paragraph</Label>
                <Textarea
                  id="paragraph"
                  value={paragraph}
                  readOnly
                  rows={10}
                  className="text-sm leading-relaxed"
                  placeholder="Converted paragraph will appear here..."
                />
              </div>
              {paragraph && (
                <Button onClick={copyParagraph} variant="outline" className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Paragraph
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default BulletPointConverter;
