
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
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
            <Route path="/tools/meta-analyzer" element={<MetaAnalyzer />} />
            <Route path="/tools/word-counter" element={<WordCounter />} />
            <Route path="/tools/qr-generator" element={<QRGenerator />} />
            <Route path="/tools/youtube-thumbnail" element={<YouTubeThumbnail />} />
            <Route path="/tools/pagespeed-analyzer" element={<PageSpeedAnalyzer />} />
            <Route path="/tools/keyword-density" element={<KeywordDensity />} />
            <Route path="/tools/paraphrasing-tool" element={<ParaphrasingTool />} />
            <Route path="/tools/stylish-fonts" element={<StylishFonts />} />
            <Route path="/tools/robots-generator" element={<RobotsGenerator />} />
            <Route path="/tools/sitemap-generator" element={<SitemapGenerator />} />
            <Route path="/tools/youtube-title-generator" element={<YouTubeTitleGenerator />} />
            <Route path="/tools/youtube-tags" element={<YouTubeTagsExtractor />} />
            <Route path="/tools/instagram-bio" element={<InstagramBioGenerator />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
