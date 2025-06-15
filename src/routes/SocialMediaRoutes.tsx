
import React from 'react';
import { Route } from 'react-router-dom';

import YouTubeThumbnail from "@/pages/tools/YouTubeThumbnail";
import YouTubeTitleGenerator from "@/pages/tools/YouTubeTitleGenerator";
import YouTubeTagsExtractor from "@/pages/tools/YouTubeTagsExtractor";
import InstagramBioGenerator from "@/pages/tools/InstagramBioGenerator";
import StylishFonts from "@/pages/tools/StylishFonts";
import YouTubeDescriptionGenerator from "@/pages/tools/YouTubeDescriptionGenerator";
import YouTubeChannelAnalyzer from "@/pages/tools/YouTubeChannelAnalyzer";
import YouTubeTagsSuggestion from "@/pages/tools/YouTubeTagsSuggestion";
import InstagramFontGenerator from "@/pages/tools/InstagramFontGenerator";
import TikTokCaptionGenerator from "@/pages/tools/TikTokCaptionGenerator";
import HashtagGenerator from "@/pages/tools/HashtagGenerator";
import ProfilePictureResizer from "@/pages/tools/ProfilePictureResizer";
import SocialMediaScheduler from "@/pages/tools/SocialMediaScheduler";
import FacebookAdHeadlineGenerator from "@/pages/tools/FacebookAdHeadlineGenerator";

const SocialMediaRoutes = () => (
  <>
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
  </>
);

export default SocialMediaRoutes;
