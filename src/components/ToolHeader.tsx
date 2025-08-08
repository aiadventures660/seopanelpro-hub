
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
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-4">
        <div className={`inline-flex items-center justify-center w-12 h-12 ${gradient} rounded-xl`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
        {description}
      </p>
    </div>
  );
};

export default ToolHeader;
