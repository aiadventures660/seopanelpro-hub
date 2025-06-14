
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ToolCard from '@/components/ToolCard';
import { Tool } from '@/data/tools';
import { storeToolPosition } from '@/hooks/useScrollPosition';

interface CategorySectionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  tools: Tool[];
  category: string;
  variant?: 'primary' | 'secondary';
}

const CategorySection = ({ 
  title, 
  description, 
  icon: Icon, 
  tools, 
  category, 
  variant = 'primary' 
}: CategorySectionProps) => {
  const gradientClasses = variant === 'secondary' 
    ? 'bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-blue-900/20' 
    : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20';

  const iconGradient = variant === 'secondary'
    ? 'from-slate-600 to-gray-600'
    : 'from-blue-600 to-purple-600';

  const handleToolClick = (tool: Tool) => {
    console.log(`Tool clicked: ${tool.name} (ID: ${tool.id})`);
    storeToolPosition(tool.id);
  };

  return (
    <section className={`py-20 px-4 ${gradientClasses} relative overflow-hidden`} id={category}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-bl from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${iconGradient} rounded-2xl shadow-lg`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {tools.map((tool) => (
            <div key={tool.id} id={`tool-${tool.id}`}>
              <ToolCard tool={tool} onToolClick={() => handleToolClick(tool)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
