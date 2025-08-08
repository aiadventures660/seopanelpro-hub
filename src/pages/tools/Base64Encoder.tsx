
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, ArrowUpDown, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

const Base64Encoder = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const { toast } = useToast();

  const handleEncode = () => {
    try {
      const encoded = btoa(inputText);
      setOutputText(encoded);
      toast({
        title: "Encoded Successfully",
        description: "Text has been encoded to Base64"
      });
    } catch (error) {
      toast({
        title: "Encoding Error",
        description: "Failed to encode text. Please check your input.",
        variant: "destructive"
      });
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(inputText);
      setOutputText(decoded);
      toast({
        title: "Decoded Successfully",
        description: "Base64 has been decoded to text"
      });
    } catch (error) {
      toast({
        title: "Decoding Error",
        description: "Invalid Base64 format. Please check your input.",
        variant: "destructive"
      });
    }
  };

  const handleProcess = () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter text to process",
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
      description: "Text copied to clipboard"
    });
  };

  const swapTexts = () => {
    setInputText(outputText);
    setOutputText(inputText);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Lock}
        title="Base64 Encoder/Decoder"
        description="Encode text to Base64 or decode Base64 back to readable text"
        gradient="bg-gradient-to-r from-green-600 to-blue-600"
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
                Encode to Base64
              </Button>
              <Button
                variant={mode === 'decode' ? 'default' : 'outline'}
                onClick={() => setMode('decode')}
              >
                Decode from Base64
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Input Text
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
                  {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
                </Label>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    mode === 'encode' 
                      ? 'Enter text to encode to Base64...' 
                      : 'Enter Base64 text to decode...'
                  }
                  className="min-h-[200px] mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {inputText.length} characters
                </p>
              </div>

              <Button onClick={handleProcess} className="w-full">
                {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
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
                  {mode === 'encode' ? 'Base64 Encoded' : 'Decoded Text'}
                </Label>
                <Textarea
                  value={outputText}
                  readOnly
                  placeholder="Output will appear here..."
                  className="min-h-[200px] mt-2 bg-gray-50 dark:bg-gray-800"
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
            <CardTitle>About Base64 Encoding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">What is Base64?</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Binary-to-text encoding scheme</li>
                  <li>• Represents binary data in ASCII format</li>
                  <li>• Uses 64 characters: A-Z, a-z, 0-9, +, /</li>
                  <li>• Commonly used in web development</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Use Cases</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Email attachments (MIME)</li>
                  <li>• Data URLs in web pages</li>
                  <li>• API authentication tokens</li>
                  <li>• Storing binary data in JSON/XML</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <RelatedTools 
        currentToolId="base64encoder"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default Base64Encoder;
