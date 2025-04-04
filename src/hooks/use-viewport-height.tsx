
import { useEffect } from 'react';

// This hook addresses the iOS Safari viewport height issue
// where 100vh includes the address bar
export function useViewportHeight() {
  useEffect(() => {
    // Function to update CSS variable with correct viewport height
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set the initial value
    setVh();

    // Update on resize, orientation change, and scroll events
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    window.addEventListener('scroll', setVh);
    
    // iOS Safari specific - handle soft keyboard appearance
    if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
      document.addEventListener('focusin', () => {
        // Input field is focused, keyboard is likely visible
        // Wait a bit to let the keyboard fully appear
        setTimeout(setVh, 100);
      });
      
      document.addEventListener('focusout', () => {
        // Input field lost focus, keyboard is likely hidden
        // Wait a bit to let the keyboard fully disappear
        setTimeout(setVh, 100);
      });
    }

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
      window.removeEventListener('scroll', setVh);
      if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
        document.removeEventListener('focusin', setVh);
        document.removeEventListener('focusout', setVh);
      }
    };
  }, []);
}

export default useViewportHeight;
