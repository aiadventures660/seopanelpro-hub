
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Twitter } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

const TwitterCardGenerator = () => {
  const [cardType, setCardType] = useState('summary');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [site, setSite] = useState('');
  const [creator, setCreator] = useState('');
  const [twitterTags, setTwitterTags] = useState('');

  const generateTwitterTags = () => {
    let tags = [];
    
    tags.push(`<meta name="twitter:card" content="${cardType}" />`);
    if (title) tags.push(`<meta name="twitter:title" content="${title}" />`);
    if (description) tags.push(`<meta name="twitter:description" content="${description}" />`);
    if (image) tags.push(`<meta name="twitter:image" content="${image}" />`);
    if (site) tags.push(`<meta name="twitter:site" content="@${site.replace('@', '')}" />`);
    if (creator) tags.push(`<meta name="twitter:creator" content="@${creator.replace('@', '')}" />`);
    
    setTwitterTags(tags.join('\n'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(twitterTags);
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Twitter}
          title="Twitter Card Generator"
          description="Generate Twitter Card meta tags for enhanced Twitter sharing"
          gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Twitter Card Properties</CardTitle>
            <CardDescription>
              Configure your Twitter Card meta tags
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Card Type</Label>
              <Select value={cardType} onValueChange={setCardType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Summary</SelectItem>
                  <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                  <SelectItem value="app">App</SelectItem>
                  <SelectItem value="player">Player</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Your page title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of your page"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
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
              <Label htmlFor="site">Site Username</Label>
              <Input
                id="site"
                placeholder="@yoursite"
                value={site}
                onChange={(e) => setSite(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="creator">Creator Username</Label>
              <Input
                id="creator"
                placeholder="@yourcreator"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              />
            </div>
            <Button onClick={generateTwitterTags} className="w-full">
              Generate Twitter Card Tags
            </Button>
          </CardContent>
        </Card>

        {twitterTags && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Twitter Card Tags</CardTitle>
              <CardDescription>
                Copy these tags and add them to your HTML head section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={twitterTags}
                readOnly
                rows={Math.max(3, twitterTags.split('\n').length)}
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
        currentToolId="twittercardgenerator"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default TwitterCardGenerator;
