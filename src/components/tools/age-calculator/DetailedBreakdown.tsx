
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AgeResults, formatNumber } from '@/utils/ageCalculations';

interface DetailedBreakdownProps {
  results: AgeResults;
}

const DetailedBreakdown = ({ results }: DetailedBreakdownProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{formatNumber(results.totalDays)}</div>
            <p className="text-sm text-gray-600">Total Days Lived</p>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{formatNumber(results.totalHours)}</div>
            <p className="text-sm text-gray-600">Total Hours</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{formatNumber(results.totalMinutes)}</div>
            <p className="text-sm text-gray-600">Total Minutes</p>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{formatNumber(results.totalSeconds)}</div>
            <p className="text-sm text-gray-600">Total Seconds</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedBreakdown;
