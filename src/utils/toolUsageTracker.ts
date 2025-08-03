
import { supabase } from '@/integrations/supabase/client';
import { getSessionId, validateInput, checkRateLimit, logSecurityEvent } from './securityUtils';

// Queue to batch tool usage tracking
let trackingQueue: Array<{ toolId: string; sessionId: string; timestamp: number }> = [];
let trackingTimer: number | null = null;

const flushTrackingQueue = async () => {
  if (trackingQueue.length === 0) return;
  
  const currentQueue = [...trackingQueue];
  trackingQueue = [];
  
  try {
    const { error } = await supabase
      .from('tool_usage')
      .insert(currentQueue.map(item => ({
        tool_id: item.toolId,
        user_session: item.sessionId
      })));

    if (error) {
      console.error('Error batch tracking tool usage:', error);
      // Re-add failed items to queue for retry
      trackingQueue.unshift(...currentQueue);
    }
  } catch (error) {
    console.error('Error in batch tracking:', error);
    // Re-add failed items to queue for retry
    trackingQueue.unshift(...currentQueue);
  }
};

export const trackToolUsage = async (toolId: string): Promise<void> => {
  try {
    // Input validation
    if (!validateInput.toolId(toolId)) {
      logSecurityEvent('invalid_tool_id', { toolId });
      return;
    }

    const sessionId = getSessionId();
    
    // Rate limiting check
    if (!checkRateLimit(`tool_usage_${sessionId}`)) {
      return;
    }
    
    // Add to queue instead of immediate database call
    trackingQueue.push({
      toolId,
      sessionId,
      timestamp: Date.now()
    });
    
    // Clear existing timer and set new one
    if (trackingTimer) {
      clearTimeout(trackingTimer);
    }
    
    // Flush queue after 2 seconds or when it reaches 10 items
    if (trackingQueue.length >= 10) {
      await flushTrackingQueue();
    } else {
      trackingTimer = window.setTimeout(flushTrackingQueue, 2000);
    }
  } catch (error) {
    console.error('Error queuing tool usage:', error);
  }
};
