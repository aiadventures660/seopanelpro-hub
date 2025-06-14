
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

interface ToolPageLayoutProps {
  children: React.ReactNode;
}

const ToolPageLayout = ({ children }: ToolPageLayoutProps) => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="py-4">
            <BackButton />
          </div>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToolPageLayout;
