
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

interface PunctuationError {
  text: string;
  correction: string;
  type: string;
  position: number;
}

const PunctuationChecker = () => {
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [errors, setErrors] = useState<PunctuationError[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const checkPunctuation = () => {
    if (!inputText.trim()) return;
    
    setIsChecking(true);
    
    setTimeout(() => {
      let corrected = inputText;
      const foundErrors: PunctuationError[] = [];
      
      // Common punctuation fixes
      const punctuationRules = [
        {
          pattern: /\s+,/g,
          replacement: ',',
          type: 'Spacing before comma',
          original: ' ,'
        },
        {
          pattern: /,(?!\s)/g,
          replacement: ', ',
          type: 'Missing space after comma',
          original: ','
        },
        {
          pattern: /\s+\./g,
          replacement: '.',
          type: 'Spacing before period',
          original: ' .'
        },
        {
          pattern: /\.(?!\s|$)/g,
          replacement: '. ',
          type: 'Missing space after period',
          original: '.'
        },
        {
          pattern: /\s+;/g,
          replacement: ';',
          type: 'Spacing before semicolon',
          original: ' ;'
        },
        {
          pattern: /;(?!\s)/g,
          replacement: '; ',
          type: 'Missing space after semicolon',
          original: ';'
        },
        {
          pattern: /\s+\?/g,
          replacement: '?',
          type: 'Spacing before question mark',
          original: ' ?'
        },
        {
          pattern: /\?(?!\s|$)/g,
          replacement: '? ',
          type: 'Missing space after question mark',
          original: '?'
        },
        {
          pattern: /\s+!/g,
          replacement: '!',
          type: 'Spacing before exclamation mark',
          original: ' !'
        },
        {
          pattern: /!(?!\s|$)/g,
          replacement: '! ',
          type: 'Missing space after exclamation mark',
          original: '!'
        }
      ];
      
      punctuationRules.forEach(rule => {
        const matches = inputText.match(rule.pattern);
        if (matches) {
          matches.forEach(match => {
            const index = inputText.indexOf(match);
            foundErrors.push({
              text: match,
              correction: match.replace(rule.pattern, rule.replacement),
              type: rule.type,
              position: index
            });
          });
          corrected = corrected.replace(rule.pattern, rule.replacement);
        }
      });
      
      // Capitalize first letter of sentences
      corrected = corrected.replace(/(^|\. )([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
      
      setCorrectedText(corrected);
      setErrors(foundErrors);
      setIsChecking(false);
    }, 1500);
  };

  const copyCorrectedText = () => {
    navigator.clipboard.writeText(correctedText);
  };

  return (
    <ToolPageLayout>
      <div className="max-w-4xl mx-auto py-12">
        <ToolHeader
          icon={AlertCircle}
          title="Punctuation Checker"
          description="Check and fix punctuation errors in your text for better readability"
          gradient="bg-gradient-to-r from-amber-600 to-orange-600"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Original Text</CardTitle>
              <CardDescription>
                Enter your text to check for punctuation errors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="inputText">Text to Check</Label>
                <Textarea
                  id="inputText"
                  placeholder="Enter your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={10}
                  className="text-sm"
                />
              </div>
              <Button 
                onClick={checkPunctuation} 
                className="w-full"
                disabled={isChecking}
              >
                {isChecking ? (
                  <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Checking Punctuation...</>
                ) : (
                  'Check Punctuation'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Corrected Text</CardTitle>
              <CardDescription>
                Text with punctuation errors fixed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="correctedText">Corrected Text</Label>
                <Textarea
                  id="correctedText"
                  value={correctedText}
                  readOnly
                  rows={10}
                  className="text-sm"
                  placeholder="Corrected text will appear here..."
                />
              </div>
              {correctedText && (
                <Button onClick={copyCorrectedText} variant="outline" className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Corrected Text
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {errors.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Punctuation Errors Found</CardTitle>
              <CardDescription>
                {errors.length} punctuation {errors.length === 1 ? 'error' : 'errors'} detected and corrected
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {errors.map((error, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <div>
                        <div className="font-medium text-sm">{error.type}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          <span className="bg-red-100 dark:bg-red-900 px-1 rounded font-mono">
                            "{error.text}"
                          </span>
                          <span className="mx-2">→</span>
                          <span className="bg-green-100 dark:bg-green-900 px-1 rounded font-mono">
                            "{error.correction}"
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Position {error.position}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {correctedText && errors.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>All Good!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-700 dark:text-green-300">
                  No punctuation errors detected. Your text looks great!
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default PunctuationChecker;
