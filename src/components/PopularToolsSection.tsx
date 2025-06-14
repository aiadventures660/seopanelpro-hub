import React from 'react';
import { Badge } from '@/components/ui/badge';
import ToolCard from '@/components/ToolCard';
import { useTrendingTools } from '@/hooks/useTrendingTools';
import { Loader2 } from 'lucide-react';
const PopularToolsSection = () => {
  const {
    data: trendingTools,
    isLoading,
    error
  } = useTrendingTools();
  if (isLoading) {
    return <section className="popular-tools-section py-12 px-4">
        <div className="bg-gradient-to-br from-red-50 via-pink-50 to-red-100 dark:from-red-900/20 dark:via-pink-900/20 dark:to-red-800/20 rounded-2xl border-2 border-red-200 dark:border-red-700/50 shadow-xl">
          <div className="max-w-7xl mx-auto p-8">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">Loading trending tools...</p>
            </div>
          </div>
        </div>
      </section>;
  }
  if (error || !trendingTools || trendingTools.length === 0) {
    return <section className="popular-tools-section py-12 px-4">
        <div className="bg-gradient-to-br from-red-50 via-pink-50 to-red-100 dark:from-red-900/20 dark:via-pink-900/20 dark:to-red-800/20 rounded-2xl border-2 border-red-200 dark:border-red-700/50 shadow-xl">
          <div className="max-w-7xl mx-auto p-8">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300">No trending tools available at the moment.</p>
            </div>
          </div>
        </div>
      </section>;
  }
  return <section className="popular-tools-section py-12 px-4">
      {/* Main content with gradient background */}
      <div className="bg-gradient-to-br from-red-50 via-pink-50 to-red-100 dark:from-red-900/20 dark:via-pink-900/20 dark:to-red-800/20 border-2 border-red-200 dark:border-red-700/50 shadow-xl px-0 my-0 py-[6px] rounded-2xl mx-[58px]">
        <div className="max-w-7xl mx-auto p-8">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
              Most Popular
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trending Tools
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our most popular tools based on real usage data from thousands of users
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingTools.map(tool => <ToolCard key={tool.id} tool={tool} isPopular />)}
          </div>
        </div>
      </div>
    </section>;
};
export default PopularToolsSection;