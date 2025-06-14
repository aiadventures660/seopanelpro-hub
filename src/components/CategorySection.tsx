
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import { Tool } from '@/data/tools';

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

  // Show first 4 tools in grid
  const displayTools = tools.slice(0, 4);

  const handleViewAll = () => {
    // Create a custom event to communicate with the parent component
    const event = new CustomEvent('viewAllTools', { 
      detail: { category, tools } 
    });
    window.dispatchEvent(event);
  };

  return (
    <section className={`py-16 px-4 ${bgClass}`} id={category}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {displayTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {tools.length > 4 && (
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="group border-2 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer"
              onClick={handleViewAll}
            >
              View All {tools.length} {title}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
