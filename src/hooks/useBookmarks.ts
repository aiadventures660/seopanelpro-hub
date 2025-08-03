
import { useState, useEffect, useCallback } from 'react';
import { getUserBookmarks, addBookmark, removeBookmark, isBookmarked } from '@/utils/bookmarkUtils';
import { useToast } from '@/hooks/use-toast';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [cache, setCache] = useState<Map<string, boolean>>(new Map());
  const { toast } = useToast();

  const loadBookmarks = useCallback(async () => {
    setLoading(true);
    const userBookmarks = await getUserBookmarks();
    setBookmarks(userBookmarks);
    
    // Update cache
    const newCache = new Map<string, boolean>();
    userBookmarks.forEach(toolId => newCache.set(toolId, true));
    setCache(newCache);
    
    setLoading(false);
  }, []);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  const toggleBookmark = useCallback(async (toolId: string) => {
    const isCurrentlyBookmarked = bookmarks.includes(toolId);
    
    if (isCurrentlyBookmarked) {
      const success = await removeBookmark(toolId);
      if (success) {
        setBookmarks(prev => prev.filter(id => id !== toolId));
        setCache(prev => {
          const newCache = new Map(prev);
          newCache.set(toolId, false);
          return newCache;
        });
        toast({
          title: "Bookmark removed",
          description: "Tool removed from your favorites",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to remove bookmark",
          variant: "destructive",
        });
      }
    } else {
      const success = await addBookmark(toolId);
      if (success) {
        setBookmarks(prev => [...prev, toolId]);
        setCache(prev => {
          const newCache = new Map(prev);
          newCache.set(toolId, true);
          return newCache;
        });
        toast({
          title: "Bookmark added",
          description: "Tool added to your favorites",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add bookmark",
          variant: "destructive",
        });
      }
    }
  }, [bookmarks, toast]);

  const checkBookmarkStatus = useCallback(async (toolId: string): Promise<boolean> => {
    // Check cache first
    if (cache.has(toolId)) {
      return cache.get(toolId)!;
    }
    
    // If not in cache, check database
    const isBookmarkedResult = await isBookmarked(toolId);
    
    // Update cache
    setCache(prev => new Map(prev).set(toolId, isBookmarkedResult));
    
    return isBookmarkedResult;
  }, [cache]);

  const isBookmarkedSync = useCallback((toolId: string) => {
    return cache.get(toolId) ?? bookmarks.includes(toolId);
  }, [cache, bookmarks]);

  return {
    bookmarks,
    loading,
    toggleBookmark,
    checkBookmarkStatus,
    isBookmarked: isBookmarkedSync,
    refreshBookmarks: loadBookmarks
  };
};
