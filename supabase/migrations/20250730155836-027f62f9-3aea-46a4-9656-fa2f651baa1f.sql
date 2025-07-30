-- Fix security definer view issue by recreating the view without security definer
DROP VIEW IF EXISTS public.tool_usage_stats;

-- Recreate the view as security invoker (default)
CREATE VIEW public.tool_usage_stats AS
SELECT 
  tool_id,
  COUNT(*) as total_uses,
  COUNT(DISTINCT user_session) as unique_users,
  MAX(created_at) as last_used,
  COUNT(CASE WHEN created_at >= now() - interval '7 days' THEN 1 END) as uses_last_7_days,
  COUNT(CASE WHEN created_at >= now() - interval '30 days' THEN 1 END) as uses_last_30_days
FROM public.tool_usage
GROUP BY tool_id;

-- Fix function search path issue
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql 
   SECURITY DEFINER 
   SET search_path = public;