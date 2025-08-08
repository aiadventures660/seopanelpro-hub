
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, FileText, Minimize2, Maximize2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

const JSONFormatter = () => {
  const [inputJson, setInputJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [minifiedJson, setMinifiedJson] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    size: 0,
    lines: 0,
    keys: 0,
    arrays: 0,
    objects: 0
  });
  const { toast } = useToast();

  const analyzeJson = (obj: any, depth = 0): { keys: number; arrays: number; objects: number } => {
    let keys = 0;
    let arrays = 0;
    let objects = 0;

    if (Array.isArray(obj)) {
      arrays++;
      for (const item of obj) {
        const analysis = analyzeJson(item, depth + 1);
        keys += analysis.keys;
        arrays += analysis.arrays;
        objects += analysis.objects;
      }
    } else if (obj !== null && typeof obj === 'object') {
      objects++;
      const objKeys = Object.keys(obj);
      keys += objKeys.length;
      
      for (const key of objKeys) {
        const analysis = analyzeJson(obj[key], depth + 1);
        keys += analysis.keys;
        arrays += analysis.arrays;
        objects += analysis.objects;
      }
    }

    return { keys, arrays, objects };
  };

  const validateAndFormat = () => {
    if (!inputJson.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter JSON data to format",
        variant: "destructive"
      });
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      const minified = JSON.stringify(parsed);
      
      setFormattedJson(formatted);
      setMinifiedJson(minified);
      setIsValid(true);
      setError('');

      // Calculate statistics
      const analysis = analyzeJson(parsed);
      setStats({
        size: new Blob([minified]).size,
        lines: formatted.split('\n').length,
        keys: analysis.keys,
        arrays: analysis.arrays,
        objects: analysis.objects
      });

      toast({
        title: "JSON Formatted",
        description: "Your JSON has been successfully formatted and validated!"
      });
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : 'Invalid JSON format');
      setFormattedJson('');
      setMinifiedJson('');
      setStats({ size: 0, lines: 0, keys: 0, arrays: 0, objects: 0 });
      
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax and try again",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} JSON copied to clipboard`
    });
  };

  const loadSampleJson = () => {
    const sample = {
      "name": "John Doe",
      "age": 30,
      "email": "john.doe@example.com",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "zipCode": "10001",
        "country": "USA"
      },
      "hobbies": ["reading", "swimming", "coding"],
      "isActive": true,
      "skills": [
        { "name": "JavaScript", "level": "Advanced" },
        { "name": "Python", "level": "Intermediate" },
        { "name": "React", "level": "Advanced" }
      ]
    };
    
    setInputJson(JSON.stringify(sample, null, 2));
    toast({
      title: "Sample Loaded",
      description: "Sample JSON data has been loaded"
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={FileText}
        title="JSON Formatter & Validator"
        description="Format, validate, and minify JSON data with detailed analysis and error detection"
        gradient="bg-gradient-to-r from-blue-600 to-indigo-600"
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Input JSON
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={loadSampleJson}>
                  Load Sample
                </Button>
                <Button onClick={validateAndFormat}>
                  Format & Validate
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder="Paste your JSON here or click 'Load Sample' to see an example..."
              className="min-h-[200px] font-mono text-sm"
            />
            
            <div className="flex items-center justify-between mt-3">
              <p className="text-sm text-gray-500">
                {inputJson.length} characters
              </p>
              
              {isValid !== null && (
                <div className="flex items-center gap-2">
                  {isValid ? (
                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Valid JSON
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <XCircle className="h-3 w-3 mr-1" />
                      Invalid JSON
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {error && (
              <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-300">
                  <strong>Error:</strong> {error}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {isValid && formattedJson && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>JSON Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{formatBytes(stats.size)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Size</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.lines}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Lines</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{stats.keys}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Keys</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{stats.objects}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Objects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{stats.arrays}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Arrays</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Maximize2 className="h-4 w-4" />
                      Formatted JSON
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(formattedJson, 'Formatted')}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formattedJson}
                    readOnly
                    className="min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-800"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Minimize2 className="h-4 w-4" />
                      Minified JSON
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(minifiedJson, 'Minified')}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={minifiedJson}
                    readOnly
                    className="min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-800"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Minified size: {formatBytes(new Blob([minifiedJson]).size)}
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        <Card>
          <CardHeader>
            <CardTitle>About JSON Formatting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">What is JSON?</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• JavaScript Object Notation</li>
                  <li>• Lightweight data interchange format</li>
                  <li>• Human-readable and easy to parse</li>
                  <li>• Language-independent data format</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Use Cases</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• API responses and requests</li>
                  <li>• Configuration files</li>
                  <li>• Data storage and transmission</li>
                  <li>• Web application development</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <RelatedTools 
        currentToolId="jsonformatter"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default JSONFormatter;
