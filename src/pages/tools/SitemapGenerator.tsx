
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Map, Plus, Trash2, Copy, Download, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

interface SitemapUrl {
  id: string;
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const SitemapGenerator = () => {
  const [baseUrl, setBaseUrl] = useState('');
  const [urls, setUrls] = useState<SitemapUrl[]>([
    {
      id: '1',
      loc: '/',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '1.0'
    }
  ]);
  const [generatedSitemap, setGeneratedSitemap] = useState('');
  const { toast } = useToast();

  const addUrl = () => {
    const newUrl: SitemapUrl = {
      id: Date.now().toString(),
      loc: '',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.5'
    };
    setUrls([...urls, newUrl]);
  };

  const removeUrl = (id: string) => {
    if (urls.length > 1) {
      setUrls(urls.filter(url => url.id !== id));
    }
  };

  const updateUrl = (id: string, field: keyof SitemapUrl, value: string) => {
    setUrls(urls.map(url => 
      url.id === id ? { ...url, [field]: value } : url
    ));
  };

  const generateSitemap = () => {
    if (!baseUrl) {
      toast({
        title: "Error",
        description: "Please enter a base URL",
        variant: "destructive"
      });
      return;
    }

    let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach(url => {
      if (url.loc.trim()) {
        sitemapXml += '  <url>\n';
        
        const fullUrl = url.loc.startsWith('http') 
          ? url.loc 
          : `${baseUrl.replace(/\/$/, '')}${url.loc.startsWith('/') ? url.loc : '/' + url.loc}`;
        
        sitemapXml += `    <loc>${fullUrl}</loc>\n`;
        
        if (url.lastmod) {
          sitemapXml += `    <lastmod>${url.lastmod}</lastmod>\n`;
        }
        
        if (url.changefreq) {
          sitemapXml += `    <changefreq>${url.changefreq}</changefreq>\n`;
        }
        
        if (url.priority) {
          sitemapXml += `    <priority>${url.priority}</priority>\n`;
        }
        
        sitemapXml += '  </url>\n';
      }
    });

    sitemapXml += '</urlset>';

    setGeneratedSitemap(sitemapXml);
    
    toast({
      title: "Sitemap Generated",
      description: "Your XML sitemap has been generated successfully!"
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSitemap);
    toast({
      title: "Copied!",
      description: "Sitemap XML copied to clipboard."
    });
  };

  const downloadFile = () => {
    const blob = new Blob([generatedSitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Sitemap XML file has been downloaded."
    });
  };

  const bulkImport = () => {
    const commonPages = [
      { loc: '/', priority: '1.0', changefreq: 'weekly' },
      { loc: '/about', priority: '0.8', changefreq: 'monthly' },
      { loc: '/contact', priority: '0.7', changefreq: 'yearly' },
      { loc: '/services', priority: '0.9', changefreq: 'monthly' },
      { loc: '/blog', priority: '0.8', changefreq: 'weekly' },
      { loc: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
      { loc: '/terms-of-service', priority: '0.3', changefreq: 'yearly' }
    ];

    const newUrls = commonPages.map((page, index) => ({
      id: (Date.now() + index).toString(),
      loc: page.loc,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: page.changefreq,
      priority: page.priority
    }));

    setUrls([...urls, ...newUrls]);
    toast({
      title: "Pages Added",
      description: "Common website pages have been added to your sitemap."
    });
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Map}
        title="Sitemap XML Generator"
        description="Create XML sitemaps to help search engines index your website"
        gradient="bg-gradient-to-r from-blue-600 to-cyan-600"
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Website Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="baseUrl">Base URL *</Label>
                <Input
                  id="baseUrl"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="mt-1"
                />
              </div>
              <Button onClick={bulkImport} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Common Pages
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              URL Configuration
              <Button onClick={addUrl} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add URL
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {urls.map((url, index) => (
                <div key={url.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Label className="font-medium">URL #{index + 1}</Label>
                    {urls.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeUrl(url.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="md:col-span-2 lg:col-span-1">
                      <Label className="text-sm">Location</Label>
                      <Input
                        value={url.loc}
                        onChange={(e) => updateUrl(url.id, 'loc', e.target.value)}
                        placeholder="/page-url or full URL"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm">Last Modified</Label>
                      <Input
                        type="date"
                        value={url.lastmod}
                        onChange={(e) => updateUrl(url.id, 'lastmod', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm">Change Frequency</Label>
                      <Select
                        value={url.changefreq}
                        onValueChange={(value) => updateUrl(url.id, 'changefreq', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="always">Always</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-sm">Priority</Label>
                      <Select
                        value={url.priority}
                        onValueChange={(value) => updateUrl(url.id, 'priority', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1.0">1.0 (Highest)</SelectItem>
                          <SelectItem value="0.9">0.9</SelectItem>
                          <SelectItem value="0.8">0.8</SelectItem>
                          <SelectItem value="0.7">0.7</SelectItem>
                          <SelectItem value="0.6">0.6</SelectItem>
                          <SelectItem value="0.5">0.5 (Medium)</SelectItem>
                          <SelectItem value="0.4">0.4</SelectItem>
                          <SelectItem value="0.3">0.3</SelectItem>
                          <SelectItem value="0.2">0.2</SelectItem>
                          <SelectItem value="0.1">0.1 (Lowest)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button 
            onClick={generateSitemap}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            Generate Sitemap XML
          </Button>
        </div>

        {generatedSitemap && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Generated Sitemap XML
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadFile}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedSitemap}
                readOnly
                className="min-h-[300px] font-mono text-sm"
              />
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Next steps:</strong> Upload this sitemap.xml file to your website's root directory 
                  and submit it to Google Search Console and Bing Webmaster Tools for better indexing.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default SitemapGenerator;
