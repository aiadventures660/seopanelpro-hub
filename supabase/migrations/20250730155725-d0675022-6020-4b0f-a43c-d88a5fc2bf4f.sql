-- Create tool_requests table for user feature requests
CREATE TABLE public.tool_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_session TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  tool_description TEXT NOT NULL,
  tool_category TEXT,
  use_case TEXT,
  email TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_bookmarks table for bookmark functionality
CREATE TABLE public.user_bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_session TEXT NOT NULL,
  tool_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_session, tool_id)
);

-- Create tool_usage table for tracking tool usage
CREATE TABLE public.tool_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id TEXT NOT NULL,
  user_session TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tool_usage_stats view for aggregated statistics
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

-- Enable Row Level Security on all tables
ALTER TABLE public.tool_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_usage ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tool_requests (public readable, session-based write)
CREATE POLICY "Anyone can view tool requests" 
ON public.tool_requests 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create tool requests" 
ON public.tool_requests 
FOR INSERT 
WITH CHECK (true);

-- Create RLS policies for user_bookmarks (session-based access)
CREATE POLICY "Users can view their own bookmarks" 
ON public.user_bookmarks 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own bookmarks" 
ON public.user_bookmarks 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can delete their own bookmarks" 
ON public.user_bookmarks 
FOR DELETE 
USING (true);

-- Create RLS policies for tool_usage (public for analytics)
CREATE POLICY "Anyone can view tool usage stats" 
ON public.tool_usage 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can track tool usage" 
ON public.tool_usage 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates on tool_requests
CREATE TRIGGER update_tool_requests_updated_at
  BEFORE UPDATE ON public.tool_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_tool_requests_user_session ON public.tool_requests(user_session);
CREATE INDEX idx_tool_requests_status ON public.tool_requests(status);
CREATE INDEX idx_user_bookmarks_user_session ON public.user_bookmarks(user_session);
CREATE INDEX idx_user_bookmarks_tool_id ON public.user_bookmarks(tool_id);
CREATE INDEX idx_tool_usage_tool_id ON public.tool_usage(tool_id);
CREATE INDEX idx_tool_usage_user_session ON public.tool_usage(user_session);
CREATE INDEX idx_tool_usage_created_at ON public.tool_usage(created_at);