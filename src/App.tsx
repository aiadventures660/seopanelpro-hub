
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
