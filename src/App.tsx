
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Bookmarks from "./pages/Bookmarks";
import ToolRequest from "./pages/ToolRequest";

// Existing tools
import MetaAnalyzer from "./pages/tools/MetaAnalyzer";
import WordCounter from "./pages/tools/WordCounter";
import QRGenerator from "./pages/tools/QRGenerator";
import YouTubeThumbnail from "./pages/tools/YouTubeThumbnail";
import PageSpeedAnalyzer from "./pages/tools/PageSpeedAnalyzer";
import KeywordDensity from "./pages/tools/KeywordDensity";
import ParaphrasingTool from "./pages/tools/ParaphrasingTool";
import StylishFonts from "./pages/tools/StylishFonts";
import RobotsGenerator from "./pages/tools/RobotsGenerator";
import SitemapGenerator from "./pages/tools/SitemapGenerator";
import YouTubeTitleGenerator from "./pages/tools/YouTubeTitleGenerator";
import YouTubeTagsExtractor from "./pages/tools/YouTubeTagsExtractor";
import InstagramBioGenerator from "./pages/tools/InstagramBioGenerator";
import PlagiarismChecker from "./pages/tools/PlagiarismChecker";
import ArticleRewriter from "./pages/tools/ArticleRewriter";
import GrammarChecker from "./pages/tools/GrammarChecker";
import WhoisLookup from "./pages/tools/WhoisLookup";
import DomainAge from "./pages/tools/DomainAge";
import DNSLookup from "./pages/tools/DNSLookup";
import IPLocation from "./pages/tools/IPLocation";
import ServerStatus from "./pages/tools/ServerStatus";

// Utility tools
import Base64Encoder from "./pages/tools/Base64Encoder";
import URLEncoder from "./pages/tools/URLEncoder";
import ColorPicker from "./pages/tools/ColorPicker";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import TextCaseConverter from "./pages/tools/TextCaseConverter";
import JSONFormatter from "./pages/tools/JSONFormatter";
import UUIDGenerator from "./pages/tools/UUIDGenerator";
import HTTPHeaderChecker from "./pages/tools/HTTPHeaderChecker";
import SSLExpiryChecker from "./pages/tools/SSLExpiryChecker";
import PingTool from "./pages/tools/PingTool";
import PortScanner from "./pages/tools/PortScanner";
import GZIPTest from "./pages/tools/GZIPTest";
import MinifyTool from "./pages/tools/MinifyTool";
import UserAgentParser from "./pages/tools/UserAgentParser";

// SEO tools
import CanonicalTagGenerator from "./pages/tools/CanonicalTagGenerator";
import HreflangGenerator from "./pages/tools/HreflangGenerator";
import OpenGraphGenerator from "./pages/tools/OpenGraphGenerator";
import TwitterCardGenerator from "./pages/tools/TwitterCardGenerator";
import SEOScoreChecker from "./pages/tools/SEOScoreChecker";
import MobileFriendlyTest from "./pages/tools/MobileFriendlyTest";
import KeywordPositionTracker from "./pages/tools/KeywordPositionTracker";
import SSLChecker from "./pages/tools/SSLChecker";
import RedirectChecker from "./pages/tools/RedirectChecker";
import TextHtmlRatio from "./pages/tools/TextHtmlRatio";

// Content tools
import AIBlogTitleGenerator from "./pages/tools/AIBlogTitleGenerator";
import CatchyHookGenerator from "./pages/tools/CatchyHookGenerator";
import BulletPointConverter from "./pages/tools/BulletPointConverter";
import GrammarFixTool from "./pages/tools/GrammarFixTool";
import PassiveVoiceChecker from "./pages/tools/PassiveVoiceChecker";
import PlagiarismSummaryGenerator from "./pages/tools/PlagiarismSummaryGenerator";
import AITweetGenerator from "./pages/tools/AITweetGenerator";
import EssayRewriterTool from "./pages/tools/EssayRewriterTool";
import PunctuationChecker from "./pages/tools/PunctuationChecker";
import YouTubeScriptGenerator from "./pages/tools/YouTubeScriptGenerator";

