
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { RefreshCw, Shield } from 'lucide-react';

interface PasswordSettingsProps {
  length: number[];
  setLength: (value: number[]) => void;
  includeUppercase: boolean;
  setIncludeUppercase: (value: boolean) => void;
  includeLowercase: boolean;
  setIncludeLowercase: (value: boolean) => void;
  includeNumbers: boolean;
  setIncludeNumbers: (value: boolean) => void;
  includeSymbols: boolean;
  setIncludeSymbols: (value: boolean) => void;
  excludeSimilar: boolean;
  setExcludeSimilar: (value: boolean) => void;
  onGenerate: () => void;
}

const PasswordSettings: React.FC<PasswordSettingsProps> = ({
  length,
  setLength,
  includeUppercase,
  setIncludeUppercase,
  includeLowercase,
  setIncludeLowercase,
  includeNumbers,
  setIncludeNumbers,
  includeSymbols,
  setIncludeSymbols,
  excludeSimilar,
  setExcludeSimilar,
  onGenerate,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Password Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Password Length: {length[0]}</Label>
          <Slider
            value={length}
            onValueChange={setLength}
            max={50}
            min={4}
            step={1}
            className="mt-2"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
            />
            <Label htmlFor="uppercase">Include Uppercase Letters (A-Z)</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowercase"
              checked={includeLowercase}
              onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
            />
            <Label htmlFor="lowercase">Include Lowercase Letters (a-z)</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
            />
            <Label htmlFor="numbers">Include Numbers (0-9)</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
            />
            <Label htmlFor="symbols">Include Symbols (!@#$%^&*)</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="exclude-similar"
              checked={excludeSimilar}
              onCheckedChange={(checked) => setExcludeSimilar(checked === true)}
            />
            <Label htmlFor="exclude-similar">Exclude Similar Characters (i, l, 1, L, o, 0, O)</Label>
          </div>
        </div>

        <Button 
          onClick={onGenerate}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Generate Password
        </Button>
      </CardContent>
    </Card>
  );
};

export default PasswordSettings;
