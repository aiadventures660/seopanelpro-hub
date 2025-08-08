
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Button
      variant="outline"
      onClick={handleBack}
      className="mb-6 bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to Tools
    </Button>
  );
};

export default BackButton;
