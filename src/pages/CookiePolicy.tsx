import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <BackButton />
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mt-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Cookie Policy
            </h1>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What Are Cookies</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
                  They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How We Use Cookies</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We use cookies for several purposes:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Types of Cookies We Use</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Essential Cookies</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    These cookies are necessary for the website to function and cannot be switched off in our systems.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                    <li>Session management</li>
                    <li>Security features</li>
                    <li>User preferences (theme, language)</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Analytics Cookies</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    These cookies help us understand how visitors use our website.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                    <li>Google Analytics</li>
                    <li>Tool usage tracking</li>
                    <li>Performance monitoring</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Advertising Cookies</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    These cookies are used to make advertising messages more relevant to you.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                    <li>Google AdSense</li>
                    <li>Targeted advertising</li>
                    <li>Ad performance tracking</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Third-Party Cookies</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Some cookies on our website are set by third-party services:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li><strong>Google Analytics:</strong> For website analytics and performance tracking</li>
                  <li><strong>Google AdSense:</strong> For displaying relevant advertisements</li>
                  <li><strong>Social Media:</strong> For social sharing functionality</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Managing Cookies</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You can control and manage cookies in several ways:
                </p>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Browser Settings</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Most browsers allow you to manage cookies through their settings:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                    <li>View which cookies are stored</li>
                    <li>Delete individual or all cookies</li>
                    <li>Block cookies from specific websites</li>
                    <li>Block all cookies</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Opt-Out Links</h3>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                    <li><a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
                    <li><a href="https://www.google.com/settings/ads" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a></li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Impact of Disabling Cookies</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Please note that disabling certain cookies may impact your experience on our website:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>Some features may not work properly</li>
                  <li>Your preferences may not be saved</li>
                  <li>You may see less relevant advertisements</li>
                  <li>Analytics data will not be collected</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Updates to This Policy</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, 
                  operational, or regulatory reasons. We will notify you of any material changes by posting the updated 
                  policy on our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you have any questions about our Cookie Policy, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">
                    Email: privacy@toolhub.com<br />
                    Address: [Your Business Address]
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;