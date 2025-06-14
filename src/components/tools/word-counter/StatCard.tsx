
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  color?: string;
}

const StatCard = ({ icon: Icon, label, value, color = "blue" }: StatCardProps) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg bg-${color}-100 dark:bg-${color}-900/20`}>
          <Icon className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
