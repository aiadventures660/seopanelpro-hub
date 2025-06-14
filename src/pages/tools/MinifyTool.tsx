
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Zap, Copy, RefreshCw } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { toast } from 'sonner';

const MinifyTool = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [codeType, setCodeType] = useState<'css' | 'js' | 'html'>('css');
  const [isMinifying, setIsMinifying] = useState(false);
  const [stats, setStats] = useState<any>(null);

  const minifyCode = () => {
    if (!inputCode.trim()) {
      toast.error('Please enter code to minify');
      return;
    }

    setIsMinifying(true);
    
    setTimeout(() => {
      let minified = '';
      
      switch (codeType) {
        case 'css':
          // Simple CSS minification
          minified = inputCode
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/;\s+/g, ';') // Remove spaces after semicolons
            .replace(/{\s+/g, '{') // Remove spaces after opening braces
            .replace(/\s+}/g, '}') // Remove spaces before closing braces
            .replace(/,\s+/g, ',') // Remove spaces after commas
            .trim();
          break;
        case 'js':
          // Simple JS minification
          minified = inputCode
            .replace(/\/\/.*$/gm, '') // Remove single-line comments
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/;\s+/g, ';') // Remove spaces after semicolons
            .replace(/{\s+/g, '{') // Remove spaces after opening braces
            .replace(/\s+}/g, '}') // Remove spaces before closing braces
            .trim();
          break;
        case 'html':
          // Simple HTML minification
          minified = inputCode
            .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/>\s+</g, '><') // Remove spaces between tags
            .trim();
          break;
      }
      
      const originalSize = new Blob([inputCode]).size;
      const minifiedSize = new Blob([minified]).size;
      const savings = originalSize - minifiedSize;
      const percentage = Math.round((savings / originalSize) * 100);
      
      setOutputCode(minified);
      setStats({
        originalSize,
        minifiedSize,
        savings,
        percentage
      });
      setIsMinifying(false);
      toast.success('Code minified successfully!');
    }, 1000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(outputCode);
    toast.success('Minified code copied to clipboard!');
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <ToolPageLayout>
      <div className="max-w-6xl mx-auto py-12">
        <ToolHeader
          icon={Zap}
          title="Minify CSS/JS/HTML Tool"
          description="Minify CSS, JavaScript, and HTML code to reduce file sizes"
          gradient="bg-gradient-to-r from-yellow-600 to-red-600"
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Code Type Selection</CardTitle>
            <CardDescription>
              Choose the type of code you want to minify
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button
                variant={codeType === 'css' ? 'default' : 'outline'}
                onClick={() => setCodeType('css')}
              >
                CSS
              </Button>
              <Button
                variant={codeType === 'js' ? 'default' : 'outline'}
                onClick={() => setCodeType('js')}
              >
                JavaScript
              </Button>
              <Button
                variant={codeType === 'html' ? 'default' : 'outline'}
                onClick={() => setCodeType('html')}
              >
                HTML
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Code</CardTitle>
              <CardDescription>
                Paste your {codeType.toUpperCase()} code here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Original Code</Label>
                <Textarea
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder={`Enter your ${codeType.toUpperCase()} code here...`}
                  className="min-h-[300px] mt-2 font-mono text-sm"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {inputCode.length} characters
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Output Code
                {outputCode && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyCode}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
              </CardTitle>
              <CardDescription>
                Minified {codeType.toUpperCase()} code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Minified Code</Label>
                <Textarea
                  value={outputCode}
                  readOnly
                  placeholder="Minified code will appear here..."
                  className="min-h-[300px] mt-2 font-mono text-sm bg-gray-50 dark:bg-gray-800"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {outputCode.length} characters
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <Button 
              onClick={minifyCode} 
              className="w-full"
              disabled={isMinifying}
            >
              {isMinifying ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Minifying...</>
              ) : (
                `Minify ${codeType.toUpperCase()} Code`
              )}
            </Button>
          </CardContent>
        </Card>

        {stats && (
          <Card>
            <CardHeader>
              <CardTitle>Minification Results</CardTitle>
              <CardDescription>
                File size reduction statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Label className="text-sm font-medium">Original Size</Label>
                  <p className="text-lg font-semibold">{formatBytes(stats.originalSize)}</p>
                </div>
                <div className="text-center">
                  <Label className="text-sm font-medium">Minified Size</Label>
                  <p className="text-lg font-semibold">{formatBytes(stats.minifiedSize)}</p>
                </div>
                <div className="text-center">
                  <Label className="text-sm font-medium">Bytes Saved</Label>
                  <p className="text-lg font-semibold text-green-600">
                    {formatBytes(stats.savings)}
                  </p>
                </div>
                <div className="text-center">
                  <Label className="text-sm font-medium">Reduction</Label>
                  <Badge className="bg-green-500 text-white text-lg px-3 py-1">
                    {stats.percentage}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default MinifyTool;
