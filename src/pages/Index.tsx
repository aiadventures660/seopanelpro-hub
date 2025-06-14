
import React, { useState } from 'react';
import { Search, TrendingUp, Globe, Smartphone, PenTool, Wrench, Star, Users, CheckCircle, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import ToolCard from '@/components/ToolCard';
import CategorySection from '@/components/CategorySection';
import HeroSection from '@/components/HeroSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { seoTools, socialMediaTools, contentTools, domainTools, utilityTools, popularTools } from '@/data/tools';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const allTools = [
    ...seoTools,
    ...socialMediaTools, 
    ...contentTools,
    ...domainTools,
    ...utilityTools
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      setIsSearching(true);
      const filtered = allTools.filter(tool =>
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase()) ||
        tool.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTools(filtered);
    } else {
      setIsSearching(false);
      setFilteredTools([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main>
        <HeroSection onSearch={handleSearch} searchQuery={searchQuery} />
        
        {isSearching ? (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Search Results ({filteredTools.length})</h2>
              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">No tools found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Try searching with different keywords</p>
                </div>
              )}
            </div>
          </section>
        ) : (
          <>
            {/* Popular Tools */}
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

            {/* Tool Categories */}
            <CategorySection
              title="SEO & Analytics Tools"
              description="Optimize your website's search engine performance with our comprehensive SEO toolkit"
              icon={TrendingUp}
              tools={seoTools}
              category="seo"
            />

            <CategorySection
              title="Social Media Tools"
              description="Boost your social media presence with tools for Instagram, YouTube, and more"
              icon={Smartphone}
              tools={socialMediaTools}
              category="social"
              variant="secondary"
            />

            <CategorySection
              title="Content & Writing Tools"
              description="Create, optimize, and perfect your content with our writing and editing tools"
              icon={PenTool}
              tools={contentTools}
              category="content"
            />

            <CategorySection
              title="Domain & Network Tools"
              description="Analyze domains, check DNS, and monitor server performance"
              icon={Globe}
              tools={domainTools}
              category="domain"
              variant="secondary"
            />

            <CategorySection
              title="Utility Tools"
              description="Essential utilities for developers and marketers"
              icon={Wrench}
              tools={utilityTools}
              category="utility"
            />

            {/* Trust Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Trusted by Professionals Worldwide</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="bg-white/20 rounded-full p-4 mb-4">
                      <Users className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">50,000+</h3>
                    <p className="text-blue-100">Active Users</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white/20 rounded-full p-4 mb-4">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">1M+</h3>
                    <p className="text-blue-100">Tools Used Monthly</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white/20 rounded-full p-4 mb-4">
                      <Star className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">4.9/5</h3>
                    <p className="text-blue-100">User Rating</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
