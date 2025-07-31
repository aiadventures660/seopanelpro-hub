
import { supabase } from '@/integrations/supabase/client';
import { getSessionId, validateInput, checkRateLimit, logSecurityEvent } from './securityUtils';

export const trackToolUsage = async (toolId: string): Promise<void> => {
  try {
    // Input validation
    if (!validateInput.toolId(toolId)) {
      logSecurityEvent('invalid_tool_id', { toolId });
      throw new Error('Invalid tool ID');
    }

    const sessionId = getSessionId();
    
    // Rate limiting
    if (!checkRateLimit(`tool_usage_${sessionId}`)) {
      throw new Error('Rate limit exceeded');
    }
    
    const { error } = await supabase
      .from('tool_usage')
      .insert({
        tool_id: toolId,
        user_session: sessionId
      });

    if (error) {
      logSecurityEvent('tool_usage_error', { toolId, error: error.message });
      console.error('Error tracking tool usage:', error);
    }
  } catch (error) {
    console.error('Error tracking tool usage:', error);
  }
};
