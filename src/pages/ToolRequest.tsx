
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import ToolRequestForm from '@/components/ToolRequestForm';

const ToolRequest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Request a Tool
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Missing a tool that would make your work easier? Tell us about it and we'll consider building it for our community.
            </p>
          </div>
          
          <ToolRequestForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToolRequest;
