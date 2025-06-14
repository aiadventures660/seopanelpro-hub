
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([12]);
  const [showPassword, setShowPassword] = useState(true);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false
  });
  const { toast } = useToast();

  const generatePassword = () => {
    const { uppercase, lowercase, numbers, symbols, excludeSimilar, excludeAmbiguous } = options;
    
    if (!uppercase && !lowercase && !numbers && !symbols) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive"
      });
      return;
    }

    let charset = '';
    let upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    let numberChars = '0123456789';
    let symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Exclude similar characters if option is selected
    if (excludeSimilar) {
      upperChars = upperChars.replace(/[IL]/g, '');
      lowerChars = lowerChars.replace(/[il]/g, '');
      numberChars = numberChars.replace(/[01]/g, '');
    }

    // Exclude ambiguous characters if option is selected
    if (excludeAmbiguous) {
      upperChars = upperChars.replace(/[O]/g, '');
      lowerChars = lowerChars.replace(/[o]/g, '');
      numberChars = numberChars.replace(/[0]/g, '');
      symbolChars = symbolChars.replace(/[{}[\]()\/\\'"~,;.<>]/g, '');
    }

    if (uppercase) charset += upperChars;
    if (lowercase) charset += lowerChars;
    if (numbers) charset += numberChars;
    if (symbols) charset += symbolChars;

    let generatedPassword = '';
    for (let i = 0; i < length[0]; i++) {
      generatedPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(generatedPassword);
    toast({
      title: "Password Generated",
      description: "New secure password has been generated!"
    });
  };

  const copyToClipboard = () => {
    if (!password) return;
    
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard"
    });
  };

  const getStrengthScore = () => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  };

  const getStrengthLabel = (score: number) => {
    if (score <= 2) return { label: 'Weak', color: 'text-red-600' };
    if (score <= 4) return { label: 'Medium', color: 'text-yellow-600' };
    return { label: 'Strong', color: 'text-green-600' };
  };

  const strengthScore = getStrengthScore();
  const strength = getStrengthLabel(strengthScore);

  return (
    <ToolPageLayout>
      <ToolHeader
        icon={Lock}
        title="Password Generator"
        description="Generate secure, random passwords with customizable criteria for your accounts"
        gradient="bg-gradient-to-r from-red-600 to-pink-600"
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Generated Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  readOnly
                  placeholder="Click 'Generate Password' to create a new password"
                  className="pr-20 font-mono text-lg"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="h-8 w-8 p-0"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!password}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {password && (
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Password Strength: <span className={`font-medium ${strength.color}`}>{strength.label}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Length: {password.length} characters
                  </p>
                </div>
                <div className="flex gap-1">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-6 rounded ${
                        i < strengthScore
                          ? strengthScore <= 2
                            ? 'bg-red-500'
                            : strengthScore <= 4
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <Button onClick={generatePassword} className="w-full" size="lg">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate Password
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-4 block">
                Password Length: {length[0]}
              </Label>
              <Slider
                value={length}
                onValueChange={setLength}
                max={50}
                min={4}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>4</span>
                <span>50</span>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Character Types</Label>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uppercase"
                    checked={options.uppercase}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, uppercase: !!checked }))
                    }
                  />
                  <Label htmlFor="uppercase">Uppercase Letters (A-Z)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lowercase"
                    checked={options.lowercase}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, lowercase: !!checked }))
                    }
                  />
                  <Label htmlFor="lowercase">Lowercase Letters (a-z)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="numbers"
                    checked={options.numbers}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, numbers: !!checked }))
                    }
                  />
                  <Label htmlFor="numbers">Numbers (0-9)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="symbols"
                    checked={options.symbols}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, symbols: !!checked }))
                    }
                  />
                  <Label htmlFor="symbols">Symbols (!@#$%^&*)</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <Label className="text-base font-medium">Advanced Options</Label>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="excludeSimilar"
                    checked={options.excludeSimilar}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, excludeSimilar: !!checked }))
                    }
                  />
                  <Label htmlFor="excludeSimilar">Exclude similar characters (i, l, 1, L, o, 0, O)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="excludeAmbiguous"
                    checked={options.excludeAmbiguous}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, excludeAmbiguous: !!checked }))
                    }
                  />
                  <Label htmlFor="excludeAmbiguous">Exclude ambiguous characters ({`{}`}[]()\/\"'~,;.&lt;&gt;)</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password Security Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Strong Password Guidelines</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Use at least 12 characters</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Add numbers and special characters</li>
                  <li>• Avoid common words or patterns</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Best Practices</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Use unique passwords for each account</li>
                  <li>• Store passwords in a password manager</li>
                  <li>• Enable two-factor authentication</li>
                  <li>• Change passwords regularly</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolPageLayout>
  );
};

export default PasswordGenerator;
