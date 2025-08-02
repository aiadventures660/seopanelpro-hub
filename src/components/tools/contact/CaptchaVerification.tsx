import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';

interface CaptchaVerificationProps {
  onVerify: (isValid: boolean) => void;
  isRequired?: boolean;
}

export const CaptchaVerification: React.FC<CaptchaVerificationProps> = ({
  onVerify,
  isRequired = true
}) => {
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer: number;
    let question: string;
    
    switch (operation) {
      case '+':
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case '-':
        // Ensure positive result
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        answer = larger - smaller;
        question = `${larger} - ${smaller}`;
        break;
      case '*':
        // Use smaller numbers for multiplication
        const smallNum1 = Math.floor(Math.random() * 5) + 1;
        const smallNum2 = Math.floor(Math.random() * 5) + 1;
        answer = smallNum1 * smallNum2;
        question = `${smallNum1} × ${smallNum2}`;
        break;
      default:
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
    }
    
    setCaptchaQuestion(question);
    setCaptchaAnswer(answer);
    setUserAnswer('');
    setIsVerified(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (!isRequired) {
      onVerify(true);
    }
  }, [isRequired, onVerify]);

  const handleVerification = () => {
    const isValid = parseInt(userAnswer) === captchaAnswer;
    setIsVerified(isValid);
    onVerify(isValid);
  };

  if (!isRequired) {
    return null;
  }

  return (
    <Card className="border-border/50">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="captcha">Security Verification</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={generateCaptcha}
              className="h-6 w-6 p-0"
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-muted/50 px-3 py-2 rounded border font-mono text-lg">
              {captchaQuestion} = ?
            </div>
            <Input
              id="captcha"
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Answer"
              className="w-20"
              required
            />
            <Button
              type="button"
              onClick={handleVerification}
              variant="outline"
              size="sm"
            >
              Verify
            </Button>
          </div>
          
          {isVerified && (
            <p className="text-sm text-green-600 dark:text-green-400">
              ✓ Verification successful
            </p>
          )}
          
          {userAnswer && !isVerified && parseInt(userAnswer) !== captchaAnswer && userAnswer.length > 0 && (
            <p className="text-sm text-destructive">
              Incorrect answer. Please try again.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};