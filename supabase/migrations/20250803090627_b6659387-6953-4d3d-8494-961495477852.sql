-- Create the generate-ai-content edge function table for content generation
CREATE TABLE IF NOT EXISTS public.ai_content_generations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  prompt TEXT NOT NULL,
  generated_content TEXT NOT NULL,
  user_session TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_content_generations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own generations" 
ON public.ai_content_generations 
FOR SELECT 
USING (user_session = auth.uid()::text OR user_session IS NULL);

CREATE POLICY "Users can create generations" 
ON public.ai_content_generations 
FOR INSERT 
WITH CHECK (true);

-- Optimize bookmark queries with better indexing
CREATE INDEX IF NOT EXISTS idx_user_bookmarks_session ON public.user_bookmarks(user_session);
CREATE INDEX IF NOT EXISTS idx_tool_usage_session ON public.tool_usage(user_session);
CREATE INDEX IF NOT EXISTS idx_tool_usage_stats_last_7_days ON public.tool_usage_stats(uses_last_7_days DESC);

-- Create updated_at trigger for ai_content_generations
CREATE TRIGGER update_ai_content_generations_updated_at
  BEFORE UPDATE ON public.ai_content_generations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();