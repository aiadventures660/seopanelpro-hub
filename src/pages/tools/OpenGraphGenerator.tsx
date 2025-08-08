
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Share2 } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

const OpenGraphGenerator = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('website');
  const [siteName, setSiteName] = useState('');
  const [ogTags, setOgTags] = useState('');

  const generateOGTags = () => {
    let tags = [];
    
    if (title) tags.push(`<meta property="og:title" content="${title}" />`);
    if (description) tags.push(`<meta property="og:description" content="${description}" />`);
    if (url) tags.push(`<meta property="og:url" content="${url}" />`);
    if (image) tags.push(`<meta property="og:image" content="${image}" />`);
    if (type) tags.push(`<meta property="og:type" content="${type}" />`);
    if (siteName) tags.push(`<meta property="og:site_name" content="${siteName}" />`);
    
    setOgTags(tags.join('\n'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ogTags);
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Share2}
          title="Open Graph Meta Tag Generator"
          description="Create Open Graph meta tags for better social media sharing"
          gradient="bg-gradient-to-r from-purple-600 to-pink-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Open Graph Properties</CardTitle>
            <CardDescription>
              Fill in the details for your Open Graph meta tags
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Your page title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Brief description of your page"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="url">URL *</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/page"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div>
              <Label>Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="book">Book</SelectItem>
                  <SelectItem value="profile">Profile</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                placeholder="Your website name"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
            </div>
            <Button onClick={generateOGTags} className="w-full">
              Generate Open Graph Tags
            </Button>
          </CardContent>
        </Card>

        {ogTags && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Open Graph Tags</CardTitle>
              <CardDescription>
                Copy these tags and add them to your HTML head section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={ogTags}
                readOnly
                rows={Math.max(3, ogTags.split('\n').length)}
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
        currentToolId="opengraphgenerator"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default OpenGraphGenerator;
