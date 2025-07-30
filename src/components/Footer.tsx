
import React from 'react';
import { Zap, Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">SEO Panel Pro</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your complete toolkit for SEO optimization, social media management, and content creation. 
              All tools are free and designed to boost your online presence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold mb-4">Popular Tools</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Meta Tag Analyzer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Keyword Density Checker</a></li>
              <li><a href="#" className="hover:text-white transition-colors">YouTube Thumbnail Downloader</a></li>
              <li><a href="#" className="hover:text-white transition-colors">QR Code Generator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Word Counter</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">SEO Tools</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Social Media Tools</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Content Tools</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Domain Tools</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Utility Tools</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-4 md:mb-0">
              <a href="/about" className="hover:text-white transition-colors">About Us</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
              <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
            <p className="text-gray-400 text-sm flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for digital marketers
            </p>
          </div>
          <p className="text-gray-400 text-sm text-center">
            © 2024 SEO Panel Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
