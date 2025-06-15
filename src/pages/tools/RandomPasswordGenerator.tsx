
import React, { useState } from 'react';
import { Key, Shield, Copy, RefreshCw } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

const RandomPasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const { toast } = useToast();

  const generatePassword = () => {
    let charset = '';
    
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }
    
    if (!charset) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive"
      });
      return;
    }
    
    let result = '';
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard"
    });
  };

  const getPasswordStrength = () => {
    if (!password) return { strength: 'None', color: 'text-gray-400', score: 0 };
    
    let score = 0;
    
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    
    if (score <= 2) return { strength: 'Weak', color: 'text-red-600', score: score * 16.67 };
    if (score <= 4) return { strength: 'Medium', color: 'text-yellow-600', score: score * 16.67 };
    return { strength: 'Strong', color: 'text-green-600', score: score * 16.67 };
  };

  const strengthInfo = getPasswordStrength();

  return (
    <ToolPageLayout>
      <div className="py-8">
        <ToolHeader
          icon={Key}
          title="Random Password Generator"
          description="Generate secure random passwords with custom settings"
          gradient="bg-gradient-to-r from-red-500 to-pink-500"
        />

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
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
                  onClick={generatePassword}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Generated Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {password && (
                  <>
                    <div>
                      <Label>Your Password:</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={password}
                          readOnly
                          className="font-mono"
                        />
                        <Button
                          onClick={copyToClipboard}
                          size="icon"
                          variant="outline"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>Password Strength:</Label>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-semibold ${strengthInfo.color}`}>
                            {strengthInfo.strength}
                          </span>
                          <span className="text-sm text-gray-600">
                            {Math.round(strengthInfo.score)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              strengthInfo.strength === 'Weak' ? 'bg-red-500' :
                              strengthInfo.strength === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${strengthInfo.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {!password && (
                  <div className="text-center text-gray-500 py-8">
                    Click "Generate Password" to create a secure password
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Password Security Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">✅ Do:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Use at least 12 characters</li>
                    <li>• Include mix of uppercase, lowercase, numbers, and symbols</li>
                    <li>• Use unique passwords for each account</li>
                    <li>• Store passwords in a password manager</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">❌ Don't:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Use personal information</li>
                    <li>• Reuse passwords across multiple accounts</li>
                    <li>• Share passwords via email or text</li>
                    <li>• Use common words or patterns</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default RandomPasswordGenerator;
