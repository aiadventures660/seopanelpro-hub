
import React, { useState, useEffect } from 'react';
import { TrendingUp, Globe, Smartphone, PenTool, Wrench, Calculator, Link, Gift } from 'lucide-react';
import CategorySection from '@/components/CategorySection';
import HeroSection from '@/components/HeroSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchResults from '@/components/SearchResults';
import PopularToolsSection from '@/components/PopularToolsSection';
import TrustSection from '@/components/TrustSection';
import { useScrollToTool } from '@/hooks/useScrollPosition';
import { seoTools, socialMediaTools, contentTools, domainTools, utilityTools, calculationTools, linkTools, viralTools } from '@/data/tools';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Use the scroll hook to scroll to the last viewed tool
  useScrollToTool();

  const allTools = [
    ...seoTools,
    ...socialMediaTools, 
    ...contentTools,
    ...domainTools,
    ...utilityTools,
    ...calculationTools,
    ...linkTools,
    ...viralTools
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

  const handleBackToHome = () => {
    setIsSearching(false);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <Header />
      
      <main>
        <HeroSection onSearch={handleSearch} searchQuery={searchQuery} />
        
        {isSearching ? (
          <SearchResults 
            filteredTools={filteredTools}
            searchQuery={searchQuery}
            onBackToHome={handleBackToHome}
          />
        ) : (
          <>
            <PopularToolsSection />

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
              title="Link & Backlink Tools"
              description="Analyze backlinks, check for broken links, and manage your link profile"
              icon={Link}
              tools={linkTools}
              category="link"
              variant="secondary"
            />

            <CategorySection
              title="Domain & Network Tools"
              description="Analyze domains, check DNS, and monitor server performance"
              icon={Globe}
              tools={domainTools}
              category="domain"
            />

            <CategorySection
              title="Utility Tools"
              description="Essential utilities for developers and marketers"
              icon={Wrench}
              tools={utilityTools}
              category="utility"
              variant="secondary"
            />

            <CategorySection
              title="Calculation & Misc Tools"
              description="Calculators, analyzers, and other helpful miscellaneous tools"
              icon={Calculator}
              tools={calculationTools}
              category="calculation"
            />

            <CategorySection
              title="🎁 Bonus Viral Tools"
              description="Go viral with these powerful AI-driven content tools"
              icon={Gift}
              tools={viralTools}
              category="viral"
              variant="secondary"
            />

            <TrustSection />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
