
import React from 'react';
import { Route } from 'react-router-dom';

// SEO tools
import MetaAnalyzer from "@/pages/tools/MetaAnalyzer";
import KeywordDensity from "@/pages/tools/KeywordDensity";
import RobotsGenerator from "@/pages/tools/RobotsGenerator";
import SitemapGenerator from "@/pages/tools/SitemapGenerator";
import PageSpeedAnalyzer from "@/pages/tools/PageSpeedAnalyzer";
import CanonicalTagGenerator from "@/pages/tools/CanonicalTagGenerator";
import HreflangGenerator from "@/pages/tools/HreflangGenerator";
import OpenGraphGenerator from "@/pages/tools/OpenGraphGenerator";
import TwitterCardGenerator from "@/pages/tools/TwitterCardGenerator";
import SEOScoreChecker from "@/pages/tools/SEOScoreChecker";
import MobileFriendlyTest from "@/pages/tools/MobileFriendlyTest";
import KeywordPositionTracker from "@/pages/tools/KeywordPositionTracker";
import SSLChecker from "@/pages/tools/SSLChecker";
import RedirectChecker from "@/pages/tools/RedirectChecker";
import TextHtmlRatio from "@/pages/tools/TextHtmlRatio";

const SeoRoutes = () => (
  <>
    <Route path="/tools/meta-analyzer" element={<MetaAnalyzer />} />
    <Route path="/tools/keyword-density" element={<KeywordDensity />} />
    <Route path="/tools/robots-generator" element={<RobotsGenerator />} />
    <Route path="/tools/sitemap-generator" element={<SitemapGenerator />} />
    <Route path="/tools/pagespeed-analyzer" element={<PageSpeedAnalyzer />} />
    <Route path="/tools/canonical-tag-generator" element={<CanonicalTagGenerator />} />
    <Route path="/tools/hreflang-generator" element={<HreflangGenerator />} />
    <Route path="/tools/opengraph-generator" element={<OpenGraphGenerator />} />
    <Route path="/tools/twitter-card-generator" element={<TwitterCardGenerator />} />
    <Route path="/tools/seo-score-checker" element={<SEOScoreChecker />} />
    <Route path="/tools/mobile-friendly-test" element={<MobileFriendlyTest />} />
    <Route path="/tools/keyword-position-tracker" element={<KeywordPositionTracker />} />
    <Route path="/tools/ssl-checker" element={<SSLChecker />} />
    <Route path="/tools/redirect-checker" element={<RedirectChecker />} />
    <Route path="/tools/text-html-ratio" element={<TextHtmlRatio />} />
  </>
);

export default SeoRoutes;
