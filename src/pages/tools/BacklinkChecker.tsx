
import React, { useState } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Loader2 } from 'lucide-react';
import { toast } from "sonner";

const BacklinkChecker = () => {
  const [domain, setDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const mockBacklinks = [
    { source: 'https://example-blog.com/great-post', anchor: 'this amazing tool', da: 55 },
    { source: 'https://tech-news.com/review', anchor: 'check out this service', da: 89 },
    { source: 'https://another-site.net/page', anchor: 'our favorite utility', da: 42 },
    { source: 'https://awesome-directory.org/listing', anchor: 'company name', da: 61 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) {
      toast.error('Please enter a domain to check.');
      return;
    }
    setIsLoading(true);
    setResults(null);
    toast.info('Checking for backlinks... This is a demo and will show sample data.');

    setTimeout(() => {
      setResults(mockBacklinks.map(b => ({...b, target: domain})));
      setIsLoading(false);
      toast.success('Backlink analysis complete!');
    }, 2000);
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Network}
        title="Backlink Checker"
        description="Discover who is linking to your website. Enter a domain to see a sample of its backlinks."
        gradient="bg-gradient-to-r from-blue-500 to-indigo-600"
      />
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g., yourdomain.com"
                className="flex-grow"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Check Backlinks
              </Button>
            </form>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle>Backlink Results for {domain}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.map((backlink, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <p><strong>Linking Page:</strong> <a href={backlink.source} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{backlink.source}</a></p>
                    <p><strong>Anchor Text:</strong> "{backlink.anchor}"</p>
                    <p><strong>Domain Authority (DA):</strong> {backlink.da}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default BacklinkChecker;
