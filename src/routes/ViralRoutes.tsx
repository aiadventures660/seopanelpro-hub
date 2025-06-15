
import React from 'react';
import { Route } from 'react-router-dom';

import AIInstagramBioRewriter from "@/pages/tools/AIInstagramBioRewriter";
import GenerateTwitterThreads from "@/pages/tools/GenerateTwitterThreads";
import MemeTextGenerator from "@/pages/tools/MemeTextGenerator";
import InstagramStoryIdeaGenerator from "@/pages/tools/InstagramStoryIdeaGenerator";
import RedditPostTitleGenerator from "@/pages/tools/RedditPostTitleGenerator";

const viralRoutes = [
  <Route key="ai-instagram-bio-rewriter" path="/tools/ai-instagram-bio-rewriter" element={<AIInstagramBioRewriter />} />,
  <Route key="generate-twitter-threads" path="/tools/generate-twitter-threads" element={<GenerateTwitterThreads />} />,
  <Route key="meme-text-generator" path="/tools/meme-text-generator" element={<MemeTextGenerator />} />,
  <Route key="instagram-story-idea-generator" path="/tools/instagram-story-idea-generator" element={<InstagramStoryIdeaGenerator />} />,
  <Route key="reddit-post-title-generator" path="/tools/reddit-post-title-generator" element={<RedditPostTitleGenerator />} />,
];

export default viralRoutes;
