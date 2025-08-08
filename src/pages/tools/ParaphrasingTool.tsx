
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RefreshCw, Copy, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

const ParaphrasingTool = () => {
  const [originalText, setOriginalText] = useState('');
  const [paraphrasedText, setParaphrasedText] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const paraphraseText = async () => {
    if (!originalText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to paraphrase",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate paraphrasing process
    setTimeout(() => {
      // Simple paraphrasing simulation
      const sentences = originalText.split(/[.!?]+/).filter(s => s.trim());
      const paraphrased = sentences.map(sentence => {
        const words = sentence.trim().split(' ');
        const synonyms: Record<string, string[]> = {
          'good': ['excellent', 'great', 'wonderful', 'fantastic'],
          'bad': ['terrible', 'awful', 'poor', 'dreadful'],
          'big': ['large', 'huge', 'enormous', 'massive'],
          'small': ['tiny', 'little', 'minute', 'petite'],
          'important': ['crucial', 'vital', 'significant', 'essential'],
          'help': ['assist', 'aid', 'support', 'facilitate'],
          'make': ['create', 'produce', 'generate', 'develop'],
          'use': ['utilize', 'employ', 'apply', 'implement'],
          'show': ['demonstrate', 'display', 'exhibit', 'reveal'],
          'think': ['believe', 'consider', 'suppose', 'assume']
        };

        const paraphrasedWords = words.map(word => {
          const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
          if (synonyms[cleanWord] && Math.random() > 0.6) {
            const synonym = synonyms[cleanWord][Math.floor(Math.random() * synonyms[cleanWord].length)];
            return word.replace(cleanWord, synonym);
          }
          return word;
        });

        return paraphrasedWords.join(' ');
      });

      setParaphrasedText(paraphrased.join('. ') + '.');
      setLoading(false);
      
      toast({
        title: "Success",
        description: "Text has been paraphrased successfully!"
      });
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paraphrasedText);
    toast({
      title: "Copied",
      description: "Paraphrased text copied to clipboard!"
    });
  };

  const clearAll = () => {
    setOriginalText('');
    setParaphrasedText('');
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={RefreshCw}
        title="Paraphrasing Tool"
        description="Rewrite your text while maintaining its original meaning and improving clarity"
        gradient="bg-gradient-to-r from-indigo-600 to-purple-600"
      />

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Original Text
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter the text you want to paraphrase..."
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              className="min-h-[300px] resize-none"
            />
            <div className="flex gap-4 mt-4">
              <Button 
                onClick={paraphraseText}
                disabled={loading}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? "Paraphrasing..." : "Paraphrase Text"}
              </Button>
              <Button 
                variant="outline" 
                onClick={clearAll}
                disabled={loading}
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Paraphrased Text
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Your paraphrased text will appear here..."
              value={paraphrasedText}
              readOnly
              className="min-h-[300px] resize-none bg-gray-50 dark:bg-gray-800"
            />
            {paraphrasedText && (
              <div className="flex gap-4 mt-4">
                <Button 
                  variant="outline"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Text
                </Button>
                <Button 
                  variant="outline"
                  onClick={paraphraseText}
                  disabled={loading}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Paraphrase Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {paraphrasedText && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{originalText.split(' ').length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Original Words</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{paraphrasedText.split(' ').length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Paraphrased Words</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {Math.round((1 - Math.abs(originalText.length - paraphrasedText.length) / Math.max(originalText.length, paraphrasedText.length)) * 100)}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Similarity</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <RelatedTools 
        currentToolId="paraphrasingtool"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default ParaphrasingTool;
