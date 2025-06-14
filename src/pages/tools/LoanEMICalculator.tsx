
import React, { useState, useEffect } from 'react';
import { Calculator, Home, TrendingUp, DollarSign } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoanEMICalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [results, setResults] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / (12 * 100); // Monthly interest rate
    const N = parseFloat(tenure) * 12; // Total number of months

    if (!P || !R || !N) return;

    // EMI formula: P * R * (1 + R)^N / ((1 + R)^N - 1)
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;

    setResults({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: P
    });
  };

  useEffect(() => {
    if (principal && rate && tenure) {
      calculateEMI();
    }
  }, [principal, rate, tenure]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <ToolPageLayout>
      <div className="py-8">
        <ToolHeader
          icon={Home}
          title="Loan EMI Calculator"
          description="Calculate monthly EMI for home loans, personal loans, and more"
          gradient="bg-gradient-to-r from-green-500 to-blue-500"
        />

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Loan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="principal">Loan Amount (₹)</Label>
                  <Input
                    id="principal"
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    placeholder="Enter loan amount"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="rate">Interest Rate (% per annum)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="Enter interest rate"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                  <Input
                    id="tenure"
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    placeholder="Enter loan tenure"
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
                    EMI Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {formatCurrency(results.emi)}
                    </div>
                    <p className="text-sm text-gray-600">Monthly EMI</p>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between">
                      <span>Principal Amount:</span>
                      <span className="font-semibold">{formatCurrency(results.principal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Interest:</span>
                      <span className="font-semibold text-orange-600">{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span>Total Amount:</span>
                      <span className="font-bold text-lg">{formatCurrency(results.totalAmount)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {results && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(results.emi)}</div>
                    <p className="text-sm text-gray-600">Monthly Payment</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(results.principal)}</div>
                    <p className="text-sm text-gray-600">Principal</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{formatCurrency(results.totalInterest)}</div>
                    <p className="text-sm text-gray-600">Total Interest</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>How EMI is Calculated</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                EMI (Equated Monthly Installment) is calculated using the formula:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg font-mono">
                EMI = P × R × (1 + R)^N / ((1 + R)^N - 1)
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
                Where P = Principal loan amount, R = Monthly interest rate, N = Number of monthly installments
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default LoanEMICalculator;
