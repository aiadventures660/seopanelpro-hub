
import React, { useState, useEffect } from 'react';
import { Scale, TrendingUp, Heart, Activity } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric'); // metric or imperial
  const [results, setResults] = useState(null);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum) return;

    let bmi;
    if (unit === 'metric') {
      // Height in cm, convert to meters
      const heightInMeters = heightNum / 100;
      bmi = weightNum / (heightInMeters * heightInMeters);
    } else {
      // Imperial: weight in lbs, height in inches
      bmi = (weightNum / (heightNum * heightNum)) * 703;
    }

    let category, description, color;
    if (bmi < 18.5) {
      category = "Underweight";
      description = "Below normal weight";
      color = "text-blue-600";
    } else if (bmi < 25) {
      category = "Normal weight";
      description = "Healthy weight range";
      color = "text-green-600";
    } else if (bmi < 30) {
      category = "Overweight";
      description = "Above normal weight";
      color = "text-yellow-600";
    } else {
      category = "Obese";
      description = "Significantly above normal weight";
      color = "text-red-600";
    }

    setResults({
      bmi: Math.round(bmi * 10) / 10,
      category,
      description,
      color,
      weight: weightNum,
      height: heightNum
    });
  };

  useEffect(() => {
    if (height && weight) {
      calculateBMI();
    }
  }, [height, weight, unit]);

  const getBMIRanges = () => [
    { range: "Below 18.5", category: "Underweight", color: "bg-blue-100 text-blue-800" },
    { range: "18.5 - 24.9", category: "Normal weight", color: "bg-green-100 text-green-800" },
    { range: "25.0 - 29.9", category: "Overweight", color: "bg-yellow-100 text-yellow-800" },
    { range: "30.0 and above", category: "Obese", color: "bg-red-100 text-red-800" }
  ];

  return (
    <ToolPageLayout>
      <div className="py-8">
        <ToolHeader
          icon={Scale}
          title="BMI Calculator"
          description="Calculate your Body Mass Index and get health insights"
          gradient="bg-gradient-to-r from-teal-500 to-blue-500"
        />

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Body Measurements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={unit === 'metric' ? 'default' : 'outline'}
                    onClick={() => setUnit('metric')}
                    size="sm"
                  >
                    Metric
                  </Button>
                  <Button
                    variant={unit === 'imperial' ? 'default' : 'outline'}
                    onClick={() => setUnit('imperial')}
                    size="sm"
                  >
                    Imperial
                  </Button>
                </div>

                <div>
                  <Label htmlFor="height">
                    Height ({unit === 'metric' ? 'cm' : 'inches'})
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={unit === 'metric' ? 'Enter height in cm' : 'Enter height in inches'}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="weight">
                    Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={unit === 'metric' ? 'Enter weight in kg' : 'Enter weight in lbs'}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {results && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Your BMI Result
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${results.color} mb-2`}>
                      {results.bmi}
                    </div>
                    <Badge variant="secondary" className="text-lg px-4 py-2 mb-2">
                      {results.category}
                    </Badge>
                    <p className="text-gray-600 dark:text-gray-300">
                      {results.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                BMI Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {getBMIRanges().map((range, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{range.range}</div>
                      <div className="text-sm text-gray-600">{range.category}</div>
                    </div>
                    <Badge className={range.color}>
                      {range.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {results && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Health Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.bmi < 18.5 && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Underweight</h4>
                      <p className="text-blue-700 dark:text-blue-300">
                        Consider consulting with a healthcare professional about healthy weight gain strategies, including proper nutrition and exercise.
                      </p>
                    </div>
                  )}
                  
                  {results.bmi >= 18.5 && results.bmi < 25 && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Normal Weight</h4>
                      <p className="text-green-700 dark:text-green-300">
                        Great job! Maintain your current weight through a balanced diet and regular physical activity.
                      </p>
                    </div>
                  )}
                  
                  {results.bmi >= 25 && results.bmi < 30 && (
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Overweight</h4>
                      <p className="text-yellow-700 dark:text-yellow-300">
                        Consider adopting healthier eating habits and increasing physical activity to reach a healthier weight range.
                      </p>
                    </div>
                  )}
                  
                  {results.bmi >= 30 && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Obese</h4>
                      <p className="text-red-700 dark:text-red-300">
                        It's recommended to consult with a healthcare professional for personalized advice on weight management and health improvement.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>About BMI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Body Mass Index (BMI) is a simple calculation using a person's height and weight. 
                The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in metres squared.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Note: BMI is a screening tool and is not intended to diagnose disease or illness. 
                Please consult with a healthcare professional for comprehensive health assessment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default BMICalculator;
