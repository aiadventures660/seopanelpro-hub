
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Plus, Trash2 } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

interface KeywordResult {
  keyword: string;
  position: number;
  url: string;
}

interface KeywordEntry {
  id: string;
  keyword: string;
}

const KeywordPositionTracker = () => {
  const [domain, setDomain] = useState('');
  const [country, setCountry] = useState('US');
  const [keywords, setKeywords] = useState<KeywordEntry[]>([
    { id: '1', keyword: '' }
  ]);
  const [isTracking, setIsTracking] = useState(false);
  const [results, setResults] = useState<KeywordResult[]>([]);

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' }
  ];

  const addKeyword = () => {
    const newKeyword: KeywordEntry = {
      id: Date.now().toString(),
      keyword: ''
    };
    setKeywords([...keywords, newKeyword]);
  };

  const removeKeyword = (id: string) => {
    setKeywords(keywords.filter(keyword => keyword.id !== id));
  };

  const updateKeyword = (id: string, value: string) => {
    setKeywords(keywords.map(keyword => 
      keyword.id === id ? { ...keyword, keyword: value } : keyword
    ));
  };

  const trackPositions = async () => {
    if (!domain.trim()) return;
    
    const validKeywords = keywords.filter(k => k.keyword.trim());
    if (validKeywords.length === 0) return;
    
    setIsTracking(true);
    
    // Simulate tracking
    setTimeout(() => {
      const mockResults: KeywordResult[] = validKeywords.map(keyword => ({
        keyword: keyword.keyword,
        position: Math.floor(Math.random() * 100) + 1,
        url: `${domain}/page-${Math.floor(Math.random() * 10) + 1}`
      }));
      
      setResults(mockResults);
      setIsTracking(false);
    }, 3000);
  };

  const getPositionBadge = (position: number) => {
    if (position <= 3) return 'default';
    if (position <= 10) return 'secondary';
    return 'destructive';
  };

  const getPositionText = (position: number) => {
    if (position <= 10) return `#${position}`;
    if (position <= 100) return `#${position}`;
    return 'Not in top 100';
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={MapPin}
          title="Keyword Position Tracker"
          description="Track your keyword rankings in search engine results"
          gradient="bg-gradient-to-r from-orange-600 to-red-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Track Keyword Positions</CardTitle>
            <CardDescription>
              Enter your domain and keywords to track their search positions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="domain">Domain</Label>
                <Input
                  id="domain"
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
              </div>
              <div>
                <Label>Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Keywords</Label>
              {keywords.map((keyword, index) => (
                <div key={keyword.id} className="flex gap-2 mt-2">
                  <Input
                    placeholder="Enter keyword"
                    value={keyword.keyword}
                    onChange={(e) => updateKeyword(keyword.id, e.target.value)}
                  />
                  {keywords.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeKeyword(keyword.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button onClick={addKeyword} variant="outline" className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Keyword
              </Button>
            </div>
            
            <Button 
              onClick={trackPositions} 
              className="w-full"
              disabled={isTracking}
            >
              {isTracking ? 'Tracking Positions...' : 'Track Keyword Positions'}
            </Button>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Position Tracking Results</CardTitle>
              <CardDescription>
                Current keyword positions for {domain}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{result.keyword}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {result.url}
                      </div>
                    </div>
                    <Badge variant={getPositionBadge(result.position)}>
                      {getPositionText(result.position)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <RelatedTools 
        currentToolId="keywordpositiontracker"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default KeywordPositionTracker;
