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
  },
  {
    id: 'canonical-tag-generator',
    name: 'Canonical Tag Generator',
    description: 'Generate canonical tags to prevent duplicate content issues',
    category: 'SEO',
    icon: '🔗',
    route: '/tools/canonical-tag-generator'
  },
  {
    id: 'hreflang-generator',
    name: 'Hreflang Tag Generator',
    description: 'Generate hreflang tags for international SEO and multilingual sites',
    category: 'SEO',
    icon: '🌍',
    route: '/tools/hreflang-generator'
  },
  {
    id: 'opengraph-generator',
    name: 'Open Graph Meta Tag Generator',
    description: 'Create Open Graph meta tags for better social media sharing',
    category: 'SEO',
    icon: '📱',
    route: '/tools/opengraph-generator',
    popular: true
  },
  {
    id: 'twitter-card-generator',
    name: 'Twitter Card Generator',
    description: 'Generate Twitter Card meta tags for enhanced Twitter sharing',
    category: 'SEO',
    icon: '🐦',
    route: '/tools/twitter-card-generator'
  },
  {
    id: 'seo-score-checker',
    name: 'SEO Score Checker',
    description: 'Analyze your website SEO score and get improvement recommendations',
    category: 'SEO',
    icon: '📈',
    route: '/tools/seo-score-checker',
    featured: true
  },
  {
    id: 'mobile-friendly-test',
    name: 'Mobile-Friendly Test',
    description: 'Test if your website is mobile-friendly and get optimization tips',
    category: 'SEO',
    icon: '📱',
    route: '/tools/mobile-friendly-test'
  },
  {
    id: 'keyword-position-tracker',
    name: 'Keyword Position Tracker',
    description: 'Track your keyword rankings in search engine results',
    category: 'SEO',
    icon: '📍',
    route: '/tools/keyword-position-tracker'
  },
  {
    id: 'ssl-checker',
    name: 'SSL Checker',
    description: 'Check SSL certificate status and security for any website',
    category: 'SEO',
    icon: '🔒',
    route: '/tools/ssl-checker'
  },
  {
    id: 'redirect-checker',
    name: 'Redirect Checker',
    description: 'Check HTTP redirects (301, 302) and redirect chains',
    category: 'SEO',
    icon: '↩️',
    route: '/tools/redirect-checker'
  },
  {
    id: 'text-html-ratio',
    name: 'Text-to-HTML Ratio Checker',
    description: 'Analyze the text-to-HTML ratio of your web pages for SEO',
    category: 'SEO',
    icon: '📝',
    route: '/tools/text-html-ratio'
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
  },
  {
    id: 'ai-blog-title-generator',
    name: 'AI Blog Title Generator',
    description: 'Generate catchy and SEO-friendly blog titles using AI',
    category: 'Content',
    icon: '📰',
    route: '/tools/ai-blog-title-generator',
    popular: true
  },
  {
    id: 'catchy-hook-generator',
    name: 'Catchy Hook Generator for Blogs',
    description: 'Create engaging hooks to capture your readers attention',
    category: 'Content',
    icon: '🎣',
    route: '/tools/catchy-hook-generator'
  },
  {
    id: 'bullet-point-converter',
    name: 'Bullet Point to Paragraph Converter',
    description: 'Convert bullet points into well-structured paragraphs',
    category: 'Content',
    icon: '📋',
    route: '/tools/bullet-point-converter'
  },
  {
    id: 'grammar-fix-tool',
    name: 'Grammar Fix Tool',
    description: 'Instantly fix grammar mistakes and improve your writing',
    category: 'Content',
    icon: '🔧',
    route: '/tools/grammar-fix-tool'
  },
  {
    id: 'passive-voice-checker',
    name: 'Passive Voice Checker',
    description: 'Identify and fix passive voice in your writing',
    category: 'Content',
    icon: '👁️‍🗨️',
    route: '/tools/passive-voice-checker'
  },
  {
    id: 'plagiarism-summary-generator',
    name: 'Plagiarism Summary Generator',
    description: 'Generate summaries while avoiding plagiarism',
    category: 'Content',
    icon: '📄',
    route: '/tools/plagiarism-summary-generator'
  },
  {
    id: 'ai-tweet-generator',
    name: 'AI Tweet Generator',
    description: 'Generate engaging tweets and social media posts',
    category: 'Content',
    icon: '🐦',
    route: '/tools/ai-tweet-generator',
    featured: true
  },
  {
    id: 'essay-rewriter-tool',
    name: 'Essay Rewriter Tool',
    description: 'Rewrite essays while maintaining original meaning',
    category: 'Content',
    icon: '📚',
    route: '/tools/essay-rewriter-tool'
  },
  {
    id: 'punctuation-checker',
    name: 'Punctuation Checker',
    description: 'Check and fix punctuation errors in your text',
    category: 'Content',
    icon: '❗',
    route: '/tools/punctuation-checker'
  },
  {
    id: 'youtube-script-generator',
    name: 'YouTube Script Generator',
    description: 'Generate engaging scripts for your YouTube videos',
    category: 'Content',
    icon: '🎬',
    route: '/tools/youtube-script-generator'
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
  }
];

export const popularTools: Tool[] = [
  ...seoTools.filter(tool => tool.popular),
  ...socialMediaTools.filter(tool => tool.popular),
  ...contentTools.filter(tool => tool.popular),
  ...utilityTools.filter(tool => tool.popular)
];
