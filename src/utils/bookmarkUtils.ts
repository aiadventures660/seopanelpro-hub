
import { supabase } from '@/integrations/supabase/client';

// Get the same session ID used for tool usage tracking
const getSessionId = (): string => {
  let sessionId = localStorage.getItem('tool_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('tool_session_id', sessionId);
  }
  return sessionId;
};

export const addBookmark = async (toolId: string): Promise<boolean> => {
  try {
    const sessionId = getSessionId();
    
    const { error } = await supabase
      .from('user_bookmarks')
      .insert({
        user_session: sessionId,
        tool_id: toolId
      });

    if (error) {
      console.error('Error adding bookmark:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error adding bookmark:', error);
    return false;
  }
};

export const removeBookmark = async (toolId: string): Promise<boolean> => {
  try {
    const sessionId = getSessionId();
    
    const { error } = await supabase
      .from('user_bookmarks')
      .delete()
      .eq('user_session', sessionId)
      .eq('tool_id', toolId);

    if (error) {
      console.error('Error removing bookmark:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return false;
  }
};

export const getUserBookmarks = async (): Promise<string[]> => {
  try {
    const sessionId = getSessionId();
    
    const { data, error } = await supabase
      .from('user_bookmarks')
      .select('tool_id')
      .eq('user_session', sessionId);

    if (error) {
      console.error('Error fetching bookmarks:', error);
      return [];
    }
    
    return data.map(bookmark => bookmark.tool_id);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }
};

export const isBookmarked = async (toolId: string): Promise<boolean> => {
  try {
    const sessionId = getSessionId();
    
    const { data, error } = await supabase
      .from('user_bookmarks')
      .select('id')
      .eq('user_session', sessionId)
      .eq('tool_id', toolId)
      .maybeSingle();

    if (error) {
      console.error('Error checking bookmark:', error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking bookmark:', error);
    return false;
  }
};
