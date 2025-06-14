
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
    <section className={`py-16 px-4 ${bgClass}`} id={category}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
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
