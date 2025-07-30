
import React from 'react';
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Bookmarks from "./pages/Bookmarks";
import ToolRequest from "./pages/ToolRequest";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CookiePolicy from "./pages/CookiePolicy";

import seoRoutes from './routes/SeoRoutes';
import socialMediaRoutes from './routes/SocialMediaRoutes';
import contentRoutes from './routes/ContentRoutes';
import domainRoutes from './routes/DomainRoutes';
import utilityRoutes from './routes/UtilityRoutes';
import calculationRoutes from './routes/CalculationRoutes';
import linkRoutes from './routes/LinkRoutes';
import viralRoutes from './routes/ViralRoutes';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/bookmarks" element={<Bookmarks />} />
    <Route path="/tool-request" element={<ToolRequest />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/cookie-policy" element={<CookiePolicy />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    
    {seoRoutes}
    {socialMediaRoutes}
    {contentRoutes}
    {domainRoutes}
    {utilityRoutes}
    {calculationRoutes}
    {linkRoutes}
    {viralRoutes}

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
