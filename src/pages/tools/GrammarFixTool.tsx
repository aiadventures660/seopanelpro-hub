
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, RefreshCw, Wrench, CheckCircle } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

interface GrammarFix {
  original: string;
  corrected: string;
  type: string;
}

const GrammarFixTool = () => {
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [fixes, setFixes] = useState<GrammarFix[]>([]);
  const [isFixing, setIsFixing] = useState(false);

  const fixGrammar = () => {
    if (!inputText.trim()) return;
    
    setIsFixing(true);
    
    setTimeout(() => {
      // Simulate grammar fixes
      const commonFixes = [
        { original: 'recieve', corrected: 'receive', type: 'Spelling' },
        { original: 'alot', corrected: 'a lot', type: 'Spelling' },
        { original: 'there house', corrected: 'their house', type: 'Grammar' },
        { original: 'its hot', corrected: "it's hot", type: 'Punctuation' },
        { original: 'i am', corrected: 'I am', type: 'Capitalization' }
      ];
      
      let fixedText = inputText;
      const appliedFixes: GrammarFix[] = [];
      
      commonFixes.forEach(fix => {
        if (fixedText.toLowerCase().includes(fix.original.toLowerCase())) {
          fixedText = fixedText.replace(new RegExp(fix.original, 'gi'), fix.corrected);
          appliedFixes.push(fix);
        }
      });
      
      // Basic capitalization of first letter
      fixedText = fixedText.charAt(0).toUpperCase() + fixedText.slice(1);
      
      setCorrectedText(fixedText);
      setFixes(appliedFixes);
      setIsFixing(false);
    }, 2000);
  };

  const copyCorrectedText = () => {
    navigator.clipboard.writeText(correctedText);
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Wrench}
          title="Grammar Fix Tool"
          description="Instantly fix grammar mistakes and improve your writing quality"
          gradient="bg-gradient-to-r from-red-600 to-pink-600"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Original Text</CardTitle>
              <CardDescription>
                Enter your text to check for grammar errors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="inputText">Text to Fix</Label>
                <Textarea
                  id="inputText"
                  placeholder="Enter your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={8}
                  className="text-sm"
                />
              </div>
              <Button 
                onClick={fixGrammar} 
                className="w-full"
                disabled={isFixing}
              >
                {isFixing ? (
                  <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Fixing Grammar...</>
                ) : (
                  'Fix Grammar'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Corrected Text</CardTitle>
              <CardDescription>
                Grammar-corrected version of your text
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="correctedText">Fixed Text</Label>
                <Textarea
                  id="correctedText"
                  value={correctedText}
                  readOnly
                  rows={8}
                  className="text-sm"
                  placeholder="Corrected text will appear here..."
                />
              </div>
              {correctedText && (
                <Button onClick={copyCorrectedText} variant="outline" className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Corrected Text
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {fixes.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Grammar Fixes Applied</CardTitle>
              <CardDescription>
                Summary of corrections made to your text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {fixes.map((fix, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        <span className="line-through text-red-600">{fix.original}</span>
                        <span className="mx-2">→</span>
                        <span className="text-green-600 font-medium">{fix.corrected}</span>
                      </span>
                    </div>
                    <Badge variant="outline">{fix.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <RelatedTools 
        currentToolId="grammarfixtool"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default GrammarFixTool;
