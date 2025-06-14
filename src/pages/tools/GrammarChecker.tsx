
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Copy, RefreshCw, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

interface GrammarError {
  type: 'grammar' | 'spelling' | 'punctuation' | 'style';
  text: string;
  suggestion: string;
  explanation: string;
  position: { start: number; end: number };
}

const GrammarChecker = () => {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState<GrammarError[]>([]);
  const [correctedText, setCorrectedText] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const checkGrammar = async () => {
    if (!text.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter text to check for grammar errors.",
        variant: "destructive"
      });
      return;
    }

    setIsChecking(true);

    // Simulate grammar checking
    setTimeout(() => {
      const mockErrors: GrammarError[] = [];
      let corrected = text;

      // Common grammar errors to detect
      const patterns = [
        {
          pattern: /\bthere\s+is\s+(\d+|\w+)\s+(\w+s)\b/gi,
          type: 'grammar' as const,
          suggestion: 'there are',
          explanation: 'Use "there are" with plural nouns'
        },
        {
          pattern: /\byour\s+going\b/gi,
          type: 'grammar' as const,
          suggestion: "you're going",
          explanation: 'Use "you\'re" (contraction of "you are") instead of "your"'
        },
        {
          pattern: /\bits\s+going\b/gi,
          type: 'grammar' as const,
          suggestion: "it's going",
          explanation: 'Use "it\'s" (contraction of "it is") for this context'
        },
        {
          pattern: /\bteh\b/gi,
          type: 'spelling' as const,
          suggestion: 'the',
          explanation: 'Spelling correction'
        },
        {
          pattern: /\brecieve\b/gi,
          type: 'spelling' as const,
          suggestion: 'receive',
          explanation: 'Remember: "i before e except after c"'
        },
        {
          pattern: /\s{2,}/g,
          type: 'style' as const,
          suggestion: ' ',
          explanation: 'Remove extra spaces'
        },
        {
          pattern: /(\w)[,.](\w)/g,
          type: 'punctuation' as const,
          suggestion: '$1$2 $3',
          explanation: 'Add space after punctuation'
        }
      ];

      patterns.forEach((pattern) => {
        let match;
        while ((match = pattern.pattern.exec(text)) !== null) {
          mockErrors.push({
            type: pattern.type,
            text: match[0],
            suggestion: pattern.suggestion,
            explanation: pattern.explanation,
            position: { start: match.index, end: match.index + match[0].length }
          });
          
          corrected = corrected.replace(match[0], pattern.suggestion);
        }
      });

      // Add some random errors for demonstration
      if (mockErrors.length === 0 && text.length > 50) {
        const sentences = text.split('.').filter(s => s.trim());
        if (sentences.length > 0) {
          mockErrors.push({
            type: 'style',
            text: sentences[0].trim(),
            suggestion: sentences[0].trim() + ' Additionally, consider improving sentence structure',
            explanation: 'Consider varying sentence structure for better readability',
            position: { start: 0, end: sentences[0].length }
          });
        }
      }

      setErrors(mockErrors);
      setCorrectedText(corrected);
      setIsChecking(false);

      toast({
        title: "Grammar Check Complete",
        description: `Found ${mockErrors.length} potential issues.`
      });
    }, 1500);
  };

  const applySuggestion = (index: number) => {
    const error = errors[index];
    const newText = text.substring(0, error.position.start) + 
                   error.suggestion + 
                   text.substring(error.position.end);
    setText(newText);
    
    // Remove the applied error
    setErrors(errors.filter((_, i) => i !== index));
    
    toast({
      title: "Suggestion Applied",
      description: "The correction has been applied to your text."
    });
  };

  const copyText = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard."
    });
  };

  const getErrorIcon = (type: string) => {
    switch (type) {
      case 'grammar':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'spelling':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'punctuation':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'style':
        return <AlertCircle className="h-4 w-4 text-purple-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getErrorColor = (type: string) => {
    switch (type) {
      case 'grammar':
        return 'border-red-200 bg-red-50 dark:bg-red-900/20';
      case 'spelling':
        return 'border-orange-200 bg-orange-50 dark:bg-orange-900/20';
      case 'punctuation':
        return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20';
      case 'style':
        return 'border-purple-200 bg-purple-50 dark:bg-purple-900/20';
      default:
        return 'border-gray-200 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={BookOpen}
        title="Grammar Checker"
        description="Check and correct grammar, spelling, punctuation, and style issues in your text"
        gradient="bg-gradient-to-r from-green-500 to-green-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Check Your Text</CardTitle>
            <CardDescription>
              Enter your text below to check for grammar and writing issues
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="text-input">Text to Check *</Label>
              <Textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here to check for grammar, spelling, and style issues..."
                className="mt-1 min-h-[250px]"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{text.length} characters</span>
                <span>{text.split(' ').filter(w => w).length} words</span>
              </div>
            </div>

            <Button 
              onClick={checkGrammar} 
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
                  <BookOpen className="h-4 w-4 mr-2" />
                  Check Grammar
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Issues Found</CardTitle>
            <CardDescription>
              Grammar, spelling, and style suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errors.length > 0 ? (
              <div className="space-y-3">
                {errors.map((error, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${getErrorColor(error.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getErrorIcon(error.type)}
                          <Badge variant="outline" className="text-xs capitalize">
                            {error.type}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Found: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">"{error.text}"</span>
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Suggestion: <span className="font-mono bg-green-100 dark:bg-green-800 px-1 rounded">"{error.suggestion}"</span>
                            </p>
                          </div>
                          
                          <p className="text-xs text-gray-500">
                            {error.explanation}
                          </p>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => applySuggestion(index)}
                        className="ml-2"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {errors.length === 0 && text && !isChecking ? (
                  <>
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <p>Great! No issues found in your text.</p>
                  </>
                ) : (
                  <>
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Issues will appear here after checking</p>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {correctedText && correctedText !== text && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Corrected Text</CardTitle>
            <CardDescription>
              Text with suggested corrections applied
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                value={correctedText}
                readOnly
                className="min-h-[150px]"
              />
              <Button
                variant="outline"
                onClick={() => copyText(correctedText)}
                className="w-full"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Corrected Text
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Error Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Grammar</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Subject-verb agreement, tense consistency
              </p>
            </div>
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Spelling</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Misspelled words and typos
              </p>
            </div>
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Punctuation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Comma splices, missing punctuation
              </p>
            </div>
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Style</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Readability and writing improvements
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolPageLayout>
  );
};

export default GrammarChecker;
