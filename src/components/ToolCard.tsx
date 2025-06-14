
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tool } from '@/data/tools';
import { trackToolUsage } from '@/utils/toolUsageTracker';

interface ToolCardProps {
  tool: Tool;
  isPopular?: boolean;
}

const ToolCard = ({ tool, isPopular }: ToolCardProps) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    // Track tool usage before navigation
    await trackToolUsage(tool.id);
    navigate(tool.route);
  };

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-105"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="text-3xl mb-2">{tool.icon}</div>
          {isPopular && (
            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs">
              <Star className="h-3 w-3 mr-1" />
              Popular
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {tool.name}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {tool.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {tool.category}
          </Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
