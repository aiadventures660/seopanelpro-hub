
import React from 'react';
import { Route } from 'react-router-dom';

import ReadabilityScoreChecker from "@/pages/tools/ReadabilityScoreChecker";
import TypingSpeedTest from "@/pages/tools/TypingSpeedTest";
import LoanEMICalculator from "@/pages/tools/LoanEMICalculator";
import BMICalculator from "@/pages/tools/BMICalculator";
import AgeCalculator from "@/pages/tools/AgeCalculator";
import RandomPasswordGenerator from "@/pages/tools/RandomPasswordGenerator";
import ColorContrastChecker from "@/pages/tools/ColorContrastChecker";

const calculationRoutes = [
  <Route key="readability-score-checker" path="/tools/readability-score-checker" element={<ReadabilityScoreChecker />} />,
  <Route key="typing-speed-test" path="/tools/typing-speed-test" element={<TypingSpeedTest />} />,
  <Route key="loan-emi-calculator" path="/tools/loan-emi-calculator" element={<LoanEMICalculator />} />,
  <Route key="bmi-calculator" path="/tools/bmi-calculator" element={<BMICalculator />} />,
  <Route key="age-calculator" path="/tools/age-calculator" element={<AgeCalculator />} />,
  <Route key="random-password-generator" path="/tools/random-password-generator" element={<RandomPasswordGenerator />} />,
  <Route key="color-contrast-checker" path="/tools/color-contrast-checker" element={<ColorContrastChecker />} />
];

export default calculationRoutes;
