
import React from 'react';
import { Star, Users, CheckCircle } from 'lucide-react';

const TrustSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Trusted by Digital Marketers & SEO Professionals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-white/20 rounded-full p-4 mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">12,000+</h3>
            <p className="text-blue-100">Active Users</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white/20 rounded-full p-4 mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">250K+</h3>
            <p className="text-blue-100">Tools Used Monthly</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white/20 rounded-full p-4 mb-4">
              <Star className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">4.7/5</h3>
            <p className="text-blue-100">User Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
