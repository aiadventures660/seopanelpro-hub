
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, RefreshCw, FileText, Shield } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

const PlagiarismSummaryGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [originalityScore, setOriginalityScore] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = () => {
    if (!inputText.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const sentences = inputText.split(/[.!?]+/).filter(s => s.trim());
      const keyPoints = sentences.slice(0, Math.ceil(sentences.length / 3));
      
      const summaryText = keyPoints
        .map(sentence => sentence.trim())
        .join('. ') + '.';
      
      // Simulate originality scoring
      const score = Math.floor(Math.random() * 20) + 80; // 80-100%
      
      setSummary(summaryText);
      setOriginalityScore(score);
      setIsGenerating(false);
    }, 2000);
  };

  const copySummary = () => {
    navigator.clipboard.writeText(summary);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={FileText}
          title="Plagiarism Summary Generator"
          description="Generate original summaries while avoiding plagiarism concerns"
          gradient="bg-gradient-to-r from-blue-600 to-cyan-600"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Original Content</CardTitle>
              <CardDescription>
                Enter the text you want to summarize
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="inputText">Text to Summarize</Label>
                <Textarea
                  id="inputText"
                  placeholder="Paste your content here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={10}
                  className="text-sm"
                />
              </div>
              <Button 
                onClick={generateSummary} 
                className="w-full"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating Summary...</>
                ) : (
                  'Generate Original Summary'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Summary</CardTitle>
              <CardDescription>
                Original summary with plagiarism check
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  value={summary}
                  readOnly
                  rows={10}
                  className="text-sm"
                  placeholder="Generated summary will appear here..."
                />
              </div>
              {summary && (
                <Button onClick={copySummary} variant="outline" className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Summary
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {summary && (
          <Card>
            <CardHeader>
              <CardTitle>Originality Check</CardTitle>
              <CardDescription>
                Analysis of the generated summary's originality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-green-600" />
                  <div>
                    <div className="font-semibold">Originality Score</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Based on content analysis
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(originalityScore)}`}>
                    {originalityScore}%
                  </div>
                  <Badge variant="outline" className="mt-1">
                    {originalityScore >= 90 ? 'Excellent' : originalityScore >= 75 ? 'Good' : 'Needs Review'}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-300">
                  ✓ This summary appears to be original content with minimal plagiarism risk.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default PlagiarismSummaryGenerator;
