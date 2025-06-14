
import React from 'react';
import { Search, ArrowRight, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const HeroSection = ({ onSearch, searchQuery }: HeroSectionProps) => {
  const handleExploreAllTools = () => {
    // Scroll to the popular tools section
    const popularSection = document.querySelector('.popular-tools-section');
    if (popularSection) {
      popularSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewCategories = () => {
    // Scroll to the first category section (SEO tools)
    const firstCategory = document.getElementById('seo');
    if (firstCategory) {
      firstCategory.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.08),transparent_50%)]" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500" />
      
      <div className="relative max-w-7xl mx-auto text-center">
        <Badge className="mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-0 px-6 py-2 text-sm font-semibold shadow-lg">
          <Sparkles className="h-4 w-4 mr-2" />
          50+ Professional Tools • 100% Free
        </Badge>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
          <span className="text-gray-900 dark:text-white">Professional</span>{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            SEO & Marketing
          </span>{' '}
          <span className="text-gray-900 dark:text-white">Toolkit</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          Boost your website's performance with our comprehensive suite of professional-grade 
          SEO tools, social media utilities, and content optimization resources
        </p>

        {/* Enhanced Search Bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-white/50 dark:border-gray-700/50">
              <div className="flex items-center">
                <Search className="absolute left-6 h-6 w-6 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for tools... (e.g., meta tags, keywords, YouTube)"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  className="pl-14 pr-6 py-6 text-lg border-0 bg-transparent focus:ring-0 focus:outline-none text-gray-900 dark:text-white placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <Button 
            size="lg" 
            className="relative group bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-6 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            onClick={handleExploreAllTools}
          >
            <span className="relative z-10 flex items-center">
              Explore All Tools
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-10 py-6 rounded-2xl text-lg font-semibold border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={handleViewCategories}
          >
            View Categories
          </Button>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-lg">
            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse mb-3" />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">100% Free Tools</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">No hidden costs</span>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-lg">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse mb-3" />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">No Registration</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Start immediately</span>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-lg">
            <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse mb-3" />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Instant Results</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Lightning fast</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
