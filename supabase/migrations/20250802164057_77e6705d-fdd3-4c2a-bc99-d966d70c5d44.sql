-- First check what type tool_usage_stats is
DO $$
BEGIN
    -- Drop the view if it exists  
    IF EXISTS (SELECT 1 FROM information_schema.views WHERE table_schema = 'public' AND table_name = 'tool_usage_stats') THEN
        DROP VIEW public.tool_usage_stats;
    END IF;
    
    -- Drop the table if it exists instead
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tool_usage_stats') THEN
        DROP TABLE public.tool_usage_stats;
    END IF;
END $$;

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