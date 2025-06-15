
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

const socialMediaRoutes = [
  <Route key="youtube-thumbnail" path="/tools/youtube-thumbnail" element={<YouTubeThumbnail />} />,
  <Route key="youtube-title-generator" path="/tools/youtube-title-generator" element={<YouTubeTitleGenerator />} />,
  <Route key="youtube-tags" path="/tools/youtube-tags" element={<YouTubeTagsExtractor />} />,
  <Route key="instagram-bio" path="/tools/instagram-bio" element={<InstagramBioGenerator />} />,
  <Route key="stylish-fonts" path="/tools/stylish-fonts" element={<StylishFonts />} />,
  <Route key="youtube-description-generator" path="/tools/youtube-description-generator" element={<YouTubeDescriptionGenerator />} />,
  <Route key="youtube-channel-analyzer" path="/tools/youtube-channel-analyzer" element={<YouTubeChannelAnalyzer />} />,
  <Route key="youtube-tags-suggestion" path="/tools/youtube-tags-suggestion" element={<YouTubeTagsSuggestion />} />,
  <Route key="instagram-font-generator" path="/tools/instagram-font-generator" element={<InstagramFontGenerator />} />,
  <Route key="tiktok-caption-generator" path="/tools/tiktok-caption-generator" element={<TikTokCaptionGenerator />} />,
  <Route key="hashtag-generator-reels" path="/tools/hashtag-generator-reels" element={<HashtagGenerator />} />,
  <Route key="profile-picture-resizer" path="/tools/profile-picture-resizer" element={<ProfilePictureResizer />} />,
  <Route key="social-media-scheduler" path="/tools/social-media-scheduler" element={<SocialMediaScheduler />} />,
  <Route key="facebook-ad-headline-generator" path="/tools/facebook-ad-headline-generator" element={<FacebookAdHeadlineGenerator />} />
];

export default socialMediaRoutes;
