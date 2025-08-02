-- Fix security definer view issue by dropping and recreating as a standard view
DROP VIEW IF EXISTS public.tool_usage_stats;

-- Create a new view without SECURITY DEFINER
CREATE VIEW public.tool_usage_stats AS
SELECT 
    tool_id,
    COUNT(*) as total_uses,
    COUNT(DISTINCT user_session) as unique_users,
    MAX(created_at) as last_used,
    COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as uses_last_7_days,
    COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as uses_last_30_days
FROM public.tool_usage 
GROUP BY tool_id;

-- Enable RLS on the view
ALTER VIEW public.tool_usage_stats SET (security_barrier = true);

-- Create policy to allow public read access to usage stats
CREATE POLICY "Anyone can view tool usage stats" ON public.tool_usage_stats
FOR SELECT USING (true);