
export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
}

export const generatePasswordUtil = (options: PasswordOptions): string => {
  let charset = '';
  const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar } = options;

  if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (includeNumbers) charset += '0123456789';
  if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (excludeSimilar) {
    charset = charset.replace(/[il1Lo0O]/g, '');
  }

  if (!charset) {
    return '';
  }

  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return result;
};


export interface PasswordStrength {
  strength: 'None' | 'Weak' | 'Medium' | 'Strong';
  color: string;
  score: number;
}

export const getPasswordStrength = (password: string): PasswordStrength => {
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
