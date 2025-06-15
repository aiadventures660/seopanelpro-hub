
import React from 'react';
import { TrendingUp, Gift, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AgeResults, formatNumber } from '@/utils/ageCalculations';

interface AgeOverviewProps {
  results: AgeResults;
}

const AgeOverview = ({ results }: AgeOverviewProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Exact Age
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-purple-600">
              {results.years}
            </div>
            <p className="text-sm text-gray-600">Years</p>
            <div className="text-lg font-semibold">
              {results.months} months, {results.days} days
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Next Birthday
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-pink-600">
              {results.daysToNextBirthday}
            </div>
            <p className="text-sm text-gray-600">Days to go</p>
            <div className="text-lg font-semibold">
              You'll turn {results.nextAge}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Life Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Total Days:</span>
              <span className="font-semibold">{formatNumber(results.totalDays)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Total Hours:</span>
              <span className="font-semibold">{formatNumber(results.totalHours)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Total Minutes:</span>
              <span className="font-semibold">{formatNumber(results.totalMinutes)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgeOverview;
