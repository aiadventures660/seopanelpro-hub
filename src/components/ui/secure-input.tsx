import React from 'react';
import { validateInput, detectSuspiciousActivity, sanitizeUserInput } from '@/utils/securityUtils';
import { useToast } from '@/hooks/use-toast';

interface SecureInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  validationType?: 'email' | 'text' | 'url' | 'toolId';
  maxLength?: number;
  onSecurityEvent?: (event: string, details: any) => void;
}

export const SecureInput = React.forwardRef<HTMLInputElement, SecureInputProps>(
  ({ validationType = 'text', maxLength = 1000, onSecurityEvent, onChange, ...props }, ref) => {
    const { toast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      // Check for suspicious patterns
      if (detectSuspiciousActivity(value)) {
        onSecurityEvent?.('suspicious_input_detected', { 
          input: value.substring(0, 100), // Log only first 100 chars
          field: props.name || 'unknown'
        });
        toast({
          title: 'Security Warning',
          description: 'Potentially malicious content detected',
          variant: 'destructive'
        });
        return;
      }

      // Validate input based on type
      let isValid = true;
      switch (validationType) {
        case 'email':
          isValid = validateInput.email(value);
          break;
        case 'url':
          isValid = value === '' || validateInput.url(value);
          break;
        case 'toolId':
          isValid = validateInput.toolId(value);
          break;
        case 'text':
          isValid = validateInput.text(value, maxLength);
          break;
      }

      if (!isValid) {
        onSecurityEvent?.('invalid_input', { 
          type: validationType,
          field: props.name || 'unknown'
        });
        toast({
          title: 'Invalid Input',
          description: `Please enter a valid ${validationType}`,
          variant: 'destructive'
        });
        return;
      }

      // Sanitize and pass through
      e.target.value = sanitizeUserInput(value);
      onChange?.(e);
    };

    return (
      <input
        {...props}
        ref={ref}
        onChange={handleChange}
        maxLength={maxLength}
      />
    );
  }
);

SecureInput.displayName = 'SecureInput';