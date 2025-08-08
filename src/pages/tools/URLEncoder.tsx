
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, ArrowUpDown, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

const URLEncoder = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const { toast } = useToast();

  const handleEncode = () => {
    try {
      const encoded = encodeURIComponent(inputText);
      setOutputText(encoded);
      toast({
        title: "Encoded Successfully",
        description: "URL has been encoded"
      });
    } catch (error) {
      toast({
        title: "Encoding Error",
        description: "Failed to encode URL. Please check your input.",
        variant: "destructive"
      });
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(inputText);
      setOutputText(decoded);
      toast({
        title: "Decoded Successfully",
        description: "URL has been decoded"
      });
    } catch (error) {
      toast({
        title: "Decoding Error",
        description: "Invalid URL encoding. Please check your input.",
        variant: "destructive"
      });
    }
  };

  const handleProcess = () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a URL to process",
        variant: "destructive"
      });
      return;
    }

    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "URL copied to clipboard"
    });
  };

  const swapTexts = () => {
    setInputText(outputText);
    setOutputText(inputText);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  const commonExamples = [
    {
      original: 'Hello World!',
      encoded: 'Hello%20World%21'
    },
    {
      original: 'user@example.com',
      encoded: 'user%40example.com'
    },
    {
      original: 'search query with spaces',
      encoded: 'search%20query%20with%20spaces'
    }
  ];

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Link}
        title="URL Encoder/Decoder"
        description="Encode URLs for safe transmission or decode URL-encoded strings back to readable text"
        gradient="bg-gradient-to-r from-blue-600 to-cyan-600"
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Mode Selection
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMode(mode === 'encode' ? 'decode' : 'encode')}
              >
                {mode === 'encode' ? 'Switch to Decode' : 'Switch to Encode'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button
                variant={mode === 'encode' ? 'default' : 'outline'}
                onClick={() => setMode('encode')}
              >
                Encode URL
              </Button>
              <Button
                variant={mode === 'decode' ? 'default' : 'outline'}
                onClick={() => setMode('decode')}
              >
                Decode URL
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Input
                <Button
                  variant="outline"
                  size="sm"
                  onClick={swapTexts}
                  disabled={!outputText}
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>
                  {mode === 'encode' ? 'URL/Text to Encode' : 'Encoded URL to Decode'}
                </Label>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    mode === 'encode' 
                      ? 'Enter URL or text to encode...' 
                      : 'Enter URL-encoded text to decode...'
                  }
                  className="min-h-[150px] mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {inputText.length} characters
                </p>
              </div>

              <Button onClick={handleProcess} className="w-full">
                {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Output
                {outputText && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(outputText)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label>
                  {mode === 'encode' ? 'URL Encoded' : 'Decoded Text'}
                </Label>
                <Textarea
                  value={outputText}
                  readOnly
                  placeholder="Output will appear here..."
                  className="min-h-[150px] mt-2 bg-gray-50 dark:bg-gray-800"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {outputText.length} characters
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {commonExamples.map((example, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-4 p-4 border rounded-lg">
                  <div>
                    <Label className="text-sm text-gray-600">Original</Label>
                    <Input
                      value={example.original}
                      readOnly
                      className="mt-1 bg-gray-50 dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">URL Encoded</Label>
                    <Input
                      value={example.encoded}
                      readOnly
                      className="mt-1 bg-gray-50 dark:bg-gray-800"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About URL Encoding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">What is URL Encoding?</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Also known as percent-encoding</li>
                  <li>• Converts special characters to % format</li>
                  <li>• Ensures safe transmission over the internet</li>
                  <li>• Required for query parameters and form data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Common Characters</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Space → %20</li>
                  <li>• @ → %40</li>
                  <li>• & → %26</li>
                  <li>• = → %3D</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <RelatedTools 
        currentToolId="urlencoder"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default URLEncoder;
