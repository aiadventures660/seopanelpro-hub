import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };
  return <Button variant="ghost" onClick={handleBack} className="mb-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-blue-700 hover:bg-blue-600">
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to Tools
    </Button>;
};
export default BackButton;