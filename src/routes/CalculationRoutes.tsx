
import React from 'react';
import { Route } from 'react-router-dom';

import ReadabilityScoreChecker from "@/pages/tools/ReadabilityScoreChecker";
import TypingSpeedTest from "@/pages/tools/TypingSpeedTest";
import LoanEMICalculator from "@/pages/tools/LoanEMICalculator";
import BMICalculator from "@/pages/tools/BMICalculator";
import AgeCalculator from "@/pages/tools/AgeCalculator";
import RandomPasswordGenerator from "@/pages/tools/RandomPasswordGenerator";
import ColorContrastChecker from "@/pages/tools/ColorContrastChecker";

const CalculationRoutes = () => (
  <>
    <Route path="/tools/readability-score-checker" element={<ReadabilityScoreChecker />} />
    <Route path="/tools/typing-speed-test" element={<TypingSpeedTest />} />
    <Route path="/tools/loan-emi-calculator" element={<LoanEMICalculator />} />
    <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
    <Route path="/tools/age-calculator" element={<AgeCalculator />} />
    <Route path="/tools/random-password-generator" element={<RandomPasswordGenerator />} />
    <Route path="/tools/color-contrast-checker" element={<ColorContrastChecker />} />
  </>
);

export default CalculationRoutes;
