
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bot, Plus, Trash2, Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

interface RobotRule {
  id: string;
  userAgent: string;
  allow: string[];
  disallow: string[];
}

const RobotsGenerator = () => {
  const [sitemap, setSitemap] = useState('');
  const [crawlDelay, setCrawlDelay] = useState('');
  const [host, setHost] = useState('');
  const [rules, setRules] = useState<RobotRule[]>([
    {
      id: '1',
      userAgent: '*',
      allow: [],
      disallow: ['/admin', '/private']
    }
  ]);
  const [generatedRobots, setGeneratedRobots] = useState('');
  const { toast } = useToast();

  const addRule = () => {
    const newRule: RobotRule = {
      id: Date.now().toString(),
      userAgent: '*',
      allow: [],
      disallow: []
    };
    setRules([...rules, newRule]);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const updateRule = (id: string, field: keyof RobotRule, value: any) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
  };

  const addPath = (ruleId: string, type: 'allow' | 'disallow') => {
    setRules(rules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, [type]: [...rule[type], ''] }
        : rule
    ));
  };

  const updatePath = (ruleId: string, type: 'allow' | 'disallow', index: number, value: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId 
        ? { 
            ...rule, 
            [type]: rule[type].map((path, i) => i === index ? value : path)
          }
        : rule
    ));
  };

  const removePath = (ruleId: string, type: 'allow' | 'disallow', index: number) => {
    setRules(rules.map(rule => 
      rule.id === ruleId 
        ? { 
            ...rule, 
            [type]: rule[type].filter((_, i) => i !== index)
          }
        : rule
    ));
  };

  const generateRobots = () => {
    let robotsContent = '';

    rules.forEach(rule => {
      robotsContent += `User-agent: ${rule.userAgent}\n`;
      
      rule.disallow.forEach(path => {
        if (path.trim()) {
          robotsContent += `Disallow: ${path}\n`;
        }
      });

      rule.allow.forEach(path => {
        if (path.trim()) {
          robotsContent += `Allow: ${path}\n`;
        }
      });

      if (crawlDelay && rule.userAgent === '*') {
        robotsContent += `Crawl-delay: ${crawlDelay}\n`;
      }

      robotsContent += '\n';
    });

    if (sitemap) {
      robotsContent += `Sitemap: ${sitemap}\n`;
    }

    if (host) {
      robotsContent += `Host: ${host}\n`;
    }

    setGeneratedRobots(robotsContent.trim());
    
    toast({
      title: "Robots.txt Generated",
      description: "Your robots.txt file has been generated successfully!"
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedRobots);
    toast({
      title: "Copied!",
      description: "Robots.txt content copied to clipboard."
    });
  };

  const downloadFile = () => {
    const blob = new Blob([generatedRobots], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Robots.txt file has been downloaded."
    });
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Bot}
        title="Robots.txt Generator"
        description="Generate a proper robots.txt file to control search engine crawlers"
        gradient="bg-gradient-to-r from-purple-600 to-pink-600"
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Crawler Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {rules.map((rule) => (
                <div key={rule.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Label>User-agent</Label>
                    {rules.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeRule(rule.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <Input
                    value={rule.userAgent}
                    onChange={(e) => updateRule(rule.id, 'userAgent', e.target.value)}
                    placeholder="e.g., *, Googlebot, Bingbot"
                    className="mb-4"
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Disallow Paths</Label>
                      <div className="space-y-2 mt-2">
                        {rule.disallow.map((path, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={path}
                              onChange={(e) => updatePath(rule.id, 'disallow', index, e.target.value)}
                              placeholder="/path/"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removePath(rule.id, 'disallow', index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addPath(rule.id, 'disallow')}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Disallow
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Allow Paths</Label>
                      <div className="space-y-2 mt-2">
                        {rule.allow.map((path, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={path}
                              onChange={(e) => updatePath(rule.id, 'allow', index, e.target.value)}
                              placeholder="/path/"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removePath(rule.id, 'allow', index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addPath(rule.id, 'allow')}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Allow
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Button onClick={addRule} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add User-agent Rule
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sitemap">Sitemap URL</Label>
                <Input
                  id="sitemap"
                  value={sitemap}
                  onChange={(e) => setSitemap(e.target.value)}
                  placeholder="https://example.com/sitemap.xml"
                />
              </div>
              <div>
                <Label htmlFor="crawlDelay">Crawl Delay (seconds)</Label>
                <Input
                  id="crawlDelay"
                  type="number"
                  value={crawlDelay}
                  onChange={(e) => setCrawlDelay(e.target.value)}
                  placeholder="10"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="host">Host (preferred domain)</Label>
                <Input
                  id="host"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button 
            onClick={generateRobots}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Generate Robots.txt
          </Button>
        </div>

        {generatedRobots && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Generated Robots.txt
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
                value={generatedRobots}
                readOnly
                className="min-h-[200px] font-mono text-sm"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default RobotsGenerator;
