
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PasswordSecurityTips = () => (
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
);

export default PasswordSecurityTips;
