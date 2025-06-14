
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, RefreshCw, Zap } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

const CatchyHookGenerator = () => {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [hooks, setHooks] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateHooks = () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const hookTemplates = [
        `Did you know that 90% of people struggle with ${topic}?`,
        `What if I told you that ${topic} could change your life in just 30 days?`,
        `The shocking truth about ${topic} that nobody talks about...`,
        `Here's why everyone is getting ${topic} completely wrong.`,
        `Stop! Before you give up on ${topic}, read this.`,
        `The ${topic} mistake that's costing you thousands.`,
        `This ${topic} secret took me years to discover.`,
        `Why ${topic} is the skill everyone needs in 2024.`
      ];
      
      setHooks(hookTemplates);
      setIsGenerating(false);
    }, 1500);
  };

  const copyHook = (hook: string) => {
    navigator.clipboard.writeText(hook);
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Zap}
          title="Catchy Hook Generator for Blogs"
          description="Create engaging hooks to capture your readers' attention from the first line"
          gradient="bg-gradient-to-r from-orange-600 to-red-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate Catchy Hooks</CardTitle>
            <CardDescription>
              Enter your topic and target audience to generate compelling hooks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topic">Blog Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., productivity, weight loss, investing"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="audience">Target Audience (optional)</Label>
              <Input
                id="audience"
                placeholder="e.g., entrepreneurs, students, beginners"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>
            <Button 
              onClick={generateHooks} 
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating...</>
              ) : (
                'Generate Catchy Hooks'
              )}
            </Button>
          </CardContent>
        </Card>

        {hooks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Hooks</CardTitle>
              <CardDescription>
                Click to copy any hook to your clipboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hooks.map((hook, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => copyHook(hook)}
                  >
                    <span className="flex-1 text-sm leading-relaxed">{hook}</span>
                    <Button variant="ghost" size="sm" className="ml-2">
                      <Copy className="h-4 w-4" />
                    </Button>
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

export default CatchyHookGenerator;
