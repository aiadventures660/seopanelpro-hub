
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
  const bgClass = variant === 'secondary' 
    ? 'bg-gray-50/50 dark:bg-gray-800/50' 
    : 'bg-white/50 dark:bg-gray-900/50';

  const handleToolClick = (tool: Tool) => {
    storeToolPosition(tool.id);
  };

  return (
    <section className={`py-16 px-4 ${bgClass} border-2 border-indigo-200 dark:border-indigo-700 animate-pulse-border rounded-lg mx-4 my-8`} id={category}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div key={tool.id} id={`tool-${tool.id}`} onClick={() => handleToolClick(tool)}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
