export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  featured?: boolean;
  popular?: boolean;
  route: string;
}

// Import all category tools
export { seoTools } from './tools/seoTools';
export { socialMediaTools } from './tools/socialMediaTools';
export { contentTools } from './tools/contentTools';
export { domainTools } from './tools/domainTools';
export { utilityTools } from './tools/utilityTools';
export { calculationTools } from './tools/calculationTools';
export { linkTools } from './tools/linkTools';

// Re-export for backwards compatibility
import { seoTools } from './tools/seoTools';
import { socialMediaTools } from './tools/socialMediaTools';
import { contentTools } from './tools/contentTools';
import { domainTools } from './tools/domainTools';
import { utilityTools } from './tools/utilityTools';
import { calculationTools } from './tools/calculationTools';
import { linkTools } from './tools/linkTools';

export const popularTools: Tool[] = [
  ...seoTools.filter(tool => tool.popular),
  ...socialMediaTools.filter(tool => tool.popular),
  ...contentTools.filter(tool => tool.popular),
  ...utilityTools.filter(tool => tool.popular),
  ...calculationTools.filter(tool => tool.popular),
  ...linkTools.filter(tool => tool.popular)
];

export const allTools: Tool[] = [
  ...seoTools,
  ...socialMediaTools,
  ...contentTools,
  ...domainTools,
  ...utilityTools,
  ...calculationTools,
  ...linkTools
];
