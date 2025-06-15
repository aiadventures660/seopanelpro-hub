
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

const utilityRoutes = [
  <Route key="qr-generator" path="/tools/qr-generator" element={<QRGenerator />} />,
  <Route key="base64-encoder" path="/tools/base64-encoder" element={<Base64Encoder />} />,
  <Route key="url-encoder" path="/tools/url-encoder" element={<URLEncoder />} />,
  <Route key="color-picker" path="/tools/color-picker" element={<ColorPicker />} />,
  <Route key="password-generator" path="/tools/password-generator" element={<PasswordGenerator />} />,
  <Route key="text-case-converter" path="/tools/text-case-converter" element={<TextCaseConverter />} />,
  <Route key="json-formatter" path="/tools/json-formatter" element={<JSONFormatter />} />,
  <Route key="uuid-generator" path="/tools/uuid-generator" element={<UUIDGenerator />} />,
  <Route key="http-header-checker" path="/tools/http-header-checker" element={<HTTPHeaderChecker />} />,
  <Route key="ssl-expiry-checker" path="/tools/ssl-expiry-checker" element={<SSLExpiryChecker />} />,
  <Route key="ping-tool" path="/tools/ping-tool" element={<PingTool />} />,
  <Route key="port-scanner" path="/tools/port-scanner" element={<PortScanner />} />,
  <Route key="gzip-test" path="/tools/gzip-test" element={<GZIPTest />} />,
  <Route key="minify-tool" path="/tools/minify-tool" element={<MinifyTool />} />,
  <Route key="user-agent-parser" path="/tools/user-agent-parser" element={<UserAgentParser />} />
];

export default utilityRoutes;
