
import { useEffect } from 'react';

export const useScrollToTool = () => {
  useEffect(() => {
    const toolId = sessionStorage.getItem('lastViewedTool');
    const scrollPosition = sessionStorage.getItem('lastScrollPosition');
    
    if (toolId && scrollPosition) {
      // Wait for the page to fully load and render
      const timeoutId = setTimeout(() => {
        const scrollY = parseInt(scrollPosition, 10);
        
        // First, scroll to the stored position
        window.scrollTo({
          top: scrollY,
          behavior: 'smooth'
        });
        
        // Then try to find and highlight the tool card for better UX
        const element = document.getElementById(`tool-${toolId}`);
        if (element) {
          // Add a brief highlight effect to the tool card
          element.style.transition = 'all 0.3s ease';
          element.style.transform = 'scale(1.02)';
          element.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.15)';
          
          // Remove the highlight after animation
          setTimeout(() => {
            element.style.transform = '';
            element.style.boxShadow = '';
          }, 1000);
        }
      }, 500); // Increased delay to ensure all components are rendered
      
      // Clear the stored data after attempting to scroll
      sessionStorage.removeItem('lastViewedTool');
      sessionStorage.removeItem('lastScrollPosition');
      
      return () => clearTimeout(timeoutId);
    }
  }, []);
};

export const storeToolPosition = (toolId: string) => {
  // Store the current scroll position along with the tool ID
  const currentScrollY = window.scrollY;
  sessionStorage.setItem('lastViewedTool', toolId);
  sessionStorage.setItem('lastScrollPosition', currentScrollY.toString());
  
  console.log(`Stored tool position: ${toolId} at scroll position: ${currentScrollY}`);
};
