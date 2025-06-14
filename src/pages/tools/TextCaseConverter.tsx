
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Type } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

const TextCaseConverter = () => {
  const [inputText, setInputText] = useState('');
  const { toast } = useToast();

  const conversions = [
    {
      name: 'UPPERCASE',
      description: 'Convert all letters to uppercase',
      convert: (text: string) => text.toUpperCase(),
    },
    {
      name: 'lowercase',
      description: 'Convert all letters to lowercase',
      convert: (text: string) => text.toLowerCase(),
    },
    {
      name: 'Title Case',
      description: 'Capitalize the first letter of each word',
      convert: (text: string) => 
        text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
    },
    {
      name: 'Sentence case',
      description: 'Capitalize only the first letter of each sentence',
      convert: (text: string) => 
        text.toLowerCase().replace(/(^\w|[.!?]\s+\w)/g, char => char.toUpperCase()),
    },
    {
      name: 'camelCase',
      description: 'Remove spaces and capitalize first letter of each word except first',
      convert: (text: string) => 
        text.toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase()),
    },
    {
      name: 'PascalCase',
      description: 'Remove spaces and capitalize first letter of each word',
      convert: (text: string) => 
        text.toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
          .replace(/^./, char => char.toUpperCase()),
    },
    {
      name: 'snake_case',
      description: 'Replace spaces with underscores and convert to lowercase',
      convert: (text: string) => 
        text.toLowerCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, ''),
    },
    {
      name: 'kebab-case',
      description: 'Replace spaces with hyphens and convert to lowercase',
      convert: (text: string) => 
        text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, ''),
    },
    {
      name: 'CONSTANT_CASE',
      description: 'Replace spaces with underscores and convert to uppercase',
      convert: (text: string) => 
        text.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, ''),
    },
    {
      name: 'dot.case',
      description: 'Replace spaces with dots and convert to lowercase',
      convert: (text: string) => 
        text.toLowerCase().replace(/\s+/g, '.').replace(/[^a-zA-Z0-9.]/g, ''),
    },
    {
      name: 'iNvErSe CaSe',
      description: 'Randomly capitalize and lowercase letters',
      convert: (text: string) => 
        text.split('').map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join(''),
    },
    {
      name: 'Remove Extra Spaces',
      description: 'Remove extra spaces and normalize whitespace',
      convert: (text: string) => text.replace(/\s+/g, ' ').trim(),
    }
  ];

  const copyToClipboard = (text: string, caseName: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${caseName} text copied to clipboard`
    });
  };

  const convertText = (converter: (text: string) => string) => {
    return inputText ? converter(inputText) : '';
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Type}
        title="Text Case Converter"
        description="Convert text between different cases including uppercase, lowercase, title case, camelCase, and more"
        gradient="bg-gradient-to-r from-indigo-600 to-purple-600"
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Type or paste your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px] text-base"
            />
            <p className="text-sm text-gray-500 mt-2">
              {inputText.length} characters, {inputText.split(/\s+/).filter(word => word.length > 0).length} words
            </p>
          </CardContent>
        </Card>

        {inputText && (
          <div className="grid gap-4">
            {conversions.map((conversion, index) => {
              const convertedText = convertText(conversion.convert);
              return (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{conversion.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {conversion.description}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(convertedText, conversion.name)}
                        disabled={!convertedText}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="font-mono break-all">
                        {convertedText || 'No output'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!inputText && (
          <Card>
            <CardContent className="py-12 text-center">
              <Type className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
                Enter text to see conversions
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Type or paste text in the input field above to convert between different cases
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Case Conversion Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Programming Cases</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• <strong>camelCase</strong> - Variables in JavaScript, Java</li>
                  <li>• <strong>PascalCase</strong> - Class names, components</li>
                  <li>• <strong>snake_case</strong> - Variables in Python, databases</li>
                  <li>• <strong>kebab-case</strong> - CSS classes, URLs</li>
                  <li>• <strong>CONSTANT_CASE</strong> - Constants, environment variables</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Writing Cases</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• <strong>Title Case</strong> - Headlines, titles</li>
                  <li>• <strong>Sentence case</strong> - Regular sentences</li>
                  <li>• <strong>UPPERCASE</strong> - Emphasis, acronyms</li>
                  <li>• <strong>lowercase</strong> - Informal text, tags</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolPageLayout>
  );
};

export default TextCaseConverter;
