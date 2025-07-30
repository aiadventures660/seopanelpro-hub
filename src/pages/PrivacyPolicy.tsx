import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <BackButton />
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mt-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Privacy Policy
            </h1>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We collect information you provide directly to us, such as when you use our tools, request features, or contact us. This may include:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>Usage data and analytics to improve our services</li>
                  <li>Session information for bookmarking and tool tracking</li>
                  <li>Email addresses when voluntarily provided for tool requests</li>
                  <li>Tool usage statistics for analytics purposes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>Provide, maintain, and improve our tools and services</li>
                  <li>Track tool usage for analytics and improvement purposes</li>
                  <li>Respond to your requests and provide customer support</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Monitor and analyze trends and usage patterns</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Information Sharing</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With your explicit consent</li>
                  <li>To trusted service providers who assist in operating our website</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Cookies and Tracking</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We use cookies and similar tracking technologies to:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>Remember your preferences and settings</li>
                  <li>Track tool usage and analytics</li>
                  <li>Improve user experience</li>
                  <li>Provide personalized content</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Third-Party Services</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our website may contain links to third-party websites and services. We are not responsible for the privacy practices of these external sites. We may also use third-party services including:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>Google Analytics for website analytics</li>
                  <li>Google AdSense for advertising</li>
                  <li>Supabase for data storage and analytics</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Data Security</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Your Rights</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of certain communications</li>
                  <li>Disable cookies in your browser settings</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Children's Privacy</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Changes to This Policy</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Contact Us</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;