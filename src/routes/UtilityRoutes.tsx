
import React from 'react';
import { Route } from 'react-router-dom';

import QRGenerator from "@/pages/tools/QRGenerator";
import Base64Encoder from "@/pages/tools/Base64Encoder";
import URLEncoder from "@/pages/tools/URLEncoder";
import ColorPicker from "@/pages/tools/ColorPicker";
import PasswordGenerator from "@/pages/tools/PasswordGenerator";
import TextCaseConverter from "@/pages/tools/TextCaseConverter";
import JSONFormatter from "@/pages/tools/JSONFormatter";
import UUIDGenerator from "@/pages/tools/UUIDGenerator";
import HTTPHeaderChecker from "@/pages/tools/HTTPHeaderChecker";
import SSLExpiryChecker from "@/pages/tools/SSLExpiryChecker";
import PingTool from "@/pages/tools/PingTool";
import PortScanner from "@/pages/tools/PortScanner";
import GZIPTest from "@/pages/tools/GZIPTest";
import MinifyTool from "@/pages/tools/MinifyTool";
import UserAgentParser from "@/pages/tools/UserAgentParser";

const UtilityRoutes = () => (
  <>
    <Route path="/tools/qr-generator" element={<QRGenerator />} />
    <Route path="/tools/base64-encoder" element={<Base64Encoder />} />
    <Route path="/tools/url-encoder" element={<URLEncoder />} />
    <Route path="/tools/color-picker" element={<ColorPicker />} />
    <Route path="/tools/password-generator" element={<PasswordGenerator />} />
    <Route path="/tools/text-case-converter" element={<TextCaseConverter />} />
    <Route path="/tools/json-formatter" element={<JSONFormatter />} />
    <Route path="/tools/uuid-generator" element={<UUIDGenerator />} />
    <Route path="/tools/http-header-checker" element={<HTTPHeaderChecker />} />
    <Route path="/tools/ssl-expiry-checker" element={<SSLExpiryChecker />} />
    <Route path="/tools/ping-tool" element={<PingTool />} />
    <Route path="/tools/port-scanner" element={<PortScanner />} />
    <Route path="/tools/gzip-test" element={<GZIPTest />} />
    <Route path="/tools/minify-tool" element={<MinifyTool />} />
    <Route path="/tools/user-agent-parser" element={<UserAgentParser />} />
  </>
);

export default UtilityRoutes;
