import React from 'react';
import { Badge } from '@/components/ui/badge';
import ToolCard from '@/components/ToolCard';
import { Tool } from '@/data/tools';

interface PopularToolsSectionProps {
  popularTools: Tool[];
}

const PopularToolsSection = ({ popularTools }: PopularToolsSectionProps) => {
  return (
    <section className="popular-tools-section py-12 px-4 relative">
      {/* Pulsing green border container */}
      <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 animate-pulse opacity-20"></div>
      <div className="absolute inset-6 rounded-2xl border-4 border-green-400 animate-pulse opacity-60"></div>
      
      {/* Main content with gradient background */}
      <div className="relative bg-gradient-to-br from-red-50 via-pink-50 to-red-100 dark:from-red-900/20 dark:via-pink-900/20 dark:to-red-800/20 rounded-2xl border-2 border-red-200 dark:border-red-700/50 shadow-xl">
        <div className="max-w-7xl mx-auto p-8">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
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
      </div>
    </section>
  );
};

export default PopularToolsSection;
