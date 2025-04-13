
// Since the sidebar is in the read-only files, we'll need to create a new component that extends it
// Instead of modifying it directly, we'll inject a custom side menu item using JavaScript

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Youtube } from 'lucide-react';

const SidebarExtender = () => {
  useEffect(() => {
    // This effect will run once after the component mounts
    const injectYouTubeLearningLink = () => {
      try {
        // Find the sidebar navigation element
        const sidebarNav = document.querySelector('.side-navigation');
        
        if (sidebarNav) {
          // Find the position to insert our new link (before the last item)
          const items = sidebarNav.querySelectorAll('a');
          const lastItem = items[items.length - 1];
          
          if (lastItem && lastItem.parentNode) {
            // Create our new YouTube Learning link
            const youtubeLink = document.createElement('a');
            youtubeLink.href = '/youtube-learning';
            youtubeLink.className = lastItem.className; // Copy the styling from existing links
            youtubeLink.innerHTML = `
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube mr-2 h-5 w-5">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <path d="m10 15 5-3-5-3z"/>
                </svg>
                <span>YouTube Learning</span>
              </div>
            `;
            
            // Insert the new link before the last item
            lastItem.parentNode.insertBefore(youtubeLink, lastItem);
          }
        }
      } catch (error) {
        console.error("Error injecting YouTube Learning link:", error);
      }
    };
    
    // Add the link after a short delay to ensure the sidebar is fully loaded
    setTimeout(injectYouTubeLearningLink, 1000);
    
    // Clean up function
    return () => {
      // If needed, we could add cleanup code here
    };
  }, []);
  
  return null; // This component doesn't render anything visible
};

export default SidebarExtender;
