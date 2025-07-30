import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <BackButton />
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mt-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Terms of Service
            </h1>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our website provides a collection of online tools for various purposes including SEO analysis, content creation, domain management, and utility functions. These tools are provided free of charge for personal and commercial use.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Use License</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Permission is granted to temporarily use our tools for personal and commercial purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>Modify or copy the materials without permission</li>
                  <li>Use the materials for any commercial purpose without explicit consent</li>
                  <li>Attempt to reverse engineer any software contained on our website</li>
                  <li>Remove any copyright or other proprietary notations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. User Responsibilities</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Users are responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>Using tools in accordance with applicable laws and regulations</li>
                  <li>Not using our services for any unlawful or prohibited activities</li>
                  <li>Respecting intellectual property rights</li>
                  <li>Not attempting to disrupt or interfere with our services</li>
                  <li>Providing accurate information when submitting tool requests</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Prohibited Uses</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You may not use our tools for:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>Any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>Violating any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>Infringing upon or violating our intellectual property rights or the intellectual property rights of others</li>
                  <li>Harassing, abusing, insulting, harming, defaming, slandering, disparaging, intimidating, or discriminating</li>
                  <li>Submitting false or misleading information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Disclaimer</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Limitations</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our tools, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Accuracy of Materials</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Modifications</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Governing Law</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Contact Information</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">
                    Email: terms@toolhub.com<br />
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

export default TermsOfService;