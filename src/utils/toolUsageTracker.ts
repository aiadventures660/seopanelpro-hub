
import { supabase } from '@/integrations/supabase/client';

// Generate a simple session ID for anonymous tracking
const getSessionId = (): string => {
  let sessionId = localStorage.getItem('tool_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('tool_session_id', sessionId);
  }
  return sessionId;
};

export const trackToolUsage = async (toolId: string): Promise<void> => {
  try {
    const sessionId = getSessionId();
    
    const { error } = await supabase
      .from('tool_usage')
      .insert({
        tool_id: toolId,
        user_session: sessionId
      });

    if (error) {
      console.error('Error tracking tool usage:', error);
    }
  } catch (error) {
    console.error('Error tracking tool usage:', error);
  }
};
