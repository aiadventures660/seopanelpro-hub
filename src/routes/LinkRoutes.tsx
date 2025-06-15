
import React from 'react';
import { Route } from 'react-router-dom';

import BacklinkChecker from "@/pages/tools/BacklinkChecker";
import LinkAnalyzer from "@/pages/tools/LinkAnalyzer";
import AnchorTextChecker from "@/pages/tools/AnchorTextChecker";
import BrokenLinkFinder from "@/pages/tools/BrokenLinkFinder";
import LinkRedirectMapper from "@/pages/tools/LinkRedirectMapper";

const linkRoutes = [
  <Route key="backlink-checker" path="/tools/backlink-checker" element={<BacklinkChecker />} />,
  <Route key="link-analyzer" path="/tools/link-analyzer" element={<LinkAnalyzer />} />,
  <Route key="anchor-text-checker" path="/tools/anchor-text-checker" element={<AnchorTextChecker />} />,
  <Route key="broken-link-finder" path="/tools/broken-link-finder" element={<BrokenLinkFinder />} />,
  <Route key="link-redirect-mapper" path="/tools/link-redirect-mapper" element={<LinkRedirectMapper />} />
];

export default linkRoutes;
