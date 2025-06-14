
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ToolCard from '@/components/ToolCard';
import { Tool } from '@/data/tools';

interface PopularToolsSectionProps {
  popularTools: Tool[];
}

const PopularToolsSection = ({ popularTools }: PopularToolsSectionProps) => {
  return (
    <section className="py-12 px-4 bg-white/50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Most Popular
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Trending Tools
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our most popular tools used by thousands of marketers and content creators
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} isPopular />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularToolsSection;
