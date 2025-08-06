
import React, { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';
import ToolHeader from '@/components/ToolHeader';
import RelatedTools from '@/components/RelatedTools';
import BirthDateInput from '@/components/tools/age-calculator/BirthDateInput';
import AgeOverview from '@/components/tools/age-calculator/AgeOverview';
import DetailedBreakdown from '@/components/tools/age-calculator/DetailedBreakdown';
import { calculateAge, AgeResults } from '@/utils/ageCalculations';
import { allTools } from '@/data/tools';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [results, setResults] = useState<AgeResults | null>(null);

  useEffect(() => {
    if (birthDate) {
      const calculatedResults = calculateAge(birthDate);
      setResults(calculatedResults);
    }
  }, [birthDate]);

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
          <BirthDateInput 
            birthDate={birthDate} 
            onBirthDateChange={setBirthDate} 
          />

          {results && (
            <>
              <AgeOverview results={results} />
              <DetailedBreakdown results={results} />
            </>
          )}

          <RelatedTools 
            currentToolId="age-calculator"
            currentCategory="Calculation"
            allTools={allTools}
          />
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default AgeCalculator;
