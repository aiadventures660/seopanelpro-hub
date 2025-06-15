
import React from 'react';
import { Route } from 'react-router-dom';

import WhoisLookup from "@/pages/tools/WhoisLookup";
import DomainAge from "@/pages/tools/DomainAge";
import DNSLookup from "@/pages/tools/DNSLookup";
import IPLocation from "@/pages/tools/IPLocation";
import ServerStatus from "@/pages/tools/ServerStatus";

const domainRoutes = [
  <Route key="whois-lookup" path="/tools/whois-lookup" element={<WhoisLookup />} />,
  <Route key="domain-age" path="/tools/domain-age" element={<DomainAge />} />,
  <Route key="dns-lookup" path="/tools/dns-lookup" element={<DNSLookup />} />,
  <Route key="ip-location" path="/tools/ip-location" element={<IPLocation />} />,
  <Route key="server-status" path="/tools/server-status" element={<ServerStatus />} />
];

export default domainRoutes;
