
import React, { useState } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Unlink, Loader2 } from 'lucide-react';
import { toast } from "sonner";
import { Badge } from '@/components/ui/badge';

const BrokenLinkFinder = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const mockBrokenLinks = [
    { url: '/old-blog-post', status: 404, statusText: 'Not Found' },
    { url: 'https://external-partner-that-moved.com/resource', status: 404, statusText: 'Not Found' },
    { url: '/private-page', status: 403, statusText: 'Forbidden' },
    { url: 'https://server-down.com', status: 500, statusText: 'Internal Server Error' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error('Please enter a URL to scan.');
      return;
    }
    setIsLoading(true);
    setResults(null);
    toast.info('Scanning for broken links... This is a demo and will show sample data.');

    setTimeout(() => {
      setResults(mockBrokenLinks);
      setIsLoading(false);
      toast.success('Broken link scan complete!');
    }, 2500);
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Unlink}
        title="Broken Link Finder"
        description="Scan a webpage for broken links. Enter a URL to get a sample report."
        gradient="bg-gradient-to-r from-red-500 to-orange-600"
      />
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g., https://yourwebsite.com"
                className="flex-grow"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Find Broken Links
              </Button>
            </form>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle>Broken Links Found on {url}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.map((link, index) => (
                  <div key={index} className="p-4 border rounded-lg flex justify-between items-center">
                    <span className="font-mono text-sm break-all">{link.url}</span>
                    <Badge variant={link.status >= 500 ? "destructive" : "secondary"}>
                      {link.status} {link.statusText}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <RelatedTools 
        currentToolId="brokenlinkfinder"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default BrokenLinkFinder;
