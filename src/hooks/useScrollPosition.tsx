
import { useEffect } from 'react';

export const useScrollToTool = () => {
  useEffect(() => {
    const toolId = sessionStorage.getItem('lastViewedTool');
    if (toolId) {
      // Small delay to ensure the page is fully rendered
      setTimeout(() => {
        const element = document.getElementById(`tool-${toolId}`);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
      // Clear the stored tool ID after scrolling
      sessionStorage.removeItem('lastViewedTool');
    }
  }, []);
};

export const storeToolPosition = (toolId: string) => {
  sessionStorage.setItem('lastViewedTool', toolId);
};
