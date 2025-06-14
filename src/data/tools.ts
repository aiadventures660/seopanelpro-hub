
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

export const seoTools: Tool[] = [
  {
    id: 'meta-analyzer',
    name: 'Meta Tag Analyzer',
    description: 'Analyze and optimize your website meta tags for better SEO performance',
    category: 'SEO',
    icon: '🔍',
    route: '/tools/meta-analyzer',
    featured: true
  },
  {
    id: 'keyword-density',
    name: 'Keyword Density Checker',
    description: 'Check keyword density and optimize your content for search engines',
    category: 'SEO',
    icon: '📊',
    route: '/tools/keyword-density',
    popular: true
  },
  {
    id: 'robots-generator',
    name: 'Robots.txt Generator',
    description: 'Generate a proper robots.txt file for your website',
    category: 'SEO',
    icon: '🤖',
    route: '/tools/robots-generator'
  },
  {
    id: 'sitemap-generator',
    name: 'Sitemap XML Generator',
    description: 'Create XML sitemaps to help search engines index your site',
    category: 'SEO',
    icon: '🗺️',
    route: '/tools/sitemap-generator'
  },
  {
    id: 'serp-preview',
    name: 'SERP Snippet Preview',
    description: 'Preview how your page will look in search engine results',
    category: 'SEO',
    icon: '👁️',
    route: '/tools/serp-preview',
    featured: true
  },
  {
    id: 'pagespeed-analyzer',
    name: 'PageSpeed Analyzer',
    description: 'Analyze your website loading speed and get optimization tips',
    category: 'SEO',
    icon: '⚡',
    route: '/tools/pagespeed-analyzer',
    popular: true
  },
  {
    id: 'keyword-suggestion',
    name: 'Keyword Suggestion Tool',
    description: 'Find relevant keywords for your content and SEO strategy',
    category: 'SEO',
    icon: '💡',
    route: '/tools/keyword-suggestion'
  },
  {
    id: 'longtail-keywords',
    name: 'Long Tail Keyword Generator',
    description: 'Generate long-tail keywords for better search rankings',
    category: 'SEO',
    icon: '🎯',
    route: '/tools/longtail-keywords'
  }
];

export const socialMediaTools: Tool[] = [
  {
    id: 'youtube-thumbnail',
    name: 'YouTube Thumbnail Downloader',
    description: 'Download high-quality thumbnails from any YouTube video',
    category: 'Social Media',
    icon: '📺',
    route: '/tools/youtube-thumbnail',
    popular: true
  },
  {
    id: 'youtube-title-generator',
    name: 'YouTube Title Generator',
    description: 'Generate catchy and SEO-friendly YouTube video titles',
    category: 'Social Media',
    icon: '🎬',
    route: '/tools/youtube-title-generator'
  },
  {
    id: 'youtube-tags',
    name: 'YouTube Tags Extractor',
    description: 'Extract tags from any YouTube video for research',
    category: 'Social Media',
    icon: '🏷️',
    route: '/tools/youtube-tags'
  },
  {
    id: 'instagram-bio',
    name: 'Instagram Bio Generator',
    description: 'Create engaging Instagram bio text with emojis and styling',
    category: 'Social Media',
    icon: '📱',
    route: '/tools/instagram-bio',
    featured: true
  },
  {
    id: 'stylish-fonts',
    name: 'Stylish Font Generator',
    description: 'Generate stylish fonts for social media posts and bios',
    category: 'Social Media',
    icon: '✨',
    route: '/tools/stylish-fonts',
    popular: true
  },
  {
    id: 'hashtag-generator',
    name: 'Hashtag Generator',
    description: 'Generate relevant hashtags for your social media posts',
    category: 'Social Media',
    icon: '#️⃣',
    route: '/tools/hashtag-generator'
  },
  {
    id: 'caption-generator',
    name: 'Caption Generator',
    description: 'Create engaging captions for your social media posts',
    category: 'Social Media',
    icon: '💬',
    route: '/tools/caption-generator'
  }
];

export const contentTools: Tool[] = [
  {
    id: 'plagiarism-checker',
    name: 'Plagiarism Checker',
    description: 'Check your content for plagiarism and ensure originality',
    category: 'Content',
    icon: '🛡️',
    route: '/tools/plagiarism-checker',
    featured: true
  },
  {
    id: 'article-rewriter',
    name: 'Article Rewriter',
    description: 'Rewrite articles while maintaining meaning and quality',
    category: 'Content',
    icon: '🔄',
    route: '/tools/article-rewriter'
  },
  {
    id: 'paraphrasing-tool',
    name: 'Paraphrasing Tool',
    description: 'Paraphrase text to avoid plagiarism and improve readability',
    category: 'Content',
    icon: '📝',
    route: '/tools/paraphrasing-tool',
    popular: true
  },
  {
    id: 'grammar-checker',
    name: 'Grammar Checker',
    description: 'Check and correct grammar, spelling, and punctuation errors',
    category: 'Content',
    icon: '✅',
    route: '/tools/grammar-checker'
  },
  {
    id: 'word-counter',
    name: 'Word & Character Counter',
    description: 'Count words, characters, paragraphs, and reading time',
    category: 'Content',
    icon: '🔢',
    route: '/tools/word-counter',
    popular: true
  }
];

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
    id: 'url-shortener',
    name: 'URL Shortener',
    description: 'Create short, trackable links for your URLs',
    category: 'Utility',
    icon: '🔗',
    route: '/tools/url-shortener'
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Pick colors and get hex, RGB, and HSL values',
    category: 'Utility',
    icon: '🎨',
    route: '/tools/color-picker'
  },
  {
    id: 'html-formatter',
    name: 'HTML Minifier / Beautifier',
    description: 'Minify or beautify HTML, CSS, and JavaScript code',
    category: 'Utility',
    icon: '💻',
    route: '/tools/html-formatter'
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress images to reduce file size without quality loss',
    category: 'Utility',
    icon: '🖼️',
    route: '/tools/image-compressor'
  }
];

export const popularTools = [
  ...seoTools.filter(tool => tool.popular),
  ...socialMediaTools.filter(tool => tool.popular),
  ...contentTools.filter(tool => tool.popular),
  ...utilityTools.filter(tool => tool.popular)
];

export const featuredTools = [
  ...seoTools.filter(tool => tool.featured),
  ...socialMediaTools.filter(tool => tool.featured),
  ...contentTools.filter(tool => tool.featured)
];
