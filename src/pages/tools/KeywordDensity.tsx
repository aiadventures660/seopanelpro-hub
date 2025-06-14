
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { BarChart3, Search, TrendingUp } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

interface KeywordData {
  keyword: string;
  count: number;
  density: number;
}

const KeywordDensity = () => {
  const [text, setText] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [targetDensity, setTargetDensity] = useState(0);
  const [totalWords, setTotalWords] = useState(0);

  useEffect(() => {
    if (!text.trim()) {
      setKeywords([]);
      setTargetDensity(0);
      setTotalWords(0);
      return;
    }

    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);
    
    const wordCount = words.length;
    setTotalWords(wordCount);

    const wordFreq = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const keywordData = Object.entries(wordFreq)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: (count / wordCount) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    setKeywords(keywordData);

    if (targetKeyword) {
      const targetCount = words.filter(word => word === targetKeyword.toLowerCase()).length;
      setTargetDensity((targetCount / wordCount) * 100);
    }
  }, [text, targetKeyword]);

  const getDensityColor = (density: number) => {
    if (density > 3) return 'text-red-600';
    if (density >= 1 && density <= 3) return 'text-green-600';
    return 'text-yellow-600';
  };

  const getDensityBg = (density: number) => {
    if (density > 3) return 'bg-red-100';
    if (density >= 1 && density <= 3) return 'bg-green-100';
    return 'bg-yellow-100';
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={BarChart3}
        title="Keyword Density Checker"
        description="Analyze keyword density in your content to optimize for search engines"
        gradient="bg-gradient-to-r from-purple-600 to-pink-600"
      />

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Target Keyword (optional)</label>
                <Input
                  placeholder="Enter your target keyword"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Content Text</label>
                <Textarea
                  placeholder="Paste your content here to analyze keyword density..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[300px]"
                />
              </div>
            </CardContent>
          </Card>

          {targetKeyword && totalWords > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Target Keyword Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`p-4 rounded-lg ${getDensityBg(targetDensity)}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">"{targetKeyword}"</span>
                    <span className={`font-bold ${getDensityColor(targetDensity)}`}>
                      {targetDensity.toFixed(2)}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {targetDensity >= 1 && targetDensity <= 3 
                      ? "✓ Good keyword density" 
                      : targetDensity > 3 
                      ? "⚠ Too high - may be considered spam" 
                      : "⚠ Too low - consider using more"}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{totalWords}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Words</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{keywords.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Unique Keywords</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {keywords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top Keywords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                        <span className="font-medium">{keyword.keyword}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{keyword.count}</p>
                        <p className={`text-sm ${getDensityColor(keyword.density)}`}>
                          {keyword.density.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default KeywordDensity;
