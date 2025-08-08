
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

const CanonicalTagGenerator = () => {
  const [url, setUrl] = useState('');
  const [canonicalTag, setCanonicalTag] = useState('');

  const generateCanonicalTag = () => {
    if (!url.trim()) return;
    
    const cleanUrl = url.trim();
    const tag = `<link rel="canonical" href="${cleanUrl}" />`;
    setCanonicalTag(tag);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(canonicalTag);
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Link}
          title="Canonical Tag Generator"
          description="Generate canonical tags to prevent duplicate content issues and improve SEO"
          gradient="bg-gradient-to-r from-blue-600 to-purple-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate Canonical Tag</CardTitle>
            <CardDescription>
              Enter your URL to generate the proper canonical tag
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/page"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button onClick={generateCanonicalTag} className="w-full">
              Generate Canonical Tag
            </Button>
          </CardContent>
        </Card>

        {canonicalTag && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Canonical Tag</CardTitle>
              <CardDescription>
                Copy this tag and add it to your HTML head section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={canonicalTag}
                readOnly
                rows={3}
                className="font-mono text-sm"
              />
              <Button onClick={copyToClipboard} variant="outline" className="w-full">
                Copy to Clipboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <RelatedTools 
        currentToolId="canonicaltaggenerator"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default CanonicalTagGenerator;
