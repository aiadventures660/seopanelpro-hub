
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

interface ToolPageLayoutProps {
  children: React.ReactNode;
}

const ToolPageLayout = ({ children }: ToolPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="pt-8 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <BackButton />
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToolPageLayout;
