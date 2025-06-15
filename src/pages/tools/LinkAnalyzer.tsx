
import React, { useState } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, Loader2 } from 'lucide-react';
import { toast } from "sonner";

const LinkAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ internal: any[], external: any[] } | null>(null);

  const mockLinks = {
    internal: [
      { href: '/about', text: 'About Us' },
      { href: '/services', text: 'Our Services' },
      { href: '/contact', text: 'Contact' },
    ],
    external: [
      { href: 'https://react.dev', text: 'React Official Site' },
      { href: 'https://tailwindcss.com', text: 'Tailwind CSS' },
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error('Please enter a URL to analyze.');
      return;
    }
    setIsLoading(true);
    setResults(null);
    toast.info('Analyzing links... This is a demo and will show sample data.');

    setTimeout(() => {
      setResults(mockLinks);
      setIsLoading(false);
      toast.success('Link analysis complete!');
    }, 2000);
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={ClipboardList}
        title="Link Analyzer"
        description="Analyze internal and external links on a webpage. Enter a URL to get a sample analysis."
        gradient="bg-gradient-to-r from-green-500 to-teal-600"
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
                Analyze Links
              </Button>
            </form>
          </CardContent>
        </Card>

        {results && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Internal Links ({results.internal.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {results.internal.map((link, index) => (
                    <li key={index}><a href={link.href} className="text-blue-500 hover:underline">{link.text}</a> ({link.href})</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>External Links ({results.external.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {results.external.map((link, index) => (
                    <li key={index}><a href={link.href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{link.text}</a> ({link.href})</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default LinkAnalyzer;
