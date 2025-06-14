
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ToolCard from '@/components/ToolCard';
import { useTrendingTools } from '@/hooks/useTrendingTools';
import { Loader2, TrendingUp, Sparkles } from 'lucide-react';
import { storeToolPosition } from '@/hooks/useScrollPosition';
import { Tool } from '@/data/tools';

const PopularToolsSection = () => {
  const {
    data: trendingTools,
    isLoading,
    error
  } = useTrendingTools();

  const handleToolClick = (tool: Tool) => {
    console.log(`Popular tool clicked: ${tool.name} (ID: ${tool.id})`);
    storeToolPosition(tool.id);
  };

  if (isLoading) {
    return (
      <section className="popular-tools-section py-12 md:py-16 px-4">
        <div className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 dark:from-rose-900/20 dark:via-pink-900/20 dark:to-orange-800/20 rounded-2xl md:rounded-3xl mx-2 md:mx-8 lg:mx-16 shadow-2xl border border-rose-200/50 dark:border-rose-700/30">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-orange-500/10 rounded-2xl md:rounded-3xl"></div>
          <div className="relative max-w-7xl mx-auto p-8 md:p-12">
            <div className="text-center">
              <Loader2 className="h-6 md:h-8 w-6 md:w-8 animate-spin mx-auto mb-4 text-rose-600" />
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Loading trending tools...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !trendingTools || trendingTools.length === 0) {
    return (
      <section className="popular-tools-section py-12 md:py-16 px-4">
        <div className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 dark:from-rose-900/20 dark:via-pink-900/20 dark:to-orange-800/20 rounded-2xl md:rounded-3xl mx-2 md:mx-8 lg:mx-16 shadow-2xl border border-rose-200/50 dark:border-rose-700/30">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-orange-500/10 rounded-2xl md:rounded-3xl"></div>
          <div className="relative max-w-7xl mx-auto p-8 md:p-12">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">No trending tools available at the moment.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="popular-tools-section py-12 md:py-16 px-4">
      <div className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 dark:from-rose-900/20 dark:via-pink-900/20 dark:to-orange-800/20 rounded-2xl md:rounded-3xl mx-2 md:mx-8 lg:mx-16 shadow-2xl border border-rose-200/50 dark:border-rose-700/30 overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-gradient-to-bl from-pink-400/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 md:w-64 h-40 md:h-64 bg-gradient-to-tr from-orange-400/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto p-8 md:p-12">
          <div className="text-center mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 md:mb-6">
              <div className="p-2 md:p-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg md:rounded-xl shadow-lg">
                <TrendingUp className="h-5 md:h-6 w-5 md:w-6 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 text-white border-0 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm">
                <Sparkles className="h-2.5 md:h-3 w-2.5 md:w-3 mr-1" />
                Most Popular
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-3 md:mb-4">
              Trending Tools
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-sm md:text-lg leading-relaxed px-4">
              Discover our most popular tools based on real usage data from thousands of users worldwide
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {trendingTools.map(tool => (
              <div key={tool.id} id={`tool-${tool.id}`}>
                <ToolCard tool={tool} isPopular onToolClick={() => handleToolClick(tool)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularToolsSection;
