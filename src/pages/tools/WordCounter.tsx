
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Clock, BarChart3 } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import StatCard from '@/components/tools/word-counter/StatCard';
import TextAnalysis from '@/components/tools/word-counter/TextAnalysis';
import { allTools } from '@/data/tools';

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
}

const WordCounter = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  });

  useEffect(() => {
    const calculateStats = () => {
      const characters = text.length;
      const charactersNoSpaces = text.replace(/\s/g, '').length;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
      const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;
      const readingTime = Math.ceil(words / 200);

      setStats({
        characters,
        charactersNoSpaces,
        words,
        sentences,
        paragraphs,
        readingTime
      });
    };

    calculateStats();
  }, [text]);

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={FileText}
        title="Word & Character Counter"
        description="Count words, characters, paragraphs, and estimate reading time for your content"
        gradient="bg-gradient-to-r from-blue-600 to-purple-600"
      />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Text</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Type or paste your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[400px] resize-none"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <StatCard icon={FileText} label="Characters" value={stats.characters} color="blue" />
          <StatCard icon={FileText} label="Characters (no spaces)" value={stats.charactersNoSpaces} color="green" />
          <StatCard icon={BarChart3} label="Words" value={stats.words} color="purple" />
          <StatCard icon={FileText} label="Sentences" value={stats.sentences} color="orange" />
          <StatCard icon={FileText} label="Paragraphs" value={stats.paragraphs} color="red" />
          <StatCard icon={Clock} label="Reading Time (min)" value={stats.readingTime} color="indigo" />
        </div>
      </div>

      {text && <TextAnalysis stats={stats} />}

      <RelatedTools 
        currentToolId="word-counter"
        currentCategory="Content"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default WordCounter;
