
import React from 'react';
import { Route } from 'react-router-dom';

import PlagiarismChecker from "@/pages/tools/PlagiarismChecker";
import ArticleRewriter from "@/pages/tools/ArticleRewriter";
import ParaphrasingTool from "@/pages/tools/ParaphrasingTool";
import GrammarChecker from "@/pages/tools/GrammarChecker";
import WordCounter from "@/pages/tools/WordCounter";
import AIBlogTitleGenerator from "@/pages/tools/AIBlogTitleGenerator";
import CatchyHookGenerator from "@/pages/tools/CatchyHookGenerator";
import BulletPointConverter from "@/pages/tools/BulletPointConverter";
import GrammarFixTool from "@/pages/tools/GrammarFixTool";
import PassiveVoiceChecker from "@/pages/tools/PassiveVoiceChecker";
import PlagiarismSummaryGenerator from "@/pages/tools/PlagiarismSummaryGenerator";
import AITweetGenerator from "@/pages/tools/AITweetGenerator";
import EssayRewriterTool from "@/pages/tools/EssayRewriterTool";
import PunctuationChecker from "@/pages/tools/PunctuationChecker";
import YouTubeScriptGenerator from "@/pages/tools/YouTubeScriptGenerator";

const ContentRoutes = () => (
  <>
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
  </>
);

export default ContentRoutes;
