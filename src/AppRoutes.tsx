
import React from 'react';
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Bookmarks from "./pages/Bookmarks";
import ToolRequest from "./pages/ToolRequest";

import SeoRoutes from './routes/SeoRoutes';
import SocialMediaRoutes from './routes/SocialMediaRoutes';
import ContentRoutes from './routes/ContentRoutes';
import DomainRoutes from './routes/DomainRoutes';
import UtilityRoutes from './routes/UtilityRoutes';
import CalculationRoutes from './routes/CalculationRoutes';
import LinkRoutes from './routes/LinkRoutes';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/bookmarks" element={<Bookmarks />} />
    <Route path="/tool-request" element={<ToolRequest />} />
    
    <SeoRoutes />
    <SocialMediaRoutes />
    <ContentRoutes />
    <DomainRoutes />
    <UtilityRoutes />
    <CalculationRoutes />
    <LinkRoutes />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
