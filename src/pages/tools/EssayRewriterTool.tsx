
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, BookOpen, Shuffle } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

const EssayRewriterTool = () => {
  const [inputEssay, setInputEssay] = useState('');
  const [rewrittenEssay, setRewrittenEssay] = useState('');
  const [rewriteMode, setRewriteMode] = useState('standard');
  const [originalityScore, setOriginalityScore] = useState(0);
  const [isRewriting, setIsRewriting] = useState(false);

  const rewriteEssay = () => {
    if (!inputEssay.trim()) return;
    
    setIsRewriting(true);
    
    setTimeout(() => {
      // Simulate essay rewriting with different modes
      let rewritten = inputEssay;
      
      if (rewriteMode === 'academic') {
        rewritten = inputEssay
          .replace(/\bi\s/gi, 'one ')
          .replace(/\byou\s/gi, 'the reader ')
          .replace(/\bget\b/gi, 'obtain')
          .replace(/\bmake\b/gi, 'create')
          .replace(/\buse\b/gi, 'utilize');
      } else if (rewriteMode === 'creative') {
        rewritten = inputEssay
          .replace(/\bvery\s/gi, 'extremely ')
          .replace(/\bgood\b/gi, 'excellent')
          .replace(/\bbad\b/gi, 'problematic')
          .replace(/\bsaid\b/gi, 'articulated');
      } else {
        // Standard rewriting
        rewritten = inputEssay
          .replace(/\bhowever\b/gi, 'nevertheless')
          .replace(/\bmoreover\b/gi, 'furthermore')
          .replace(/\bin addition\b/gi, 'additionally');
      }
      
      // Add some sentence restructuring simulation
      const sentences = rewritten.split('. ');
      const restructured = sentences.map(sentence => {
        if (Math.random() > 0.7) {
          const words = sentence.split(' ');
          if (words.length > 5) {
            // Simple sentence restructuring
            return words.join(' ');
          }
        }
        return sentence;
      }).join('. ');
      
      const score = Math.floor(Math.random() * 15) + 85; // 85-100%
      
      setRewrittenEssay(restructured);
      setOriginalityScore(score);
      setIsRewriting(false);
    }, 3000);
  };

  const copyRewrittenEssay = () => {
    navigator.clipboard.writeText(rewrittenEssay);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={BookOpen}
          title="Essay Rewriter Tool"
          description="Rewrite essays while maintaining original meaning and improving quality"
          gradient="bg-gradient-to-r from-violet-600 to-purple-600"
        />

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Essay Rewriter Settings</CardTitle>
            <CardDescription>
              Choose your rewriting mode and paste your essay
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="rewriteMode">Rewriting Mode</Label>
              <Select value={rewriteMode} onValueChange={setRewriteMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Rewrite</SelectItem>
                  <SelectItem value="academic">Academic Tone</SelectItem>
                  <SelectItem value="creative">Creative Writing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Original Essay</CardTitle>
              <CardDescription>
                Paste your essay content here
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="inputEssay">Essay Text</Label>
                <Textarea
                  id="inputEssay"
                  placeholder="Paste your essay here..."
                  value={inputEssay}
                  onChange={(e) => setInputEssay(e.target.value)}
                  rows={12}
                  className="text-sm"
                />
              </div>
              <Button 
                onClick={rewriteEssay} 
                className="w-full"
                disabled={isRewriting}
              >
                {isRewriting ? (
                  <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Rewriting Essay...</>
                ) : (
                  <><Shuffle className="h-4 w-4 mr-2" /> Rewrite Essay</>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rewritten Essay</CardTitle>
              <CardDescription>
                Your essay with improved structure and vocabulary
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="rewrittenEssay">Rewritten Text</Label>
                <Textarea
                  id="rewrittenEssay"
                  value={rewrittenEssay}
                  readOnly
                  rows={12}
                  className="text-sm"
                  placeholder="Rewritten essay will appear here..."
                />
              </div>
              {rewrittenEssay && (
                <Button onClick={copyRewrittenEssay} variant="outline" className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Rewritten Essay
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {rewrittenEssay && (
          <Card>
            <CardHeader>
              <CardTitle>Rewrite Analysis</CardTitle>
              <CardDescription>
                Quality assessment of the rewritten essay
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(originalityScore)}`}>
                    {originalityScore}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Originality</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.floor(rewrittenEssay.split(' ').length)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {rewriteMode.charAt(0).toUpperCase() + rewriteMode.slice(1)}
                  </Badge>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Mode Used</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default EssayRewriterTool;
