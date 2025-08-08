import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Search, TrendingUp, Download, RefreshCw, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

interface KeywordData {
  keyword: string;
  count: number;
  density: number;
  category: 'optimal' | 'low' | 'high' | 'spam';
}

interface ContentStats {
  totalWords: number;
  totalCharacters: number;
  sentences: number;
  paragraphs: number;
  avgWordsPerSentence: number;
  readabilityScore: number;
}

const KeywordDensity = () => {
  const [text, setText] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [targetDensity, setTargetDensity] = useState(0);
  const [contentStats, setContentStats] = useState<ContentStats>({
    totalWords: 0,
    totalCharacters: 0,
    sentences: 0,
    paragraphs: 0,
    avgWordsPerSentence: 0,
    readabilityScore: 0
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
    'between', 'among', 'around', 'under', 'over', 'beside', 'beneath', 'beyond', 'across',
    'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do',
    'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can',
    'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
    'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'its', 'our', 'their'
  ]);

  const categorizeKeyword = (density: number): 'optimal' | 'low' | 'high' | 'spam' => {
    if (density >= 0.5 && density <= 3) return 'optimal';
    if (density < 0.5) return 'low';
    if (density > 5) return 'spam';
    return 'high';
  };

  const calculateReadabilityScore = (words: string[], sentences: number): number => {
    if (sentences === 0) return 0;
    const avgWordsPerSentence = words.length / sentences;
    const syllableCount = words.reduce((count, word) => count + countSyllables(word), 0);
    const avgSyllablesPerWord = syllableCount / words.length;
    
    // Simplified Flesch Reading Ease Score
    return Math.max(0, Math.min(100, 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord)));
  };

  const countSyllables = (word: string): number => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  };

  useEffect(() => {
    const analyzeContent = async () => {
      if (!text.trim()) {
        setKeywords([]);
        setTargetDensity(0);
        setContentStats({
          totalWords: 0,
          totalCharacters: 0,
          sentences: 0,
          paragraphs: 0,
          avgWordsPerSentence: 0,
          readabilityScore: 0
        });
        return;
      }

      setIsAnalyzing(true);

      // Simulate processing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));

      const cleanText = text.replace(/[^\w\s\.\!\?]/g, ' ');
      const words = cleanText.toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 2 && !stopWords.has(word));
      
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
      const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

      const stats: ContentStats = {
        totalWords: words.length,
        totalCharacters: text.length,
        sentences,
        paragraphs,
        avgWordsPerSentence: sentences > 0 ? words.length / sentences : 0,
        readabilityScore: calculateReadabilityScore(words, sentences)
      };

      setContentStats(stats);

      const wordFreq = words.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const keywordData = Object.entries(wordFreq)
        .map(([keyword, count]) => {
          const density = (count / words.length) * 100;
          return {
            keyword,
            count,
            density,
            category: categorizeKeyword(density)
          };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, 50);

      setKeywords(keywordData);

      if (targetKeyword) {
        const targetCount = words.filter(word => 
          word.includes(targetKeyword.toLowerCase()) || 
          targetKeyword.toLowerCase().includes(word)
        ).length;
        setTargetDensity((targetCount / words.length) * 100);
      }

      setIsAnalyzing(false);
    };

    const debounceTimer = setTimeout(analyzeContent, 500);
    return () => clearTimeout(debounceTimer);
  }, [text, targetKeyword]);

  const getDensityColor = (density: number) => {
    if (density > 5) return 'text-red-600 dark:text-red-400';
    if (density > 3) return 'text-orange-600 dark:text-orange-400';
    if (density >= 0.5 && density <= 3) return 'text-green-600 dark:text-green-400';
    return 'text-yellow-600 dark:text-yellow-400';
  };

  const getDensityBg = (density: number) => {
    if (density > 5) return 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800';
    if (density > 3) return 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800';
    if (density >= 0.5 && density <= 3) return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800';
    return 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800';
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      optimal: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400',
      low: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400',
      high: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-400',
      spam: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400'
    };
    return variants[category as keyof typeof variants] || variants.low;
  };

  const exportResults = () => {
    const results = {
      contentStats,
      targetKeyword,
      targetDensity,
      keywords: keywords.slice(0, 20),
      analysis: {
        date: new Date().toISOString(),
        recommendations: getRecommendations()
      }
    };
    
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'keyword-density-analysis.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (contentStats.totalWords < 300) {
      recommendations.push("Consider adding more content. Articles with 300+ words tend to perform better in search results.");
    }
    
    if (targetKeyword && targetDensity < 0.5) {
      recommendations.push(`Your target keyword "${targetKeyword}" appears too rarely. Consider using it more naturally throughout your content.`);
    }
    
    if (targetKeyword && targetDensity > 3) {
      recommendations.push(`Your target keyword "${targetKeyword}" may be overused. Reduce frequency to avoid keyword stuffing.`);
    }
    
    if (contentStats.readabilityScore < 30) {
      recommendations.push("Content readability is quite low. Consider using shorter sentences and simpler words.");
    }
    
    const spamKeywords = keywords.filter(k => k.category === 'spam');
    if (spamKeywords.length > 0) {
      recommendations.push(`These keywords may be overused: ${spamKeywords.map(k => k.keyword).join(', ')}`);
    }
    
    return recommendations;
  };

  const clearAll = () => {
    setText('');
    setTargetKeyword('');
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={BarChart3}
        title="Keyword Density Checker"
        description="Analyze keyword density in your content to optimize for search engines with advanced SEO insights"
        gradient="bg-gradient-to-r from-purple-600 to-pink-600"
      />

      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">🎯 Professional Keyword Density Analysis</h3>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          Analyze your content's keyword distribution, readability, and SEO optimization. Get detailed insights 
          with recommendations to improve your search engine rankings.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Target Keyword (optional)
                  <span className="text-gray-500 text-xs ml-2">- Focus keyword for SEO analysis</span>
                </label>
                <Input
                  placeholder="e.g., digital marketing, SEO tools"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Content Text
                  <span className="text-gray-500 text-xs ml-2">
                    - Minimum 100 words recommended
                  </span>
                </label>
                <Textarea
                  placeholder="Paste your content here to analyze keyword density. The tool will automatically filter stop words and provide detailed SEO insights..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[300px] transition-all focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Characters: {text.length.toLocaleString()}</span>
                  <span>Words: ~{text.trim() ? text.trim().split(/\s+/).length : 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {targetKeyword && contentStats.totalWords > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Target Keyword: "{targetKeyword}"
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`p-4 rounded-lg border-2 ${getDensityBg(targetDensity)}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-lg">Density:</span>
                      <span className={`font-bold text-xl ${getDensityColor(targetDensity)}`}>
                        {targetDensity.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {targetDensity >= 0.5 && targetDensity <= 3 ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <Progress 
                      value={Math.min(targetDensity * 20, 100)} 
                      className="h-2"
                    />
                  </div>
                  
                  <p className="text-sm font-medium mb-2">
                    {targetDensity >= 0.5 && targetDensity <= 3 
                      ? "✅ Optimal keyword density for SEO" 
                      : targetDensity > 5
                      ? "❌ Too high - risk of keyword stuffing penalty" 
                      : targetDensity > 3
                      ? "⚠️ Higher than recommended - consider reducing"
                      : "⚠️ Too low - consider using the keyword more naturally"}
                  </p>
                  
                  <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <p>• Optimal range: 0.5% - 3.0%</p>
                    <p>• Occurrences: {Math.round((targetDensity / 100) * contentStats.totalWords)} times</p>
                    <p>• Recommendation: {targetDensity < 0.5 ? 'Add more naturally' : 
                                        targetDensity > 3 ? 'Reduce frequency' : 'Maintain current usage'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Content Statistics
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAll}
                    className="text-xs"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Clear
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportResults}
                    disabled={contentStats.totalWords === 0}
                    className="text-xs"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{contentStats.totalWords}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Words</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{keywords.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Keywords</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{contentStats.sentences}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sentences</p>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{contentStats.paragraphs}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Paragraphs</p>
                </div>
              </div>
              
              {contentStats.totalWords > 0 && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Readability Score</span>
                      <span className="text-sm text-gray-600">
                        {contentStats.readabilityScore.toFixed(1)}/100
                      </span>
                    </div>
                    <Progress value={contentStats.readabilityScore} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      {contentStats.readabilityScore >= 60 ? 'Easy to read' : 
                       contentStats.readabilityScore >= 30 ? 'Moderate difficulty' : 'Difficult to read'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Avg. words/sentence:</span>
                      <span className="font-medium ml-2">{contentStats.avgWordsPerSentence.toFixed(1)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Characters:</span>
                      <span className="font-medium ml-2">{contentStats.totalCharacters.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Analyzing content...</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* SEO Recommendations */}
          {contentStats.totalWords > 0 && getRecommendations().length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  SEO Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getRecommendations().map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-amber-800 dark:text-amber-200">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {keywords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Keyword Analysis ({keywords.length} keywords)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {keywords.map((keyword, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4"
                      style={{
                        borderLeftColor: keyword.category === 'optimal' ? '#10b981' :
                                       keyword.category === 'low' ? '#f59e0b' :
                                       keyword.category === 'high' ? '#f97316' : '#ef4444'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-500 min-w-[24px]">#{index + 1}</span>
                        <div>
                          <span className="font-medium">{keyword.keyword}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getCategoryBadge(keyword.category)}`}
                            >
                              {keyword.category.charAt(0).toUpperCase() + keyword.category.slice(1)}
                            </Badge>
                            {keyword.category === 'optimal' && <CheckCircle className="h-3 w-3 text-green-600" />}
                            {keyword.category === 'spam' && <AlertTriangle className="h-3 w-3 text-red-600" />}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{keyword.count} times</p>
                        <p className={`text-sm font-medium ${getDensityColor(keyword.density)}`}>
                          {keyword.density.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {keywords.length >= 50 && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Showing top 50 keywords. Add more content to see additional analysis.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <RelatedTools 
        currentToolId="keyword-density"
        currentCategory="SEO"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default KeywordDensity;
