
-- Create table for user bookmarks
CREATE TABLE public.user_bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_session TEXT NOT NULL, -- Using session ID for anonymous users
  tool_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_session, tool_id)
);

-- Create index for faster queries
CREATE INDEX idx_user_bookmarks_session ON public.user_bookmarks(user_session);
CREATE INDEX idx_user_bookmarks_tool_id ON public.user_bookmarks(tool_id);

-- Create table for tool requests
CREATE TABLE public.tool_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_session TEXT, -- Optional for anonymous requests
  tool_name TEXT NOT NULL,
  tool_description TEXT NOT NULL,
  tool_category TEXT,
  use_case TEXT,
  email TEXT, -- Optional contact email
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'approved', 'rejected', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries on tool requests
CREATE INDEX idx_tool_requests_status ON public.tool_requests(status);
CREATE INDEX idx_tool_requests_created_at ON public.tool_requests(created_at);

-- Update the existing tool_usage_stats view to include more detailed visitor stats
DROP VIEW IF EXISTS public.tool_usage_stats;
CREATE OR REPLACE VIEW public.tool_usage_stats AS
SELECT 
  tool_id,
  COUNT(*) as total_uses,
  COUNT(DISTINCT user_session) as unique_users,
  MAX(used_at) as last_used,
  COUNT(CASE WHEN used_at >= NOW() - INTERVAL '1 day' THEN 1 END) as uses_last_24_hours,
  COUNT(CASE WHEN used_at >= NOW() - INTERVAL '7 days' THEN 1 END) as uses_last_7_days,
  COUNT(CASE WHEN used_at >= NOW() - INTERVAL '30 days' THEN 1 END) as uses_last_30_days,
  ROUND(
    COUNT(CASE WHEN used_at >= NOW() - INTERVAL '7 days' THEN 1 END)::numeric / 
    GREATEST(EXTRACT(days FROM NOW() - MIN(used_at))::numeric, 1), 2
  ) as avg_daily_uses
FROM public.tool_usage 
GROUP BY tool_id;
