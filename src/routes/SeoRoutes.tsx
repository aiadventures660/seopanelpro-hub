
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

const seoRoutes = [
  <Route key="meta-analyzer" path="/tools/meta-analyzer" element={<MetaAnalyzer />} />,
  <Route key="keyword-density" path="/tools/keyword-density" element={<KeywordDensity />} />,
  <Route key="robots-generator" path="/tools/robots-generator" element={<RobotsGenerator />} />,
  <Route key="sitemap-generator" path="/tools/sitemap-generator" element={<SitemapGenerator />} />,
  <Route key="pagespeed-analyzer" path="/tools/pagespeed-analyzer" element={<PageSpeedAnalyzer />} />,
  <Route key="canonical-tag-generator" path="/tools/canonical-tag-generator" element={<CanonicalTagGenerator />} />,
  <Route key="hreflang-generator" path="/tools/hreflang-generator" element={<HreflangGenerator />} />,
  <Route key="opengraph-generator" path="/tools/opengraph-generator" element={<OpenGraphGenerator />} />,
  <Route key="twitter-card-generator" path="/tools/twitter-card-generator" element={<TwitterCardGenerator />} />,
  <Route key="seo-score-checker" path="/tools/seo-score-checker" element={<SEOScoreChecker />} />,
  <Route key="mobile-friendly-test" path="/tools/mobile-friendly-test" element={<MobileFriendlyTest />} />,
  <Route key="keyword-position-tracker" path="/tools/keyword-position-tracker" element={<KeywordPositionTracker />} />,
  <Route key="ssl-checker" path="/tools/ssl-checker" element={<SSLChecker />} />,
  <Route key="redirect-checker" path="/tools/redirect-checker" element={<RedirectChecker />} />,
  <Route key="text-html-ratio" path="/tools/text-html-ratio" element={<TextHtmlRatio />} />
];

export default seoRoutes;
