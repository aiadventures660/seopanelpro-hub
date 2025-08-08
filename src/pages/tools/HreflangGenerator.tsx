
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Plus, Trash2 } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

interface HreflangEntry {
  id: string;
  language: string;
  url: string;
}

const HreflangGenerator = () => {
  const [entries, setEntries] = useState<HreflangEntry[]>([
    { id: '1', language: '', url: '' }
  ]);
  const [hreflangTags, setHreflangTags] = useState('');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' }
  ];

  const addEntry = () => {
    const newEntry: HreflangEntry = {
      id: Date.now().toString(),
      language: '',
      url: ''
    };
    setEntries([...entries, newEntry]);
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const updateEntry = (id: string, field: 'language' | 'url', value: string) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const generateHreflangTags = () => {
    const validEntries = entries.filter(entry => entry.language && entry.url);
    const tags = validEntries.map(entry => 
      `<link rel="alternate" hreflang="${entry.language}" href="${entry.url}" />`
    ).join('\n');
    setHreflangTags(tags);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hreflangTags);
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Globe}
          title="Hreflang Tag Generator"
          description="Generate hreflang tags for international SEO and multilingual websites"
          gradient="bg-gradient-to-r from-green-600 to-blue-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Language Versions</CardTitle>
            <CardDescription>
              Add different language versions of your page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {entries.map((entry, index) => (
              <div key={entry.id} className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label>Language</Label>
                  <Select
                    value={entry.language}
                    onValueChange={(value) => updateEntry(entry.id, 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name} ({lang.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-2">
                  <Label>URL</Label>
                  <Input
                    type="url"
                    placeholder="https://example.com/page"
                    value={entry.url}
                    onChange={(e) => updateEntry(entry.id, 'url', e.target.value)}
                  />
                </div>
                {entries.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeEntry(entry.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <div className="flex gap-2">
              <Button onClick={addEntry} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Language
              </Button>
              <Button onClick={generateHreflangTags} className="flex-1">
                Generate Hreflang Tags
              </Button>
            </div>
          </CardContent>
        </Card>

        {hreflangTags && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Hreflang Tags</CardTitle>
              <CardDescription>
                Copy these tags and add them to your HTML head section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={hreflangTags}
                readOnly
                rows={Math.max(3, hreflangTags.split('\n').length)}
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
        currentToolId="hreflanggenerator"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default HreflangGenerator;
