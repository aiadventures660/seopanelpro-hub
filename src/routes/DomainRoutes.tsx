
import React from 'react';
import { Route } from 'react-router-dom';

import WhoisLookup from "@/pages/tools/WhoisLookup";
import DomainAge from "@/pages/tools/DomainAge";
import DNSLookup from "@/pages/tools/DNSLookup";
import IPLocation from "@/pages/tools/IPLocation";
import ServerStatus from "@/pages/tools/ServerStatus";

const DomainRoutes = () => (
  <>
    <Route path="/tools/whois-lookup" element={<WhoisLookup />} />
    <Route path="/tools/domain-age" element={<DomainAge />} />
    <Route path="/tools/dns-lookup" element={<DNSLookup />} />
    <Route path="/tools/ip-location" element={<IPLocation />} />
    <Route path="/tools/server-status" element={<ServerStatus />} />
  </>
);

export default DomainRoutes;
