
import { Tool } from '../tools';

export const utilityTools: Tool[] = [
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, or contact information',
    category: 'Utility',
    icon: '📱',
    route: '/tools/qr-generator',
    popular: true
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode text to/from Base64 format',
    category: 'Utility',
    icon: '🔐',
    route: '/tools/base64-encoder'
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs for safe transmission',
    category: 'Utility',
    icon: '🔗',
    route: '/tools/url-encoder'
  },
  {
    id: 'color-picker',
    name: 'Color Picker & Palette',
    description: 'Pick colors and generate color palettes for your designs',
    category: 'Utility',
    icon: '🎨',
    route: '/tools/color-picker'
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure passwords with custom criteria',
    category: 'Utility',
    icon: '🔒',
    route: '/tools/password-generator'
  },
  {
    id: 'text-case-converter',
    name: 'Text Case Converter',
    description: 'Convert text between different cases (upper, lower, title, etc.)',
    category: 'Utility',
    icon: '📝',
    route: '/tools/text-case-converter'
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    description: 'Format, validate, and minify JSON data',
    category: 'Utility',
    icon: '⚙️',
    route: '/tools/json-formatter'
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate unique identifiers (UUIDs) for your applications',
    category: 'Utility',
    icon: '🆔',
    route: '/tools/uuid-generator'
  },
  {
    id: 'http-header-checker',
    name: 'HTTP Header Checker',
    description: 'Check HTTP headers and response details for any website',
    category: 'Utility',
    icon: '🌐',
    route: '/tools/http-header-checker',
    popular: true
  },
  {
    id: 'ssl-expiry-checker',
    name: 'SSL Certificate Expiry Checker',
    description: 'Check SSL certificate expiry dates and security details',
    category: 'Utility',
    icon: '🔒',
    route: '/tools/ssl-expiry-checker'
  },
  {
    id: 'ping-tool',
    name: 'Ping Tool',
    description: 'Test website connectivity and response times',
    category: 'Utility',
    icon: '📡',
    route: '/tools/ping-tool'
  },
  {
    id: 'port-scanner',
    name: 'Port Scanner',
    description: 'Scan common ports to check service availability',
    category: 'Utility',
    icon: '🔍',
    route: '/tools/port-scanner'
  },
  {
    id: 'gzip-test',
    name: 'GZIP Compression Test',
    description: 'Test if your website uses GZIP compression for better performance',
    category: 'Utility',
    icon: '📦',
    route: '/tools/gzip-test'
  },
  {
    id: 'minify-tool',
    name: 'Minify CSS/JS/HTML Tool',
    description: 'Minify CSS, JavaScript, and HTML code to reduce file sizes',
    category: 'Utility',
    icon: '⚡',
    route: '/tools/minify-tool',
    featured: true
  },
  {
    id: 'user-agent-parser',
    name: 'User Agent Parser',
    description: 'Parse and analyze user agent strings to identify browsers and devices',
    category: 'Utility',
    icon: '🖥️',
    route: '/tools/user-agent-parser'
  }
];
