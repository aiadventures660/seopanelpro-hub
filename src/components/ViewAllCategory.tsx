
import React from 'react';
import { Button } from '@/components/ui/button';
import ToolCard from '@/components/ToolCard';
import { Tool } from '@/data/tools';

interface ViewAllCategoryProps {
  category: string;
  tools: Tool[];
  onBackToHome: () => void;
}

const ViewAllCategory = ({ category, tools, onBackToHome }: ViewAllCategoryProps) => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              All {category} Tools
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Showing all {tools.length} tools in this category
            </p>
          </div>
          <Button variant="outline" onClick={onBackToHome}>
            Back to Home
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViewAllCategory;
