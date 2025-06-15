
import React, { useState, useMemo } from 'react';
import { Key } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { useToast } from '@/hooks/use-toast';
import { generatePasswordUtil, getPasswordStrength } from '@/utils/passwordUtils';
import PasswordSettings from '@/components/tools/random-password-generator/PasswordSettings';
import GeneratedPasswordDisplay from '@/components/tools/random-password-generator/GeneratedPasswordDisplay';
import PasswordSecurityTips from '@/components/tools/random-password-generator/PasswordSecurityTips';

const RandomPasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const { toast } = useToast();

  const handleGeneratePassword = () => {
    const options = {
      length: length[0],
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
      excludeSimilar,
    };
    
    const newPassword = generatePasswordUtil(options);
    
    if (!newPassword) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive"
      });
      return;
    }
    
    setPassword(newPassword);
  };

  const strengthInfo = useMemo(() => getPasswordStrength(password), [password]);

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
            <PasswordSettings
              length={length}
              setLength={setLength}
              includeUppercase={includeUppercase}
              setIncludeUppercase={setIncludeUppercase}
              includeLowercase={includeLowercase}
              setIncludeLowercase={setIncludeLowercase}
              includeNumbers={includeNumbers}
              setIncludeNumbers={setIncludeNumbers}
              includeSymbols={includeSymbols}
              setIncludeSymbols={setIncludeSymbols}
              excludeSimilar={excludeSimilar}
              setExcludeSimilar={setExcludeSimilar}
              onGenerate={handleGeneratePassword}
            />
            <GeneratedPasswordDisplay password={password} strengthInfo={strengthInfo} />
          </div>

          <PasswordSecurityTips />
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default RandomPasswordGenerator;
