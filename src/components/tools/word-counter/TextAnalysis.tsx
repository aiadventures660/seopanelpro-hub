
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
}

interface TextAnalysisProps {
  stats: TextStats;
}

const TextAnalysis = ({ stats }: TextAnalysisProps) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Text Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{stats.words}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Words</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{(stats.words / stats.sentences || 0).toFixed(1)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Words/Sentence</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{(stats.characters / stats.words || 0).toFixed(1)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Chars/Word</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">{stats.readingTime}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Reading Time</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextAnalysis;
