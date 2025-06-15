
import { Tool } from '@/data/tools';

export const linkTools: Tool[] = [
  {
    id: 'backlink-checker',
    name: 'Backlink Checker',
    description: 'Discover who is linking to your website with our backlink analysis tool.',
    category: 'link',
    icon: '🔗',
    route: '/tools/backlink-checker',
    popular: true,
  },
  {
    id: 'link-analyzer',
    name: 'Link Analyzer',
    description: 'Analyze internal and external links on any webpage to improve your link structure.',
    category: 'link',
    icon: '🔍',
    route: '/tools/link-analyzer',
  },
  {
    id: 'anchor-text-checker',
    name: 'Anchor Text Checker',
    description: 'Check the anchor text distribution of your backlinks and internal links.',
    category: 'link',
    icon: '✍️',
    route: '/tools/anchor-text-checker',
  },
  {
    id: 'broken-link-finder',
    name: 'Broken Link Finder',
    description: 'Scan your website for broken links that could be harming your user experience and SEO.',
    category: 'link',
    icon: '💔',
    route: '/tools/broken-link-finder',
  },
  {
    id: 'link-redirect-mapper',
    name: 'Link Redirect Mapper',
    description: 'Trace the path of your redirected links to uncover redirect chains and issues.',
    category: 'link',
    icon: '🗺️',
    route: '/tools/link-redirect-mapper',
  }
];
