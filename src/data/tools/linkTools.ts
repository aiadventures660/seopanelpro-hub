
import { Link } from "lucide-react";
import React from "react";
import type { Tool } from "../tools";

// Each tool has a string icon for compatibility, but pass React Icon where needed
export const linkTools: Tool[] = [
  {
    id: "backlink-checker",
    name: "Backlink Checker",
    description: "Check backlinks to your website from other domains. Analyze source, anchor text and more.",
    category: "Link & Backlink",
    icon: "<Link />",
    featured: true,
    popular: false,
    route: "/tools/backlink-checker",
  },
  {
    id: "link-analyzer",
    name: "Link Analyzer",
    description: "Analyze internal and external links on a webpage with statistics.",
    category: "Link & Backlink",
    icon: "<Link />",
    route: "/tools/link-analyzer",
  },
  {
    id: "anchor-text-checker",
    name: "Anchor Text Checker",
    description: "Extract and audit anchor texts from all links on a webpage.",
    category: "Link & Backlink",
    icon: "<Link />",
    route: "/tools/anchor-text-checker",
  },
  {
    id: "broken-link-finder",
    name: "Broken Link Finder",
    description: "Scan a website for broken links (404/redirect issues).",
    category: "Link & Backlink",
    icon: "<Link />",
    route: "/tools/broken-link-finder",
  },
  {
    id: "link-redirect-mapper",
    name: "Link Redirect Mapper",
    description: "Map and visualize all redirections for a given URL.",
    category: "Link & Backlink",
    icon: "<Link />",
    route: "/tools/link-redirect-mapper",
  },
];
