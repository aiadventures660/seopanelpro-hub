
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, AlertTriangle, CheckCircle, Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

interface PlagiarismResult {
  text: string;
  similarity: number;
  source: string;
  isPlagiarized: boolean;
}

const PlagiarismChecker = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<PlagiarismResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [overallScore, setOverallScore] = useState<number | null>(null);
  const { toast } = useToast();

  const checkPlagiarism = async () => {
    if (!text.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter text to check for plagiarism.",
        variant: "destructive"
      });
      return;
    }

    setIsChecking(true);

    // Simulate plagiarism checking
    setTimeout(() => {
      const sentences = text.split('.').filter(s => s.trim());
      const mockResults: PlagiarismResult[] = sentences.map((sentence, index) => {
        const similarity = Math.random() * 100;
        return {
          text: sentence.trim(),
          similarity: Math.round(similarity),
          source: similarity > 70 ? `academic-source-${index + 1}.com` : '',
          isPlagiarized: similarity > 70
        };
      });

      const avgSimilarity = mockResults.reduce((sum, r) => sum + r.similarity, 0) / mockResults.length;
      
      setResults(mockResults);
      setOverallScore(Math.round(avgSimilarity));
      setIsChecking(false);

      toast({
        title: "Plagiarism Check Complete",
        description: `Analysis completed with ${Math.round(avgSimilarity)}% similarity score.`
      });
    }, 2000);
  };

  const copyResult = (result: string) => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard."
    });
  };

  const getScoreColor = (score: number) => {
    if (score < 15) return 'text-green-600';
    if (score < 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score < 15) return 'Original';
    if (score < 30) return 'Moderate Risk';
    return 'High Risk';
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Search}
        title="Plagiarism Checker"
        description="Check your content for plagiarism and ensure originality with detailed similarity analysis"
        gradient="bg-gradient-to-r from-purple-500 to-purple-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Check Your Content</CardTitle>
            <CardDescription>
              Paste your text below to check for potential plagiarism
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="content">Text to Check *</Label>
              <Textarea
                id="content"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your content here to check for plagiarism..."
                className="mt-1 min-h-[200px]"
              />
              <p className="text-sm text-gray-500 mt-1">
                {text.length} characters
              </p>
            </div>

            <Button 
              onClick={checkPlagiarism} 
              className="w-full"
              disabled={isChecking}
            >
              {isChecking ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Check Plagiarism
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              Plagiarism analysis and similarity score
            </CardDescription>
          </CardHeader>
          <CardContent>
            {overallScore !== null ? (
              <div className="space-y-4">
                <div className="text-center p-6 border rounded-lg">
                  <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                    {overallScore}%
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Similarity Score
                  </p>
                  <Badge 
                    variant={overallScore < 15 ? "default" : overallScore < 30 ? "secondary" : "destructive"}
                    className="mt-2"
                  >
                    {getScoreLabel(overallScore)}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Detailed Analysis:</h4>
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg ${result.isPlagiarized ? 'border-red-200 bg-red-50 dark:bg-red-900/20' : 'border-green-200 bg-green-50 dark:bg-green-900/20'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm mb-2">{result.text}</p>
                          <div className="flex items-center space-x-2">
                            {result.isPlagiarized ? (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            <span className="text-sm font-medium">
                              {result.similarity}% similarity
                            </span>
                            {result.source && (
                              <Badge variant="outline" className="text-xs">
                                {result.source}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Copy 
                          className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer ml-2"
                          onClick={() => copyResult(result.text)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Results will appear here after checking</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Understanding Plagiarism Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">0-15%</div>
              <h4 className="font-medium mb-1">Original Content</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Low similarity, likely original content
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-2">15-30%</div>
              <h4 className="font-medium mb-1">Moderate Risk</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Some similarities found, review recommended
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">30%+</div>
              <h4 className="font-medium mb-1">High Risk</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Significant similarities, revision needed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolPageLayout>
  );
};

export default PlagiarismChecker;
