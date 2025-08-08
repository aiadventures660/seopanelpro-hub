
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Eye, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

interface PassiveInstance {
  sentence: string;
  suggestion: string;
}

const PassiveVoiceChecker = () => {
  const [inputText, setInputText] = useState('');
  const [passiveInstances, setPassiveInstances] = useState<PassiveInstance[]>([]);
  const [passivePercentage, setPassivePercentage] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const checkPassiveVoice = () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const sentences = inputText.split(/[.!?]+/).filter(s => s.trim());
      const passivePatterns = [
        /was\s+\w+ed/gi,
        /were\s+\w+ed/gi,
        /is\s+\w+ed/gi,
        /are\s+\w+ed/gi,
        /been\s+\w+ed/gi,
        /being\s+\w+ed/gi
      ];
      
      const passiveSentences: PassiveInstance[] = [];
      
      sentences.forEach(sentence => {
        const trimmed = sentence.trim();
        if (passivePatterns.some(pattern => pattern.test(trimmed))) {
          const activeSuggestion = trimmed
            .replace(/was\s+(\w+)ed/gi, 'actively $1ed')
            .replace(/were\s+(\w+)ed/gi, 'actively $1ed')
            .replace(/is\s+(\w+)ed/gi, 'actively $1s')
            .replace(/are\s+(\w+)ed/gi, 'actively $1');
          
          passiveSentences.push({
            sentence: trimmed,
            suggestion: activeSuggestion
          });
        }
      });
      
      const percentage = Math.round((passiveSentences.length / sentences.length) * 100) || 0;
      
      setPassiveInstances(passiveSentences);
      setPassivePercentage(percentage);
      setIsAnalyzing(false);
    }, 1500);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage <= 10) return 'text-green-600';
    if (percentage <= 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage <= 10) return 'Excellent! Your writing is mostly active.';
    if (percentage <= 20) return 'Good! Consider reducing passive voice further.';
    return 'Consider rewriting to use more active voice.';
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={Eye}
          title="Passive Voice Checker"
          description="Identify and fix passive voice in your writing to make it more engaging"
          gradient="bg-gradient-to-r from-indigo-600 to-purple-600"
        />

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Check for Passive Voice</CardTitle>
            <CardDescription>
              Enter your text to identify passive voice instances
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="inputText">Text to Analyze</Label>
              <Textarea
                id="inputText"
                placeholder="Enter your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={8}
                className="text-sm"
              />
            </div>
            <Button 
              onClick={checkPassiveVoice} 
              className="w-full"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Analyzing...</>
              ) : (
                'Check Passive Voice'
              )}
            </Button>
          </CardContent>
        </Card>

        {passiveInstances.length >= 0 && inputText && !isAnalyzing && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <div className="text-2xl font-bold">
                    <span className={getScoreColor(passivePercentage)}>
                      {passivePercentage}%
                    </span>
                    <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2">
                      passive voice
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {getScoreMessage(passivePercentage)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {passiveInstances.length} passive instances found
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {passiveInstances.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Passive Voice Instances</CardTitle>
              <CardDescription>
                Suggestions to convert passive voice to active voice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {passiveInstances.map((instance, index) => (
                  <div key={index} className="p-4 border border-orange-200 dark:border-orange-800 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div>
                          <Badge variant="outline" className="text-xs mb-2">Passive Voice</Badge>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {instance.sentence}
                          </p>
                        </div>
                        <div>
                          <Badge variant="outline" className="text-xs mb-2 bg-green-100 text-green-700 border-green-300">Suggestion</Badge>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            {instance.suggestion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <RelatedTools 
        currentToolId="passivevoicechecker"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default PassiveVoiceChecker;