// New Social Media tools
import YouTubeDescriptionGenerator from "./pages/tools/YouTubeDescriptionGenerator";
import YouTubeChannelAnalyzer from "./pages/tools/YouTubeChannelAnalyzer";
import YouTubeTagsSuggestion from "./pages/tools/YouTubeTagsSuggestion";
import InstagramFontGenerator from "./pages/tools/InstagramFontGenerator";
import TikTokCaptionGenerator from "./pages/tools/TikTokCaptionGenerator";
import HashtagGenerator from "./pages/tools/HashtagGenerator";
import ProfilePictureResizer from "./pages/tools/ProfilePictureResizer";
import SocialMediaScheduler from "./pages/tools/SocialMediaScheduler";
import FacebookAdHeadlineGenerator from "./pages/tools/FacebookAdHeadlineGenerator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/tool-request" element={<ToolRequest />} />
            
            {/* SEO Tools */}
            <Route path="/tools/meta-analyzer" element={<MetaAnalyzer />} />
            <Route path="/tools/keyword-density" element={<KeywordDensity />} />
            <Route path="/tools/robots-generator" element={<RobotsGenerator />} />
            <Route path="/tools/sitemap-generator" element={<SitemapGenerator />} />
            <Route path="/tools/pagespeed-analyzer" element={<PageSpeedAnalyzer />} />
            <Route path="/tools/canonical-tag-generator" element={<CanonicalTagGenerator />} />
            <Route path="/tools/hreflang-generator" element={<HreflangGenerator />} />
            <Route path="/tools/opengraph-generator" element={<OpenGraphGenerator />} />
            <Route path="/tools/twitter-card-generator" element={<TwitterCardGenerator />} />
            <Route path="/tools/seo-score-checker" element={<SEOScoreChecker />} />
            <Route path="/tools/mobile-friendly-test" element={<MobileFriendlyTest />} />
            <Route path="/tools/keyword-position-tracker" element={<KeywordPositionTracker />} />
            <Route path="/tools/ssl-checker" element={<SSLChecker />} />
            <Route path="/tools/redirect-checker" element={<RedirectChecker />} />
            <Route path="/tools/text-html-ratio" element={<TextHtmlRatio />} />
            
            {/* Social Media Tools */}
            <Route path="/tools/youtube-thumbnail" element={<YouTubeThumbnail />} />
            <Route path="/tools/youtube-title-generator" element={<YouTubeTitleGenerator />} />
            <Route path="/tools/youtube-tags" element={<YouTubeTagsExtractor />} />
            <Route path="/tools/instagram-bio" element={<InstagramBioGenerator />} />
            <Route path="/tools/stylish-fonts" element={<StylishFonts />} />
            <Route path="/tools/youtube-description-generator" element={<YouTubeDescriptionGenerator />} />
            <Route path="/tools/youtube-channel-analyzer" element={<YouTubeChannelAnalyzer />} />
            <Route path="/tools/youtube-tags-suggestion" element={<YouTubeTagsSuggestion />} />
            <Route path="/tools/instagram-font-generator" element={<InstagramFontGenerator />} />
            <Route path="/tools/tiktok-caption-generator" element={<TikTokCaptionGenerator />} />
            <Route path="/tools/hashtag-generator-reels" element={<HashtagGenerator />} />
            <Route path="/tools/profile-picture-resizer" element={<ProfilePictureResizer />} />
            <Route path="/tools/social-media-scheduler" element={<SocialMediaScheduler />} />
            <Route path="/tools/facebook-ad-headline-generator" element={<FacebookAdHeadlineGenerator />} />
            
            {/* Content Tools */}
            <Route path="/tools/plagiarism-checker" element={<PlagiarismChecker />} />
            <Route path="/tools/article-rewriter" element={<ArticleRewriter />} />
            <Route path="/tools/paraphrasing-tool" element={<ParaphrasingTool />} />
            <Route path="/tools/grammar-checker" element={<GrammarChecker />} />
            <Route path="/tools/word-counter" element={<WordCounter />} />
            <Route path="/tools/ai-blog-title-generator" element={<AIBlogTitleGenerator />} />
            <Route path="/tools/catchy-hook-generator" element={<CatchyHookGenerator />} />
            <Route path="/tools/bullet-point-converter" element={<BulletPointConverter />} />
            <Route path="/tools/grammar-fix-tool" element={<GrammarFixTool />} />
            <Route path="/tools/passive-voice-checker" element={<PassiveVoiceChecker />} />
            <Route path="/tools/plagiarism-summary-generator" element={<PlagiarismSummaryGenerator />} />
            <Route path="/tools/ai-tweet-generator" element={<AITweetGenerator />} />
            <Route path="/tools/essay-rewriter-tool" element={<EssayRewriterTool />} />
            <Route path="/tools/punctuation-checker" element={<PunctuationChecker />} />
            <Route path="/tools/youtube-script-generator" element={<YouTubeScriptGenerator />} />
            
            {/* Domain Tools */}
            <Route path="/tools/whois-lookup" element={<WhoisLookup />} />
            <Route path="/tools/domain-age" element={<DomainAge />} />
            <Route path="/tools/dns-lookup" element={<DNSLookup />} />
            <Route path="/tools/ip-location" element={<IPLocation />} />
            <Route path="/tools/server-status" element={<ServerStatus />} />
            
            {/* Utility Tools */}
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
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
