
import { useState, useEffect } from 'react';
import { getUserBookmarks, addBookmark, removeBookmark, isBookmarked } from '@/utils/bookmarkUtils';
import { useToast } from '@/hooks/use-toast';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    setLoading(true);
    const userBookmarks = await getUserBookmarks();
    setBookmarks(userBookmarks);
    setLoading(false);
  };

  const toggleBookmark = async (toolId: string) => {
    const isCurrentlyBookmarked = bookmarks.includes(toolId);
    
    if (isCurrentlyBookmarked) {
      const success = await removeBookmark(toolId);
      if (success) {
        setBookmarks(prev => prev.filter(id => id !== toolId));
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
  };

  const checkBookmarkStatus = async (toolId: string): Promise<boolean> => {
    return await isBookmarked(toolId);
  };

  return {
    bookmarks,
    loading,
    toggleBookmark,
    checkBookmarkStatus,
    isBookmarked: (toolId: string) => bookmarks.includes(toolId),
    refreshBookmarks: loadBookmarks
  };
};
