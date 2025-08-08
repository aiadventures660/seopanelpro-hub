import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Zap, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <BackButton />
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About ToolHub
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your one-stop destination for powerful, free online tools that help you work smarter and more efficiently.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              ToolHub was born from a simple idea: everyone should have access to powerful, professional-grade tools without barriers. 
              We noticed that many useful online tools were either expensive, limited in functionality, or cluttered with ads that 
              hindered the user experience.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Our mission is to democratize access to essential digital tools by providing a comprehensive suite of utilities 
              that cover everything from SEO analysis and content creation to domain management and development tools. 
              Whether you're a digital marketer, content creator, developer, or business owner, we have tools designed to 
              streamline your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Our Mission</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  To provide free, high-quality online tools that empower individuals and businesses to achieve their goals 
                  more efficiently and effectively.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Zap className="h-8 w-8 text-yellow-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Our Vision</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  To become the world's most trusted platform for online tools, continuously innovating to meet the 
                  evolving needs of our global user community.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">SEO & Analytics Tools</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>Meta tag analyzers and generators</li>
                  <li>Keyword density checkers</li>
                  <li>Backlink analysis tools</li>
                  <li>Site speed analyzers</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Content Creation Tools</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>AI-powered content generators</li>
                  <li>Grammar and readability checkers</li>
                  <li>Word counters and text analyzers</li>
                  <li>Paraphrasing and rewriting tools</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Domain & Network Tools</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>Domain age checkers</li>
                  <li>SSL certificate analyzers</li>
                  <li>DNS lookup tools</li>
                  <li>Server status monitors</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Utility & Developer Tools</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>Password generators</li>
                  <li>QR code generators</li>
                  <li>JSON formatters</li>
                  <li>Base64 encoders/decoders</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Why Choose ToolHub?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">User-Focused</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Every tool is designed with user experience in mind, ensuring simplicity without sacrificing functionality.
                </p>
              </div>
              <div className="text-center">
                <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast & Reliable</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Our tools are optimized for speed and reliability, helping you get results quickly and efficiently.
                </p>
              </div>
              <div className="text-center">
                <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Always Free</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  We believe in keeping our core tools free and accessible to everyone, supported by non-intrusive advertising.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Our Commitment</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              We are committed to continuously improving and expanding our tool collection based on user feedback and 
              emerging needs in the digital landscape. Your privacy and data security are paramount to us, and we 
              maintain transparent policies about how we collect and use information.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Have a suggestion for a new tool or feature? We'd love to hear from you! Our development roadmap is 
              largely driven by user requests and community feedback.
            </p>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Contact us:</strong> contact@seotoolspro.studio<br />
                <strong>Business inquiries:</strong> contact@seotoolspro.studio<br />
                <strong>Support:</strong> contact@seotoolspro.studio
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;