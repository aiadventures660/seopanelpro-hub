
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ToolCard from '@/components/ToolCard';
import { useTrendingTools } from '@/hooks/useTrendingTools';
import { Loader2, TrendingUp, Sparkles } from 'lucide-react';

const PopularToolsSection = () => {
  const {
    data: trendingTools,
    isLoading,
    error
  } = useTrendingTools();

  if (isLoading) {
    return (
      <section className="popular-tools-section py-16 px-4">
        <div className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 dark:from-rose-900/20 dark:via-pink-900/20 dark:to-orange-800/20 rounded-3xl mx-4 md:mx-8 lg:mx-16 shadow-2xl border border-rose-200/50 dark:border-rose-700/30">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-orange-500/10 rounded-3xl"></div>
          <div className="relative max-w-7xl mx-auto p-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-rose-600" />
              <p className="text-gray-600 dark:text-gray-300">Loading trending tools...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !trendingTools || trendingTools.length === 0) {
    return (
      <section className="popular-tools-section py-16 px-4">
        <div className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 dark:from-rose-900/20 dark:via-pink-900/20 dark:to-orange-800/20 rounded-3xl mx-4 md:mx-8 lg:mx-16 shadow-2xl border border-rose-200/50 dark:border-rose-700/30">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-orange-500/10 rounded-3xl"></div>
          <div className="relative max-w-7xl mx-auto p-12">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300">No trending tools available at the moment.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="popular-tools-section py-16 px-4">
      <div className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 dark:from-rose-900/20 dark:via-pink-900/20 dark:to-orange-800/20 rounded-3xl mx-4 md:mx-8 lg:mx-16 shadow-2xl border border-rose-200/50 dark:border-rose-700/30 overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-400/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-400/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto p-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 text-white border-0 px-4 py-2">
                <Sparkles className="h-3 w-3 mr-1" />
                Most Popular
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Trending Tools
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
              Discover our most popular tools based on real usage data from thousands of users worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {trendingTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} isPopular />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularToolsSection;
