
import React, { useState } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Type, Loader2 } from 'lucide-react';
import { toast } from "sonner";

const AnchorTextChecker = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const mockAnchorTexts = [
    { href: '#', text: 'click here', count: 5 },
    { href: '/product-a', text: 'Product A', count: 12 },
    { href: 'https://partner-site.com', text: 'our partner', count: 2 },
    { href: '/about', text: 'learn more', count: 8 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error('Please enter a URL to check.');
      return;
    }
    setIsLoading(true);
    setResults(null);
    toast.info('Checking anchor texts... This is a demo and will show sample data.');

    setTimeout(() => {
      setResults(mockAnchorTexts);
      setIsLoading(false);
      toast.success('Anchor text analysis complete!');
    }, 2000);
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Type}
        title="Anchor Text Checker"
        description="Check the anchor text distribution on a page. Enter a URL to get a sample analysis."
        gradient="bg-gradient-to-r from-purple-500 to-pink-600"
      />
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g., https://yourwebsite.com/page"
                className="flex-grow"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Check Anchors
              </Button>
            </form>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle>Anchor Text Distribution for {url}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2">Anchor Text</th>
                      <th className="p-2">Count</th>
                      <th className="p-2">Target URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">"{item.text}"</td>
                        <td className="p-2">{item.count}</td>
                        <td className="p-2 text-sm text-gray-500">{item.href}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <RelatedTools 
        currentToolId="anchortextchecker"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default AnchorTextChecker;
