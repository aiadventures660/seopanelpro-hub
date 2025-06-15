
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

const contentRoutes = [
  <Route key="plagiarism-checker" path="/tools/plagiarism-checker" element={<PlagiarismChecker />} />,
  <Route key="article-rewriter" path="/tools/article-rewriter" element={<ArticleRewriter />} />,
  <Route key="paraphrasing-tool" path="/tools/paraphrasing-tool" element={<ParaphrasingTool />} />,
  <Route key="grammar-checker" path="/tools/grammar-checker" element={<GrammarChecker />} />,
  <Route key="word-counter" path="/tools/word-counter" element={<WordCounter />} />,
  <Route key="ai-blog-title-generator" path="/tools/ai-blog-title-generator" element={<AIBlogTitleGenerator />} />,
  <Route key="catchy-hook-generator" path="/tools/catchy-hook-generator" element={<CatchyHookGenerator />} />,
  <Route key="bullet-point-converter" path="/tools/bullet-point-converter" element={<BulletPointConverter />} />,
  <Route key="grammar-fix-tool" path="/tools/grammar-fix-tool" element={<GrammarFixTool />} />,
  <Route key="passive-voice-checker" path="/tools/passive-voice-checker" element={<PassiveVoiceChecker />} />,
  <Route key="plagiarism-summary-generator" path="/tools/plagiarism-summary-generator" element={<PlagiarismSummaryGenerator />} />,
  <Route key="ai-tweet-generator" path="/tools/ai-tweet-generator" element={<AITweetGenerator />} />,
  <Route key="essay-rewriter-tool" path="/tools/essay-rewriter-tool" element={<EssayRewriterTool />} />,
  <Route key="punctuation-checker" path="/tools/punctuation-checker" element={<PunctuationChecker />} />,
  <Route key="youtube-script-generator" path="/tools/youtube-script-generator" element={<YouTubeScriptGenerator />} />
];

export default contentRoutes;
