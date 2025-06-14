import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tool, seoTools, socialMediaTools, contentTools, domainTools, utilityTools } from '@/data/tools';

interface ToolUsageStats {
  tool_id: string;
  total_uses: number;
  unique_users: number;
  last_used: string;
  uses_last_7_days: number;
  uses_last_30_days: number;
}

export const useTrendingTools = () => {
  return useQuery({
    queryKey: ['trending-tools'],
    queryFn: async (): Promise<Tool[]> => {
      const { data: usageStats, error } = await supabase
        .from('tool_usage_stats')
        .select('*')
        .order('uses_last_7_days', { ascending: false })
        .limit(8);

      if (error) {
        console.error('Error fetching tool usage stats:', error);
        // Fallback to static popular tools if there's an error
        return [...seoTools, ...socialMediaTools, ...contentTools, ...domainTools, ...utilityTools]
          .filter(tool => tool.popular)
          .slice(0, 8);
      }

      // Map usage stats to actual tool objects
      const allTools = [
        ...seoTools,
        ...socialMediaTools, 
        ...contentTools,
        ...domainTools,
        ...utilityTools
      ];

      const trendingTools: Tool[] = [];
      
      if (usageStats && usageStats.length > 0) {
        // Map stats to tools
        usageStats.forEach((stat: ToolUsageStats) => {
          const tool = allTools.find(t => t.id === stat.tool_id);
          if (tool) {
            trendingTools.push(tool);
          }
        });

        // If we don't have enough trending tools from usage data, 
        // fill the rest with popular tools that aren't already included
        if (trendingTools.length < 8) {
          const popularTools = allTools.filter(tool => 
            tool.popular && !trendingTools.some(t => t.id === tool.id)
          );
          trendingTools.push(...popularTools.slice(0, 8 - trendingTools.length));
        }
      } else {
        // If no usage data exists yet, fall back to static popular tools
        return allTools.filter(tool => tool.popular).slice(0, 8);
      }

      return trendingTools.slice(0, 8);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
