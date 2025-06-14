
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import ToolCard from '@/components/ToolCard';
import { useBookmarks } from '@/hooks/useBookmarks';
import { seoTools, socialMediaTools, contentTools, domainTools, utilityTools } from '@/data/tools';
import { Heart, BookOpen } from 'lucide-react';

const Bookmarks = () => {
  const { bookmarks, loading } = useBookmarks();
  const [bookmarkedTools, setBookmarkedTools] = useState([]);

  const allTools = [
    ...seoTools,
    ...socialMediaTools, 
    ...contentTools,
    ...domainTools,
    ...utilityTools
  ];

  useEffect(() => {
    if (bookmarks.length > 0) {
      const tools = allTools.filter(tool => bookmarks.includes(tool.id));
      setBookmarkedTools(tools);
    } else {
      setBookmarkedTools([]);
    }
  }, [bookmarks]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        <main className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <BackButton />
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading your bookmarks...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <BackButton />
          
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-red-500 mr-2" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your Favorite Tools
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Quick access to all the tools you've bookmarked for easy reference
            </p>
          </div>
          
          {bookmarkedTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bookmarkedTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No bookmarks yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start exploring our tools and bookmark your favorites by clicking the heart icon
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Bookmarks;
