
import { Tool } from '../tools';

export const calculationTools: Tool[] = [
  {
    id: 'readability-score-checker',
    name: 'Readability Score Checker (Flesch)',
    description: 'Analyze text readability using the Flesch Reading Ease score',
    category: 'Calculation & Misc',
    icon: '📖',
    route: '/tools/readability-score-checker',
    popular: true
  },
  {
    id: 'typing-speed-test',
    name: 'Typing Speed Test',
    description: 'Test your typing speed and accuracy with real-time WPM calculation',
    category: 'Calculation & Misc',
    icon: '⌨️',
    route: '/tools/typing-speed-test',
    featured: true
  },
  {
    id: 'loan-emi-calculator',
    name: 'Loan EMI Calculator',
    description: 'Calculate monthly EMI for home loans, personal loans, and more',
    category: 'Calculation & Misc',
    icon: '🏠',
    route: '/tools/loan-emi-calculator',
    popular: true
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and get health insights',
    category: 'Calculation & Misc',
    icon: '⚖️',
    route: '/tools/bmi-calculator',
    popular: true
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age in years, months, days, and more',
    category: 'Calculation & Misc',
    icon: '🎂',
    route: '/tools/age-calculator'
  },
  {
    id: 'random-password-generator',
    name: 'Random Password Generator',
    description: 'Generate secure random passwords with custom settings',
    category: 'Calculation & Misc',
    icon: '🔐',
    route: '/tools/random-password-generator'
  },
  {
    id: 'color-contrast-checker',
    name: 'Color Contrast Checker',
    description: 'Check color contrast ratios for web accessibility compliance',
    category: 'Calculation & Misc',
    icon: '🎨',
    route: '/tools/color-contrast-checker',
    featured: true
  }
];
