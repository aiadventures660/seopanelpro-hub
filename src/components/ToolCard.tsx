
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Heart, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tool } from '@/data/tools';
import { trackToolUsage } from '@/utils/toolUsageTracker';
import { useBookmarks } from '@/hooks/useBookmarks';

interface ToolCardProps {
  tool: Tool;
  isPopular?: boolean;
  onToolClick?: () => void;
}

const ToolCard = ({ tool, isPopular, onToolClick }: ToolCardProps) => {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(tool.id));
  }, [tool.id, isBookmarked]);

  const handleClick = async () => {
    // Call the onToolClick callback if provided (for scroll position tracking)
    if (onToolClick) {
      onToolClick();
    }
    
    // Track tool usage before navigation
    await trackToolUsage(tool.id);
    navigate(tool.route);
  };

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    await toggleBookmark(tool.id);
    setBookmarked(!bookmarked);
  };

  return (
    <Card 
      className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:scale-[1.02] h-full flex flex-col"
      onClick={handleClick}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="pb-3 p-4 md:p-5 relative z-10">
        <div className="flex items-start justify-between mb-2">
          <div className="text-2xl md:text-3xl mb-1 group-hover:scale-110 transition-transform duration-300">
            {tool.icon}
          </div>
          <div className="flex items-center gap-1">
            {isPopular && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 text-xs px-2 py-1 shadow-sm">
                <Star className="h-2.5 w-2.5 mr-1 fill-current" />
                Popular
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmarkClick}
              className={`p-1.5 h-auto transition-all duration-200 hover:scale-110 ${
                bookmarked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${bookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
        <CardTitle className="text-base md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
          {tool.name}
        </CardTitle>
        <CardDescription className="text-xs md:text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
          {tool.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0 p-4 md:p-5 mt-auto relative z-10">
        <div className="flex items-center justify-between">
          <Badge 
            variant="secondary" 
            className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
          >
            {tool.category}
          </Badge>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 h-auto text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 h-auto text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </CardContent>
      
      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  );
};

export default ToolCard;
