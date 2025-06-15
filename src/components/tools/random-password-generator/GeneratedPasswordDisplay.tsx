
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PasswordStrength } from '@/utils/passwordUtils';

interface GeneratedPasswordDisplayProps {
  password: string;
  strengthInfo: PasswordStrength;
}

const GeneratedPasswordDisplay: React.FC<GeneratedPasswordDisplayProps> = ({ password, strengthInfo }) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Generated Password
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {password ? (
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
        ) : (
          <div className="text-center text-gray-500 py-8">
            Click "Generate Password" to create a secure password
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeneratedPasswordDisplay;
