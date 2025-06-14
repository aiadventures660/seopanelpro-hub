
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToolHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

const ToolHeader = ({ icon: Icon, title, description, gradient }: ToolHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className={`inline-flex items-center justify-center w-16 h-16 ${gradient} rounded-2xl mb-6`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
        {description}
      </p>
    </div>
  );
};

export default ToolHeader;
