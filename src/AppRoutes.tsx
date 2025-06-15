
import React from 'react';
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Bookmarks from "./pages/Bookmarks";
import ToolRequest from "./pages/ToolRequest";

import seoRoutes from './routes/SeoRoutes';
import socialMediaRoutes from './routes/SocialMediaRoutes';
import contentRoutes from './routes/ContentRoutes';
import domainRoutes from './routes/DomainRoutes';
import utilityRoutes from './routes/UtilityRoutes';
import calculationRoutes from './routes/CalculationRoutes';
import linkRoutes from './routes/LinkRoutes';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/bookmarks" element={<Bookmarks />} />
    <Route path="/tool-request" element={<ToolRequest />} />
    
    {seoRoutes}
    {socialMediaRoutes}
    {contentRoutes}
    {domainRoutes}
    {utilityRoutes}
    {calculationRoutes}
    {linkRoutes}

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
