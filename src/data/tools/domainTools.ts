
import { Tool } from '../tools';

export const domainTools: Tool[] = [
  {
    id: 'whois-lookup',
    name: 'WHOIS Lookup',
    description: 'Get detailed information about any domain name',
    category: 'Domain',
    icon: '🔍',
    route: '/tools/whois-lookup'
  },
  {
    id: 'domain-age',
    name: 'Domain Age Checker',
    description: 'Check the age and registration date of any domain',
    category: 'Domain',
    icon: '📅',
    route: '/tools/domain-age'
  },
  {
    id: 'dns-lookup',
    name: 'DNS Lookup',
    description: 'Perform DNS lookups and check DNS records',
    category: 'Domain',
    icon: '🌐',
    route: '/tools/dns-lookup'
  },
  {
    id: 'ip-location',
    name: 'IP Location Finder',
    description: 'Find the geographical location of any IP address',
    category: 'Domain',
    icon: '📍',
    route: '/tools/ip-location'
  },
  {
    id: 'server-status',
    name: 'Server Status Checker',
    description: 'Check if a website or server is online or down',
    category: 'Domain',
    icon: '🖥️',
    route: '/tools/server-status'
  }
];
