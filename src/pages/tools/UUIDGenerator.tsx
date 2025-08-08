
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, RefreshCw, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import { allTools } from '@/data/tools';

const UUIDGenerator = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(5);
  const { toast } = useToast();

  const generateV4UUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateUUIDs = (count: number = quantity) => {
    const newUUIDs = Array.from({ length: count }, () => generateV4UUID());
    setUuids(newUUIDs);
    
    toast({
      title: "UUIDs Generated",
      description: `Generated ${count} new UUID${count > 1 ? 's' : ''}`
    });
  };

  const copyToClipboard = (uuid: string) => {
    navigator.clipboard.writeText(uuid);
    toast({
      title: "Copied!",
      description: "UUID copied to clipboard"
    });
  };

  const copyAllUUIDs = () => {
    const allUUIDs = uuids.join('\n');
    navigator.clipboard.writeText(allUUIDs);
    toast({
      title: "All UUIDs Copied!",
      description: `${uuids.length} UUIDs copied to clipboard`
    });
  };

  const quantities = [1, 5, 10, 25, 50, 100];

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Hash}
        title="UUID Generator"
        description="Generate universally unique identifiers (UUIDs) for your applications and databases"
        gradient="bg-gradient-to-r from-purple-600 to-indigo-600"
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Generate UUIDs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-3 block">
                Number of UUIDs to generate:
              </label>
              <div className="flex flex-wrap gap-2">
                {quantities.map((qty) => (
                  <Button
                    key={qty}
                    variant={quantity === qty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setQuantity(qty)}
                  >
                    {qty}
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              onClick={() => generateUUIDs()} 
              className="w-full" 
              size="lg"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate {quantity} UUID{quantity > 1 ? 's' : ''}
            </Button>
          </CardContent>
        </Card>

        {uuids.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Generated UUIDs
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {uuids.length} UUID{uuids.length > 1 ? 's' : ''}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyAllUUIDs}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uuids.map((uuid, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <code className="font-mono text-sm flex-1 mr-4">
                      {uuid}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(uuid)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {uuids.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Hash className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
                No UUIDs generated yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Click the generate button to create unique identifiers
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>About UUIDs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">What is a UUID?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    A Universally Unique Identifier (UUID) is a 128-bit number used to uniquely 
                    identify information in computer systems. UUIDs are practically unique 
                    without requiring a central registration process.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">UUID Format</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    UUIDs are typically displayed as 32 hexadecimal digits, displayed in five 
                    groups separated by hyphens: 8-4-4-4-12 (36 characters total including hyphens).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Common Applications</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Database primary keys</li>
                    <li>• Session identifiers</li>
                    <li>• File and document naming</li>
                    <li>• API request tracking</li>
                    <li>• Distributed systems</li>
                    <li>• Software component identification</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Version 4 (Random)</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    This tool generates Version 4 UUIDs, which are created using random or 
                    pseudo-random numbers. They have excellent uniqueness properties and 
                    are the most commonly used UUID variant.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>UUID Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">When to Use UUIDs</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• When you need globally unique identifiers</li>
                  <li>• In distributed systems without coordination</li>
                  <li>• When merging data from multiple sources</li>
                  <li>• For temporary files and session management</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Considerations</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• UUIDs are longer than sequential IDs</li>
                  <li>• They don't reveal creation order</li>
                  <li>• Performance impact in some databases</li>
                  <li>• Consider using for public-facing IDs</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <RelatedTools 
        currentToolId="uuidgenerator"
        currentCategory="Utility"
        allTools={allTools}
      />
    </ToolPageLayout>
  );
};

export default UUIDGenerator;
