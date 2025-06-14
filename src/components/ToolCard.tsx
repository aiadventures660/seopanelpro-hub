
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Heart } from 'lucide-react';
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
      className="group hover:shadow-md transition-all duration-300 cursor-pointer border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-[1.02] h-fit"
      onClick={handleClick}
    >
      <CardHeader className="pb-2 p-4">
        <div className="flex items-start justify-between">
          <div className="text-2xl mb-1">{tool.icon}</div>
          <div className="flex items-center gap-1">
            {isPopular && (
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs px-2 py-0.5">
                <Star className="h-2.5 w-2.5 mr-1" />
                Popular
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmarkClick}
              className={`p-1.5 h-auto transition-colors ${
                bookmarked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${bookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
        <CardTitle className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
          {tool.name}
        </CardTitle>
        <CardDescription className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
          {tool.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 p-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            {tool.category}
          </Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 h-auto"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
