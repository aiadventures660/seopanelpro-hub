
import React from 'react';
import { Route } from 'react-router-dom';

import BacklinkChecker from "@/pages/tools/BacklinkChecker";
import LinkAnalyzer from "@/pages/tools/LinkAnalyzer";
import AnchorTextChecker from "@/pages/tools/AnchorTextChecker";
import BrokenLinkFinder from "@/pages/tools/BrokenLinkFinder";
import LinkRedirectMapper from "@/pages/tools/LinkRedirectMapper";

const LinkRoutes = () => (
  <>
    <Route path="/tools/backlink-checker" element={<BacklinkChecker />} />
    <Route path="/tools/link-analyzer" element={<LinkAnalyzer />} />
    <Route path="/tools/anchor-text-checker" element={<AnchorTextChecker />} />
    <Route path="/tools/broken-link-finder" element={<BrokenLinkFinder />} />
    <Route path="/tools/link-redirect-mapper" element={<LinkRedirectMapper />} />
  </>
);

export default LinkRoutes;
