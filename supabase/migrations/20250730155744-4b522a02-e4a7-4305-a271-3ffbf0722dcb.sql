-- Create tool_requests table for user tool requests
CREATE TABLE public.tool_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_session TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  tool_description TEXT NOT NULL,
  tool_category TEXT NOT NULL,
  use_case TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_bookmarks table for bookmarking functionality
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

-- Create tool_usage_stats table for analytics
CREATE TABLE public.tool_usage_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id TEXT NOT NULL,
  usage_count INTEGER NOT NULL DEFAULT 1,
  last_used TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(tool_id)
);

-- Enable RLS on all tables
ALTER TABLE public.tool_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_usage_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for tool_requests (allow all operations)
CREATE POLICY "Anyone can submit tool requests" 
ON public.tool_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view tool requests" 
ON public.tool_requests 
FOR SELECT 
USING (true);

-- Create policies for user_bookmarks (session-based access)
CREATE POLICY "Users can manage their own bookmarks" 
ON public.user_bookmarks 
FOR ALL 
USING (true);

-- Create policies for tool_usage (allow all operations for analytics)
CREATE POLICY "Anyone can track tool usage" 
ON public.tool_usage 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view tool usage" 
ON public.tool_usage 
FOR SELECT 
USING (true);

-- Create policies for tool_usage_stats (allow all operations for analytics)
CREATE POLICY "Anyone can update usage stats" 
ON public.tool_usage_stats 
FOR ALL 
USING (true);

-- Create function to update tool usage stats
CREATE OR REPLACE FUNCTION public.update_tool_usage_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.tool_usage_stats (tool_id, usage_count, last_used)
  VALUES (NEW.tool_id, 1, NEW.created_at)
  ON CONFLICT (tool_id)
  DO UPDATE SET
    usage_count = tool_usage_stats.usage_count + 1,
    last_used = NEW.created_at;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update stats when tool is used
CREATE TRIGGER update_tool_stats_trigger
  AFTER INSERT ON public.tool_usage
  FOR EACH ROW
  EXECUTE FUNCTION public.update_tool_usage_stats();