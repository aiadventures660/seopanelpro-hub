import React from 'react';
import { Tool } from '@/data/tools';
import ToolCard from '@/components/ToolCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RelatedToolsProps {
  currentToolId: string;
  currentCategory: string;
  allTools: Tool[];
  maxTools?: number;
}

const RelatedTools = ({ currentToolId, currentCategory, allTools, maxTools = 6 }: RelatedToolsProps) => {
  // Find related tools from the same category, excluding the current tool
  const relatedTools = allTools
    .filter(tool => tool.category === currentCategory && tool.id !== currentToolId)
    .slice(0, maxTools);

  // If not enough tools in the same category, add popular tools from other categories
  if (relatedTools.length < maxTools) {
    const additionalTools = allTools
      .filter(tool => tool.category !== currentCategory && tool.popular && tool.id !== currentToolId)
      .slice(0, maxTools - relatedTools.length);
    
    relatedTools.push(...additionalTools);
  }

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8 mb-12">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
          Related Tools
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-300">
          Discover more tools that might interest you
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedTools;