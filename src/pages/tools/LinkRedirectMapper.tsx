
import React, { useState } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Route, Loader2, ArrowRight } from 'lucide-react';
import { toast } from "sonner";
import { Badge } from '@/components/ui/badge';

const LinkRedirectMapper = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const mockRedirectChain = [
    { url: 'http://my-site.com/old-url', status: 301 },
    { url: 'https://my-site.com/old-url', status: 301 },
    { url: 'https://www.my-site.com/new-url', status: 200 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error('Please enter a URL to trace.');
      return;
    }
    setIsLoading(true);
    setResults(null);
    toast.info('Tracing redirect path... This is a demo and will show sample data.');

    setTimeout(() => {
      const chain = [ {url: url, status: 301}, ...mockRedirectChain.slice(1)];
      setResults(chain);
      setIsLoading(false);
      toast.success('Redirect trace complete!');
    }, 2000);
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Route}
        title="Link Redirect Mapper"
        description="Trace the path of a redirected link. Enter a URL to see a sample redirect chain."
        gradient="bg-gradient-to-r from-yellow-500 to-amber-600"
      />
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g., http://your-redirecting-url.com"
                className="flex-grow"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Trace Redirects
              </Button>
            </form>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle>Redirect Path for {results[0].url}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.map((hop, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-4">
                       <Badge variant={hop.status === 200 ? 'default' : 'secondary'}>{hop.status}</Badge>
                       <span className="font-mono text-sm break-all">{hop.url}</span>
                    </div>
                    {index < results.length - 1 && (
                      <div className="pl-4 py-2">
                        <ArrowRight className="h-4 w-4 text-gray-400 rotate-90" />
                      </div>
                    )}
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

export default LinkRedirectMapper;
