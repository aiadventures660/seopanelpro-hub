-- Create security_logs table for security event monitoring
CREATE TABLE public.security_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  event_type TEXT NOT NULL,
  event_details JSONB,
  user_session TEXT NOT NULL,
  user_agent TEXT,
  ip_address INET,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for security logs (admin access only in production)
CREATE POLICY "Security logs are insertable by anyone" 
ON public.security_logs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Security logs are viewable by admin only" 
ON public.security_logs 
FOR SELECT 
USING (false); -- Only accessible via admin interface

-- Fix the security definer view issue by recreating the view without SECURITY DEFINER
DROP VIEW IF EXISTS public.tool_usage_stats;

CREATE VIEW public.tool_usage_stats AS
SELECT 
  tool_id,
  count(*) AS total_uses,
  count(DISTINCT user_session) AS unique_users,
  max(created_at) AS last_used,
  count(CASE WHEN created_at >= (now() - '7 days'::interval) THEN 1 ELSE NULL END) AS uses_last_7_days,
  count(CASE WHEN created_at >= (now() - '30 days'::interval) THEN 1 ELSE NULL END) AS uses_last_30_days
FROM tool_usage
GROUP BY tool_id;