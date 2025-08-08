
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Copy, FileText, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

const ArticleRewriter = () => {
  const [originalText, setOriginalText] = useState('');
  const [rewrittenText, setRewrittenText] = useState('');
  const [rewriteMode, setRewriteMode] = useState('standard');
  const [isRewriting, setIsRewriting] = useState(false);
  const { toast } = useToast();

  const rewriteModes = {
    standard: { label: 'Standard', description: 'Balanced rewriting while maintaining meaning' },
    creative: { label: 'Creative', description: 'More creative and varied language' },
    formal: { label: 'Formal', description: 'Professional and academic tone' },
    simple: { label: 'Simple', description: 'Simplified language for better readability' },
    expand: { label: 'Expand', description: 'Add more details and explanations' },
    condense: { label: 'Condense', description: 'Make content more concise' }
  };

  const rewriteText = async () => {
    if (!originalText.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter text to rewrite.",
        variant: "destructive"
      });
      return;
    }

    setIsRewriting(true);

    // Simulate article rewriting with different modes
    setTimeout(() => {
      const sentences = originalText.split('.').filter(s => s.trim());
      let rewritten = sentences.map(sentence => {
        sentence = sentence.trim();
        if (!sentence) return '';

        switch (rewriteMode) {
          case 'creative':
            return sentence
              .replace(/\bgood\b/gi, 'excellent')
              .replace(/\bbad\b/gi, 'problematic')
              .replace(/\bvery\b/gi, 'remarkably')
              .replace(/\bmake\b/gi, 'create')
              .replace(/\bget\b/gi, 'obtain');
          case 'formal':
            return sentence
              .replace(/\bcan't\b/gi, 'cannot')
              .replace(/\bdon't\b/gi, 'do not')
              .replace(/\bwon't\b/gi, 'will not')
              .replace(/\bit's\b/gi, 'it is')
              .replace(/\bthey're\b/gi, 'they are');
          case 'simple':
            return sentence
              .replace(/\butilize\b/gi, 'use')
              .replace(/\bfacilitate\b/gi, 'help')
              .replace(/\bdemonstrate\b/gi, 'show')
              .replace(/\bcommence\b/gi, 'start')
              .replace(/\bterminate\b/gi, 'end');
          case 'expand':
            return sentence + ' This approach provides significant benefits and should be carefully considered';
          case 'condense':
            return sentence.replace(/\bthat is to say\b/gi, 'i.e.,')
              .replace(/\bin order to\b/gi, 'to')
              .replace(/\bdue to the fact that\b/gi, 'because');
          default:
            return sentence
              .replace(/\buse\b/gi, 'utilize')
              .replace(/\bhelp\b/gi, 'assist')
              .replace(/\bshow\b/gi, 'demonstrate')
              .replace(/\bstart\b/gi, 'commence')
              .replace(/\bend\b/gi, 'conclude');
        }
      }).join('. ') + '.';

      setRewrittenText(rewritten);
      setIsRewriting(false);

      toast({
        title: "Rewriting Complete",
        description: `Text rewritten in ${rewriteModes[rewriteMode as keyof typeof rewriteModes].label} mode.`
      });
    }, 1500);
  };

  const copyRewrittenText = () => {
    navigator.clipboard.writeText(rewrittenText);
    toast({
      title: "Copied!",
      description: "Rewritten text copied to clipboard."
    });
  };

  const swapTexts = () => {
    setOriginalText(rewrittenText);
    setRewrittenText('');
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={FileText}
        title="Article Rewriter"
        description="Rewrite articles and content while maintaining the original meaning with various writing styles"
        gradient="bg-gradient-to-r from-blue-500 to-blue-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Original Text</CardTitle>
            <CardDescription>
              Enter the text you want to rewrite
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="original">Text to Rewrite *</Label>
              <Textarea
                id="original"
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                placeholder="Paste your article or text here to rewrite..."
                className="mt-1 min-h-[200px]"
              />
              <p className="text-sm text-gray-500 mt-1">
                {originalText.length} characters, {originalText.split(' ').length - 1} words
              </p>
            </div>

            <div>
              <Label htmlFor="mode">Rewriting Mode</Label>
              <Select value={rewriteMode} onValueChange={setRewriteMode}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(rewriteModes).map(([key, mode]) => (
                    <SelectItem key={key} value={key}>
                      <div>
                        <div className="font-medium">{mode.label}</div>
                        <div className="text-xs text-gray-500">{mode.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={rewriteText} 
              className="w-full"
              disabled={isRewriting}
            >
              {isRewriting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Rewriting...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Rewrite Text
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rewritten Text</CardTitle>
            <CardDescription>
              Your rewritten content will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {rewrittenText ? (
              <div className="space-y-4">
                <Textarea
                  value={rewrittenText}
                  onChange={(e) => setRewrittenText(e.target.value)}
                  className="min-h-[200px]"
                  placeholder="Rewritten text will appear here..."
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Badge variant="secondary">
                      {rewrittenText.length} characters
                    </Badge>
                    <Badge variant="secondary">
                      {rewrittenText.split(' ').length - 1} words
                    </Badge>
                    <Badge variant="outline">
                      {rewriteModes[rewriteMode as keyof typeof rewriteModes].label}
                    </Badge>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={swapTexts}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Use as Input
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyRewrittenText}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Rewritten text will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Rewriting Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Review the rewritten content for accuracy</li>
                <li>• Choose the appropriate mode for your audience</li>
                <li>• Maintain the original meaning and context</li>
                <li>• Check for proper grammar and flow</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Use Cases</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Content marketing and SEO</li>
                <li>• Academic writing improvement</li>
                <li>• Social media content creation</li>
                <li>• Blog post optimization</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <RelatedTools 
        currentToolId="articlerewriter"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default ArticleRewriter;
