
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BirthDateInputProps {
  birthDate: string;
  onBirthDateChange: (date: string) => void;
}

const BirthDateInput = ({ birthDate, onBirthDateChange }: BirthDateInputProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Enter Your Birth Date
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-md">
          <Label htmlFor="birthdate">Birth Date</Label>
          <Input
            id="birthdate"
            type="date"
            value={birthDate}
            onChange={(e) => onBirthDateChange(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BirthDateInput;
