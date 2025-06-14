
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Gift, TrendingUp } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [results, setResults] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();
    
    if (birth > today) return;

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += lastDayOfPrevMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total days
    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    
    // Calculate total hours, minutes, seconds
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    // Next birthday
    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    setResults({
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysToNextBirthday,
      nextAge: years + 1
    });
  };

  useEffect(() => {
    if (birthDate) {
      calculateAge();
    }
  }, [birthDate]);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <ToolPageLayout>
      <div className="py-8">
        <ToolHeader
          icon={Gift}
          title="Age Calculator"
          description="Calculate exact age in years, months, days, and more"
          gradient="bg-gradient-to-r from-pink-500 to-purple-500"
        />

        <div className="max-w-4xl mx-auto space-y-6">
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
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {results && (
            <>
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
            </>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default AgeCalculator;
