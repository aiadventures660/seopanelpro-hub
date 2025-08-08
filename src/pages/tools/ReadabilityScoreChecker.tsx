
import React, { useState } from 'react';
import { BookOpen, Calculator, BarChart3 } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const ReadabilityScoreChecker = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);

  const calculateFleschScore = (text: string) => {
    if (!text.trim()) return null;

    // Count sentences, words, and syllables
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    
    // Simple syllable counting algorithm
    const syllables = text.toLowerCase()
      .split(/\s+/)
      .reduce((count, word) => {
        const vowels = word.match(/[aeiouy]+/g);
        let syllableCount = vowels ? vowels.length : 1;
        if (word.endsWith('e')) syllableCount--;
        return count + Math.max(1, syllableCount);
      }, 0);

    const avgSentenceLength = words / sentences;
    const avgSyllablesPerWord = syllables / words;
    
    const fleschScore = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
    
    let grade, description;
    if (fleschScore >= 90) {
      grade = "Very Easy";
      description = "Easily understood by an average 11-year-old student";
    } else if (fleschScore >= 80) {
      grade = "Easy";
      description = "Easily understood by 13 to 15-year-old students";
    } else if (fleschScore >= 70) {
      grade = "Fairly Easy";
      description = "Easily understood by 16 to 17-year-old students";
    } else if (fleschScore >= 60) {
      grade = "Standard";
      description = "Easily understood by 18 to 19-year-old students";
    } else if (fleschScore >= 50) {
      grade = "Fairly Difficult";
      description = "Understood by college-level students";
    } else if (fleschScore >= 30) {
      grade = "Difficult";
      description = "Best understood by university graduates";
    } else {
      grade = "Very Difficult";
      description = "Best understood by university graduates";
    }

    return {
      score: Math.round(fleschScore * 100) / 100,
      grade,
      description,
      sentences,
      words,
      syllables,
      avgSentenceLength: Math.round(avgSentenceLength * 100) / 100,
      avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100
    };
  };

  const handleAnalyze = () => {
    const result = calculateFleschScore(text);
    setResults(result);
  };

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <ToolPageLayout>
      <div className="py-8">
        <ToolHeader
          icon={BookOpen}
          title="Readability Score Checker (Flesch)"
          description="Analyze your text's readability using the Flesch Reading Ease formula"
          gradient="bg-gradient-to-r from-purple-500 to-pink-500"
        />

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Text Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Enter your text to analyze:
                </label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your text here to check its readability score..."
                  className="min-h-32"
                />
              </div>
              
              <Button 
                onClick={handleAnalyze}
                disabled={!text.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Analyze Readability
              </Button>
            </CardContent>
          </Card>

          {results && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Flesch Reading Ease Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className={`text-6xl font-bold ${getScoreColor(results.score)}`}>
                      {results.score}
                    </div>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      {results.grade}
                    </Badge>
                    <p className="text-gray-600 dark:text-gray-300">
                      {results.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Text Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Sentences:</span>
                      <span className="font-semibold">{results.sentences}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Words:</span>
                      <span className="font-semibold">{results.words}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Syllables:</span>
                      <span className="font-semibold">{results.syllables}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Sentence Length:</span>
                      <span className="font-semibold">{results.avgSentenceLength} words</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Syllables per Word:</span>
                      <span className="font-semibold">{results.avgSyllablesPerWord}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <RelatedTools 
        currentToolId="readabilityscorechecker"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default ReadabilityScoreChecker;
