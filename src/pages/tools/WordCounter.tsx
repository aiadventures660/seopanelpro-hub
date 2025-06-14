
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, BarChart3 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute

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

  const StatCard = ({ icon: Icon, label, value, color = "blue" }: { 
    icon: any, 
    label: string, 
    value: number, 
    color?: string 
  }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg bg-${color}-100 dark:bg-${color}-900/20`}>
            <Icon className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Word & Character Counter
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Count words, characters, paragraphs, and estimate reading time for your content
            </p>
          </div>

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
              <StatCard 
                icon={FileText} 
                label="Characters" 
                value={stats.characters} 
                color="blue" 
              />
              <StatCard 
                icon={FileText} 
                label="Characters (no spaces)" 
                value={stats.charactersNoSpaces} 
                color="green" 
              />
              <StatCard 
                icon={BarChart3} 
                label="Words" 
                value={stats.words} 
                color="purple" 
              />
              <StatCard 
                icon={FileText} 
                label="Sentences" 
                value={stats.sentences} 
                color="orange" 
              />
              <StatCard 
                icon={FileText} 
                label="Paragraphs" 
                value={stats.paragraphs} 
                color="red" 
              />
              <StatCard 
                icon={Clock} 
                label="Reading Time (min)" 
                value={stats.readingTime} 
                color="indigo" 
              />
            </div>
          </div>

          {text && (
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
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WordCounter;
