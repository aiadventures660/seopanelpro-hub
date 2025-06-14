
-- Create a table to track tool usage statistics
CREATE TABLE public.tool_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id TEXT NOT NULL,
  user_session TEXT, -- Can store session ID or user IP for anonymous tracking
  used_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create an index for faster queries on tool_id
CREATE INDEX idx_tool_usage_tool_id ON public.tool_usage(tool_id);

-- Create an index for faster queries on used_at for time-based filtering
CREATE INDEX idx_tool_usage_used_at ON public.tool_usage(used_at);

-- Create a view for tool usage statistics
CREATE OR REPLACE VIEW public.tool_usage_stats AS
SELECT 
  tool_id,
  COUNT(*) as total_uses,
  COUNT(DISTINCT user_session) as unique_users,
  MAX(used_at) as last_used,
  COUNT(CASE WHEN used_at >= NOW() - INTERVAL '7 days' THEN 1 END) as uses_last_7_days,
  COUNT(CASE WHEN used_at >= NOW() - INTERVAL '30 days' THEN 1 END) as uses_last_30_days
FROM public.tool_usage 
GROUP BY tool_id;
